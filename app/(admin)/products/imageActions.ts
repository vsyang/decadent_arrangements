"use server";

import { del, list, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { ProductImage } from "@/db/schema";
import { fetchImagesByProductId, fetchProductImageById } from "@/db/queries";

// Response returned by upload, replace, and delete actions.
type ImageActionResult = {
  success: boolean;
  message: string;
  images: Awaited<ReturnType<typeof fetchImagesByProductId>>;
};

// Maximum allowed upload size: 4 MB.
const MAX_FILE_SIZE = 4 * 1024 * 1024;

// Image types the owner may upload.
const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];

// Determine the correct extension for an uploaded image.
function getFileExtension(file: File) {
  const extensionFromName = file.name.split(".").pop()?.toLowerCase();

  if (
    extensionFromName === "jpg" ||
    extensionFromName === "jpeg" ||
    extensionFromName === "png" ||
    extensionFromName === "webp"
  ) {
    return extensionFromName === "jpeg" ? "jpg" : extensionFromName;
  }

  // Fall back to the browser-provided MIME type.
  if (file.type === "image/jpeg") {
    return "jpg";
  }

  if (file.type === "image/png") {
    return "png";
  }

  return "webp";
}

// Validate the uploaded file type and size.
function validateImageFile(file: File) {
  if (!allowedImageTypes.includes(file.type)) {
    return "Only JPG, PNG, and WebP images are allowed.";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "Each image must be 4 MB or smaller.";
  }

  return null;
}

// Create a safe folder name using the product ID.
function getProductFolder(productId: string) {
  return `products/${productId}`;
}

// Generate the next sequential filename for a product.
async function getNextFileName(productId: string, extension: string) {
  const folder = getProductFolder(productId);

  // Get images registered for this product.
  const databaseImages = await fetchImagesByProductId(productId);

  // Get files that exist in this product's Blob folder.
  const blobResult = await list({
    prefix: `${folder}/`,
  });

  // Combine database filenames and Blob filenames.
  const existingFileNames = [
    ...databaseImages.map((image) => image.fileName),

    ...blobResult.blobs.map((blob) => {
      return blob.pathname.split("/").pop() ?? "";
    }),
  ];

  // Extract numbers from filenames and find the next available number.
  const existingNumbers = existingFileNames
    .map((fileName) => {
      const match = fileName.match(/^image-(\d+)\.(jpg|jpeg|png|webp)$/i);

      if (!match) {
        return null;
      }

      const number = Number.parseInt(match[1], 10);

      return Number.isNaN(number) ? null : number;
    })
    .filter((number): number is number => number !== null);

  const nextNumber =
    existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;

  return `image-${String(nextNumber).padStart(3, "0")}.${extension}`;
}

// Upload one or more images and connect them to a product.
export async function uploadProductImages(
  formData: FormData,
): Promise<ImageActionResult> {
  const productId = formData.get("productId")?.toString();

  const files = formData.getAll("images");

  if (!productId) {
    return {
      success: false,
      message: "Product ID is missing.",
      images: [],
    };
  }

  const imageFiles = files.filter(
    (file): file is File => file instanceof File && file.size > 0,
  );

  if (imageFiles.length === 0) {
    return {
      success: false,
      message: "Please select at least one image.",
      images: await fetchImagesByProductId(productId),
    };
  }

  try {
    for (const file of imageFiles) {
      const validationError = validateImageFile(file);

      if (validationError) {
        return {
          success: false,
          message: validationError,
          images: await fetchImagesByProductId(productId),
        };
      }

      const extension = getFileExtension(file);

      const fileName = await getNextFileName(productId, extension);

      const folder = getProductFolder(productId);

      const pathname = `${folder}/${fileName}`;

      // Upload the file to Vercel Blob.
      const blob = await put(pathname, file, {
        access: "public",
        addRandomSuffix: false,
      });

      // Save the product relationship and Blob information.
      await db.insert(ProductImage).values({
        productId,
        imageUrl: blob.url,
        pathname: blob.pathname,
        fileName,
      });
    }

    revalidatePath(`/products/${productId}`);
    revalidatePath("/catalog");

    return {
      success: true,
      message: "Images uploaded successfully.",
      images: await fetchImagesByProductId(productId),
    };
  } catch (error) {
    console.error("Image upload error:", error);

    return {
      success: false,
      message: "The images could not be uploaded.",
      images: await fetchImagesByProductId(productId),
    };
  }
}

// Replace an existing product image.
export async function replaceProductImage(
  formData: FormData,
): Promise<ImageActionResult> {
  const imageId = formData.get("imageId")?.toString();

  const productId = formData.get("productId")?.toString();

  const replacementFile = formData.get("image");

  if (!imageId || !productId) {
    return {
      success: false,
      message: "The image information is missing.",
      images: [],
    };
  }

  if (!(replacementFile instanceof File) || replacementFile.size === 0) {
    return {
      success: false,
      message: "Please select a replacement image.",
      images: await fetchImagesByProductId(productId),
    };
  }

  const validationError = validateImageFile(replacementFile);

  if (validationError) {
    return {
      success: false,
      message: validationError,
      images: await fetchImagesByProductId(productId),
    };
  }

  try {
    const existingImage = await fetchProductImageById(imageId);

    if (!existingImage) {
      return {
        success: false,
        message: "The image could not be found.",
        images: await fetchImagesByProductId(productId),
      };
    }

    // Prevent replacing an image through the wrong product page.
    if (existingImage.productId !== productId) {
      return {
        success: false,
        message: "This image does not belong to the selected product.",
        images: await fetchImagesByProductId(productId),
      };
    }

    const extension = getFileExtension(replacementFile);

    // Keep the original sequential filename number.
    const baseName = existingImage.fileName.replace(/\.[^/.]+$/, "");

    const newFileName = `${baseName}.${extension}`;

    const folder = getProductFolder(productId);

    // Prevent Blob from returning a cached old image.
    const uniquePathname = `${folder}/${baseName}-${Date.now()}.${extension}`;

    const replacementBlob = await put(uniquePathname, replacementFile, {
      access: "public",
      addRandomSuffix: false,
    });

    await db
      .update(ProductImage)
      .set({
        imageUrl: replacementBlob.url,
        pathname: replacementBlob.pathname,
        fileName: newFileName,
        updatedAt: new Date(),
      })
      .where(eq(ProductImage.id, imageId));

    // Delete the old Blob file after the new one succeeds.
    if (existingImage.pathname !== replacementBlob.pathname) {
      await del(existingImage.pathname);
    }

    revalidatePath(`/products/${productId}`);
    revalidatePath("/catalog");

    return {
      success: true,
      message: "Image replaced successfully.",
      images: await fetchImagesByProductId(productId),
    };
  } catch (error) {
    console.error("Image replacement error:", error);

    return {
      success: false,
      message: "The image could not be replaced.",
      images: await fetchImagesByProductId(productId),
    };
  }
}

// Delete an image from both Vercel Blob and Neon.
export async function deleteProductImage(input: {
  imageId: string;
  productId: string;
}): Promise<ImageActionResult> {
  const { imageId, productId } = input;

  try {
    const image = await fetchProductImageById(imageId);

    if (!image) {
      return {
        success: false,
        message: "The image could not be found.",
        images: await fetchImagesByProductId(productId),
      };
    }

    // Prevent deleting an image through the wrong product page.
    if (image.productId !== productId) {
      return {
        success: false,
        message: "This image does not belong to the selected product.",
        images: await fetchImagesByProductId(productId),
      };
    }

    // Remove the physical file from Vercel Blob.
    await del(image.pathname);

    // Remove its matching database record.
    await db.delete(ProductImage).where(eq(ProductImage.id, imageId));

    revalidatePath(`/products/${productId}`);
    revalidatePath("/catalog");

    return {
      success: true,
      message: "Image deleted successfully.",
      images: await fetchImagesByProductId(productId),
    };
  } catch (error) {
    console.error("Image deletion error:", error);

    return {
      success: false,
      message: "The image could not be deleted.",
      images: await fetchImagesByProductId(productId),
    };
  }
}

"use server";


import { del, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { ProductImage } from "@/db/schema";
import {
  fetchImagesByProductSize,
  fetchProductImageById,
} from "@/db/queries";

// Product sizes
type ProductSize = "S" | "M" | "L" | "XL";

// Response shape returned by all image actions
type ImageActionResult = {
  success: boolean;
  message: string;
  images: Awaited<ReturnType<typeof fetchImagesByProductSize>>;
};

// Maximum allowed upload size: 5 MB
const MAX_FILE_SIZE = 4 * 1024 * 1024;

// File types the business owner is allowed to upload
const allowedImageTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

// Converts the database size value into the matching folder name used in Vercel Blob.
function getSizeFolder(productSize: ProductSize) {
  const folders: Record<ProductSize, string> = {
    S: "small",
    M: "medium",
    L: "large",
    XL: "xlarge",
  };

  return folders[productSize];
}

// Converts the database size value into the filename prefix.

function getSizePrefix(productSize: ProductSize) {
  const prefixes: Record<ProductSize, string> = {
    S: "s",
    M: "m",
    L: "l",
    XL: "xl",
  };

  return prefixes[productSize];
}

// Checks which extension should be used for the uploaded file. This checks the original filename first. If that is unavailable or unsupported, it checks the MIME type.
function getFileExtension(file: File) {
  const extensionFromName = file.name
    .split(".")
    .pop()
    ?.toLowerCase();

  // Normalize .jpg files
  if (extensionFromName === "jpg") {
    return "jpg";
  }

  // Return supported extensions as-is
  if (
    extensionFromName === "jpeg" ||
    extensionFromName === "png" ||
    extensionFromName === "webp"
  ) {
    return extensionFromName;
  }

  // Fall back to the browser-reported MIME type
  if (file.type === "image/jpeg") {
    return "jpg";
  }

  if (file.type === "image/png") {
    return "png";
  }

  // Default to WebP if no other supported type is found
  return "webp";
}

// Validates a single uploaded file to ensure it is an allowed type and size.
function validateImageFile(file: File) {
  // Reject unsupported image types
  if (!allowedImageTypes.includes(file.type)) {
    return "Only JPG, PNG, and WebP images are allowed.";
  }

  // Reject files larger than 5 MB
  if (file.size > MAX_FILE_SIZE) {
    return "Each image must be 5 MB or smaller.";
  }

  return null;
}

// Generates the next available filename for a new product image. This ensures that filenames are sequential and do not overwrite existing files.
async function getNextFileName(
  productSize: ProductSize,
  extension: string,
) {
  // Retrieve all images already assigned to this size
  const existingImages = await fetchImagesByProductSize(productSize);

  // Get the matching size prefix
  const prefix = getSizePrefix(productSize);

  // Extract the numeric portion of each matching filename
  const existingNumbers = existingImages
    .map((image) => {
      // Remove the extension from the filename
      const fileNameWithoutExtension = image.fileName.replace(
        /\.[^/.]+$/,
        "",
      );

      // Ignore filenames that do not match the current size prefix
      if (!fileNameWithoutExtension.startsWith(prefix)) {
        return null;
      }

      // Remove the prefix to get the numeric part
      const numberPart = fileNameWithoutExtension.slice(prefix.length);

      // Convert the numeric part into an actual number
      const number = Number.parseInt(numberPart, 10);

      return Number.isNaN(number) ? null : number;
    })
    .filter((number): number is number => number !== null);

  // Use the highest existing number plus one
  const nextNumber =
    existingNumbers.length > 0
      ? Math.max(...existingNumbers) + 1
      : 1;

  // Pad the number to three digits
  return `${prefix}${String(nextNumber).padStart(3, "0")}.${extension}`;
}

// Uploads one or more new product images. This action handles multiple files at once, validates them, uploads them to Vercel Blob, and saves their information in the database.
export async function uploadProductImages(
  formData: FormData,
): Promise<ImageActionResult> {
  // Read product information from the submitted form
  const productSize = formData.get("productSize") as ProductSize;
  const productId = formData.get("productId")?.toString();

  // Read all uploaded files using the "images" field name
  const files = formData.getAll("images");

  // Product ID is required so we know which page to refresh
  if (!productId) {
    return {
      success: false,
      message: "Product ID is missing.",
      images: [],
    };
  }

  // Confirm the product size matches the allowed enum values
  if (!["S", "M", "L", "XL"].includes(productSize)) {
    return {
      success: false,
      message: "The product size is invalid.",
      images: [],
    };
  }

  // Keep only valid File objects that contain actual content
  const imageFiles = files.filter(
    (file): file is File => file instanceof File && file.size > 0,
  );

  // At least one image must be selected
  if (imageFiles.length === 0) {
    return {
      success: false,
      message: "Please select at least one image.",
      images: await fetchImagesByProductSize(productSize),
    };
  }

  try {
    // Upload each selected image one at a time
    for (const file of imageFiles) {
      // Validate file type and size
      const validationError = validateImageFile(file);

      if (validationError) {
        return {
          success: false,
          message: validationError,
          images: await fetchImagesByProductSize(productSize),
        };
      }

      // Determine the image extension
      const extension = getFileExtension(file);

      // Generate the next available filename
      const fileName = await getNextFileName(
        productSize,
        extension,
      );

      // Determine the correct Blob folder
      const folder = getSizeFolder(productSize);

      // Build the full Blob pathname
      const pathname = `${folder}/${fileName}`;

      // Upload the file to Vercel Blob
      const blob = await put(pathname, file, {
        access: "public",

        // Keeps the exact filename instead of adding random characters
        addRandomSuffix: false,
      });

      // Save the uploaded image information in Neon
      await db.insert(ProductImage).values({
        size: productSize,
        imageUrl: blob.url,
        pathname: blob.pathname,
        fileName,
      });
    }

    // Refresh the product details page
    revalidatePath(`/admin/catalog/${productId}`);

    // Return the updated list of images
    return {
      success: true,
      message: "Images uploaded successfully.",
      images: await fetchImagesByProductSize(productSize),
    };
  } catch (error) {
    console.error("Image upload error:", error);

    return {
      success: false,
      message: "The images could not be uploaded.",
      images: await fetchImagesByProductSize(productSize),
    };
  }
}

// Updates an existing product image by replacing it with a new image
export async function replaceProductImage(
  formData: FormData,
): Promise<ImageActionResult> {
  // Read submitted image and product information
  const imageId = formData.get("imageId")?.toString();
  const productId = formData.get("productId")?.toString();
  const productSize = formData.get("productSize") as ProductSize;

  // Read the replacement file
  const replacementFile = formData.get("image");

  // Image ID and product ID are required
  if (!imageId || !productId) {
    return {
      success: false,
      message: "The image information is missing.",
      images: [],
    };
  }

  // Confirm a real replacement file was selected
  if (!(replacementFile instanceof File) || replacementFile.size === 0) {
    return {
      success: false,
      message: "Please select a replacement image.",
      images: await fetchImagesByProductSize(productSize),
    };
  }

  // Validate the replacement file
  const validationError = validateImageFile(replacementFile);

  if (validationError) {
    return {
      success: false,
      message: validationError,
      images: await fetchImagesByProductSize(productSize),
    };
  }

  try {
    // Find the existing image record in the database
    const existingImage = await fetchProductImageById(imageId);

    if (!existingImage) {
      return {
        success: false,
        message: "The image could not be found.",
        images: await fetchImagesByProductSize(productSize),
      };
    }

    // Determine the extension of the replacement file
    const extension = getFileExtension(replacementFile);

    // Keep the same filename number while changing the extension if needed
    const baseName = existingImage.fileName.replace(/\.[^/.]+$/, "");
    const newFileName = `${baseName}.${extension}`;

    // Determine the correct Blob folder
    const folder = getSizeFolder(productSize);

    // Build the replacement pathname
    const newPathname = `${folder}/${newFileName}`;

    // Upload the replacement image
    const replacementBlob = await put(
      newPathname,
      replacementFile,
      {
        access: "public",
        addRandomSuffix: false,

        // Allows an existing pathname to be replaced
        allowOverwrite: true,
      },
    );

    // Update the existing database row
    await db
      .update(ProductImage)
      .set({
        imageUrl: replacementBlob.url,
        pathname: replacementBlob.pathname,
        fileName: newFileName,
        updatedAt: new Date(),
      })
      .where(eq(ProductImage.id, imageId));

    // If the new extension changed the pathname, delete the old file from Blob storage
    if (existingImage.pathname !== replacementBlob.pathname) {
      await del(existingImage.pathname);
    }

    // Refresh the product details page
    revalidatePath(`/admin/catalog/${productId}`);

    return {
      success: true,
      message: "Image replaced successfully.",
      images: await fetchImagesByProductSize(productSize),
    };
  } catch (error) {
    console.error("Image replacement error:", error);

    return {
      success: false,
      message: "The image could not be replaced.",
      images: await fetchImagesByProductSize(productSize),
    };
  }
}

// Deletes a product image from both the database and Vercel Blob storage
export async function deleteProductImage(input: {
  imageId: string;
  productId: string;
  productSize: ProductSize;
}): Promise<ImageActionResult> {
  // Extract submitted values
  const { imageId, productId, productSize } = input;

  try {
    // Find the image record before deleting anything
    const image = await fetchProductImageById(imageId);

    if (!image) {
      return {
        success: false,
        message: "The image could not be found.",
        images: await fetchImagesByProductSize(productSize),
      };
    }

    // Delete the actual file from Vercel Blob
    await del(image.pathname);

    // Delete its matching database row
    await db
      .delete(ProductImage)
      .where(eq(ProductImage.id, imageId));

    // Refresh the product details page
    revalidatePath(`/admin/catalog/${productId}`);

    return {
      success: true,
      message: "Image deleted successfully.",
      images: await fetchImagesByProductSize(productSize),
    };
  } catch (error) {
    console.error("Image deletion error:", error);

    return {
      success: false,
      message: "The image could not be deleted.",
      images: await fetchImagesByProductSize(productSize),
    };
  }
}
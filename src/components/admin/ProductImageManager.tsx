"use client";

import Image from "next/image";
import { ChangeEvent, useRef, useState, useTransition } from "react";

import {
  deleteProductImage,
  replaceProductImage,
  uploadProductImages,
} from "../../../app/(admin)/products/imageActions";

// Shape of one image returned from the database.
type ProductImage = {
  id: string;
  productId: string;
  imageUrl: string;
  pathname: string;
  fileName: string;
  createdAt: Date;
  updatedAt: Date;
};

// Information received from the product details page.
type ProductImageManagerProps = {
  productId: string;
  productName: string;
  initialImages: ProductImage[];
};

export default function ProductImageManager({
  productId,
  productName,
  initialImages,
}: ProductImageManagerProps) {
  // Keeps the displayed image list updated without reloading the page.
  const [images, setImages] = useState(initialImages);

  // Displays success and error messages.
  const [message, setMessage] = useState("");

  // Tracks whether an upload, replacement, or deletion is running.
  const [isPending, startTransition] = useTransition();

  // References the hidden file inputs.
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);

  // Stores the ID of the image currently being replaced.
  const [imageBeingReplaced, setImageBeingReplaced] = useState<string | null>(
    null,
  );

  // Uploads one or more new product images.
  function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = event.target.files;

    // Stop if no files were selected.
    if (!selectedFiles || selectedFiles.length === 0) {
      return;
    }

    const formData = new FormData();

    // Add each selected image under the same field name.
    Array.from(selectedFiles).forEach((file) => {
      formData.append("images", file);
    });

    // Connect the uploaded images directly to this product.
    formData.append("productId", productId);

    setMessage("");

    startTransition(async () => {
      const result = await uploadProductImages(formData);

      // Replace the current image list with the updated database result.
      setImages(result.images);
      setMessage(result.message);

      // Clear the file input so the same file can be selected again.
      if (uploadInputRef.current) {
        uploadInputRef.current.value = "";
      }
    });
  }

  // Begins the image replacement process.
  function beginReplacingImage(imageId: string) {
    setImageBeingReplaced(imageId);
    setMessage("");

    replaceInputRef.current?.click();
  }

  // Replaces an existing image with a new file.
  function handleReplacement(event: ChangeEvent<HTMLInputElement>) {
    const replacementFile = event.target.files?.[0];

    // Stop if no replacement file or image ID is available.
    if (!replacementFile || !imageBeingReplaced) {
      return;
    }

    const formData = new FormData();

    formData.append("image", replacementFile);
    formData.append("imageId", imageBeingReplaced);
    formData.append("productId", productId);

    startTransition(async () => {
      const result = await replaceProductImage(formData);

      setImages(result.images);
      setMessage(result.message);

      // Reset replacement state.
      setImageBeingReplaced(null);

      if (replaceInputRef.current) {
        replaceInputRef.current.value = "";
      }
    });
  }

  // Deletes an existing product image.
  function handleDelete(imageId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this image?",
    );

    if (!confirmed) {
      return;
    }

    setMessage("");

    startTransition(async () => {
      const result = await deleteProductImage({
        imageId,
        productId,
      });

      setImages(result.images);
      setMessage(result.message);
    });
  }

  return (
    <section>
      <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            Product Images
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {images.length} image{images.length === 1 ? "" : "s"} currently
            available for {productName}.
          </p>
        </div>

        {/* Visible upload button */}
        <label
          className={`inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${
            isPending
              ? "cursor-not-allowed bg-slate-400"
              : "cursor-pointer bg-[#03989e] hover:opacity-90"
          }`}
        >
          {isPending ? "Processing..." : "Add Images"}

          {/* Hidden input opens the phone gallery or file browser. */}
          <input
            ref={uploadInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            disabled={isPending}
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Hidden input used only when replacing one image. */}
      <input
        ref={replaceInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        disabled={isPending}
        onChange={handleReplacement}
        className="hidden"
      />

      {/* Action status message */}
      {message && (
        <div
          role="status"
          className="mb-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
        >
          {message}
        </div>
      )}

      {/* Empty state */}
      {images.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
          <h3 className="text-lg font-semibold text-slate-700">
            No images have been registered
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Add the first image for this product. Images uploaded directly
            through Vercel will not appear here until they are added to the
            product_images database table.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <article
              key={image.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              {/* Image preview */}
              <div className="relative aspect-[4/3] bg-slate-100">
                <Image
                  src={image.imageUrl}
                  alt={`${productName} - ${image.fileName}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Image information and controls */}
              <div className="p-4">
                <p
                  className="truncate font-medium text-slate-800"
                  title={image.fileName}
                >
                  {image.fileName}
                </p>

                <p
                  className="mt-1 truncate text-xs text-slate-400"
                  title={image.pathname}
                >
                  {image.pathname}
                </p>

                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => beginReplacingImage(image.id)}
                    className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Replace
                  </button>

                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleDelete(image.id)}
                    className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

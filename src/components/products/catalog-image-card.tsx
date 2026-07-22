"use client";

import Image from "next/image";
import { useState } from "react";

import ImageGalleryModal from "./gallery-modal";

type GalleryImage = {
  id: string;
  imageUrl: string;
  fileName?: string | null;
};

type CatalogImageCardProps = {
  categoryName: string;
  images: GalleryImage[];
  fallbackImageUrl?: string | null;
};

export default function CatalogImageCard({
  categoryName,
  images,
  fallbackImageUrl,
}: CatalogImageCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use the first gallery image when available. Otherwise, use the original image saved on the product.
  const previewImageUrl = images[0]?.imageUrl ?? fallbackImageUrl;

  if (!previewImageUrl) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-xs font-serif italic text-slate-400">
          No image available
        </span>
      </div>
    );
  }

  // The modal only opens when gallery images exist.
  const hasGalleryImages = images.length > 0;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          if (hasGalleryImages) {
            setIsModalOpen(true);
          }
        }}
        disabled={!hasGalleryImages}
        className={`group/image relative block h-full w-full ${
          hasGalleryImages ? "cursor-pointer" : "cursor-default"
        }`}
        aria-label={
          hasGalleryImages
            ? `Open ${categoryName} image gallery`
            : `${categoryName} image`
        }
      >
        <Image
          src={previewImageUrl}
          alt={categoryName}
          fill
          className="object-cover transition-transform duration-500 group-hover/image:scale-125"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {hasGalleryImages && (
          <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs text-white shadow">
            View {images.length} {images.length === 1 ? "image" : "images"}
          </span>
        )}
      </button>

      <ImageGalleryModal
        categoryName={categoryName}
        images={images}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

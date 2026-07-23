// src/components/products/catalog-image-card.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import ImageGalleryModal from "./gallery-modal";

export type GalleryImage = {
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

  const previewImageUrl = images[0]?.imageUrl ?? fallbackImageUrl;

  if (!previewImageUrl) {
    return (
      <div className="flex h-full items-center justify-center bg-[var(--color-surface)]">
        <span className="font-serif text-xs italic text-[var(--color-muted)]">
          No image available
        </span>
      </div>
    );
  }

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
        className={`group/image relative block h-full w-full overflow-hidden ${
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
          className="object-cover transition-transform duration-700 ease-out group-hover/image:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {hasGalleryImages && (
          <span className="absolute bottom-3 right-3 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-white shadow-lg border border-white/20">
            View {images.length} {images.length === 1 ? "photo" : "photos"}
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

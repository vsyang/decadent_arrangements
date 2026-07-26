"use client";

import "@/app/globals.css";

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
  const hasGalleryImages = images.length > 0;

  if (!previewImageUrl) {
    return (
      <div className="flex h-full min-h-[360px] items-center justify-center bg-[#e9e3dc]">
        <span className="text-xs italic tracking-wide text-[#807973]">
          No image available
        </span>
      </div>
    );
  }

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
        className={`group/image relative block h-full w-full overflow-hidden bg-black text-left ${
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
          className="object-cover transition duration-[1200ms] ease-out group-hover/image:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* Subtle image overlays */}
        <div className="absolute inset-0 bg-black/5 transition duration-500 group-hover/image:bg-black/15" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-70 transition duration-500 group-hover/image:opacity-100" />

        {hasGalleryImages && (
          <div className="absolute bottom-4 right-4">
            <div className="border border-white/35 bg-black/55 px-4 py-3 text-right backdrop-blur-sm transition duration-300 group-hover/image:border-[#00BCD4] group-hover/image:bg-black/75">
              <p className="text-[8px] font-medium uppercase tracking-[0.24em] text-white/55">
                Image Gallery
              </p>

              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                View {images.length} {images.length === 1 ? "photo" : "photos"}
              </p>
            </div>
          </div>
        )}
      </button>

      <ImageGalleryModal
        key={isModalOpen ? "open" : "closed"}
        categoryName={categoryName}
        images={images}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";

type GalleryImage = {
  id: string;
  imageUrl: string;
  fileName?: string | null;
};

type ImageGalleryModalProps = {
  categoryName: string;
  images: GalleryImage[];
  startingImageIndex?: number;
  isOpen: boolean;
  onClose: () => void;
};

export default function ImageGalleryModal({
  categoryName,
  images,
  startingImageIndex = 0,
  isOpen,
  onClose,
}: ImageGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(startingImageIndex);

  // Close the modal with Escape and navigate with arrow keys.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        setCurrentIndex((previousIndex) =>
          previousIndex === 0 ? images.length - 1 : previousIndex - 1,
        );
      }

      if (event.key === "ArrowRight") {
        setCurrentIndex((previousIndex) =>
          previousIndex === images.length - 1 ? 0 : previousIndex + 1,
        );
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    // Prevent the page behind the modal from scrolling.
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, images.length, onClose]);

  if (!isOpen || images.length === 0) {
    return null;
  }

  const currentImage = images[currentIndex];

  function showPreviousImage() {
    setCurrentIndex((previousIndex) =>
      previousIndex === 0 ? images.length - 1 : previousIndex - 1,
    );
  }

  function showNextImage() {
    setCurrentIndex((previousIndex) =>
      previousIndex === images.length - 1 ? 0 : previousIndex + 1,
    );
  }

  function closeModal() {
    // Reset the gallery before closing it.
    setCurrentIndex(startingImageIndex);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${categoryName} image gallery`}
      onClick={closeModal}
    >
      <div
        className="relative w-full max-w-5xl rounded-2xl bg-background p-4 shadow-2xl md:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={closeModal}
          className="absolute right-3 top-3 z-20 rounded-full bg-background/90 p-2 text-foreground shadow transition hover:scale-105"
          aria-label="Close image gallery"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Category heading */}
        <div className="mb-4 pr-12">
          <h2 className="text-2xl font-bold text-primary">{categoryName}</h2>

          <p className="text-sm text-muted">
            Image {currentIndex + 1} of {images.length}
          </p>
        </div>

        {/* Main image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted/20">
          <Image
            src={currentImage.imageUrl}
            alt={
              currentImage.fileName
                ? `${categoryName} - ${currentImage.fileName}`
                : `${categoryName} arrangement ${currentIndex + 1}`
            }
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-contain"
          />

          {/* Only show arrows when there is more than one image. */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={showPreviousImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/90 p-2 shadow transition hover:scale-105"
                aria-label="View previous image"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>

              <button
                type="button"
                onClick={showNextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/90 p-2 shadow transition hover:scale-105"
                aria-label="View next image"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail selection */}
        {images.length > 1 && (
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`relative h-20 w-20 flex-none overflow-hidden rounded-lg border-2 transition ${
                  currentIndex === index
                    ? "border-primary"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={image.imageUrl}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

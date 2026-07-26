"use client";

import "@/app/globals.css";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { cormorant, montserrat } from "@/app/ui/home/fonts";

type GalleryImage = {
  id: string;
  imageUrl: string;
  fileName?: string | null;
};

type ImageGalleryModalProps = {
  categoryName: string;
  images: GalleryImage[];
  isOpen: boolean;
  onClose: () => void;
};

export default function ImageGalleryModal({
  categoryName,
  images,
  isOpen,
  onClose,
}: ImageGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const showPreviousImage = useCallback(() => {
    setCurrentIndex((previousIndex) =>
      previousIndex === 0 ? images.length - 1 : previousIndex - 1,
    );
  }, [images.length]);

  const showNextImage = useCallback(() => {
    setCurrentIndex((previousIndex) =>
      previousIndex === images.length - 1 ? 0 : previousIndex + 1,
    );
  }, [images.length]);

  const closeModal = useCallback(() => {
    setCurrentIndex(0);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeModal();
      }

      if (event.key === "ArrowLeft" && images.length > 1) {
        showPreviousImage();
      }

      if (event.key === "ArrowRight" && images.length > 1) {
        showNextImage();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, images.length, closeModal, showPreviousImage, showNextImage]);

  if (!isOpen || images.length === 0 || typeof document === "undefined") {
    return null;
  }

  const currentImage = images[currentIndex];

  return createPortal(
    <div
      className={`${montserrat.className} fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-6`}
      role="dialog"
      aria-modal="true"
      aria-label={`${categoryName} image gallery`}
      onClick={closeModal}
    >
      <div
        className="animate-cinematic-fade-up relative flex max-h-[88vh] w-full max-w-5xl flex-col overflow-hidden border border-white/15 bg-[#0a0a0a] shadow-[0_30px_100px_rgba(0,0,0,0.65)]"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-6 border-b border-white/15 px-5 py-4 sm:px-8 sm:py-5">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="h-px w-8 bg-[#00BCD4]" />

              <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-white/50">
                Image Gallery
              </p>
            </div>

            <h2
              className={`${cormorant.className} text-3xl font-medium leading-none text-white sm:text-4xl`}
            >
              {categoryName}
            </h2>

            <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#00BCD4]">
              Photo {currentIndex + 1} of {images.length}
            </p>
          </div>

          <button
            type="button"
            onClick={closeModal}
            className="group flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center border border-white/25 text-white transition duration-300 hover:border-[#00BCD4] hover:bg-[#00BCD4] hover:text-black"
            aria-label="Close image gallery"
          >
            <X
              className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90"
              strokeWidth={1.4}
            />
          </button>
        </div>

        {/* Main image */}
        <div className="relative min-h-0 flex-1 bg-black">
          <div className="relative h-[42vh] min-h-[280px] w-full sm:h-[48vh] lg:h-[52vh]">
            <Image
              key={currentImage.id}
              src={currentImage.imageUrl}
              alt={
                currentImage.fileName
                  ? `${categoryName} - ${currentImage.fileName}`
                  : `${categoryName} arrangement ${currentIndex + 1}`
              }
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1000px"
              className="animate-cinematic-image-reveal object-contain"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPreviousImage}
                  className="group absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center border border-white/35 bg-black/45 text-white backdrop-blur-sm transition duration-300 hover:border-[#00BCD4] hover:bg-[#00BCD4] hover:text-black sm:left-6"
                  aria-label="View previous image"
                >
                  <ChevronLeft
                    className="h-6 w-6 transition-transform duration-300 group-hover:-translate-x-0.5"
                    strokeWidth={1.3}
                  />
                </button>

                <button
                  type="button"
                  onClick={showNextImage}
                  className="group absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center border border-white/35 bg-black/45 text-white backdrop-blur-sm transition duration-300 hover:border-[#00BCD4] hover:bg-[#00BCD4] hover:text-black sm:right-6"
                  aria-label="View next image"
                >
                  <ChevronRight
                    className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-0.5"
                    strokeWidth={1.3}
                  />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="border-t border-white/15 bg-[#111111] px-5 py-3 sm:px-8">
            <div className="flex gap-3 overflow-x-auto pb-1">
              {images.map((image, index) => {
                const isActive = currentIndex === index;

                return (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    className={`relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden border transition duration-300 sm:h-20 sm:w-20 ${
                      isActive
                        ? "border-[#00BCD4] opacity-100"
                        : "border-white/15 opacity-45 hover:border-white/50 hover:opacity-100"
                    }`}
                    aria-label={`View image ${index + 1}`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <Image
                      src={image.imageUrl}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover transition duration-500 hover:scale-105"
                    />

                    {isActive && (
                      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#00BCD4]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}

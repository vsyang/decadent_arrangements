"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom"; // 👈 Importamos createPortal

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
  const [isMounted, setIsMounted] = useState(false);

  // Asegura que el portal solo se ejecute en el cliente (evita errores de SSR/Hydration)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Manejo de eventos de teclado y bloqueo del scroll del body
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      }
      if (event.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, images.length, onClose]);

  if (!isOpen || !isMounted || images.length === 0) {
    return null;
  }

  const currentImage = images[currentIndex];

  function showPreviousImage() {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }

  function showNextImage() {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }

  function closeModal() {
    setCurrentIndex(startingImageIndex);
    onClose();
  }

  // 🚀 Teletransportamos el JSX directamente al document.body
  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${categoryName} image gallery`}
      onClick={closeModal}
    >
      <div
        className="relative w-full max-w-4xl rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5 sm:p-8 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Botón de cierre */}
        <button
          type="button"
          onClick={closeModal}
          className="absolute right-4 top-4 z-20 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-2 text-[var(--color-foreground)] shadow-md transition-transform hover:scale-110 active:scale-95"
          aria-label="Close image gallery"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Encabezado */}
        <div className="mb-4 pr-10">
          <h2 className="font-serif text-2xl font-bold text-[var(--color-primary)] sm:text-3xl">
            {categoryName}
          </h2>
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">
            Photo {currentIndex + 1} of {images.length}
          </p>
        </div>

        {/* Visor Principal */}
        <div className="relative aspect-[4/3] max-h-[60vh] w-full overflow-hidden rounded-2xl bg-[var(--color-surface)]">
          <Image
            src={currentImage.imageUrl}
            alt={
              currentImage.fileName
                ? `${categoryName} - ${currentImage.fileName}`
                : `${categoryName} arrangement ${currentIndex + 1}`
            }
            fill
            sizes="(max-width: 1024px) 100vw, 1000px"
            className="object-contain"
            priority
          />

          {/* Botones de navegación (Flechas) */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={showPreviousImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/90 backdrop-blur-sm p-2 text-[var(--color-foreground)] shadow-lg transition-transform hover:scale-110 active:scale-95"
                aria-label="View previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                type="button"
                onClick={showNextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/90 backdrop-blur-sm p-2 text-[var(--color-foreground)] shadow-lg transition-transform hover:scale-110 active:scale-95"
                aria-label="View next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {/* Carrusel inferior de miniaturas (Thumbnails) */}
        {images.length > 1 && (
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${currentIndex === index
                    ? "border-[var(--color-accent)] scale-105 shadow-md"
                    : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={image.imageUrl}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body // Target de destino del Portal
  );
}
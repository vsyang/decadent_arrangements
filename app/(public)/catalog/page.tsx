import "@/app/globals.css";

import type { Metadata } from "next";
import { Suspense } from "react";
import { Sparkles } from "lucide-react";

import { ProductsGridSkeleton } from "@/app/ui/skeleton";
import ProductsGrid from "@/app/ui/products/grid";
import { cormorant, montserrat } from "@/app/ui/home/fonts";
import { Reveal } from "@/app/ui/helpers/Reveal";

export const metadata: Metadata = {
  title: "Catalog | Decadent Arrangements",
  description:
    "Browse our handcrafted collection of charcuterie boards, gourmet dessert trays, and custom arrangements.",
};

export default function CatalogPage() {
  return (
    <main
      className={`${montserrat.className} min-h-screen overflow-x-hidden bg-[#0a0a0a] text-white`}
    >
      {/* =====================================================
          CATALOG HERO
      ====================================================== */}
      <section className="relative min-h-[560px] overflow-hidden bg-black text-white sm:min-h-[620px] lg:min-h-[680px]">
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="animate-cinematic-image-reveal absolute inset-0 h-full w-full object-cover object-center"
        >
          <source
            src="https://jwul10vtycq0k5q2.public.blob.vercel-storage.com/movie/strawberries-chocolate.mp4"
            type="video/mp4"
          />
        </video>

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/50" />

        {/* Hero content */}
        <div className="relative z-10 mx-auto flex min-h-[560px] max-w-7xl items-center px-6 py-16 sm:min-h-[620px] sm:px-10 lg:min-h-[680px] lg:px-14">
          <div className="max-w-4xl">
            <div className="animate-cinematic-fade-up mb-7 flex items-center gap-4">
              <div className="h-px w-12 bg-[#00BCD4]" />

              <p className="text-[10px] font-medium uppercase tracking-[0.38em] text-white/70 sm:text-xs">
                Artisanal Selection
              </p>
            </div>

            <h1
              className={`${cormorant.className} animate-cinematic-fade-up animation-delay-200 text-5xl font-medium leading-[0.92] tracking-[-0.025em] text-white sm:text-7xl lg:text-[6.5rem]`}
            >
              Our Culinary
              <span className="block italic text-white/70">Creations.</span>
            </h1>

            <p className="animate-cinematic-fade-up animation-delay-600 mt-8 max-w-2xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
              Explore handcrafted arrangements created with premium ingredients,
              thoughtful presentation, and custom details for every celebration.
            </p>

            <div className="animate-cinematic-fade-up animation-delay-800 mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/20 pt-7">
              <div className="flex items-center gap-3">
                <Sparkles
                  className="h-4 w-4 text-[#00BCD4]"
                  strokeWidth={1.3}
                />

                <p className="text-[10px] uppercase tracking-[0.18em] text-white/65">
                  Handcrafted
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Sparkles
                  className="h-4 w-4 text-[#00BCD4]"
                  strokeWidth={1.3}
                />

                <p className="text-[10px] uppercase tracking-[0.18em] text-white/65">
                  Custom Designed
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Sparkles
                  className="h-4 w-4 text-[#00BCD4]"
                  strokeWidth={1.3}
                />

                <p className="text-[10px] uppercase tracking-[0.18em] text-white/65">
                  Made in Denver
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRODUCT COLLECTION
      ====================================================== */}
      <section className="bg-[#f4f0ea] px-6 py-20 text-black sm:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 flex flex-col gap-8 border-b border-black/15 pb-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.34em] text-[#007C91]">
                  Available Arrangements
                </p>

                <h2
                  className={`${cormorant.className} max-w-3xl text-4xl font-medium leading-[0.95] text-[#252525] sm:text-5xl lg:text-6xl`}
                >
                  Find the perfect arrangement
                  <span className="block italic text-[#807973]">
                    for your moment.
                  </span>
                </h2>
              </div>

              <p className="max-w-md text-sm leading-7 text-[#545454]">
                Each creation can be personalized to reflect your occasion,
                preferences, dietary needs, and number of guests.
              </p>
            </div>
          </Reveal>

          {/* Product grid */}
          <div className="w-full">
            <Suspense fallback={<ProductsGridSkeleton />}>
              <ProductsGrid />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}

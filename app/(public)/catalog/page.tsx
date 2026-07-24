import type { Metadata } from "next";
import { Suspense } from "react";
import { Sparkles } from "lucide-react";

import { ProductsGridSkeleton } from "@/components/skeleton";
import ProductsGrid from "@/components/products/grid";

export const metadata: Metadata = {
  title: "Catalog | Decadent Arrangements",
  description:
    "Browse our handcrafted collection of charcuterie boards, gourmet dessert trays, and custom arrangements.",
};

export default function CatalogPage() {
  return (
    <main className="min-h-screen max-w-full overflow-x-hidden bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors">
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-10 md:py-16">
        <div className="mb-10 text-center md:mb-14">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-1.5 shadow-sm">
            <Sparkles className="h-4 w-4 text-[var(--color-honey)]" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-accent)]">
              Artisanal Selection
            </span>
          </div>

          <h1 className="mb-4 font-serif text-4xl font-extrabold text-[var(--color-primary)] sm:text-5xl md:text-6xl">
            Our Culinary Creations
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[var(--color-muted-foreground)] md:text-lg">
            Explore our curated arrangements handcrafted with premium cheeses,
            cured meats, fresh fruits, and sweet treats designed for every
            occasion.
          </p>
        </div>

        <div className="relative mb-10 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--color-border-subtle)]" />
          </div>
          <span className="relative bg-[var(--color-background)] px-4 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">
            Available Arrangements
          </span>
        </div>

        <div className="w-full">
          <Suspense fallback={<ProductsGridSkeleton />}>
            <ProductsGrid />
          </Suspense>
        </div>
      </section>
    </main>
  );
}

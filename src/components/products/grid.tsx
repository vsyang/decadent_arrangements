// src/components/products/grid.tsx
import Link from "next/link";
import { getServerSession } from "next-auth";
import { ShoppingBag, Users, Sparkles, ArrowRight } from "lucide-react";

import { fetchAllProductImages, fetchProducts } from "@/db/queries";
import { authOptions } from "@/lib/auth";
import CatalogImageCard from "./catalog-image-card";

export type GalleryImage = {
  id: string;
  imageUrl: string;
  fileName?: string | null;
};

export default async function ProductsGrid() {
  const session = await getServerSession(authOptions);
  const isAuthenticated = Boolean(session?.user?.id);

  const products = await fetchProducts();
  const storedImages = await fetchAllProductImages();

  const imagesByProduct = storedImages.reduce<Record<string, GalleryImage[]>>(
    (groups, image) => {
      if (!groups[image.productId]) {
        groups[image.productId] = [];
      }

      groups[image.productId].push({
        id: image.id,
        imageUrl: image.imageUrl,
        fileName: image.fileName,
      });

      return groups;
    },
    {}
  );

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-20 text-center shadow-sm">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
          <Sparkles className="h-7 w-7" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-[var(--color-primary)]">
          No Arrangements Available
        </h3>
        <p className="mt-2 max-w-sm text-sm text-[var(--color-muted-foreground)]">
          We are currently crafting new seasonal menus.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => {
        // 🔑 CLAVE DE LA SOLUCIÓN: Si no hay fotos secundarias, empaquetamos la foto principal
        let galleryImages = imagesByProduct[product.id] ?? [];

        if (galleryImages.length === 0 && product.imageUrl) {
          galleryImages = [
            {
              id: `fallback-${product.id}`,
              imageUrl: product.imageUrl,
              fileName: product.name,
            },
          ];
        }

        const numericPrice = Number(product.price);

        return (
          <article
            key={product.id}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Visor de imágenes / Galería interactiva */}
            <div className="relative aspect-[5/4] w-full overflow-hidden bg-[var(--color-surface)]">
              <CatalogImageCard
                categoryName={product.name}
                images={galleryImages}
                fallbackImageUrl={product.imageUrl}
              />
            </div>

            {/* Información del producto */}
            <div className="flex flex-grow flex-col justify-between p-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[var(--color-primary)] transition-colors group-hover:text-[var(--color-accent)] line-clamp-1">
                  {product.name}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-[var(--color-muted-foreground)] line-clamp-2">
                  {product.description || "Handcrafted artisanal arrangement."}
                </p>
              </div>

              {/* Especificaciones: Precio & Capacidad */}
              <div className="mt-6 flex items-center justify-between border-t border-[var(--color-border-subtle)] pt-4">
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
                    Investment
                  </span>
                  {numericPrice > 0 ? (
                    <p className="font-serif text-lg font-bold text-[var(--color-primary)]">
                      ${numericPrice.toFixed(2)}
                    </p>
                  ) : (
                    <span className="font-serif text-sm italic text-[var(--color-accent)]">
                      Quote Upon Request
                    </span>
                  )}
                </div>

                <div className="flex flex-col text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
                    Serves
                  </span>
                  <p className="flex items-center justify-end gap-1 text-xs font-semibold text-[var(--color-foreground)]">
                    <Users className="h-3.5 w-3.5 text-[var(--color-accent)]" />
                    <span>
                      {product.capacity === "50-plus" ? "50+ Guests" : `${product.capacity} Guests`}
                    </span>
                  </p>
                </div>
              </div>

              {/* Botón CTA */}
              <div className="mt-6 pt-1">
                <Link
                  href={
                    isAuthenticated
                      ? `/orders/new?productId=${product.id}`
                      : `/api/auth/signin?callbackUrl=/orders/new?productId=${product.id}`
                  }
                  className="group/btn flex w-full items-center justify-center gap-2 rounded-full border border-[var(--color-accent)] py-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)] transition-all duration-300 hover:bg-[var(--color-accent)] hover:text-white hover:shadow-md"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Place Order</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
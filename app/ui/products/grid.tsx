import "@/app/globals.css";

import Link from "next/link";
import { getServerSession } from "next-auth";
import { ShoppingBag, Users, Sparkles, ArrowRight } from "lucide-react";

import { fetchAllProductImages, fetchProducts } from "@/app/db/queries";
import { authOptions } from "@/app/lib/auth";
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
    {},
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
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => {
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
            className="group flex h-full flex-col overflow-hidden border border-black/20 bg-[#f4f0ea] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.12)]"
          >
            <div className="relative aspect-[5/4] w-full overflow-hidden bg-black">
              <CatalogImageCard
                categoryName={product.name}
                images={galleryImages}
                fallbackImageUrl={product.imageUrl}
              />
            </div>

            <div className="flex flex-grow flex-col justify-between p-6">
              <div>
                <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.24em] text-[#007C91]">
                  Handcrafted Arrangement
                </p>

                <h3 className="font-serif text-3xl font-medium leading-none text-[#252525] transition-colors duration-300 group-hover:text-[#007C91]">
                  {product.name}
                </h3>

                <p className="mt-4 line-clamp-2 text-sm leading-7 text-[#545454]">
                  {product.description || "Handcrafted artisanal arrangement."}
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-5 border-y border-black/15 py-5">
                <div>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#807973]">
                    Investment
                  </span>

                  {numericPrice > 0 ? (
                    <p className="mt-2 font-serif text-2xl font-medium text-[#252525]">
                      ${numericPrice.toFixed(2)}
                    </p>
                  ) : (
                    <p className="mt-2 font-serif text-lg italic text-[#007C91]">
                      Quote Upon Request
                    </p>
                  )}
                </div>

                <div className="border-l border-black/15 pl-5">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#807973]">
                    Serves
                  </span>

                  <p className="mt-2 flex items-center gap-2 text-sm font-medium text-[#252525]">
                    <Users
                      className="h-4 w-4 text-[#007C91]"
                      strokeWidth={1.4}
                    />

                    {product.capacity === "50-plus"
                      ? "50+ Guests"
                      : `${product.capacity} Guests`}
                  </p>
                </div>
              </div>

              <Link
                href={
                  isAuthenticated
                    ? `/orders/new?productId=${product.id}`
                    : `/api/auth/signin?callbackUrl=/orders/new?productId=${product.id}`
                }
                className="group/btn mt-6 inline-flex w-full items-center justify-center gap-3 bg-black px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition duration-300 hover:bg-[#00BCD4] hover:text-black"
              >
                <ShoppingBag className="h-4 w-4" strokeWidth={1.4} />

                <span>Place Order</span>

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}

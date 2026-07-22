import Link from "next/link";
import { asc } from "drizzle-orm";
import { getServerSession } from "next-auth";

import { db } from "@/db";
import { ProductImage } from "@/db/schema";
import { fetchProducts } from "@/db/queries";
import { authOptions } from "@/lib/auth";

import CatalogImageCard from "./catalog-image-card";

type ProductSize = "S" | "M" | "L" | "XL";

type GalleryImage = {
  id: string;
  imageUrl: string;
  fileName: string | null;
};

export default async function ProductsGrid() {
  const session = await getServerSession(authOptions);

  // Get the regular product/category information.
  const products = await fetchProducts();

  // Get every image uploaded through the admin catalog.
  const storedImages = await db
    .select({
      id: ProductImage.id,
      size: ProductImage.size,
      imageUrl: ProductImage.imageUrl,
      fileName: ProductImage.fileName,
    })
    .from(ProductImage)
    .orderBy(asc(ProductImage.fileName));

  // Group all uploaded images by product size.
  const imagesBySize: Record<ProductSize, GalleryImage[]> = {
    S: [],
    M: [],
    L: [],
    XL: [],
  };

  storedImages.forEach((image) => {
    imagesBySize[image.size].push({
      id: image.id,
      imageUrl: image.imageUrl,
      fileName: image.fileName,
    });
  });

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-[#faf7f2]/40 px-6 py-24">
        <h3 className="text-2xl font-serif italic text-[#2e2e2e]">
          No products available yet. Sorry.
        </h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => {
        // Match the product to images with the same "category" size.
        const galleryImages = imagesBySize[p.size as ProductSize] ?? [];

        return (
          <article
            key={p.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all duration-300 hover:shadow-xl"
          >
            <div className="relative aspect-5/4 w-full overflow-hidden bg-[#faf7f2]">
              <CatalogImageCard
                categoryName={p.name}
                images={galleryImages}
                fallbackImageUrl={p.imageUrl}
              />
            </div>

            {/* Product information */}
            <div className="flex flex-grow flex-col justify-between bg-white p-5">
              <div>
                <h3 className="line-clamp-1 font-serif text-xl leading-tight text-[#2e2e2e] transition-colors group-hover:text-[#c97c5d]">
                  {p.name}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#6f6f6f]">
                  {p.description}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-1">
                {/* Price */}
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">
                    Price
                  </span>

                  {Number(p.price) > 0 ? (
                    <p className="text-lg font-bold text-[#2e2e2e]">
                      ${Number(p.price).toFixed(2)}
                    </p>
                  ) : (
                    <span className="font-serif italic text-slate-700">
                      Upon request
                    </span>
                  )}
                </div>

                {/* Capacity */}
                <div className="flex flex-col text-right">
                  <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">
                    Capacity
                  </span>

                  <p className="text-sm leading-relaxed text-[#2e2e2e]">
                    {p.capacity === "50-plus" ? "+50" : p.capacity} people
                  </p>
                </div>
              </div>
            </div>

            {/* Order button */}
            <div className="px-8 pb-4">
              {!session?.user?.id ? (
                <Link
                  href="/api/auth/signin"
                  className="flex w-full items-center justify-center border p-2 font-serif text-xl leading-tight text-[#2e2e2e] transition-colors hover:text-[#c97c5d]"
                >
                  Place Order
                </Link>
              ) : (
                <Link
                  href={`/orders/new?arrangement=${p.capacity}`}
                  className="flex w-full items-center justify-center border p-2 font-serif text-xl leading-tight text-[#2e2e2e] transition-colors hover:text-[#c97c5d]"
                >
                  Place Order
                </Link>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

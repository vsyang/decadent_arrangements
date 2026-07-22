import Link from "next/link";
import { getServerSession } from "next-auth";

import {
  fetchAllProductImages,
  fetchProducts,
} from "@/db/queries";
import { authOptions } from "@/lib/auth";

import CatalogImageCard from "./catalog-image-card";

type GalleryImage = {
  id: string;
  imageUrl: string;
  fileName: string | null;
};

export default async function ProductsGrid() {
  const session = await getServerSession(authOptions);

  // Get every product/category created by the owner.
  const products = await fetchProducts();

  // Get every gallery image connected to a product.
  const storedImages = await fetchAllProductImages();

  // Group images dynamically by their product ID.
  const imagesByProduct = storedImages.reduce<
    Record<string, GalleryImage[]>
  >((groups, image) => {
    if (!groups[image.productId]) {
      groups[image.productId] = [];
    }

    groups[image.productId].push({
      id: image.id,
      imageUrl: image.imageUrl,
      fileName: image.fileName,
    });

    return groups;
  }, {});

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
      {products.map((product) => {
        // Get only the gallery images connected to this product.
        const galleryImages = imagesByProduct[product.id] ?? [];

        return (
          <article
            key={product.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white transition-shadow duration-300 hover:shadow-xl"
          >
            {/* Clickable product image and gallery modal */}
            <div className="relative aspect-5/4 w-full overflow-hidden bg-[#faf7f2]">
              <CatalogImageCard
                categoryName={product.name}
                images={galleryImages}
                fallbackImageUrl={product.imageUrl}
              />
            </div>

            {/* Product information */}
            <div className="flex flex-grow flex-col justify-between bg-white p-5">
              <div>
                <h3 className="line-clamp-1 font-serif text-xl leading-tight text-[#2e2e2e] transition-colors group-hover:text-[#c97c5d]">
                  {product.name}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#6f6f6f]">
                  {product.description}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-1">
                {/* Price */}
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">
                    Price
                  </span>

                  {Number(product.price) > 0 ? (
                    <p className="text-lg font-bold text-[#2e2e2e]">
                      ${Number(product.price).toFixed(2)}
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
                    {product.capacity === "50-plus"
                      ? "+50"
                      : product.capacity}{" "}
                    people
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
                  href={`/orders/new?productId=${product.id}`}
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


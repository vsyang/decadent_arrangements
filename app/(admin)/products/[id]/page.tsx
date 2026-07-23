// app/(admin)/products/[id]/page.tsx

import ProductImageManager from "@/components/admin/ProductImageManager";
import { fetchImagesByProductId, fetchProductById } from "@/db/queries";

import { ChevronRightIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { notFound } from "next/navigation";

// Defines the route parameter expected from /products/[id]
type ProductDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  // Get the product ID from the URL
  const { id: productId } = await params;

  // Retrieve the selected product from the database
  const product = await fetchProductById(productId);

  // Show the Next.js not-found page when the product does not exist
  if (!product) {
    notFound();
  }

  // Retrieve every image assigned to this product's size
  const images = await fetchImagesByProductId(product.id);

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      {/* Breadcrumb navigation */}
      <nav className="mb-8 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
        <Link
          href="/dashboard"
          className="flex items-center gap-1 transition-colors hover:text-[#c97c5d]"
        >
          Management
        </Link>

        <ChevronRightIcon className="h-3 w-3" />

        <Link
          href="/products"
          className="transition-colors hover:text-[#c97c5d]"
        >
          Catalog
        </Link>

        <ChevronRightIcon className="h-3 w-3" />

        <span className="max-w-50 truncate text-[#6b4f3f]">{product.name}</span>
      </nav>

      {/* Product information */}
      <section className="mb-10">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#c97c5d]">
          {product.name} Management
        </p>

        <h1 className="font-serif text-4xl italic leading-tight text-[#2e2e2e] md:text-5xl">
          {product.name}
        </h1>

        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-slate-100 px-4 py-2 font-medium text-slate-700">
            <b>Size:</b> {product.id}
          </span>

          <span className="rounded-full bg-slate-100 px-4 py-2 font-medium text-slate-700">
            <b>Capacity:</b> {product.capacity}
          </span>

          <span className="rounded-full bg-slate-100 px-4 py-2 font-medium text-slate-700">
            <b>Price:</b>{" "}
            {product.price === 0
              ? "Upon request"
              : `$${product.price.toFixed(2)}`}
          </span>
        </div>

        <div className="pt-2 flex flex-col gap-2 justify-center text-center">
          <Link
            href={`/products/${product.id}/edit`}
            className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Edit
          </Link>

          <Link
            href={`/products/${product.id}/delete`}
            className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Delete
          </Link>
        </div>
      </section>

      <div>
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#c97c5d]">
          {product.name} Image Management
        </p>

        <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500 pb-2">
          Add, replace, or delete images associated with the{" "}
          <span className="font-semibold text-slate-700">{product.name}</span>{" "}
          arrangement size.
        </p>

        {/* Interactive image upload and management component */}
        <ProductImageManager
          productId={product.id}
          productName={product.name}
          initialImages={images}
        />
      </div>
    </main>
  );
}

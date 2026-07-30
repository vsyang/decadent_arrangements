// app/(admin)/products/page.tsx

import "@/app/globals.css";

import type { Metadata } from "next";
import { TableSkeleton } from "@/app/ui/skeleton";
import { Suspense } from "react";
import { fetchProducts } from "@/app/db/queries";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import CatalogTableBody from "@/app/ui/admin/products/CatalogTableBody";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Catalog Overview",
};

export default async function CatalogManagementPage() {
  const products = await fetchProducts();

  return (
    <>
      {/* Breadcrumb navigation */}
      <nav className="flex flex-row items-center gap-2 bg-black px-6 pt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 sm:px-10 lg:pt-7">
        <Link
          href="/dashboard"
          className="flex items-center gap-1 transition-colors hover:text-white hover:underline hover:decoration-[#00BCD4] hover:decoration-2"
        >
          Management
        </Link>

        <ChevronRightIcon className="h-3 w-3" />

        <span className="max-w-50 truncate text-[#00BCD4]">Catalog</span>
      </nav>

      {/* Page heading */}
      <section className="relative bg-black px-6 pt-5 sm:px-10 lg:pt-7">
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.34em] text-[#00BCD4]">
          Management
        </p>

        <h1
          className={`${cormorant.className} text-4xl font-medium leading-none tracking-tight text-white sm:text-5xl lg:text-6xl`}
        >
          Catalog Overview
        </h1>

        <div className="mt-5 h-[2px] w-25 bg-[#00BCD4]/80" />

        <p className="py-4 text-sm text-white/70">
          Products priced at $0 are displayed as{" "}
          <span className="italic text-white/90">Upon request</span>.
        </p>
      </section>

      {/* New Product control */}
      <div className="flex w-full justify-end bg-black px-5 pb-2 sm:px-10 md:px-15">
        <Link
          href="/products/new"
          aria-label="Create a new product"
          className="flex h-10 shrink-0 items-center justify-center border border-[#00BCD4]/70 bg-[#00BCD4]/10 px-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#00BCD4] transition duration-300 hover:bg-[#00BCD4] hover:text-black md:px-5"
        >
          <span className="text-lg leading-none md:hidden">+</span>

          <span className="hidden md:inline">New Product</span>
        </Link>
      </div>

      {/* Catalog table */}
      <div className="m-auto w-full bg-black px-5 pb-5 pt-5 md:px-15 md:pb-14">
        <div className="w-full overflow-x-auto">
          <table className="w-full border-2 border-[#00BCD4] bg-white text-left text-sm text-slate-600">
            <thead className="border-b border-black bg-[#00BCD4]/15 text-sm uppercase text-slate-700">
              <tr>
                <th scope="col" className="px-6 py-4">
                  <span className="hidden md:inline">Name</span>
                  <span className="md:hidden">Name (Size)</span>
                </th>

                <th scope="col" className="hidden px-6 py-4 md:table-cell">
                  Capacity (Size)
                </th>

                <th scope="col" className="hidden px-6 py-4 md:table-cell">
                  Price (USD)
                </th>

                <th scope="col" className="px-6 py-4 text-center">
                  Details
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 font-medium">
              <Suspense fallback={<TableSkeleton rows={2} />}>
                <CatalogTableBody products={products} />
              </Suspense>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

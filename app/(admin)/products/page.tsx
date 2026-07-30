//app/(admin)/orders/page.tsx

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
      <nav className="bg-black px-6 pt-5 sm:px-10 lg:pt-7 flex flex-row items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
        <Link
          href="/dashboard"
          className="hover:underline hover:decoration-[#00BCD4] hover:decoration-2 transition-colors flex items-center gap-1"
        >
          Management
        </Link>

        <ChevronRightIcon className="w-3 h-3" />

        <span className="text-[#00BCD4] truncate max-w-50">Catalog</span>
      </nav>

      <div className="bg-black flex justify-between items-start">
        <div>
          <section className="relative px-6 pt-5 sm:px-10 lg:pt-7">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.34em] text-[#00BCD4]">
              Management
            </p>

            <h1
              className={`${cormorant.className} text-4xl font-medium leading-none tracking-tight text-white sm:text-5xl lg:text-6xl`}
            >
              Catalog Overview
            </h1>

            <div className="h-[2px] bg-[#00BCD4]/80 to-transparent w-25 mt-5" />

            <p className="text-sm text-white/70 py-4">
              Price set on 0 is stated as <i>Upon request</i>.
            </p>
          </section>
        </div>
        <Link
          href="/products/new"
          className="bg-white/5 h-10 w-10 [@media(min-width:805px)]:w-40 md:h-auto p-2 rounded-2xl shadow shadow-[#00BCD4] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-slate-100 text-white hover:text-[#00BCD4] flex items-center justify-center shrink-0 mr-10 mb-0 mt-auto ml-auto"
        >
          <span className="text-xl font-bold [@media(min-width:805px)]:hidden">
            +
          </span>
          <span className="hidden [@media(min-width:805px)]:inline">
            New product
          </span>
        </Link>
      </div>

      <div className="m-auto bg-black pt-5 w-full px-5 md:px-15 pb-5 md:pb-14">
        <table className="w-full text-left text-sm text-slate-600 bg-white border border-2 border-[#00BCD4]">
          <thead className="text-s uppercase text-slate-700 border-b border-black bg-[#00BCD4]/15">
            <tr>
              <th scope="col" className="px-6 py-4">
                <span className="hidden md:inline">Name</span>
                <span className="md:hidden">Name (Size)</span>
              </th>

              <th scope="col" className="hidden md:table-cell px-6 py-4">
                Capacity (Size)
              </th>

              <th scope="col" className="hidden md:table-cell px-6 py-4">
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
    </>
  );
}

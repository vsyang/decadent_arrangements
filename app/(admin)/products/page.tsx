//app/(admin)/orders/page.tsx

import "../../globals.css";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { TableSkeleton } from "@/components/skeleton";
import { Suspense } from "react";
import { fetchProducts } from "@/db/queries";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import { IsAdminProtection } from "../dashboard/adminAction";
import CatalogTableBody from "@/components/admin/CatalogTableBody";

export const metadata: Metadata = {
    title: 'Catalog Overview',
};

export default async function CatalogManagementPage() {


    const authorized = await IsAdminProtection();

    if (!authorized) {
        redirect("/not-found");
    }

    const products = await fetchProducts();

    return (
        <>

            <div className="max-w-7xl m-auto py-5">

                <nav className="mb-8 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">

                    <Link
                        href="/dashboard"
                        className="hover:text-[#c97c5d] transition-colors flex items-center gap-1"
                    >
                    Management
                    </Link>

                    <ChevronRightIcon className="w-3 h-3" />

                    <span className="text-[#6b4f3f] truncate max-w-50">Catalog</span>
                </nav>

                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-primary">Catalog Overview</h1>
                        <p className="text-muted mt-2">Manage products details here.</p>
                        <p className="text-muted mt-2"><b>Note:</b> Price set on 0 is stated as <i>Upon request</i>.</p>
                    </div>
                    <Link
                        href="/products/new"
                        className="bg-black h-10 w-10 md:w-40 md:h-auto p-2 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-slate-100 text-white hover:text-[#c97c5d] flex items-center justify-center shrink-0 mr-0 ml-auto"
                    >
                        <span className="md:hidden text-xl font-bold">+</span>
                        <span className="hidden md:inline">New product</span>
                    </Link>
                </div>
            
            </div>

            <div className="m-auto py-5">

                <table className="w-full text-left text-sm text-slate-600">

                    <thead className="text-s uppercase text-slate-700 border-b border-slate-200">
                    <tr>

                        <th scope="col" className="px-6 py-4">
                            <span className="hidden md:inline">Name</span>
                            <span className="md:hidden">Name (Size)</span>
                        </th>

                        <th scope="col" className="hidden md:table-cell px-6 py-4">Capacity (Size)</th>

                        <th scope="col" className="hidden md:table-cell px-6 py-4">Price (USD)</th>

                        <th scope="col" className="px-6 py-4 text-center">Details</th>

                    </tr>

                    </thead>

                    <tbody className="divide-y divide-slate-100 font-medium">

                        <Suspense 
                            fallback={ <TableSkeleton rows={2} /> } 
                        >
                            <CatalogTableBody products={products} />
                        </Suspense>

                    </tbody>

                </table>
            </div>
        </>
    );
}
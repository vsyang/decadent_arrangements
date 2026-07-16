import "../../../globals.css";
import type { Metadata } from "next";
import IsAdminProtection from "../actions"; // 👈 Importación relativa corregida
import { redirect } from "next/navigation";
import { TableSkeleton } from "@/components/skeleton";
import { Suspense } from "react";
import CatalogTableBody from "@/components/manage/CatalogTableBody";
import { fetchProducts } from "@/db/queries";

export const metadata: Metadata = {
    title: 'Catalog Admin',
};

export default async function CatalogManagementPage() {
    const authorized = await IsAdminProtection();

    // Si no es administrador verificado en la Whitelist, no se le permite ver el catálogo admin
    if (!authorized) {
        redirect("/not-found");
    }

    const products = await fetchProducts();

    return (
        <>
            <div className="max-w-7xl m-auto py-5">
                <h1 className="text-2xl font-bold text-primary">Catalog Overview</h1>
                <p className="text-muted mt-2">Manage products details here.</p>
                <p className="text-muted mt-2"><b>Note:</b> Price set on 0 is stated as <i>Upon request</i>.</p>
            </div>

            <div className="max-w-7xl m-auto py-5">
                <table className="w-full min-w-[800px] border-collapse text-left text-sm text-slate-600">
                    <thead className="text-s uppercase tracking-wider text-slate-700 border-b border-slate-200">
                        <tr>
                            <th scope="col" className="px-6 py-4">Name</th>
                            <th scope="col" className="hidden md:table-cell px-6 py-4">Capacity</th>
                            <th scope="col" className="px-6 py-4">Size</th>
                            <th scope="col" className="hidden md:table-cell px-6 py-4">Price (USD)</th>
                            <th scope="col" className="hidden md:table-cell px-6 py-4">Images</th>
                            <th scope="col" className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                        <Suspense fallback={<TableSkeleton rows={5} />}>
                            <CatalogTableBody products={products} />
                        </Suspense>
                    </tbody>
                </table>
            </div>
        </>
    );
}
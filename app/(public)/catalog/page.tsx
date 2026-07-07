// app/(public)/catalog/page.tsx

import "../../globals.css";

import type { Metadata } from "next";
import { Suspense } from "react";

import { ProductsGridSkeleton } from "@/components/skeleton";
import ProductsGrid from "@/components/products/grid";

export const metadata: Metadata = {
    title: 'Catalog',
};

export default function CatalogPage() {

    return (
        <>
            <div className="mx-auto max-w-7xl px-6 py-12">
                <h1 className="text-3xl font-bold text-primary">Our Arrangements</h1>
            </div>

            <div className="mx-auto max-w-7xl px-4">
                <Suspense 
                    fallback={
                        <ProductsGridSkeleton />
                    } 
                >
                    <ProductsGrid />
                </Suspense>
            </div>

        </>
    );
}
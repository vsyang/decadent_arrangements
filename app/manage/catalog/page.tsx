//app/(admin)/orders/page.tsx

import { fetchProducts } from "@/db/queries";
import "../../globals.css";
import type { Metadata } from "next";
import IsAdminProtection from "../actions";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: 'Catalog Admin',
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
                    <h1 className="text-2xl font-bold text-primary">Catalog Overview</h1>
                    <p className="text-muted mt-2">Manage products details here.</p>
                    <p className="text-muted mt-2"><b>Note:</b> Price set on 0 is stated as <i>Upon request</i>.</p>
                </div>
                
                <div className="max-w-7xl m-auto py-5">

                    {(!products || products.length === 0) ? (

                        <h3 className="text-2xl font-serif italic text-[#2e2e2e]">There are no arrangements yet. Add some.</h3>
                        
                    ) : (
                
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

                                {products?.map((p) => (
                                    
                                    <tr
                                        key={p.id}
                                        className="hover:bg-slate-50/70 transition-colors duration-200"
                                    >
                                        <td className="whitespace-nowrap px-6 py-4 font-semibold text-slate-900">{p.name}</td>

                                        <td className="hidden md:table-cell whitespace-nowrap px-6 py-4 text-slate-900">{p.capacity}</td>

                                        <td className="whitespace-nowrap px-6 py-4 text-slate-900">{p.size}</td>

                                        <td className="hidden md:table-cell whitespace-nowrap px-6 py-4 text-slate-900">{p.price.toFixed(2)}</td>

                                        <td className="hidden md:table-cell whitespace-nowrap px-6 py-4 text-center">
                                            <button 
                                                type="button"
                                                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-150 m-auto"
                                            >
                                                See Images
                                            </button>
                                        </td>

                                        <td>
                                        <button 
                                                type="button"
                                                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-150 m-auto"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                type="button"
                                                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-150 m-auto"
                                            >
                                                Delete
                                            </button>
                                        </td>

                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    )}
                </div>
            </>
        );
    }
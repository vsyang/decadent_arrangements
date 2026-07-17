import "../../../globals.css";

import type { Metadata } from "next";
import { fetchAllOrders, fetchAllOrdersByCustomerId } from "@/db/queries";
import OrdersTableBody from "@/components/admin/OrdersTableBody";
import { TableSkeleton } from "@/components/skeleton";
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { IsAdminProtection } from "../adminAction";

export const metadata: Metadata = {
    title: 'Orders Admin',
};

export default async function OrderManagementPage() {

    const session = await getServerSession(authOptions);

    const authorized = await IsAdminProtection();


    if (!session?.user?.id) {
        throw new Error("User ID not found.");
    }
    
    const orders = authorized
        ? await fetchAllOrders()
        : await fetchAllOrdersByCustomerId(session.user.id);

    const actAction = authorized
        ? true
        : false
    

    return (
        <>

            <div className="max-w-7xl m-auto py-5">

                <nav className="mb-8 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">

                    <Link
                        href="/admin"
                        className="hover:text-[#c97c5d] transition-colors flex items-center gap-1"
                    >
                    Management
                    </Link>
                    
                    <ChevronRightIcon className="w-3 h-3" />

                    <span className="text-[#6b4f3f] truncate max-w-50">Orders</span>
                </nav>

                {(authorized) ? (

                    <>
                        <h1 className="text-2xl font-bold text-primary">Orders Overview</h1>
                        <p className="text-muted mt-2">Manage products orders here.</p>
                        <p className="text-muted mt-2"><b>Note:</b> Some orders might appear as <Link href="#">Completed</Link> or <Link href="#">Canceled</Link>.</p>
                    </>

                    ) : (
                        <p className="text-muted mt-2">This are your orders up until now.</p>
                    )}

                <div className="max-w-7xl m-auto py-5">
                    

                    <table className="w-full min-w-[800px] border-collapse text-left text-sm text-slate-600">

                        <thead className="text-s uppercase tracking-wider text-slate-700 border-b border-slate-200">
                        <tr>

                            <th scope="col" className="px-6 py-4">Order Code</th>

                            <th scope="col" className="hidden md:table-cell px-6 py-4">Customer Name</th>

                            <th scope="col" className="px-6 py-4">Date of Event</th>

                            <th scope="col" className="hidden md:table-cell px-6 py-4">Arrang. Size</th>

                            <th scope="col" className="hidden md:table-cell px-6 py-4">Status</th>

                            <th scope="col" className="px-6 py-4">Details</th>

                            {(actAction) &&

                                <th scope="col" className="px-6 py-4">Actions</th>
                            }

                        </tr>

                        </thead>

                        <tbody className="divide-y divide-slate-100 font-medium">

                            <Suspense
                                fallback={ <TableSkeleton rows={2} /> } 
                                >
                                <OrdersTableBody ordersList={orders} actions={actAction} />
                            </Suspense>

                        </tbody>

                    </table>
                </div>
            </div>
        </>
    );
}

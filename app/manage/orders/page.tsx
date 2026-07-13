import "../../globals.css";

import type { Metadata } from "next";
import IsAdminProtection from "../actions";
import { fetchAllOrders, fetchAllOrdersByCustomerId } from "@/db/queries";
import OrdersTableBody from "@/components/manage/OrdersTableBody";
import { TableSkeleton } from "@/components/skeleton";
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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
    

    return (
        <>
            <div className="max-w-7xl m-auto py-5">

                <table className="w-full min-w-[800px] border-collapse text-left text-sm text-slate-600">

                    <thead className="text-s uppercase tracking-wider text-slate-700 border-b border-slate-200">
                    <tr>

                        <th scope="col" className="px-6 py-4">Order Code</th>

                        <th scope="col" className="hidden md:table-cell px-6 py-4">Customer Name</th>

                        <th scope="col" className="px-6 py-4">Date of Event</th>

                        <th scope="col" className="hidden md:table-cell px-6 py-4">Arrang. Size</th>

                        <th scope="col" className="hidden md:table-cell px-6 py-4">Status</th>

                        <th scope="col" className="px-6 py-4">Actions</th>

                    </tr>

                    </thead>

                    <tbody className="divide-y divide-slate-100 font-medium">

                        <Suspense
                            fallback={ <TableSkeleton rows={2} /> } 
                        >
                            <OrdersTableBody orders={orders} />
                        </Suspense>

                    </tbody>

                </table>
            </div>
        </>
    );
}

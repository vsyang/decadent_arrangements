import "../../globals.css";

import type { Metadata } from "next";
import { fetchAllOrders, fetchAllOrdersByCustomerId } from "@/db/queries";
import OrdersTableBody from "@/components/admin/OrdersTableBody";
import { TableSkeleton } from "@/components/skeleton";
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IsAdminProtection } from "../dashboard/adminAction";

export const metadata: Metadata = {
    title: 'Orders Overview',
};

export default async function OrderManagementPage() {
    const session = await getServerSession(authOptions);

    // Si no hay sesión activa, redirigimos limpiamente al home
    if (!session?.user?.id) {
        redirect("/");
    }

    const authorized = await IsAdminProtection();

    // Si es admin, ve todas las órdenes. Si es cliente, solo las suyas.
    const orders = authorized
        ? await fetchAllOrders()
        : await fetchAllOrdersByCustomerId(session.user.id);

    const actAction = authorized
        ? true
        : false
    

    return (
        <>

            <div className="max-w-7xl m-auto py-5">

                {(authorized) && 
                    <nav className="mb-8 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">

                        <Link
                            href="/dashboard"
                            className="hover:text-[#c97c5d] transition-colors flex items-center gap-1"
                        >
                        Management
                        </Link>

                        <ChevronRightIcon className="w-3 h-3" />

                        <span className="text-[#6b4f3f] truncate max-w-50">Orders</span>
                    </nav>
                }

                <div className="flex justify-between items-start gap-4">

                    {(authorized) ? (

                        <div>
                            <h1 className="text-2xl font-bold text-primary">Orders Overview</h1>
                            <p className="text-muted mt-2">Manage products orders here.</p>
                            <p className="text-muted mt-2"><b>Note:</b> Some orders might appear as <Link href="#">Completed</Link> or <Link href="#">Canceled</Link>.</p>
                        </div>

                        ) : (
                            <div>
                                <h1 className="text-3xl font-bold text-primary">My orders</h1>
                                <p className="text-muted mt-2">This are your orders up until now.</p>
                            </div>
                        )}

                        <Link
                            href="/orders/new"
                            className="bg-black h-10 w-10 md:w-40 md:h-auto p-2 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-slate-100 text-white hover:text-[#c97c5d] flex items-center justify-center shrink-0 mr-0 ml-auto"
                        >
                            <span className="md:hidden text-xl font-bold">+</span>
                            <span className="hidden md:inline">New Order</span>
                        </Link>
                    <div>
                    </div>

                </div>

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

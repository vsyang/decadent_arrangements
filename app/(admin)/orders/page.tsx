import "../../globals.css";

import type { Metadata } from "next";
import { fetchAllOrdersByCustomerId, fetchAllOrdersIncompleted } from "@/db/queries";
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
        ? await fetchAllOrdersIncompleted()
        : await fetchAllOrdersByCustomerId(session.user.id);
    

    return (
        <>

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

            <div className="flex justify-between items-start">

                {(authorized) ? (

                    <div>
                        <h1 className="text-2xl font-bold text-primary">Orders Overview</h1>
                        <p className="text-muted mt-2">Manage products orders here.</p>
                        
                        <p className="md:hidden">Remember: <span className="bg-gray-100 rounded-full py-1 px-2 text-black border-1">Pending</span> <span className="bg-yellow-500 rounded-full py-1 px-2 text-slate-100">Preparing</span></p>

                        <p className="text-muted mt-2"><b>Note:</b> Some orders might appear as completed <Link href={"/orders/completed"} className="font-bold text-black underline">HERE</Link>.</p>
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

            <div className="m-auto py-5">
                
                <table className="w-full text-left text-sm text-slate-600">

                    <thead className="text-s uppercase text-slate-700 border-b border-slate-200">
                    <tr>

                        <th scope="col" className="md:hidden px-1 py-4"></th>

                        <th scope="col" className="px-6 py-4 [@media(max-width:1000px)]:px-2">
                            <span className="[@media(min-width:880px)]:hidden">Order (Size)</span>
                            <span className="hidden [@media(min-width:880px)]:inline">Order Code</span>
                        </th>

                        <th scope="col" className="hidden md:table-cell px-6 py-4 [@media(max-width:1010px)]:hidden">Customer Name</th>

                        <th scope="col" className="px-6 py-4 [@media(max-width:1000px)]:px-2">
                            <span className="md:hidden">Date</span>
                            <span className="hidden md:inline">Date of Event</span>
                        </th>

                        <th scope="col" className="md:table-cell px-6 py-4 [@media(max-width:880px)]:hidden">Arrang. Size</th>

                        <th scope="col" className="hidden md:table-cell px-6 py-4">Status</th>

                        <th scope="col" className="px-6 py-4 [@media(max-width:1000px)]:px-2 text-center">Details</th>

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

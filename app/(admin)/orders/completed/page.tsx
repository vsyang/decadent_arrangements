import type { Metadata } from "next";
import { fetchAllOrdersCompletedFiltered } from "@/db/queries";
import OrdersTableBody from "@/components/admin/OrdersTableBody";
import { TableSkeleton } from "@/components/skeleton";
import { Suspense } from "react";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IsAdminProtection } from "../../dashboard/adminAction";
import Search from "@/components/admin/search";
import Pagination from "@/components/layout/pagination";
import ItemsPerPage from "@/components/layout/itemsPerPage";

export const metadata: Metadata = {
    title: 'Orders Overview',
};

export default async function CompletedOrdersPage(props: {
    searchParams?: Promise<{
      query?: string;
      page?: string;
      itemsPerPage?: string;
    }>;
  }) {

    const authorized = await IsAdminProtection();

    if (!authorized) {
        redirect("/not-found");
    }

    const minCardShow = 5;
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const itemsPerPage = Number(searchParams?.itemsPerPage) || minCardShow;

    const ordersRaw = await fetchAllOrdersCompletedFiltered(query, currentPage, itemsPerPage);

    const orders = ordersRaw.data;
    const totalOrders = ordersRaw.total;

    const totalPages =  Math.ceil(totalOrders / itemsPerPage);

    const firstOrderNum = (itemsPerPage * currentPage) - itemsPerPage + 1;
    const lastOrderNum = Math.min(itemsPerPage * currentPage, totalOrders);

    return (
        <>
            <nav className="mb-4 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">

            <Link
                href="/dashboard"
                className="hover:text-[#c97c5d] transition-colors flex items-center gap-1"
            >
                Management
            </Link>

                <ChevronRightIcon className="w-3 h-3" />

                <Link
                    href="/orders"
                    className="hover:text-[#c97c5d] transition-colors flex items-center gap-1"
                >
                Orders
                </Link>

                <ChevronRightIcon className="w-3 h-3" />

                <span className="text-[#6b4f3f] truncate max-w-50">Completed</span>
            </nav>

            <div>
                <h1 className="text-2xl font-bold text-primary">Completed Orders Overview</h1>
                <p className="text-muted mt-2">Manage products orders here.</p>

                <p className="md:hidden">Remember: <span className="bg-green-600 rounded-full py-1 px-2 text-slate-100">Delivered</span> <span className="bg-red-600 rounded-full py-1 px-2 text-slate-100">Cancelled</span></p>
            </div>

            
            <div className="w-full pt-2">
                <Search placeholder="Search by ORDER CODE: DA-00000" />
            </div>

            <div className="m-auto py-5">

                <div className="w-full flex justify-end px-5">
                    <p>
                    {firstOrderNum} - {lastOrderNum} of {totalOrders} Orders
                    </p>
                </div>
                
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
                            <OrdersTableBody orders={orders} isAdmin={true} />
                        </Suspense>

                    </tbody>
                </table>
            </div>
            <div className="flex flex-row justify-center items-center gap-4 px-8 w-full">
                <div className="flex justify-center">
                    <Pagination totalPages={totalPages} />
                </div>
                <div className="text-center">
                    <ItemsPerPage minCardShow={minCardShow} />
                </div>
            </div>
        </>
    );
}

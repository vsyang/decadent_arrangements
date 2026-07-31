import "@/app/globals.css";

import type { Metadata } from "next";
import { Suspense } from "react";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IsAdminProtection } from "../../dashboard/adminAction";
import { fetchAllOrdersCompletedFiltered } from "@/app/db/queries";
import Search from "@/app/ui/admin/search";
import { OrdersQuantitySkeleton, TableSkeleton } from "@/app/ui/skeleton";
import OrdersTableBody from "@/app/ui/admin/orders/OrdersTableBody";
import Pagination from "@/app/ui/helpers/pagination";
import ItemsPerPage from "@/app/ui/helpers/itemsPerPage";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Orders Overview",
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
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const itemsPerPage = Number(searchParams?.itemsPerPage) || minCardShow;

  const ordersRaw = await fetchAllOrdersCompletedFiltered(
    query,
    currentPage,
    itemsPerPage,
  );

  const orders = ordersRaw.data;
  const totalOrders = ordersRaw.total;

  const totalPages = Math.ceil(totalOrders / itemsPerPage);

  const firstOrderNum = itemsPerPage * currentPage - itemsPerPage + 1;
  const lastOrderNum = Math.min(itemsPerPage * currentPage, totalOrders);

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

        <Link
          href="/orders"
          className="hover:underline hover:decoration-[#00BCD4] hover:decoration-2 transition-colors flex items-center gap-1"
        >
          Orders
        </Link>

        <ChevronRightIcon className="w-3 h-3" />

        <span className="text-[#00BCD4] truncate max-w-50">Completed</span>
      </nav>

      <div>
        <section className="relative px-6 pt-5 sm:px-10 lg:pt-7">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.34em] text-[#00BCD4]">
            Orders Management
          </p>

          <h1
            className={`${cormorant.className} text-4xl font-medium leading-none tracking-tight text-white sm:text-5xl lg:text-6xl`}
          >
            Completed Orders Overview
          </h1>

          <div className="h-[2px] bg-[#00BCD4]/80 to-transparent w-25 mt-5" />

          <p className="text-sm text-white/70 py-4">
            Manage completed orders here.
          </p>

          {/* Mobile status legend */}
            <div className="mb-5 mt-1 flex items-center gap-3 md:hidden">
              <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/70">
                Status
              </span>

              <span className="border-l-2 border-green-500/70 bg-green-500/10 px-2.5 py-1 text-[10px] font-medium text-white">
                Delivered
              </span>

              <span className="border-l-2 border-red-500 bg-red-500/10 px-2.5 py-1 text-[10px] font-medium text-[#f0cf72]">
                Cancelled
              </span>
            </div>
        </section>
      </div>

      <div className="w-full pt-2 bg-black px-15">
        <Search placeholder="Search by ORDER CODE: DA-00000" />
      </div>

      <div className="m-auto py-5 w-full bg-black">
        <div className="flex justify-end w-full px-5 md:px-15">
          <Suspense
            key={firstOrderNum + lastOrderNum + totalOrders}
            fallback={<OrdersQuantitySkeleton />}
          >
            <p className="text-white">
              {firstOrderNum} - {lastOrderNum} of {totalOrders} Orders
            </p>
          </Suspense>
        </div>
        <div className="m-auto bg-black pt-5 w-full px-5 md:px-15 pb-2 md:pb-5">
          <table className="w-full text-left text-sm text-slate-600 bg-white border border-2 border-[#00BCD4]">
            <thead className="text-s uppercase text-slate-700 border-b border-black bg-[#00BCD4]/15">
              <tr>
                <th scope="col" className="md:hidden px-1 py-4"></th>

                <th
                  scope="col"
                  className="px-6 py-4 [@media(max-width:1000px)]:px-2"
                >
                  <span className="[@media(min-width:880px)]:hidden">
                    Order (Size)
                  </span>
                  <span className="hidden [@media(min-width:880px)]:inline">
                    Order Code
                  </span>
                </th>

                {authorized && (
                  <th
                    scope="col"
                    className="hidden md:table-cell px-6 py-4 [@media(max-width:1010px)]:hidden"
                  >
                    Customer Name
                  </th>
                )}

                <th
                  scope="col"
                  className="px-6 py-4 [@media(max-width:1000px)]:px-2"
                >
                  <span className="md:hidden">Date</span>
                  <span className="hidden md:inline">Date of Event</span>
                </th>

                <th
                  scope="col"
                  className="md:table-cell px-6 py-4 [@media(max-width:880px)]:hidden"
                >
                  Arrang. Size
                </th>

                <th scope="col" className="hidden md:table-cell px-6 py-4">
                  Status
                </th>

                <th
                  scope="col"
                  className="px-6 py-4 [@media(max-width:1000px)]:px-2 text-center"
                >
                  Details
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 font-medium">
              <Suspense
                key={query + currentPage + minCardShow + orders}
                fallback={<TableSkeleton />}
              >
                <OrdersTableBody orders={orders} isAdmin={authorized} />
              </Suspense>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gap-4 px-8 w-full bg-black pb-10">
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

import "@/app/globals.css";

import type { Metadata } from "next";
import {
  fetchAllOrdersByCustomerIdFiltered,
  fetchAllOrdersIncompletedFiltered,
} from "@/app/db/queries";
import { OrdersQuantitySkeleton, TableSkeleton } from "@/app/ui/skeleton";
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { redirect } from "next/navigation";
import Search from "@/app/ui/admin/search";
import OrdersTableBody from "@/app/ui/admin/orders/OrdersTableBody";
import Pagination from "@/app/ui/helpers/pagination";
import ItemsPerPage from "@/app/ui/helpers/itemsPerPage";
import { IsAdminProtection } from "../dashboard/adminAction";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Orders Overview",
};

export default async function OrderManagementPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    itemsPerPage?: string;
  }>;
}) {
  const session = await getServerSession(authOptions);

  // If there is no active session, redirect the user home.
  if (!session?.user?.id) {
    redirect("/");
  }

  const minCardShow = 5;
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const itemsPerPage = Number(searchParams?.itemsPerPage) || minCardShow;

  const authorized = await IsAdminProtection();

  // Admins see all incomplete orders.
  // Customers only see their own orders.
  const ordersRaw = authorized
    ? await fetchAllOrdersIncompletedFiltered(query, currentPage, itemsPerPage)
    : await fetchAllOrdersByCustomerIdFiltered(
        session.user.id,
        query,
        currentPage,
        itemsPerPage,
      );

  const orders = ordersRaw.data;
  const totalOrders = ordersRaw.total;

  const totalPages = Math.ceil(totalOrders / itemsPerPage);

  const firstOrderNum =
    totalOrders === 0 ? 0 : itemsPerPage * currentPage - itemsPerPage + 1;

  const lastOrderNum = Math.min(itemsPerPage * currentPage, totalOrders);

  return (
    <>
      {/* Admin breadcrumb navigation */}
      {authorized && (
        <nav className="flex flex-row items-center gap-2 bg-black px-6 pt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 sm:px-10 lg:pt-7">
          <Link
            href="/dashboard"
            className="flex items-center gap-1 transition-colors hover:text-white hover:underline hover:decoration-[#00BCD4] hover:decoration-2"
          >
            Management
          </Link>

          <ChevronRightIcon className="h-3 w-3" />

          <span className="max-w-50 truncate text-[#00BCD4]">Orders</span>
        </nav>
      )}

      {/* Page heading */}
      <div className="bg-black">
        {authorized ? (
          <section className="relative px-6 pt-5 sm:px-10 lg:pt-7">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.34em] text-[#00BCD4]">
              Management
            </p>

            <h1
              className={`${cormorant.className} text-4xl font-medium leading-none tracking-tight text-white sm:text-5xl lg:text-6xl`}
            >
              Orders Overview
            </h1>

            <div className="mt-5 h-[2px] w-25 bg-[#00BCD4]/80" />

            <p className="py-4 text-sm text-white/70">
              To view completed or cancelled orders{" "}
              <Link
                href="/orders/completed"
                className="font-bold text-[#00BCD4] transition-colors hover:text-white hover:underline"
              >
                VIEW HERE
              </Link>
              .
            </p>

            {/* Mobile status legend */}
            <div className="mb-5 mt-1 flex items-center gap-3 md:hidden">
              <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/70">
                Status
              </span>

              <span className="border-l-2 border-white/70 bg-white/10 px-2.5 py-1 text-[10px] font-medium text-white">
                Pending
              </span>

              <span className="border-l-2 border-[#d4a72c] bg-[#d4a72c]/10 px-2.5 py-1 text-[10px] font-medium text-[#f0cf72]">
                Preparing
              </span>
            </div>
          </section>
        ) : (
          <section className="relative px-6 pt-5 sm:px-10 lg:pt-7">
            <h1
              className={`${cormorant.className} text-4xl font-medium leading-none tracking-tight text-white sm:text-5xl lg:text-6xl`}
            >
              My Orders
            </h1>

            <div className="mt-5 h-[2px] w-25 bg-[#00BCD4]/80" />

            <p className="py-4 text-sm text-white/70">
              These are your current orders.
            </p>
          </section>
        )}
      </div>

      {/* Search and New Order controls */}
      <div className="flex w-full items-center gap-2 bg-black px-5 pb-2 sm:px-10 md:px-15">
        <div className="min-w-0 flex-1">
          <Search placeholder="Search by ORDER CODE: DA-00000" />
        </div>

        <Link
          href="/orders/new"
          aria-label="Create a new order"
          className="flex h-10 shrink-0 items-center justify-center border border-[#00BCD4]/70 bg-[#00BCD4]/10 px-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#00BCD4] transition duration-300 hover:bg-[#00BCD4] hover:text-black md:px-5"
        >
          <span className="text-lg leading-none md:hidden">+</span>

          <span className="hidden md:inline">New Order</span>
        </Link>
      </div>

      {/* Orders table section */}
      <div className="m-auto w-full bg-black py-5">
        {/* Order quantity */}
        <div className="flex w-full justify-end px-5 md:px-15">
          <Suspense
            key={`${firstOrderNum}-${lastOrderNum}-${totalOrders}`}
            fallback={<OrdersQuantitySkeleton />}
          >
            <p className="text-white">
              {firstOrderNum} - {lastOrderNum} of {totalOrders} Orders
            </p>
          </Suspense>
        </div>

        {/* Orders table */}
        <div className="m-auto w-full bg-black px-5 pb-2 pt-5 md:px-15 md:pb-5">
          <div className="w-full overflow-x-auto">
            <table className="w-full border-2 border-[#00BCD4] bg-white text-left text-sm text-slate-600">
              <thead className="border-b border-black bg-[#00BCD4]/15 text-sm uppercase text-slate-700">
                <tr>
                  <th scope="col" className="px-1 py-4 md:hidden" />

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
                      className="hidden px-6 py-4 md:table-cell [@media(max-width:1010px)]:hidden"
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
                    className="px-6 py-4 md:table-cell [@media(max-width:880px)]:hidden"
                  >
                    Arrang. Size
                  </th>

                  <th scope="col" className="hidden px-6 py-4 md:table-cell">
                    Status
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-4 text-center [@media(max-width:1000px)]:px-2"
                  >
                    Details
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 font-medium">
                <Suspense
                  key={`${query}-${currentPage}-${itemsPerPage}`}
                  fallback={<TableSkeleton />}
                >
                  <OrdersTableBody orders={orders} isAdmin={authorized} />
                </Suspense>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination controls */}
      <div className="flex w-full flex-row items-center justify-center gap-4 bg-black px-8 pb-10">
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

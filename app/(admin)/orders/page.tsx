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

  // Si no hay sesión activa, redirigimos limpiamente al home
  if (!session?.user?.id) {
    redirect("/");
  }

  const minCardShow = 5;
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const itemsPerPage = Number(searchParams?.itemsPerPage) || minCardShow;

  const authorized = await IsAdminProtection();

  // Si es admin, ve todas las órdenes. Si es cliente, solo las suyas.
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

  const firstOrderNum = itemsPerPage * currentPage - itemsPerPage + 1;
  const lastOrderNum = Math.min(itemsPerPage * currentPage, totalOrders);

  return (
    <>
      {authorized && (
        <nav className="bg-black px-6 pt-5 sm:px-10 lg:pt-7 flex flex-row items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
          <Link
            href="/dashboard"
            className="hover:underline hover:decoration-[#00BCD4] hover:decoration-2 transition-colors flex items-center gap-1"
          >
            Management
          </Link>

          <ChevronRightIcon className="w-3 h-3" />

          <span className="text-[#00BCD4] truncate max-w-50">Orders</span>
        </nav>
      )}

      <div className="bg-black flex justify-between items-start">
        {authorized ? (
          <div>
            <section className="relative px-6 pt-5 sm:px-10 lg:pt-7">
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.34em] text-[#00BCD4]">
                Management
              </p>

              <h1
                className={`${cormorant.className} text-4xl font-medium leading-none tracking-tight text-white sm:text-5xl lg:text-6xl`}
              >
                Orders Overview
              </h1>

              <div className="h-[2px] bg-[#00BCD4]/80 to-transparent w-25 mt-5" />

              <p className="text-sm text-white/70 py-4">
                Some orders might appear as completed{" "}
                <Link
                  href={"/orders/completed"}
                  className="font-bold text-[#00BCD4] hover:underline hover:devoration-white"
                >
                  HERE
                </Link>
                .
              </p>

              <p className="md:hidden">
                Remember:{" "}
                <span className="bg-gray-100 rounded-full py-1 px-2 text-black border-1">
                  Pending
                </span>{" "}
                <span className="bg-yellow-500 rounded-full py-1 px-2 text-slate-100">
                  Preparing
                </span>
              </p>
            </section>
          </div>
        ) : (
          <div>
            <section className="relative px-6 pt-5 sm:px-10 lg:pt-7">
              <h1
                className={`${cormorant.className} text-4xl font-medium leading-none tracking-tight text-white sm:text-5xl lg:text-6xl`}
              >
                My orders
              </h1>

              <div className="h-[2px] bg-[#00BCD4]/80 to-transparent w-25 mt-5" />

              <p className="text-sm text-white/70 py-4">
                This are your orders up until now.
              </p>
            </section>
          </div>
        )}

        <Link
          href="/orders/new"
          className="bg-white/5 h-10 w-10 [@media(min-width:805px)]:w-40 md:h-auto p-2 rounded-2xl shadow shadow-[#00BCD4] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-slate-100 text-white hover:text-[#00BCD4] flex items-center justify-center shrink-0 mr-10 mb-0 mt-auto ml-auto"
        >
          <span className="text-xl font-bold [@media(min-width:805px)]:hidden">
            +
          </span>
          <span className="hidden [@media(min-width:805px)]:inline">
            New Order
          </span>
        </Link>
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

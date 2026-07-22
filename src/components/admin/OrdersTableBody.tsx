import Link from "next/link";
import "../../../app/globals.css";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { OrderStatus } from "../../../app/(admin)/orders/actions";

type OrderRow = {
  id: string;
  idReadable: string;
  clientName: string;
  productName: string;
  capacity: string;
  eventDate: Date;
  status: OrderStatus;
};

type OrdersTableBodyProps = {
  orders: OrderRow[];
  isAdmin: boolean;
};

export default async function OrdersTableBody({
  orders,
  isAdmin,
}: OrdersTableBodyProps) {
  // Show a simple empty state when there are no orders.
  if (!orders || orders.length === 0) {
    return (
      <tr className="transition-colors duration-200 hover:bg-slate-50/70">
        <td className="px-6 py-4 font-semibold text-slate-900">
          No orders data yet.
        </td>

        <td className="hidden px-6 py-4 text-slate-900 md:table-cell" />

        <td className="px-6 py-4 text-slate-900" />
      </tr>
    );
  }

  return (
    <>
      {orders.map((order) => (
        <tr
          key={order.id}
          className="transition-colors duration-200 hover:bg-slate-50/70"
        >
          {/* Mobile status color bar */}
          <td
            className={`px-1 py-4 text-center uppercase md:hidden ${
              order.status === "preparing"
                ? "bg-yellow-500 text-black"
                : order.status === "delivered"
                  ? "bg-green-500 text-white"
                  : order.status === "cancelled"
                    ? "bg-red-500 text-white"
                    : "border border-slate-200 bg-gray-100"
            }`}
          />

          {/* Order confirmation code */}
          <td className="whitespace-nowrap px-6 py-4 font-semibold text-slate-900 [@media(max-width:1000px)]:px-2">
            <span className="[@media(min-width:880px)]:hidden">
              {order.idReadable} ({order.capacity})
            </span>

            <span className="hidden [@media(min-width:880px)]:inline">
              {order.idReadable}
            </span>
          </td>

          {/* Customer name is only shown to admins */}
          {isAdmin && (
            <td className="hidden whitespace-nowrap px-6 py-4 text-slate-900 md:table-cell [@media(max-width:1010px)]:hidden">
              {order.clientName}
            </td>
          )}

          {/* Event date */}
          <td className="whitespace-nowrap px-6 py-4 text-slate-900 [@media(max-width:1000px)]:px-2">
            {order.eventDate.toLocaleDateString()}
          </td>

          {/* Product and capacity */}
          <td className="hidden whitespace-nowrap px-6 py-4 text-slate-900 md:table-cell [@media(max-width:880px)]:hidden">
            <div className="font-medium">{order.productName}</div>

            <div className="text-sm text-slate-500">{order.capacity}</div>
          </td>

          {/* Order status */}
          <td className="hidden whitespace-nowrap px-6 py-4 text-left uppercase md:table-cell">
            <span
              className={`rounded-full px-2 py-1 ${
                order.status === "preparing"
                  ? "bg-yellow-500 text-black"
                  : order.status === "delivered"
                    ? "bg-green-500 text-white"
                    : order.status === "cancelled"
                      ? "bg-red-500 text-white"
                      : "border border-slate-200 bg-gray-100"
              }`}
            >
              {order.status}
            </span>
          </td>

          {/* Order details link */}
          <td className="m-auto whitespace-nowrap py-4 text-slate-900">
            <Link
              href={`/orders/${order.id}`}
              className="m-auto flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-black p-2 text-white transition-all duration-300 hover:-translate-y-1 hover:text-[#c97c5d] hover:shadow-xl"
              aria-label={`View order ${order.idReadable}`}
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </Link>
          </td>
        </tr>
      ))}
    </>
  );
}

import { fetchOrderById } from "@/db/queries";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IsAdminProtection } from "../../dashboard/adminAction";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";

export default async function OrderDetailsPage(props: { 
  params: Promise<{ id: string }>;
}) {
  const { id: orderId } = await props.params;

  const order = await fetchOrderById(orderId)

  if (!order) return notFound();

  const authorized = await IsAdminProtection();
  
  return (
    <main className="max-w-7xl m-auto py-5">

      {(authorized) ? (


      <>
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">

            <Link
              href="/dashboard"
              className="hover:text-[#c97c5d] transition-colors flex items-center gap-1"
            >
              Management
            </Link>
            <ChevronRightIcon className="w-3 h-3" />

            <Link
              href={`/orders`}
              className="hover:text-[#c97c5d] transition-colors"
            >
              Orders
            </Link>

            <ChevronRightIcon className="w-3 h-3" />

            <span className="text-[#6b4f3f] truncate max-w-50">{order.idReadable}</span>
            </nav>
      </>

      ) : (
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
 
        <Link
          href={`/orders`}
          className="hover:text-[#c97c5d] transition-colors"
        >
          My Orders
        </Link>
  
        <ChevronRightIcon className="w-3 h-3" />
  
        <span className="text-[#6b4f3f] truncate max-w-50">{order.idReadable}</span>
      </nav>
      )}

    
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

        <h1 className="text-2xl font-bold text-slate-900">
          Order #{order.idReadable}
        </h1>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          

          <div className="flex mt-2 flex-wrap gap-3 text-sm text-slate-600 my-2">

            <span>
              <b>Created:</b>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </span>

            {(authorized) && (
              <span>
                <b>Last updated:</b>{" "}
                {new Date(order.updatedAt).toLocaleDateString()}
              </span>
            )}

          </div>

          <div className="flex items-center gap-3">

            <label htmlFor="order-status" className="text-sm font-semibold text-slate-700">
                Status:
            </label>

            {(authorized) ? (
              
              <OrderStatusSelect orderId={order.id} currentStatus={order.status}
                />
            ) : (
              <span className={`w-full appearance-none rounded-lg border-3 py-2 px-2 text-sm font-semibold text-slate-700 shadow-sm ${
                order.status === "preparing" ? "border-yellow-500 bg-yellow-500/10" :
                order.status === "delivered" ? "border-green-500 bg-green-500/5" :
                order.status === "cancelled" ? "border-red-500 bg-red-500/5" : "bg-gray-100/50"}`
              }>{order.status}</span>
            )}

          </div>

        </div>
      </div>
    </main>
  );
}
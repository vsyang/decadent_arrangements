import { fetchOrderById } from "@/db/queries";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IsAdminProtection } from "../../dashboard/adminAction";

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

    

        <div className="flex flex-col">
          <h1 className="font-serif italic text-4xl md:text-5xl text-[#2e2e2e] leading-tight mb-2">
            {orderId}
          </h1>
        </div>
    </main>
  );
}
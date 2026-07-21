import Link from "next/link";
import "../../../app/globals.css";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";


export default async function OrdersTableBody({ 
  orders,
  isAdmin,
}: {
  orders: any;
  isAdmin: boolean;
}) {


  if (!orders || orders.length === 0) {
    return (
      <tr
      className="hover:bg-slate-50/70 transition-colors duration-200"
    >
        <td className="px-6 py-4 font-semibold text-slate-900">No orders data yet.</td>

        <td className="hidden md:table-cell px-6 py-4 text-slate-900"></td>

        <td className="px-6 py-4 text-slate-900"></td>

    </tr>
    );
  }

  
  return (

    <>
      {orders?.map((o: any) => (

      <tr
        key={o.id}
        className="hover:bg-slate-50/70 transition-colors duration-200"
      >
        <td className={`md:hidden px-1 py-4 text-center uppercase ${
              o.status === "preparing" ? "bg-yellow-500 text-black" :
              o.status === "delivered" ? "bg-green-500 text-white" :
              o.status === "cancelled" ? "bg-red-500 text-white" : "bg-gray-100 border-1"
            }`
          }>
        </td>

        <td className="whitespace-nowrap [@media(max-width:1000px)]:px-2 px-6 py-4 font-semibold text-slate-900">
          <span className="[@media(min-width:880px)]:hidden ">{o.idReadable} ({o.size})</span>
          <span className="hidden [@media(min-width:880px)]:inline">{o.idReadable}</span>
        </td>
        
        {(isAdmin) && 
          <td className="hidden md:table-cell whitespace-nowrap px-6 py-4 text-slate-900 [@media(max-width:1010px)]:hidden">{o.clientName}</td>
        }

        <td className="whitespace-nowrap px-6 [@media(max-width:1000px)]:px-2 py-4 text-slate-900">{o.eventDate.toLocaleDateString()}</td>

        <td className="[@media(max-width:880px)]:hidden md:table-cell whitespace-nowrap px-6 py-4 text-slate-900">{o.size}</td>

        <td className="hidden md:table-cell whitespace-nowrap px-6 py-4 text-left uppercase">
          <span className={`rounded-full py-1 px-2 ${
              o.status === "preparing" ? "bg-yellow-500 text-black" :
              o.status === "delivered" ? "bg-green-500 text-white" :
              o.status === "cancelled" ? "bg-red-500 text-white" : "bg-gray-100 border-1"
            }`
          }>
            {o.status?.slice(0, 4)}
          </span>
        </td>

        <td className="whitespace-nowrap py-4 text-slate-900 m-auto">
          <Link
          key={o.id}
          href={`/orders/${o.id}`}
          className="bg-black h-10 w-10 p-2 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-slate-100 text-white hover:text-[#c97c5d] flex items-center justify-center shrink-0 m-auto"
          >
            <MagnifyingGlassIcon className="h-6 w-6 text-xl font-bold" />
          </Link>
        </td>
      </tr>
      ))}

    </>
  );
}
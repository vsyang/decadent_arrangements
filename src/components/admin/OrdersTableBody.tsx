import Link from "next/link";
import "../../../app/globals.css";


export default async function OrdersTableBody(props: { 
  ordersList: any;
  actions: boolean;
 }) {

  const orders = props.ordersList;

  if (!orders || orders.length === 0) {
    return (
      <tr
      className="hover:bg-slate-50/70 transition-colors duration-200"
    >
        <td className="whitespace-nowrap px-6 py-4 font-semibold text-slate-900">No orders data yet.</td>

        <td className="hidden md:table-cell whitespace-nowrap px-6 py-4 text-slate-900"></td>

        <td className="whitespace-nowrap px-6 py-4 text-slate-900"></td>

        <td className="hidden md:table-cell whitespace-nowrap px-6 py-4 text-slate-900"></td>

        <td className="hidden md:table-cell whitespace-nowrap px-6 py-4 text-center"></td>

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
        <td className="whitespace-nowrap px-6 py-4 font-semibold text-slate-900">{o.idReadable}</td>

        <td className="hidden md:table-cell whitespace-nowrap px-6 py-4 text-slate-900">{o.clientName}</td>

        <td className="whitespace-nowrap px-6 py-4 text-slate-900">{o.eventDate.toLocaleDateString()}</td>

        <td className="hidden md:table-cell whitespace-nowrap px-6 py-4 text-slate-900">{o.size}</td>

        <td className="hidden md:table-cell whitespace-nowrap px-6 py-4 text-center">{o.status}</td>

        <td className="whitespace-nowrap px-6 py-4 text-slate-900">
          <Link
          key={o.id}
          href={`/admin/orders/${o.id}`}
          className="group text-center bg-black p-2 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-slate-100 w-full text-white"
          > See more
          </Link>
        </td>

        {(props.actions) &&

        <td>
          <button 
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-150 m-auto"
            >
          Edit
          </button>

          <button 
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-150 m-auto"
            >
          Delete
          </button>
        </td>

          }
      </tr>
      ))}

    </>
  );
}
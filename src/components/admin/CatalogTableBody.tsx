import Link from "next/link";
import "../../../app/globals.css";
import { ProductInput } from "../../../app/(admin)/dashboard/actions";



export default async function CatalogTableBody({ products }: { products: ProductInput[] }) {


  if (!products || products.length === 0) {
    return (
      <tr
      className="hover:bg-slate-50/70 transition-colors duration-200"
    >
        <td className="whitespace-nowrap px-6 py-4 font-semibold text-slate-900">No arrangement data yet. Add some.</td>

        <td className="hidden md:table-cell whitespace-nowrap px-6 py-4 text-slate-900"></td>

        <td className="whitespace-nowrap px-6 py-4 text-slate-900"></td>

        <td className="hidden md:table-cell whitespace-nowrap px-6 py-4 text-slate-900">0.00</td>

        <td className="hidden md:table-cell whitespace-nowrap px-6 py-4 text-center"></td>

        <td></td>

    </tr>
    );
  }

  
  return (

    <>
      {products?.map((p: ProductInput) => (

      <tr
        key={p.id}
        className="hover:bg-slate-50/70 transition-colors duration-200"
      >
        <td className="whitespace-nowrap px-6 py-4 font-semibold text-slate-900">{p.name}</td>

        <td className="hidden md:table-cell whitespace-nowrap px-6 py-4 text-slate-900">{p.capacity}</td>

        <td className="whitespace-nowrap px-6 py-4 text-slate-900">{p.size}</td>

        <td className="hidden md:table-cell whitespace-nowrap px-6 py-4 text-slate-900">{p.price.toFixed(2)}</td>

        <td className="whitespace-nowrap px-6 py-4 text-slate-900">
          <Link
          href={`/products/${p.id}`}
          className="group text-center bg-black p-2 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-slate-100 w-full text-white"
          > See more
          </Link>
        </td>
      </tr>
      ))}

    </>
  );
}
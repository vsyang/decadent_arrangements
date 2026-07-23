import Link from "next/link";
import "../../../app/globals.css";
import { ProductInput } from "../../../app/(admin)/products/actions";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

export default async function CatalogTableBody({
  products,
}: {
  products: ProductInput[];
}) {
  if (!products || products.length === 0) {
    return (
      <tr className="hover:bg-slate-50/70 transition-colors duration-200">
        <td className="px-6 py-4 font-semibold text-slate-900">
          No arrangement data yet. Add some.
        </td>

        <td className="hidden md:table-cell whitespace-nowrap px-6 py-4 text-slate-900"></td>

        <td className="hidden md:table-cell px-6 py-4 text-slate-900"></td>

        <td className="hidden md:table-cell whitespace-nowrap px-6 py-4 text-slate-900">
          0.00
        </td>

        <td className="whitespace-nowrap px-6 py-4 text-center"></td>
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
          <td className=" px-6 py-4 font-semibold text-slate-900">
            <span className="hidden md:inline">{p.name}</span>
            <span className="md:hidden">{p.name}</span>
          </td>

          <td className="hidden md:table-cell px-6 py-4 text-slate-900">
            {p.capacity}{" "}
          </td>

          <td className="hidden md:table-cell px-6 py-4 text-slate-900">
            {p.price.toFixed(2)}
          </td>

          <td className="whitespace-nowrap py-4 text-slate-900">
            <Link
              href={`/products/${p.id}`}
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

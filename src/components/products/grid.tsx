import Image from "next/image";
import Link from "next/link";
import { fetchProducts } from "@/db/queries";

export default async function ProductsGrid() {
  const products = await fetchProducts();

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-6 bg-[#faf7f2]/40 rounded-3xl border-2 border-dashed border-slate-200">

        <h3 className="text-2xl font-serif italic text-[#2e2e2e]">No product available yet. Sorry.</h3>

      </div>
    );
  }

  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products?.map((p) => (
        <span
          key={p.id}
          className="group flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-slate-100"
        >
          <div className="relative aspect-5/4 w-full bg-[#faf7f2] overflow-hidden">
            {p.imageUrl ? (
              <Image
                src={p.imageUrl}
                alt={p.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-xs text-slate-400 font-serif italic">No image available</span>
              </div>
            )}

          </div>

          <div className="p-5 flex flex-col flex-grow justify-between bg-white">
            <div>
              <h3 className="text-[#2e2e2e] font-serif text-xl leading-tight group-hover:text-[#c97c5d] transition-colors line-clamp-1">
                {p.name}
              </h3>
              <p className="text-[#6f6f6f] text-sm mt-2 line-clamp-2 leading-relaxed">
                {p.description}
              </p>
            
            </div>

            <div className="mt-4 border-t border-slate-100 flex items-center justify-between pt-1">
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase tracking-tighter text-slate-400 font-bold">Price</span>

                {p.price > 0 ? (
                  <p className="text-[#2e2e2e] font-bold text-lg">${p.price}</p>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="text-s text-slate-700 font-serif italic">Upon request</span>
                  </div>
                )}

              </div>

              <div className="flex flex-col text-right">
                <span className="text-[10px] uppercase tracking-tighter text-slate-400 font-bold">Capacity</span>
                <p className="text-[#2e2e2e] text-sm line-clamp-2 leading-relaxed">
                {p.capacity == "50-plus" ? (
                  <span>+50 </span>
                ) : (
                  <span>{p.capacity} </span>
                )}
                people
                </p>
              </div>
              
            </div>
          </div>

          <div className="pb-4 px-8">

            <Link
              href={`/order?arrangement=${p.capacity}`}
              className="flex w-full items-center justify-center text-sm line-clamp-2 border text-[#2e2e2e] font-serif text-xl leading-tight hover:text-[#c97c5d] transition-colors line-clamp-1 p-2"
            >
              Place Order
            </Link>
          </div>

        </span>
      ))}
    </div>
  );
}
import { fetchProductById } from "@/db/queries";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProductDetailsPage(props: { 
  params: Promise<{ id: string }>;
}) {
  const { id: productId } = await props.params;

  const product = await fetchProductById(productId)

  if (!product) return notFound();


  return (
    <main className="max-w-7xl m-auto py-5">

<nav className="mb-8 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">

<Link
  href="/manage"
  className="hover:text-[#c97c5d] transition-colors flex items-center gap-1"
>
  Management
</Link>
<ChevronRightIcon className="w-3 h-3" />

<Link
  href={`/manage/catalog`}
  className="hover:text-[#c97c5d] transition-colors"
>
  Catalog
</Link>

<ChevronRightIcon className="w-3 h-3" />

<span className="text-[#6b4f3f] truncate max-w-50">{product.name}</span>
</nav>

        <div className="flex flex-col">
          <h1 className="font-serif italic text-4xl md:text-5xl text-[#2e2e2e] leading-tight mb-2">
            Habemus Pagina
          </h1>
        </div>


    </main>
  );
}
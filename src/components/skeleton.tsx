// const shimmer =
//   "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
      {/* Image */}
      <div className="relative aspect-[5/4] w-full bg-slate-200 animate-pulse" />

      {/* Body */}
      <div className="p-3 flex flex-col gap-4">
        <div>
          {/* Name */}
          <div className="h-6 w-3/4 bg-slate-200 rounded-lg animate-pulse" />
          {/* Description (2 lines) */}
          <div className="mt-3 h-3 w-full bg-slate-100 rounded-md animate-pulse" />
          <div className="mt-2 h-3 w-5/6 bg-slate-100 rounded-md animate-pulse" />
        </div>

        {/* Footer*/}
        <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-2 w-10 bg-slate-100 rounded animate-pulse" />
            <div className="h-4 w-16 bg-slate-200 rounded animate-pulse" />
          </div>
          <div className="text-right space-y-2">
            <div className="h-2 w-10 bg-slate-100 rounded animate-pulse ml-auto" />
            <div className="h-3 w-20 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="p-4">
          <div className="h-6 w-full bg-slate-200 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// Grid
export function ProductsGridSkeleton() {
  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <ProductCardSkeleton /> {/* S */}
      <ProductCardSkeleton /> {/* M */}
      <ProductCardSkeleton /> {/* L */}
      <ProductCardSkeleton /> {/* XL */}
    </div>
  );
}

export function TableSkeleton({ rows = 2 }: { rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="border-b border-slate-100">
          <td className="px-6 py-5">
            <div className="h-5 w-40 rounded bg-slate-200 animate-pulse" />
          </td>

          <td className="px-6 py-5 hidden md:table-cell">
            <div className="h-5 w-16 rounded bg-slate-200 animate-pulse" />
          </td>

          <td className="px-6 py-5 hidden md:table-cell">
            <div className="h-9 w-28 rounded-lg bg-slate-200 animate-pulse" />
          </td>

          <td className="px-6 py-5">
            <div className="flex gap-3">
              <div className="h-9 w-20 rounded-lg bg-slate-200 animate-pulse" />
              <div className="h-9 w-20 rounded-lg bg-slate-200 animate-pulse" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}

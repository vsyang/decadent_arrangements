import { ClipboardList, Package } from "lucide-react";
import { Cormorant_Garamond } from "next/font/google";
import Link from "next/link";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export function DashboardSection({
  title,
  description,
  managementSection,
  hrefLink,
}: {
  title: string;
  description: string;
  managementSection: string;
  hrefLink: string;
}) {
  return (
    <>
      <Link href={hrefLink}>
        <div className="relative bg-white/8 px-6 pt-8 pb-10 sm:px-10 lg:pb-14 w-full md:w-100 m-auto shadow shadow-[#00BCD4] border-1 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
          <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.34em] text-[#00BCD4]">
            {`${managementSection} Management`}
          </p>

          <h1
            className={`${cormorant.className} text-3xl font-medium leading-none tracking-tight text-white sm:text-4xl lg:text-5xl`}
          >
            {title}
          </h1>

          <p className="mt-6 text-sm text-white/70">{description}</p>

          <div className="h-[2px] bg-[#00BCD4]/80 to-transparent w-25 mt-5" />

          {title === "Catalog" ? (
            <Package className="w-45 h-45 text-[#00BCD4]/50 absolute -right-10 -bottom-22 md:-bottom-18 stroke-[0.5]" />
          ) : (
            <ClipboardList className="w-35 h-35 text-[#00BCD4]/50 absolute -right-8 -bottom-13 md:-bottom-5 stroke-[0.5]" />
          )}
        </div>
      </Link>
    </>
  );
}

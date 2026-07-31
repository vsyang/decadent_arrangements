//app/(admin)/dashboard/page.tsx

import "@/app/globals.css";

import { redirect } from "next/navigation";
import { IsAdminProtection } from "./adminAction";
import { Cormorant_Garamond } from "next/font/google";
import { DashboardSection } from "@/app/ui/admin/DashboardSection";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default async function DashboardPage() {
  const authorized = await IsAdminProtection();

  if (!authorized) {
    redirect("/orders");
  }

  return (
    <>
      <div className="bg-black">
        <section className="relative px-6 pt-10 sm:px-10 lg:pt-14">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.34em] text-[#00BCD4]">
            Decadent Arrangements
          </p>

          <h1
            className={`${cormorant.className} text-4xl font-medium leading-none tracking-tight text-white sm:text-5xl lg:text-6xl`}
          >
            Management Dashboard
          </h1>

          <div className="h-[2px] bg-[#00BCD4]/80 to-transparent w-25 mt-5" />

          <p className="text-sm text-white/70 p-4">
            Manage your catalog and customer orders.
          </p>
        </section>
        <div className="flex flex-col md:flex-row w-full justify-between bg-black pt-6 pb-15">
          <div className="text-xl text-primary flex-1 p-5">
            <DashboardSection
              title="Catalog"
              description="Add new arrangements, update product details, adjust pricing, and manage the items displayed in your public catalog."
              managementSection="Product"
              hrefLink="/products"
            />
          </div>
          <div className="text-xl text-primary flex-1 p-5">
            <DashboardSection
              title="Orders"
              description="Review customer orders, update their status, manage special requests, and keep every arrangement organized."
              managementSection="Product"
              hrefLink="/orders"
            />
          </div>
        </div>
      </div>
    </>
  );
}

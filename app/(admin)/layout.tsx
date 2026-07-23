// app/(admin)/layout.tsx

import { IsAdminProtection } from "./dashboard/adminAction";
import { Sidebar } from "@/components/admin/Sidebar";
import { SidebarClient } from "@/components/admin/SidebarClient";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authorized = await IsAdminProtection();

  return (
    <>
      <div className="bg-background md:flex md:flex-row w-full">
        <div className="md:flex md:border-r md:border-border md:bg-background md:min-h-screen md:items-start">
          {authorized ? <Sidebar /> : <SidebarClient />}
        </div>

        <div className="w-full md:pr-6">
          <main className="px-4 py-6 md:px-8 md:py-8 w-full">{children}</main>
        </div>
      </div>
    </>
  );
}

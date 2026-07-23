// app/(admin)/products/layout.tsx

import { IsAdminProtection } from "../dashboard/adminAction";
import { redirect } from "next/navigation";

export default async function CatalogManagementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authorized = await IsAdminProtection();

  if (!authorized) {
    redirect("/not-found");
  }

  return <>{children}</>;
}

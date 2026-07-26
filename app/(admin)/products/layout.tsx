// app/(admin)/products/layout.tsx

import { redirect } from "next/navigation";
import { IsAdminProtection } from "../dashboard/adminAction";

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

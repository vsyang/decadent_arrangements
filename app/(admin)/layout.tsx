// app/(admin)/layout.tsx 

import { IsAdminProtection } from "./dashboard/adminAction";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { SidebarClient } from "@/components/layout/SidebarClient";

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const authorized = await IsAdminProtection();
    
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-background">

                {(authorized) ? (
                    <Sidebar />
                ) : (
                    <SidebarClient />
                )}

                <div className="md:pl-64">
                    <main className="px-4 py-6 md:px-8 md:py-8">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
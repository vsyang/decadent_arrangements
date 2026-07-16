import { redirect } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import IsAdminProtection from "./admin/actions"; // 👈 Importamos tu protección unificada

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
    const isAuthorized = await IsAdminProtection();

    if (!isAuthorized) {
        redirect("/");
    }

    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar */}
            <aside className="hidden md:block w-64 shrink-0 border-r border-border bg-card">
                <Sidebar />
            </aside>

            <div className="flex flex-1 flex-col">
                {/* HEADER MOBILE */}
                <header className="flex h-14 items-center gap-4 border-b border-border bg-background px-6 md:hidden">
                    <span className="font-semibold text-primary">Admin Dashboard</span>
                </header>

                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
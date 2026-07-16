// app/(admin)/layout.tsx
import { Sidebar } from "@/components/layout/Sidebar";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-background">
            <Sidebar />
            <div className="md:pl-64">
                <main className="px-4 py-6 md:px-8 md:py-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
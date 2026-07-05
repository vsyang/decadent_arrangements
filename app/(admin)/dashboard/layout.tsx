import { Sidebar } from "@/components/layout/Sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-muted/10">
            <Sidebar />
            <div className="pl-64">
                <header className="flex h-16 items-center border-b border-border bg-background px-8">
                    <h2 className="text-sm font-semibold text-primary">Management Workspace</h2>
                </header>
                <main className="p-8">{children}</main>
            </div>
        </div>
    );
}
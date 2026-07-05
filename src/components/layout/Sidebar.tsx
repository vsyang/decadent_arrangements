import Link from "next/link";

export function Sidebar() {
    return (
        <aside className="fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-border bg-background">
            <div className="flex h-16 items-center px-6 border-b border-border">
                <Link href="/dashboard" className="text-lg font-bold tracking-tight text-accent">
                    DA Dashboard
                </Link>
            </div>

            <nav className="flex-1 space-y-1 px-4 py-6 text-sm font-medium">
                <Link
                    href="/dashboard"
                    className="flex items-center rounded-lg px-3 py-2 text-primary hover:bg-muted/30 transition-colors"
                >
                    Orders Overview
                </Link>
                <Link
                    href="/catalog" /* Enlace temporal o de retorno */
                    className="flex items-center rounded-lg px-3 py-2 text-muted hover:bg-muted/30 hover:text-foreground transition-colors"
                >
                    View Live Catalog
                </Link>
            </nav>

            <div className="p-4 border-t border-border">
                <Link
                    href="/"
                    className="flex w-full justify-center rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-muted hover:bg-muted/20 transition-colors"
                >
                    Exit Admin
                </Link>
            </div>
        </aside>
    );
}
import Link from "next/link";

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <Link href="/" className="text-xl font-bold tracking-tight text-primary">
                    Decadent Arrangements
                </Link>

                <nav className="flex items-center gap-6 text-sm font-medium">
                    <Link href="/catalog" className="text-muted hover:text-foreground transition-colors">
                        Catalog
                    </Link>
                    <Link href="/contact" className="text-muted hover:text-foreground transition-colors">
                        Contact & Order
                    </Link>
                    <Link
                        href="/dashboard"
                        className="rounded-full bg-secondary px-4 py-1.5 text-xs text-secondary-foreground font-semibold hover:opacity-90 transition-opacity"
                    >
                        Admin Panel
                    </Link>
                </nav>
            </div>
        </header>
    );
}
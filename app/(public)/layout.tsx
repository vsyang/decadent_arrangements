import { Navbar } from "@/components/layout/Navbar";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <footer className="border-t border-border bg-background py-6 text-center text-xs text-muted">
                &copy; {new Date().getFullYear()} Decadent Arrangements. All rights reserved.
            </footer>
        </div>
    );
}

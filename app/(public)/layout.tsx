// app/(public)/layout.tsx
import { Navbar } from "@/components/layout/Navbar";

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 pb-16 md:pb-0">
                {children}
            </main>
            <footer className="mt-6 border-t border-border bg-background py-6 text-center text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} Decadent Arrangements. All rights reserved.
            </footer>
        </div>
    );
}
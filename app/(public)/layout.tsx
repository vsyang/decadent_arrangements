// app/(public)/layout.tsx
import { Navbar } from "@/components/layout/Navbar";
export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 pb-16 md:pb-0">
                {children}
            </main>
        </div>
    );
}
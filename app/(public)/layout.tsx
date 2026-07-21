// app/(public)/layout.tsx
export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative flex min-h-screen flex-col">
            <main className="flex-1 pb-16 md:pb-0">
                {children}
            </main>
        </div>
    );
}
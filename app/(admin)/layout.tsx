// app/(admin)/layout.tsx
import "@/app/globals.css";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="bg-background md:flex md:flex-row w-full">
        <div className="w-full md:pr-6">
          <main className="px-4 py-6 md:px-8 md:py-8 w-full">{children}</main>
        </div>
      </div>
    </>
  );
}

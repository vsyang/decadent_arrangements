// app/(admin)/layout.tsx
import "@/app/globals.css";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="bg-black md:flex md:flex-row w-full">
        <main className="w-full">{children}</main>
      </div>
    </>
  );
}

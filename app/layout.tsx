// app/layout.tsx
import "@/app/globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "./ui/helpers/Navbar";
import Footer from "./ui/helpers/Footer";
import { IsAdminVerification } from "./(admin)/dashboard/adminAction";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Decadent Arrangements",
    default: "Decadent Arrangements",
  },
  description:
    "The website is designed to showcase custom arrangements, gifts, and special occasion charcuterie boards in a clean and professional way",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const isAdmin = await IsAdminVerification();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-background text-foreground flex flex-col min-h-full">
        <Navbar isAuthenticated={!!session?.user} isAdmin={isAdmin} />

        <div>{children}</div>
        <Footer />
      </body>
    </html>
  );
}

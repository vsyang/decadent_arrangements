import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

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
  description: "The website is designed to showcase custom arrangements, gifts, and special occasion charcuterie boards in a clean and professional way",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        
        <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <footer className="mt-6 border-t border-border bg-background py-6 text-center text-xs text-muted">
                &copy; {new Date().getFullYear()} Decadent Arrangements. All rights reserved.
            </footer>
        </div>

      </body>
    </html>
  );
}

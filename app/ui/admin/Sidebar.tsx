"use client";

import "@/app/globals.css";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarButton } from "./SidebarButton";

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const getLinkClass = (href: string) => {
    const isActive =
      href === "/" ? pathname === "/" : pathname.startsWith(href);

    return `flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "bg-accent/10 text-accent font-semibold"
        : "hover:bg-muted/40 hover:text-foreground"
    }`;
  };

  return (
    <>
    <div onClick={() => setIsOpen(!isOpen)}>
      <SidebarButton />
    </div>

      {/* OVERLAY BACKDROP */}
      {isOpen && (
        <div
          className="fixed inset-0 z-66 bg-[#f4f0ea]/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-99 w-64 flex flex-col justify-between bg-background transition-transform duration-300 ease-in-out pt-6 md:translate-x-0 md:top-0 md:z-0 md:sticky md:h-[calc(100vh-68px)] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="space-y-6 px-4 flex-1">
          {/* ADMIN OPERATIONS */}
          <div className="space-y-2">
            <span className="px-3 text-sm font-bold uppercase block">
              Admin Operations
            </span>
            <div className="space-y-1">
              <Link
                href="/orders"
                className={getLinkClass("/orders")}
                onClick={() => setIsOpen(false)}
              >
                Orders Management
              </Link>
              <Link
                href="/products"
                className={getLinkClass("/products")}
                onClick={() => setIsOpen(false)}
              >
                Catalog Management
              </Link>
            </div>
          </div>

          {/* PERSONAL SETTINGS */}
          <div className="space-y-2">
            <span className="px-3 text-sm font-bold uppercase tracking-wider block">
              Personal Settings
            </span>
            <div className="space-y-1">
              <Link
                href="/account"
                className={getLinkClass("/account")}
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
            </div>
          </div>
        </nav>

        <div className="p-4 w-full">
          <Link
            href="/api/auth/signout"
            onClick={() => setIsOpen(false)}
            className="rounded px-3 text-sm uppercase tracking-wider block text-white p-2 text-center bg-black border-2 border-[#00BCD4] visited:text-white hover:text-black hover-bg-white"
          >
            Sign Out
          </Link>
        </div>
      </aside>
    </>
  );
}

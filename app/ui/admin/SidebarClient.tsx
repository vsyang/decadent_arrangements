"use client";

import "@/app/globals.css";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarButton } from "./SidebarButton";

export function SidebarClient() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const getLinkClass = (href: string) => {
    const isActive =
      href === "/" ? pathname === "/" : pathname.startsWith(href);

    return `flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "bg-accent/10 text-accent font-semibold"
        : " hover:bg-muted/40 hover:text-foreground"
    }`;
  };

  return (
    <>
      <SidebarButton />

      {/* OVERLAY BACKDROP */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`md:sticky fixed inset-y-0 left-0 md:z-0 z-50 md:top-0 md:h-[calc(100vh-68px)] w-64 flex flex-col justify-between border-r border-border bg-background transition-transform duration-300 ease-in-out md:translate-x-0 pt-6 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="space-y-2 px-4 flex-1">
          <span className="px-3 text-sm font-bold uppercase tracking-wider block">
            Personal Settings
          </span>
          <div>
            <div className="space-y-1">
              <Link
                href="/account"
                className={getLinkClass("/account")}
                onClick={() => setIsOpen(false)}
              >
                Profile Info
              </Link>
            </div>
            <div className="space-y-1">
              <Link
                href="/orders"
                className={getLinkClass("/orders")}
                onClick={() => setIsOpen(false)}
              >
                My Orders
              </Link>
            </div>
          </div>
        </nav>

        <div className="p-4 bg-background">
          <Link
            href="/api/auth/signout"
            onClick={() => setIsOpen(false)}
            className="rounded px-3 text-sm uppercase tracking-wider block bg-foreground/80 text-white p-2 text-center"
          >
            Sign OUT
          </Link>
        </div>
      </aside>
    </>
  );
}

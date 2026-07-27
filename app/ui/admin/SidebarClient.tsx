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

    return `flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:underline hover:decoration-[#00BCD4] ${
      isActive
        ? "bg-[#00BCD4]/20 text-white font-semibold"
        : ""
    }`;
  };

  return (
    <>
      <div className="fixed top-3 right-3 z-[80]" onClick={() => setIsOpen(!isOpen)}>
        <SidebarButton isOpen={isOpen} />
      </div>

      {/* OVERLAY BACKDROP */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] h-screen bg-black/80"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-auto right-0 z-[70] w-64 flex flex-col justify-between bg-black/90 transform transition-transform duration-300 ease-in-out pt-6 pb-14 md:pb-0 h-screen ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="space-y-6 px-4 flex-1 pt-10">
          <span className="px-3 text-sm font-bold uppercase block text-[#00BCD4]">
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

        <div className="p-4 w-full">
          <Link
            href="/api/auth/signout"
            onClick={() => setIsOpen(false)}
            className="rounded px-3 text-sm uppercase tracking-wider block text-white p-2 text-center bg-black border-2 border-[#00BCD4] visited:text-white hover:text-black hover:bg-white"
          >
            Sign Out
          </Link>
        </div>
      </aside>
    </>
  );
}

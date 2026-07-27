"use client";

import "@/app/globals.css";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavActionButton } from "./NavActionButton";
import { BellIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import logo from "@/app/apple-icon.png";
import NavbarLinkDesktop from "./NavbarLinkDesktop";
import NavbarLinkMobile from "./NavbarLinkMobile";
import { SidebarAdmin } from "../admin/SidebarAdmin";
import { SidebarClient } from "../admin/SidebarClient";

// ==========================================
// MAIN NAVBAR COMPONENT
// ==========================================

export function Navbar({
  isAuthenticated,
  isAdmin,
}: {
  isAdmin: boolean;
  isAuthenticated: boolean;
}) {
  const pathname = usePathname();
  const [hasUnread, setHasUnread] = useState<boolean>(true);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll detection to make it transparent
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* DESKTOP HEADER */}
      <header
        className={`hidden [@media(min-width:805px)]:sticky [@media(min-width:805px)]:top-0 [@media(min-width:805px)]:z-50 [@media(min-width:805px)]:block w-full transition-all duration-300 bg-black text-[#f4f0ea] border-b border-b-[#00BCD4] ${
          isScrolled
            ? "bg-black/85 backdrop-blur shadow-sm"
            : "border-transparent"
        } `}
      >
        <div className="mx-auto flex h-16 max-w-8xl items-center justify-between px-6">
          <Link
            href="/"
            className="flex gap-1 items-center text-xl font-bold tracking-tight text-primary"
          >
            <Image
              src={logo}
              alt="Decadent Arrangements Logo"
              placeholder="blur"
              width={40}
              height={40}
            />
            Decadent Arrangements
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium">
            <NavbarLinkDesktop label="Home" linkRef="/" />

            <NavbarLinkDesktop label="Catalog" linkRef="/catalog" />

            <NavbarLinkDesktop label="Contact" linkRef="/contact" />

            <NavbarLinkDesktop label="About Us" linkRef="/about" />

            {/* Desktop Notifications Bell */}
            {isAuthenticated && (
              <Link
                href="/notifications"
                aria-current={isActive("/notifications") ? "page" : undefined}
                className={`relative p-1.5 rounded-full transition-all duration-200 ${
                  isActive("/notifications")
                    ? "bg-stone-200 dark:bg-stone-700 text-stone-900 dark:text-stone-100"
                    : "text-stone-500 hover:text-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800"
                }`}
                aria-label="Notifications"
              >
                <BellIcon className="h-5 w-5" />
                {hasUnread && (
                  <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                  </span>
                )}
              </Link>
            )}

            <NavActionButton />

            {isAuthenticated && (
              <div>{isAdmin ? <SidebarAdmin /> : <SidebarClient />}</div>
            )}
          </nav>
        </div>
      </header>

      {/* MOBILE TOP BRAND HEADER */}
      <header
        className={`sticky top-0 z-50 block [@media(min-width:805px)]:hidden w-full h-14 transition-all duration-300 bg-black border-b text-[#f4f0ea] border-b-[#00BCD4] ${
          isScrolled
            ? "bg-black/70 backdrop-blur shadow-sm"
            : "border-transparent"
        }`}
      >
        <div className="flex h-14 items-center justify-between pl-2 pr-4">
          <Link
            href="/"
            className="flex gap-1 items-center text-md font-bold tracking-tight text-primary"
          >
            <div className="w-[32px] h-[32px] overflow-hidden">
              <Image
                src={logo}
                alt="Decadent Arrangements Logo"
                width={32}
                height={32}
              />
            </div>
            Decadent Arrangements
          </Link>

          {isAuthenticated && (
            <div className="flex items-center gap-2">
              <Link
                href="/notifications"
                aria-current={isActive("/notifications") ? "page" : undefined}
                className={`relative flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors w-12 ${
                  isActive("/notifications")
                    ? "text-primary font-bold"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <BellIcon className="h-5 w-5" />
                {hasUnread && (
                  <span className="absolute top-0 right-3 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                )}
              </Link>

              {isAdmin ? <SidebarAdmin /> : <SidebarClient />}
            </div>
          )}
        </div>
      </header>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 w-full h-16 z-50 block border-t bg-black border-t text-[#f4f0ea] border-t-[#00BCD4] [@media(min-width:805px)]:hidden grid grid-cols-[1fr_1fr_2fr_1fr_1fr] place-items-center pt-2 pb-3">
        {/* Home Link */}

        <NavbarLinkMobile label="Home" linkRef="/" />

        <NavbarLinkMobile label="Catalog" linkRef="/catalog" />

        {/* Orders / Admin Action CTA */}
        <div className="relative flex flex-col items-center justify-center scale-105 drop-shadow-sm z-10 w-full">
          <NavActionButton />
        </div>

        <NavbarLinkMobile label="Contact" linkRef="/contact" />

        <NavbarLinkMobile label="About Us" linkRef="/about" />

        <div
          id="mobile-breadcrumbs"
          className="text-xs text-muted font-medium"
        />
      </nav>
    </>
  );
}

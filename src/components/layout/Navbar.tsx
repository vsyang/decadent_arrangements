"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavActionButton } from "./NavActionButton";
import { getSessionAction } from "@/app/actions/auth";
import { BellIcon, BookOpenIcon, EnvelopeIcon, HomeIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import Image from "next/image";
import logo from "../../../app/apple-icon.png";

// ==========================================
// MAIN NAVBAR COMPONENT
// ==========================================

export function Navbar() {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [hasUnread, setHasUnread] = useState<boolean>(true); 
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function checkSession() {
      try {
        const session = await getSessionAction();
        setIsAuthenticated(!!session?.user);
      } catch (error) {
        console.error("Error al determinar estado de autenticación en el Navbar:", error);
      }
    }
    checkSession();
  }, []);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* DESKTOP HEADER */}
      <header
        className={`hidden [@media(min-width:805px)]:sticky [@media(min-width:805px)]:top-0 [@media(min-width:805px)]:z-50 [@media(min-width:805px)]:block w-full transition-all duration-300 ${isScrolled
            ? "border-b border-border bg-background/80 backdrop-blur shadow-sm"
            : "border-b border-transparent bg-transparent"
          }`}
      >
        <div className="mx-auto flex h-16 max-w-8xl items-center justify-between px-6 [@media(min-width:900px)]:pr-16">
          <Link href="/" className="flex gap-1 items-center text-xl font-bold tracking-tight text-primary">
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
            <Link
              href="/"
              aria-current={isActive("/") ? "page" : undefined}
              className={`transition-colors ${isActive("/")
                  ? "text-primary font-bold underline underline-offset-4 decoration-2"
                  : "text-muted hover:text-foreground"
                }`}
            >
              Home
            </Link>

            <Link
              href="/catalog"
              aria-current={isActive("/catalog") ? "page" : undefined}
              className={`transition-colors ${isActive("/catalog")
                  ? "text-primary font-bold underline underline-offset-4 decoration-2"
                  : "text-muted hover:text-foreground"
                }`}
            >
              Catalog
            </Link>

            <Link
              href="/contact"
              aria-current={isActive("/contact") ? "page" : undefined}
              className={`transition-colors ${isActive("/contact")
                  ? "text-primary font-bold underline underline-offset-4 decoration-2"
                  : "text-muted hover:text-foreground"
                }`}
            >
              Contact
            </Link>

            <Link
              href="/about"
              aria-current={isActive("/about") ? "page" : undefined}
              className={`transition-colors ${isActive("/about")
                  ? "text-primary font-bold underline underline-offset-4 decoration-2"
                  : "text-muted hover:text-foreground"
                }`}
            >
              About Us
            </Link>

            {/* Desktop Notifications Bell */}
            {isAuthenticated && (
              <Link
                href="/notifications"
                aria-current={isActive("/notifications") ? "page" : undefined}
                className={`relative p-1.5 rounded-full transition-all duration-200 ${isActive("/notifications")
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
          </nav>
        </div>
      </header>

      {/* MOBILE TOP BRAND HEADER */}
      <header
        className={`sticky top-0 z-50 block [@media(min-width:805px)]:hidden w-full h-14 transition-all duration-300 ${isScrolled
            ? "border-b border-border bg-background/80 backdrop-blur"
            : "border-b border-transparent bg-transparent"
          }`}
      >
        <div className="flex h-14 items-center justify-between pl-2 pr-4">
          <Link href="/" className="flex gap-1 items-center text-md font-bold tracking-tight text-primary">
            <Image
              src={logo}
              alt="Decadent Arrangements Logo"
              width={32}
              height={32}
            />
            Decadent Arrangements
          </Link>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <Link
                href="/notifications"
                aria-current={isActive("/notifications") ? "page" : undefined}
                className={`relative flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors w-12 ${isActive("/notifications") ? "text-primary font-bold" : "text-muted hover:text-foreground"
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
            )}
          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 w-full h-16 z-50 block border-t border-border bg-background/95 backdrop-blur [@media(min-width:805px)]:hidden grid grid-cols-[1fr_1fr_2fr_1fr_1fr] place-items-center">
        {/* Home Link */}
        <Link
          href="/"
          aria-current={isActive("/") ? "page" : undefined}
          className={`flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors w-16 ${isActive("/") ? "text-primary font-bold scale-105" : "text-muted hover:text-foreground"
            }`}
        >
          <HomeIcon className="h-5 w-5" />
          <span>Home</span>
        </Link>

        {/* Catalog Link */}
        <Link
          href="/catalog"
          aria-current={isActive("/catalog") ? "page" : undefined}
          className={`flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors w-16 ${isActive("/catalog") ? "text-primary font-bold scale-105" : "text-muted hover:text-foreground"
            }`}
        >
          <BookOpenIcon className="h-5 w-5" />
          <span>Catalog</span>
        </Link>

        {/* Orders / Admin Action CTA */}
        <div className="relative flex flex-col items-center justify-center scale-105 drop-shadow-sm z-10 w-full">
          <NavActionButton />
        </div>

        {/* Contact Link */}
        <Link
          href="/contact"
          aria-current={isActive("/contact") ? "page" : undefined}
          className={`flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors w-16 ${isActive("/contact") ? "text-primary font-bold scale-105" : "text-muted hover:text-foreground"
            }`}
        >
          <EnvelopeIcon className="h-5 w-5" />
          <span>Contact</span>
        </Link>

        {/* About Us Link */}
        <Link
          href="/about"
          aria-current={isActive("/about") ? "page" : undefined}
          className={`flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors w-16 ${isActive("/about") ? "text-primary font-bold scale-105" : "text-muted hover:text-foreground"
            }`}
        >
          <InformationCircleIcon className="h-5 w-5" />
          <span>About Us</span>
        </Link>

        <div id="mobile-breadcrumbs" className="text-xs text-muted font-medium" />
      </nav>
    </>
  );
}
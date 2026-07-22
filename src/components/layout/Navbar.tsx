"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NavActionButton } from "./NavActionButton";
import { getSessionAction } from "@/app/actions/auth";
import { BellIcon, BookOpenIcon, EnvelopeIcon, HomeIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import logo from "../../../app/apple-icon.png"


// ==========================================
// MAIN NAVBAR COMPONENT
// ==========================================

export function Navbar() {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const [hasUnread, setHasUnread] = useState<boolean>(true); // Mock temporal del indicador activo

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

  return (
    <>
      {/* DESKTOP HEADER */}
      <header className="hidden [@media(min-width:800px)]:sticky [@media(min-width:800px)]:top-0 [@media(min-width:800px)]:z-50 [@media(min-width:800px)]:block w-full border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
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
            <Link href="/" className="text-muted hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/catalog" className="text-muted hover:text-foreground transition-colors">
              Catalog
            </Link>
            <Link href="/contact" className="text-muted hover:text-foreground transition-colors">
              Contact
            </Link>
            <Link href="/about" className="text-muted hover:text-foreground transition-colors">
              About Us
            </Link>

            {/* Desktop Notifications Bell */}
            {isAuthenticated && (
              <Link
                href="/notifications"
                className="relative p-1.5 rounded-full text-stone-500 hover:text-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all duration-200"
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
      <header className="sticky top-0 z-50 block [@media(min-width:800px)]:hidden w-full border-b border-border bg-background/80 backdrop-blur h-14">
        <div className="flex h-14 items-center justify-between pl-2">
          <Link href="/" className="flex gap-1 items-center text-md font-bold tracking-tight text-primary">
          <Image
            src={logo}
            alt="Decadent Arrangements Logo"
            placeholder="blur"
            width={32}
            height={32}
          />
            Decadent Arrangements
          </Link>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <Link
                href="/notifications"
                className="relative flex flex-col items-center justify-center gap-1 text-[10px] font-medium text-muted hover:text-foreground transition-colors w-16"
              >
                <BellIcon className="h-5 w-5" />
                {hasUnread && (
                  <span className="absolute top-0 right-5.5 flex h-2 w-2">
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
      <nav className="fixed bottom-0 w-full h-16 z-50 block border-t border-border bg-background/95 backdrop-blur [@media(min-width:800px)]:hidden grid grid-cols-[1fr_1fr_2fr_1fr_1fr] place-items-center">

          {/* Home Link */}
          <Link
            href="/"
            className="flex flex-col items-center justify-center gap-1 text-[10px] font-medium text-muted hover:text-foreground transition-colors w-16"
          >
            <HomeIcon className="h-5 w-5" />
            <span>Home</span>
          </Link>

          {/* Catalog Link */}
          <Link
            href="/catalog"
            className="flex flex-col items-center justify-center gap-1 text-[10px] font-medium text-muted hover:text-foreground transition-colors w-16"
          >
            <BookOpenIcon className="h-5 w-5" />
            <span>Catalog</span>
          </Link>

          {/* Orders / Admin Action CTA */}
          <div className="relative flex flex-col items-center justify-center scale-105 drop-shadow-sm z-10">
            <NavActionButton />
          </div>

          {/* Contact Link */}
          <Link
            href="/contact"
            className="flex flex-col items-center justify-center gap-1 text-[10px] font-medium text-muted hover:text-foreground transition-colors w-16"
          >
            <EnvelopeIcon className="h-5 w-5" />
            <span>Contact</span>
          </Link>

          {/* About Us Link */}
          <Link
            href="/about"
            className="flex flex-col items-center justify-center gap-1 text-[10px] font-medium text-muted hover:text-foreground transition-colors w-16"
          >
            <InformationCircleIcon className="h-5 w-5" />
            <span>About Us</span>
          </Link>

        <div id="mobile-breadcrumbs" className="text-xs text-muted font-medium" />

      </nav>
    </>
  );
}
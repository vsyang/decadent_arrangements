"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const getLinkClass = (href: string) => {
        const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

        return `flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
                ? "bg-accent/10 text-accent font-semibold"
                : " hover:bg-muted/40 hover:text-foreground"
            }`;
    };

    return (
        <>
            {/* TOP BAR */}
            <div className="flex h-16 items-center justify-between border-b border-border bg-background px-4 md:hidden sticky top-0 z-30 w-full">
                <Link
                    href="/admin/orders"
                    className="text-lg font-bold tracking-tight text-accent"
                >
                    DA Dashboard
                </Link>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    className="rounded-md p-2  hover:bg-muted/50 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                    {isOpen ? (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    )}
                </button>
            </div>

            {/* OVERLAY BACKDROP */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-background transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="hidden h-16 items-center px-6 border-b border-border md:flex">
                    <Link
                        href="/admin/orders"
                        className="text-lg font-bold tracking-tight text-accent hover:opacity-90 transition-opacity"
                    >
                        DA Dashboard
                    </Link>
                </div>

                <nav className="flex-1 space-y-6 px-4 py-6 overflow-y-auto">

                    {/* ADMIN OPERATIONS */}
                    <div className="space-y-2">
                        <span className="px-3 text-xs font-bold uppercase tracking-wider  block">
                            Admin Operations
                        </span>
                        <div className="space-y-1">
                            <Link href="/admin/orders" className={getLinkClass("/admin/orders")}>
                                Orders Management
                            </Link>
                            <Link href="/admin/catalog" className={getLinkClass("/admin/catalog")}>
                                Catalog Management
                            </Link>
                        </div>
                    </div>

                    {/* PERSONAL SETTINGS */}
                    <div className="space-y-2">
                        <span className="px-3 text-xs font-bold uppercase tracking-wider  block">
                            Personal Settings
                        </span>
                        <div className="space-y-1">
                            <Link href="/account" className={getLinkClass("/account")}>
                                My Profile Settings
                            </Link>
                        </div>
                    </div>

                    {/* STOREFRONT */}
                    <div className="space-y-2">
                        <span className="px-3 text-xs font-bold uppercase tracking-wider  block">
                            Storefront
                        </span>
                        <div className="space-y-1">
                            <Link href="/catalog" className={getLinkClass("/catalog")}>
                                View Live Catalog
                            </Link>
                        </div>
                    </div>

                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-border space-y-2">
                    <Link
                        href="/"
                        className="flex w-full justify-center rounded-md border border-border px-3 py-1.5 text-xs font-semibold  hover:bg-muted/20 hover:text-foreground transition-colors"
                    >
                        Exit Admin
                    </Link>
                </div>
            </aside>
        </>
    );
}
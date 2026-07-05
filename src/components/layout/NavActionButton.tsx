"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface SessionState {
    isAuthenticated: boolean;
    isAdmin: boolean;
}

export function NavActionButton() {
    // Init Skeleton
    const [loading, setLoading] = useState<boolean>(true);
    const [session, setSession] = useState<SessionState>({
        isAuthenticated: false,
        isAdmin: false,
    });

    useEffect(() => {
        async function checkAuth() {
            try {
                // Server Action o API & WHITELIST
                // const res = await getSessionAction();

                await new Promise((resolve) => setTimeout(resolve, 800));

                setSession({
                    isAuthenticated: false, // Change to true when solved Auth.js
                    isAdmin: false,        // if isAdmin()
                });
            } catch (error) {
                console.error("Failed to fetch session state:", error);
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, []);

    if (loading) {
        return (
            <div className="h-7 w-24 animate-pulse rounded-full bg-muted/30" aria-hidden="true" />
        );
    }

    if (session.isAuthenticated && session.isAdmin) {
        return (
            <Link
                href="/dashboard"
                className="rounded-full bg-accent px-4 py-1.5 text-xs text-accent-foreground font-semibold hover:opacity-90 transition-opacity"
            >
                Admin Panel
            </Link>
        );
    }

    return (
        <Link
            href="/api/auth/signin"
            className="rounded-full bg-secondary px-4 py-1.5 text-xs text-secondary-foreground font-semibold hover:opacity-90 transition-opacity"
        >
            Orders
        </Link>
    );
}
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSessionAction } from "@/app/actions/auth";

interface SessionState {
    isAuthenticated: boolean;
    isAdmin: boolean;
}

export function NavActionButton() {
    const [loading, setLoading] = useState<boolean>(true);
    const [session, setSession] = useState<SessionState>({
        isAuthenticated: false,
        isAdmin: false,
    });

    useEffect(() => {
        async function checkAuth() {
            try {
                const res = await getSessionAction();

                if (!res || !res.user) {
                    setSession({
                        isAuthenticated: false,
                        isAdmin: false,
                    });
                } else {
                    setSession({
                        isAuthenticated: true,
                        isAdmin: res.user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL,
                    });
                }
            } catch (error) {
                console.error("Error validando la sesión en el cliente:", error);
                setSession({ isAuthenticated: false, isAdmin: false });
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, []);

    if (loading) {
        return (
            <div className="h-7 w-18 animate-pulse rounded-full bg-neutral-200" aria-hidden="true" />
        );
    }

    if (session.isAuthenticated && session.isAdmin) {
        return (
            <Link
                href="/dashboard"
                className="rounded-full bg-stone-800 px-4 py-1.5 text-xs text-white font-semibold hover:opacity-90 transition-opacity"
            >
                Admin Panel
            </Link>
        );
    }

    return (
        <Link
            href={session.isAuthenticated ? "/admin/orders" : "/api/auth/signin"}
            className="rounded-full bg-stone-100 px-4 py-1.5 text-xs text-stone-900 font-semibold hover:opacity-90 transition-opacity border border-stone-200"
        >
            {session.isAuthenticated ? "My orders" : "Sign In"}
        </Link>
    );
}
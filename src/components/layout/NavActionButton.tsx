"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getSessionAction } from "@/app/actions/auth";
import { useEffect, useState } from "react";

interface SessionState {
    isAuthenticated: boolean;
    isAdmin: boolean;
    userName?: string | null;
    userImage?: string | null;
}

export function NavActionButton() {
    const pathname = usePathname();
    const [loading, setLoading] = useState<boolean>(true);
    const [session, setSession] = useState<SessionState>({
        isAuthenticated: false,
        isAdmin: false,
        userName: null,
        userImage: null,
    });

    useEffect(() => {
        async function checkAuth() {
            try {
                const res = await getSessionAction();

                if (!res || !res.user) {
                    setSession({
                        isAuthenticated: false,
                        isAdmin: false,
                        userName: null,
                        userImage: null,
                    });
                    return;
                }

                setSession({
                    isAuthenticated: true,
                    isAdmin: res.isAdmin,
                    userName: res.user.name,
                    userImage: res.user.image,
                });
            } catch (error) {
                console.error("Error validating session:", error);
                setSession({
                    isAuthenticated: false,
                    isAdmin: false,
                    userName: null,
                    userImage: null,
                });
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, []);

    const getInitial = (name?: string | null): string => {
        if (!name) return "U";
        const trimmed = name.trim();
        return trimmed.charAt(0).toUpperCase();
    };

    // 💡 Helper Senior: Formatea nombres largos para la UI
    const getFormattedName = (name?: string | null): string => {
        if (!name) return "My Profile";
        const firstName = name.trim().split(" ")[0]; // Extrae solo el primer nombre (e.g. "Andrea")
        return firstName;
    };

    if (loading) {
        return (
            <div className="h-8 w-24 animate-pulse rounded-full bg-stone-200 dark:bg-stone-800" aria-hidden="true" />
        );
    }

    if (!session.isAuthenticated) {
        const isSignInActive = pathname === "/api/auth/signin";

        return (
            <Link
                href="/api/auth/signin"
                aria-current={isSignInActive ? "page" : undefined}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all border ${isSignInActive
                        ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-sm"
                        : "bg-stone-100 text-stone-900 border-stone-200 hover:opacity-90"
                    }`}
            >
                Sign In
            </Link>
        );
    }

    const userName = session.userName;
    const userImage = session.userImage;
    const targetHref = session.isAdmin ? "/orders" : "/dashboard";
    const isActive = pathname.startsWith(targetHref) || (session.isAdmin && pathname.startsWith("/admin"));

    return (
        <Link
            href={targetHref}
            aria-current={isActive ? "page" : undefined}
            title={`${session.isAdmin ? "Admin Panel -" : "Orders for"} ${userName ?? (session.isAdmin ? "Admin" : "User")}`}
            className={`text-xs font-semibold transition-all duration-200 [@media(min-width:805px)]:group [@media(min-width:805px)]:flex [@media(min-width:805px)]:flex-row-reverse [@media(min-width:805px)]:items-center [@media(min-width:805px)]:gap-2 [@media(min-width:805px)]:rounded-full [@media(min-width:805px)]:px-2 [@media(min-width:805px)]:py-1 [@media(min-width:805px)]:border ${isActive ? "ring-2 ring-offset-2 ring-[var(--color-primary)]" : ""
                } ${session.isAdmin
                    ? "text-white [@media(min-width:805px)]:bg-stone-900 [@media(min-width:805px)]:border-stone-900 hover:bg-stone-800"
                    : "text-stone-800 [@media(min-width:805px)]:bg-stone-50 [@media(min-width:805px)]:border-stone-200 hover:border-stone-400 hover:bg-stone-100"
                }`}
        >
            <div className={`relative h-7 w-7 rounded-full overflow-hidden border transition-colors mx-auto border-2 ${session.isAdmin ? "text-stone-900 border-stone-600" : "bg-stone-200 border-stone-300"
                }`}>
                {userImage ? (
                    <Image
                        src={userImage}
                        alt={userName ?? (session.isAdmin ? "Admin" : "User")}
                        fill
                        sizes="28px"
                        className="object-cover"
                        referrerPolicy="no-referrer"
                    />
                ) : (
                    <span className={`flex h-full w-full items-center justify-center text-[10px] font-bold ${session.isAdmin ? "text-stone-200" : "text-stone-600"
                        }`}>
                        {getInitial(userName)}
                    </span>
                )}
            </div>

            {/* ⚠️ Bloqueamos el salto de línea y limitamos el ancho en móviles */}
            <span className={`tracking-tight whitespace-nowrap truncate [@media(max-width:805px)]:max-w-[90px] [@media(max-width:805px)]:block [@media(max-width:805px)]:rounded-full [@media(max-width:805px)]:px-2.5 [@media(max-width:805px)]:py-0.5 font-semibold [@media(max-width:805px)]:border ${session.isAdmin
                    ? "[@media(max-width:805px)]:bg-stone-900 [@media(max-width:805px)]:text-white [@media(max-width:805px)]:border-stone-900"
                    : "[@media(max-width:805px)]:bg-stone-100 [@media(max-width:805px)]:text-stone-900 [@media(max-width:805px)]:border-stone-200"
                }`}>
                {session.isAdmin ? "Management" : getFormattedName(userName)}
            </span>
        </Link>
    );
}
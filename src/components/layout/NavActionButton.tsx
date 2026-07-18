"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSessionAction } from "@/app/actions/auth";

interface SessionState {
    isAuthenticated: boolean;
    isAdmin: boolean;
    userName?: string | null;
    userImage?: string | null;
}

export function NavActionButton() {
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
                } else {
                    // VALIDACIÓN SENIOR DEFENSIVA DE ADMINISTRADOR
                    const userEmail = res.user.email?.trim().toLowerCase();
                    let isUserAdmin = false;

                    // Leemos la variable pública o la provista por el servidor
                    const whitelistStr = process.env.NEXT_PUBLIC_WHITELIST || "[]";
                    try {
                        const adminList = JSON.parse(whitelistStr);
                        if (Array.isArray(adminList) && userEmail) {
                            isUserAdmin = adminList.includes(userEmail);
                        }
                    } catch (e) {
                        console.error("Error parseando NEXT_PUBLIC_WHITELIST en cliente", e);
                    }

                    setSession({
                        isAuthenticated: true,
                        // Incrementamos la seguridad: Si no coincide con la lista, jamás será admin
                        isAdmin: isUserAdmin,
                        userName: res.user.name,
                        userImage: res.user.image,
                    });
                }
            } catch (error) {
                console.error("Error validando la sesión en el cliente:", error);
                setSession({ isAuthenticated: false, isAdmin: false, userName: null, userImage: null });
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

    if (loading) {
        return (
            <div className="h-8 w-24 animate-pulse rounded-full bg-neutral-200" aria-hidden="true" />
        );
    }

    if (session.isAuthenticated) {
        // PANEL DE ADMINISTRACIÓN AUTORIZADO (SÓLO SI ESTÁ EN LA WHITELIST)
        if (session.isAdmin) {
            return (
                <Link
                    href="/dashboard"
                    title={`Admin Panel - ${session.userName ?? "Admin"}`}
                    className="group flex items-center gap-2 rounded-full bg-stone-900 pl-3 pr-1.5 py-1 text-xs text-white font-semibold border border-stone-900 hover:bg-stone-800 transition-all duration-200"
                >
                    <span className="tracking-tight">Admin Board</span>
                    <div className="h-6 w-6 rounded-full bg-stone-700 overflow-hidden flex items-center justify-center border border-white/20">
                        {session.userImage ? (
                            <img
                                src={session.userImage}
                                alt={session.userName ?? "Admin"}
                                className="h-full w-full object-cover"
                                referrerPolicy="no-referrer"
                            />
                        ) : (
                            <span className="text-[10px] font-bold text-stone-200">
                                {getInitial(session.userName)}
                            </span>
                        )}
                    </div>
                </Link>
            );
        }

        // REGULAR USER
        return (
            <Link
                href="/orders"
                title={`Orders for ${session.userName ?? "User"}`}
                className="group flex items-center gap-2 rounded-full bg-stone-50 pl-3 pr-1.5 py-1 text-xs text-stone-800 font-semibold border border-stone-200 hover:border-stone-400 hover:bg-stone-100 transition-all duration-200"
            >
                <span className="tracking-tight">My Orders</span>
                <div className="h-6 w-6 rounded-full bg-stone-200 overflow-hidden flex items-center justify-center border border-stone-300 group-hover:border-stone-400 transition-colors">
                    {session.userImage ? (
                        <img
                            src={session.userImage}
                            alt={session.userName ?? "User"}
                            className="h-full w-full object-cover"
                            referrerPolicy="no-referrer"
                        />
                    ) : (
                        <span className="text-[10px] font-bold text-stone-600">
                            {getInitial(session.userName)}
                        </span>
                    )}
                </div>
            </Link>
        );
    }

    return (
        <Link
            href="/api/auth/signin"
            className="rounded-full bg-stone-100 px-4 py-1.5 text-xs text-stone-900 font-semibold hover:opacity-90 transition-opacity border border-stone-200"
        >
            Orders
        </Link>
    );
}
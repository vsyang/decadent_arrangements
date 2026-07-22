"use client";

import Link from "next/link";
import Image from "next/image"
import { getSessionAction } from "@/app/actions/auth";
import { useEffect, useState } from "react";

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

                    return;
                } 

                setSession({

                    isAuthenticated: true,
                    isAdmin: res.isAdmin,
                    userName: res.user.name,
                    userImage: res.user.image,
                });

            } catch (error) {

                console.error("Error valiting session:", error);

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

    if (loading) {
        return (
            <div className="h-8 w-24 animate-pulse rounded-full bg-neutral-200" aria-hidden="true" />
        );
    }

    if (!session.isAuthenticated) {
        return (
            <Link
                href="/api/auth/signin"
                className="rounded-full bg-stone-100 px-4 py-1.5 text-xs text-stone-900 font-semibold hover:opacity-90 transition-opacity border border-stone-200"
            >
                Sign In
            </Link>
        );
    }

    const userName = session.userName;
    const userImage = session.userImage;

    return (
        <>
            <Link
                href={`${session.isAdmin ? "/orders" : "/dashboard"}`}
                title={`${session.isAdmin ? "Admin Panel -" : "Orders for"} ${userName ?? (session.isAdmin ? "Admin" : "User")}`}
                className={`text-xs font-semibold transition-all duration-200 [@media(min-width:805px)]:group [@media(min-width:805px)]:flex [@media(min-width:805px)]:flex-row-reverse [@media(min-width:805px)]:items-center [@media(min-width:805px)]:gap-2 [@media(min-width:805px)]:rounded-full [@media(min-width:805px)]:px-2 [@media(min-width:805px)]:py-1 [@media(min-width:805px)]:border ${
                    session.isAdmin ? 
                        "text-white [@media(min-width:805px)]:bg-stone-900 [@media(min-width:805px)]:border-stone-900 hover:bg-stone-800 hover:bg-stone-800" 
                        : "text-stone-800 [@media(min-width:805px)]:bg-stone-50 [@media(min-width:805px)]:border-stone-200 hover:border-stone-400 hover:bg-stone-100"
                    }
                `}
            >

                <div className={`relative h-7 w-7 rounded-full overflow-hidden border  group-hover:border-stone-400 transition-colors mx-auto border-2 ${session.isAdmin ? "text-stone-900 border-stone-600" : "bg-stone-200 border-stone-300"}`}>
                    {userImage ? (
                        <Image
                            src={userImage}
                            alt={userName ?? (session.isAdmin ? "Admin" : "User")}
                            fill
                            sizes="24px"
                            className="object-cover"
                            referrerPolicy="no-referrer"
                        />
                    ) : (
                        <span className={`text-[10px] font-bold ${session.isAdmin ? "text-stone-200" : "text-stone-600"}`}>
                            {getInitial(userName)}
                        </span>
                    )}
                </div>

                <span className={`tracking-tight [@media(max-width:805px)]:rounded-full [@media(max-width:805px)]:px-3 [@media(max-width:805px)]:py-1 font-semibold [@media(max-width:805px)]:border ${
                    session.isAdmin ? 
                        "[@media(max-width:805px)]:bg-stone-900 [@media(max-width:805px)]:border-stone-900" 
                        : "[@media(max-width:805px)]:bg-stone-50 [@media(max-width:805px)]:border-stone-200"
                    }`}
                >
                    {session.isAdmin ? "Management" : userName ?? "My Profile"}
                </span>

            </Link>
        </>
    );
}
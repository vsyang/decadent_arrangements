"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface SessionState {
    isAuthenticated: boolean;
    isAdmin: boolean;
}

export function NavActionButton() {
    // Estado inicial de carga activa (Muestra el Skeleton)
    const [loading, setLoading] = useState<boolean>(true);
    const [session, setSession] = useState<SessionState>({
        isAuthenticated: false,
        isAdmin: false,
    });

    useEffect(() => {
        async function checkAuth() {
            try {
                // Aquí llamarás a tu Server Action o API que verifica la sesión y la WHITELIST
                // const res = await getSessionAction();

                // Simulación temporal para emular la latencia de red
                await new Promise((resolve) => setTimeout(resolve, 800));

                setSession({
                    isAuthenticated: false, // Cambiar a true al integrar Auth.js
                    isAdmin: false,        // Cambiar según el resultado de la utilidad isAdmin()
                });
            } catch (error) {
                console.error("Failed to fetch session state:", error);
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, []);

    // 1. Estado de Skeleton (Evita el desagradable Layout Shift mientras resuelve el servidor)
    if (loading) {
        return (
            <div className="h-7 w-24 animate-pulse rounded-full bg-muted/30" aria-hidden="true" />
        );
    }

    // 2. Estado: Usuario Administrador Autenticado
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

    // 3. Estado por defecto: Usuario Invitado o Cliente Regular (Redirige al Login/Portal de Pedidos)
    return (
        <Link
            href="/api/auth/signin" // Ruta estándar de inicio de sesión (Auth.js)
            className="rounded-full bg-secondary px-4 py-1.5 text-xs text-secondary-foreground font-semibold hover:opacity-90 transition-opacity"
        >
            Orders
        </Link>
    );
}
"use server"; // <-- ESTO ES OBLIGATORIO AQUÍ

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function getSessionAction() {
    try {
        const session = await getServerSession(authOptions);
        return session;
    } catch (error) {
        console.error("Error recuperando sesión en Server Action:", error);
        return null;
    }
}
"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function getSessionAction() {
    try {
        const session = await getServerSession(authOptions);
        return session;
    } catch (error) {
        console.error("Error retrieving session on the Action Server:", error);
        return null;
    }
}
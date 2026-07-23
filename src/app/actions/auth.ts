"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

interface SessionActionResponse {
  user: {
    id?: string | null;
    role: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
  isAdmin: boolean;
}

export async function getSessionAction(): Promise<SessionActionResponse> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email || !session.user.id) {
      return {
        user: null,
        isAdmin: false,
      };
    }

    const userEmail = session.user.email.toLowerCase();
    const sessionRole = session.user.role;

    const adminList: string[] = JSON.parse(process.env.WHITELIST ?? "[]");
    const isEmailInWhitelist = adminList
      .map((e) => e.toLowerCase())
      .includes(userEmail);

    const isAdmin = sessionRole === "admin" && isEmailInWhitelist;

    return {
      user: {
        id: session.user.id,
        role: session.user.role,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      },

      isAdmin,
    };
  } catch (error) {
    console.error("Error obteniendo la sesión:", error);

    return {
      user: null,
      isAdmin: false,
    };
  }
}

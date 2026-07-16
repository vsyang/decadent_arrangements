"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function IsAdminProtection(): Promise<boolean> {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.email) {
    return false;
  }

  try {
    const whitelist: string[] = JSON.parse(process.env.WHITELIST ?? '[]');
    const sessionEmail = session.user.email.toLowerCase();

    return whitelist.includes(sessionEmail);
  } catch (error) {
    console.error("Error al parsear la WHITELIST de administradores:", error);
    return false;
  }
}
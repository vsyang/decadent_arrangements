// app/(admin)/admin/adminAction.tsx
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function IsAdminProtection(): Promise<boolean> {
  const session = await getServerSession(authOptions);

  // LAYER (AUTH SESSION)
  if (!session || !session.user || !session.user.email || !session.user.id) {
    redirect("/not-found");
  }

  const sessionEmail = session.user.email.toLowerCase();
  const sessionRole = session.user.role;

  // LAYER (DB + .ENV)
  const whitelist: string[] = JSON.parse(process.env.WHITELIST ?? '[]');
  const isEmailInWhitelist = whitelist.map(e => e.toLowerCase()).includes(sessionEmail);

  const isAdmin = sessionRole === "admin" && isEmailInWhitelist;

  return isAdmin;
}
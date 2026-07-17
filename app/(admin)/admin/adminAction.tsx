import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function IsAdminProtection(): Promise<boolean> {

  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.email) {
    redirect("/not-found");
  }

  if (!session?.user?.email) {
    return false;
  }

  const whitelist = JSON.parse(process.env.WHITELIST ?? '[]');

  const sessionEmail = session.user.email.toLowerCase(); // prod

  const isAdmin = whitelist.includes(sessionEmail);

  return isAdmin;
}
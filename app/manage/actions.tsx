// app/actions/isAdmin.ts

"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function IsAdminProtection(): Promise<boolean> {

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/not-found");
  }

  if (!session?.user?.email) {
    return false;
  }

  const whitelist = JSON.parse(process.env.WHITELIST ?? '[]');

  // console.log(whitelist);

  const sessionEmail = session.user.email.toLowerCase(); // prod

  // const sessionEmail = "" // dev

  return whitelist.includes(sessionEmail);
}
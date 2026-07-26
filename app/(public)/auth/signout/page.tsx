import "@/app/globals.css";
import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";

import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function SignOutPage() {

  const session = await getServerSession(authOptions);

  // If the user is not signed in, redirect them to sign in.
  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }
  return (
    <div className="flex flex-col items-center">
      <h1 className="py-5">You sure, buddy?</h1>

      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="bg-black h-10 px-4 py-2 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-slate-100 text-white hover:text-[#c97c5d] cursor-pointer"
      >
        Yeah, Sign out
      </button>
    </div>
  );
}

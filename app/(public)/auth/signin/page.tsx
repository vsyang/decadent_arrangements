import "@/app/globals.css";
import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function SignInPage() {

  const session = await getServerSession(authOptions);
  
    // If the user is already signed in, redirect them to home.
    if (session?.user?.id) {
      redirect("/");
    }


  return (
    <div className="flex justify-center">
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="bg-black h-10 px-4 py-2 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-slate-100 text-white hover:text-[#c97c5d] cursor-pointer"
      >
        Sign in with Google
      </button>
    </div>
  );
}

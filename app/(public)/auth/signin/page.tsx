'use client';
import "@/app/globals.css";

import { signIn } from "next-auth/react";

export default function SignInPage() {
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

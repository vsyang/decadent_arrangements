"use client";

import { ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <button
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="group mt-9 inline-flex w-full cursor-pointer items-center justify-center gap-4 bg-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-black transition duration-300 hover:bg-[#00BCD4]"
    >
      Sign in with Google
      <ArrowRight
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        strokeWidth={1.5}
      />
    </button>
  );
}

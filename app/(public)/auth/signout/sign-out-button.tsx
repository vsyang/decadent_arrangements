"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function SignOutControls() {
  return (
    <div className="mt-9 space-y-4">
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="group inline-flex w-full cursor-pointer items-center justify-center gap-4 bg-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-black transition duration-300 hover:bg-[#00BCD4]"
      >
        Sign Out
        <LogOut
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          strokeWidth={1.5}
        />
      </button>

      <Link
        href="/"
        className="group inline-flex w-full items-center justify-center gap-4 border border-white/50 px-8 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition duration-300 hover:border-white hover:bg-white hover:text-black"
      >
        Stay Signed In
      </Link>
    </div>
  );
}

"use client";

import "@/app/globals.css";
import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";

import { signIn } from "next-auth/react";
import { ArrowRight } from "lucide-react";
import { cormorant, montserrat } from "@/app/ui/home/fonts";

  return (
    <main
      className={`${montserrat.className} relative flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden bg-black px-6 py-16 text-white`}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://jwul10vtycq0k5q2.public.blob.vercel-storage.com/medium/m001.webp')",
        }}
      />

      {/* Dark cinematic overlays */}
      <div className="absolute inset-0 bg-black/55" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/50 to-black/10" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />

      {/* Sign-in content */}
      <div className="animate-cinematic-fade-up relative z-10 w-full max-w-lg border border-white/20 bg-black/45 px-8 py-12 text-center backdrop-blur-md sm:px-12 sm:py-14">
        {/* Small heading label */}
        <div className="mb-7 flex items-center justify-center gap-4">
          <div className="h-px w-10 bg-[#00BCD4]" />

          <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-white/70">
            Welcome to Decadent Arrangements
          </p>

          <div className="h-px w-10 bg-[#00BCD4]" />
        </div>

        <h1
          className={`${cormorant.className} text-5xl font-medium leading-none text-white sm:text-6xl`}
        >
          Please sign in to continue
        </h1>

        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="
            group mt-9 inline-flex w-full cursor-pointer items-center
            justify-center gap-4 bg-white px-8 py-4 text-xs
            font-semibold uppercase tracking-[0.16em] text-black
            transition duration-300 hover:bg-[#00BCD4]
          "
        >
          Sign in with Google
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={1.5}
          />
        </button>

        <p className="mt-6 text-xs leading-6 text-white/40">
          By signing in, you can securely access your Decadent Arrangements
          account.
        </p>
      </div>
    </main>
  );
}

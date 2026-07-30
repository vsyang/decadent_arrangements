// src/app/not-found.tsx

import "@/app/globals.css";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 text-white">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/not-found.webp')",
        }}
      />

      {/* Dark overlays for readability and luxury styling */}
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black/10" />

      {/* Soft decorative glow */}
      <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#03989e]/10 blur-3xl" />

      {/* Main content */}
      <section className="relative z-10 w-full max-w-2xl text-center">
        <div className="border border-white/15 bg-black/35 px-6 py-12 shadow-2xl backdrop-blur-sm sm:px-12 sm:py-16">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.4em] text-[#03989e]">
            Decadent Arrangements
          </p>

          <h1 className="font-serif text-7xl font-light tracking-tight text-white sm:text-8xl">
            404
          </h1>

          <div className="mx-auto my-6 h-px w-16 bg-[#03989e]" />

          <h2 className="font-serif text-3xl font-light sm:text-4xl">
            This page is no longer arranged.
          </h2>

          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-white/65 sm:text-base">
            The page you are looking for may have been moved, renamed, or is no
            longer available.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex min-w-52 items-center justify-center border border-white/60 px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:border-[#03989e] hover:bg-[#03989e] hover:text-white"
          >
            Return Home
          </Link>
        </div>
      </section>
    </main>
  );
}

import "@/app/globals.css";

import { authOptions } from "@/app/lib/auth";
import { cormorant, montserrat } from "@/app/ui/home/fonts";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import SignOutControls from "./sign-out-button";

export default async function SignOutPage() {
  const session = await getServerSession(authOptions);

  // Users who are not signed in return to the sign-in page.
  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }

  return (
    <main
      className={`${montserrat.className} relative flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden bg-black px-6 py-16 text-white`}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 scale-[1.05] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://jwul10vtycq0k5q2.public.blob.vercel-storage.com/medium/m001.webp')",
        }}
      />

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/55 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/75" />

      {/* Sign-out panel */}
      <div className="animate-cinematic-fade-up relative z-10 w-full max-w-lg border border-white/20 bg-black/45 px-8 py-12 text-center backdrop-blur-md sm:px-12 sm:py-14">
        <div className="mb-7 flex items-center justify-center gap-4">
          <div className="h-px w-10 bg-[#00BCD4]" />

          <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-white/70">
            Account Access
          </p>

          <div className="h-px w-10 bg-[#00BCD4]" />
        </div>

        <h1
          className={`${cormorant.className} text-5xl font-medium leading-none text-white sm:text-6xl`}
        >
          Ready to sign out?
        </h1>

        <SignOutControls />

        <p className="mt-6 text-xs leading-6 text-white/40">
          Signing out will end your current session on this device.
        </p>
      </div>
    </main>
  );
}

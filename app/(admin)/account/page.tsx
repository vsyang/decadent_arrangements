// app/(admin)/account/page.tsx
import "@/app/globals.css";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { authOptions } from "@/app/lib/auth";
import { db } from "@/app/db";
import { users } from "@/app/db/schema";
import AccountForm, { UserProfile } from "./AccountForm";
import { updateAccountAction } from "./actions";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "My Account | Decadent Arrangements",
};

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/");
  }

  const [currentUser] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);

  if (!currentUser) {
    redirect("/");
  }

  // Cumplimos estrictamente con la definición tipada de UserProfile
  const initialData: UserProfile = {
    name: currentUser.name || "",
    email: currentUser.email || "",
    phones: currentUser.phones || [],
    addresses: currentUser.addresses || [],
    preferredContactMethod: (currentUser.preferredContactMethod ??
      "whatsapp") as UserProfile["preferredContactMethod"],
  };

  return (
    <div className="max-w-7xl mx-auto pb-5">
      <section className="relative px-6 py-5 sm:px-10 lg:py-7">
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.34em] text-[#00BCD4]">
          Management
        </p>

        <h1
          className={`${cormorant.className} text-4xl font-medium leading-none tracking-tight text-white sm:text-5xl lg:text-6xl`}
        >
          Account Settings
        </h1>

        <div className="h-[2px] bg-[#00BCD4]/80 to-transparent w-25 mt-5" />
        <p className="text-sm text-white/70 p-4">
          Keep your contact details and delivery preferences up-to-date.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <AccountForm
            initialData={initialData}
            updateAccountAction={updateAccountAction}
          />
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-lg border border-border bg-white/10">
            <h3 className="font-semibold text-white text-sm">
              Security & Access
            </h3>
            <p className="text-xs text-white mt-2">
              Your profile is managed securely via Google authentication. Change
              your password and account credentials directly through your Google
              Account settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

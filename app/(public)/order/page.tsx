// app/(public)/order/page.tsx

// This page controls access to the order form. Visitors can view products on the site, but they must sign in with Google before placing an order.

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import OrderForm from "./OrderForm";

export default async function OrderPage() {
  // Get the current user's login session from NextAuth/Auth.js If the user is signed in, this will contain their account information. If not, session will be null.
  const session = await getServerSession(authOptions);

  // If the user is not signed in, do not show the order form.Instead, show a message explaining that Google login is required.
  if (!session?.user) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12 text-[#545454]">
        <div className="rounded-lg border border-[#03989e]/40 bg-[#ffffff] p-8 shadow-sm">
          {/* Page title for users who are not logged in */}
          <h1 className="mb-4 text-4xl font-bold text-[#545454]">
            Sign In Required
          </h1>

          {/* Explanation of why login is required */}
          <p className="mb-6">
            You can view available products without signing in, but you must log in before placing an order.
          </p>

          {/* Link to the NextAuth/Auth.js sign-in page */}
          <Link
            href="/api/auth/signin"
            className="inline-block rounded-md bg-[#03989e] px-6 py-3 font-semibold text-[#ffffff] hover:opacity-90"
          >
            Sign in with Google
          </Link>
        </div>
      </main>
    );
  }

  // If the user is signed in, show the actual customer order form. The form itself is kept in a separate component because it uses useState.
  return <OrderForm />;
}

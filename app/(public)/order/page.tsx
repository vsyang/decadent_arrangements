// app/(public)/order/page.tsx

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { eq } from "drizzle-orm";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import OrderForm from "./OrderForm";

// This page loads the signed-in user's saved information
// and passes it to the order form so it can be prefilled.
export default async function OrderPage() {
  // Get the current signed-in user.
  const session = await getServerSession(authOptions);

  // If the user is not signed in, redirect them to sign in.
  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }

  // Find the saved user information in the users table.
  const savedUser = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });

  // Get the first saved phone number, if one exists.
  const savedPhone = savedUser?.phones?.[0] ?? "";

  // Get the first saved address, if one exists.
  const savedAddress = savedUser?.addresses?.[0];

  return (
    <OrderForm
      savedCustomer={{
        name: savedUser?.name ?? "",
        // lastname: savedUser?.lastname ?? "",
        email: savedUser?.email ?? session.user.email ?? "",
        phone: savedPhone,
        streetAddress: savedAddress?.streetAddress ?? "",
        city: savedAddress?.city ?? "",
        state: savedAddress?.state ?? "",
        postalCode: savedAddress?.postalCode ?? "",
        deliveryNotes: savedAddress?.deliveryNotes ?? "",
      }}
    />
  );
}

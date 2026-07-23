// app/(admin)/orders/new/page.tsx

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { eq } from "drizzle-orm";

import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { fetchProducts } from "@/db/queries";

import OrderForm from "./OrderForm";

// The catalog sends the selected product ID in the URL:
// /orders/new?productId=...
type OrderPageProps = {
  searchParams: Promise<{
    productId?: string;
  }>;
};

// This page loads the signed-in user's saved information,
// gets the available products, and preselects the product
// the customer chose from the public catalog.
export default async function OrderPage({ searchParams }: OrderPageProps) {
  // Get the current signed-in user.
  const session = await getServerSession(authOptions);

  // If the user is not signed in, redirect them to sign in.
  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }

  // Read the selected product ID from the URL.
  const params = await searchParams;
  const defaultProductId = params.productId ?? "";

  // Find the saved user information in the users table.
  const savedUser = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });

  // Get every available product for the arrangement dropdown.
  const products = await fetchProducts();

  // Make sure the product ID from the URL still exists.
  // If it does not exist, the dropdown will start unselected.
  const selectedProductExists = products.some(
    (product) => product.id === defaultProductId,
  );

  const validDefaultProductId = selectedProductExists ? defaultProductId : "";

  // Get the first saved phone number, if one exists.
  const savedPhone = savedUser?.phones?.[0] ?? "";

  // Get the first saved address, if one exists.
  const savedAddress = savedUser?.addresses?.[0];

  return (
    <OrderForm
      products={products}
      defaultProductId={validDefaultProductId}
      savedCustomer={{
        name: savedUser?.name ?? "",
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

// app/(admin)/orders/new/actions.ts

"use server";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { eq } from "drizzle-orm";

import { authOptions } from "@/lib/auth";
import { sendOwnerEmail } from "@/lib/notification";
import { db } from "@/db";
import { Order, Product, users } from "@/db/schema";

// Creates a customer-friendly order code.
function generateOrderCode() {
  const now = new Date();

  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const datePart = `${yy}${mm}${dd}`;

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Hour to letter
  const hour = now.getHours();
  const hourLetter = alphabet[hour];

  // Minutes to get letter
  const minutes = now.getMinutes();
  let minuteLetter = "";

  if (minutes < 26) {
    // First lap (0 - 25): uppercase (A-Z)
    minuteLetter = alphabet[minutes];
  } else if (minutes >= 26 && minutes < 52) {
    // Second lap (26 - 51): lowwercase (a-z)
    const secondTurnIndex = minutes - 26;
    minuteLetter = alphabet[secondTurnIndex].toLowerCase();
  } else {
    // Third lap (52 - 59): 0 - 7
    const thirdTurnIndex = minutes - 52;
    minuteLetter = String(thirdTurnIndex);
  }

  console.log(`${hourLetter}-${datePart}${minuteLetter}`);

  return `${hourLetter}-${datePart}${minuteLetter}`;
}

// This server action runs when the customer submits the order form.
export async function createOrder(formData: FormData) {
  // Get the current signed-in user.
  const session = await getServerSession(authOptions);

  // Customers must sign in before placing an order.
  if (!session?.user?.id || !session.user.email) {
    redirect("/api/auth/signin");
  }

  // Read customer information.
  const fullName = formData.get("fullName")?.toString().trim() ?? "";

  const email = formData.get("email")?.toString().trim() ?? "";

  const formattedPhone = formData.get("phone")?.toString().trim() ?? "";

  const phone = formattedPhone.replace(/\D/g, "");

  // Read the selected product ID.
  const productId = formData.get("productId")?.toString().trim() ?? "";

  // Read event information.
  const eventDate = formData.get("eventDate")?.toString().trim() ?? "";

  const eventTime = formData.get("eventTime")?.toString().trim() ?? "";

  const specialRequests =
    formData.get("specialRequests")?.toString().trim() ?? "";

  const dietaryRestrictions =
    formData.get("dietaryRestrictions")?.toString().trim() ?? "";

  // Read delivery information.
  const streetAddress = formData.get("streetAddress")?.toString().trim() ?? "";

  const city = formData.get("city")?.toString().trim() ?? "";

  const state = formData.get("state")?.toString().trim() ?? "";

  const postalCode = formData.get("postalCode")?.toString().trim() ?? "";

  const deliveryNotes = formData.get("deliveryNotes")?.toString().trim() ?? "";

  // Validate the phone number.
  const phoneRegex = /^[0-9]{10}$/;

  if (!phoneRegex.test(phone)) {
    throw new Error("Phone number must be exactly 10 digits.");
  }

  // Make sure all required fields were submitted.
  if (
    !fullName ||
    !email ||
    !phone ||
    !productId ||
    !eventDate ||
    !eventTime ||
    !streetAddress ||
    !city ||
    !state ||
    !postalCode
  ) {
    throw new Error("Missing required order information.");
  }

  // Find the product selected by the customer.
  const selectedProducts = await db
    .select({
      id: Product.id,
      name: Product.name,
      capacity: Product.capacity,
      price: Product.price,
    })
    .from(Product)
    .where(eq(Product.id, productId));

  const selectedProduct = selectedProducts[0];

  if (!selectedProduct) {
    throw new Error("The selected product could not be found.");
  }

  // Combine the selected date and time.
  const combinedEventDate = new Date(`${eventDate}T${eventTime}`);

  if (Number.isNaN(combinedEventDate.getTime())) {
    throw new Error("Invalid event date or time.");
  }

  // Orders must be placed at least 10 days ahead.
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const soonestAllowedDate = new Date(today);
  soonestAllowedDate.setDate(soonestAllowedDate.getDate() + 10);

  const selectedEventDate = new Date(eventDate);
  selectedEventDate.setHours(0, 0, 0, 0);

  if (selectedEventDate < soonestAllowedDate) {
    throw new Error("Orders must be placed at least 10 days in advance.");
  }

  // Validate the selected payment method.
  const paymentPreference =
    formData.get("paymentPreference")?.toString().trim().toLowerCase() ?? "";

  if (!["venmo", "paypal", "zelle"].includes(paymentPreference)) {
    throw new Error("Please select a valid payment preference.");
  }

  // Generate the readable confirmation code.
  const readableOrderCode = generateOrderCode();

  // Save the order.
  await db.insert(Order).values({
    readableOrderCode,

    // Connect the order to the signed-in customer.
    userId: session.user.id,

    // Save customer information at the time of purchase.
    customerNameAtPurchase: fullName,
    customerPhoneAtPurchase: phone,
    customerEmailAtPurchase: email,

    // Connect the order to the selected product.
    productId: selectedProduct.id,

    // Save snapshots so old orders remain accurate
    // even if the product is renamed later.
    productNameAtPurchase: selectedProduct.name,
    productCapacityAtPurchase: selectedProduct.capacity,

    specialRequests,

    // Use the price stored on the selected product.
    totalPrice: selectedProduct.price,

    eventDate: combinedEventDate,

    deliveryAddress: {
      id: crypto.randomUUID(),
      label: "Delivery Address",
      streetAddress,
      city,
      state,
      postalCode,
      deliveryNotes,
    },

    dietaryRestrictions: dietaryRestrictions ? [dietaryRestrictions] : [],

    paymentPreference,

    // New orders begin as pending.
    status: "pending",
  });

  // Save the customer's latest information for future autofill.
  await db
    .update(users)
    .set({
      name: fullName,
      phones: [phone],
      addresses: [
        {
          id: crypto.randomUUID(),
          label: "Default Address",
          streetAddress,
          city,
          state,
          postalCode,
          deliveryNotes,
        },
      ],
      updatedAt: new Date(),
    })
    .where(eq(users.id, session.user.id));

  // Notify the owner after the order is saved.
  try {
    await sendOwnerEmail({
      orderCode: readableOrderCode,
    });
  } catch (error) {
    console.error("Failed to send owner email notification:", error);
  }

  // Send the customer to the confirmation page.
  redirect(`/orders/new/confirmation?code=${readableOrderCode}`);
}

// app/(public)/order/actions.ts

"use server";

// This file contains the server action that saves customer orders to the database.

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { Order } from "@/db/schema";

// These values must match the product_size enum in the database schema.
type ArrangementSize = "S" | "M" | "L" | "XL";

// Creates a simple readable order code, such as DA-123456. This is easier for customers and the owner to reference than a long database ID.
function generateOrderCode() {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return `DA-${randomNumber}`;
}

// Converts the form dropdown value into the database enum value.
function getArrangementSizeEnum(size: string): ArrangementSize {
  switch (size) {
    case "10-20":
      return "S";
    case "20-30":
      return "M";
    case "30-40":
      return "L";
    case "50-plus":
      return "XL";
    default:
      throw new Error("Invalid arrangement size.");
  }
}

// Returns the price based on the selected arrangement size.
function getPriceByArrangementSize(size: string) {
  switch (size) {
    case "10-20":
      return "675.00";
    case "20-30":
      return "800.00";
    case "30-40":
      return "1050.00";
    case "50-plus":
      return "0.00";
    default:
      return "0.00";
  }
}

// This server action runs when the customer submits the order form. It reads the form data, validates required fields, saves the order, and redirects the customer to the confirmation page.
export async function createOrder(formData: FormData) {
  // Get the current signed-in user.
  const session = await getServerSession(authOptions);

  // If the user is not signed in, redirect them to the sign-in page.
  if (!session?.user?.id || !session.user.email) {
    redirect("/api/auth/signin");
  }

  // Get customer information from the form.
  const fullName = formData.get("fullName")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const phone = formData.get("phone")?.toString().trim() ?? "";

  const phoneRegex = /^[0-9]{10}$/;

  if (!phoneRegex.test(phone)) {
    throw new Error("Phone number must be exactly 10 digits.");
  }
  // Get arrangement information from the form.
  const arrangementSize =
    formData.get("arrangementSize")?.toString().trim() ?? "";
  const eventDate = formData.get("eventDate")?.toString().trim() ?? "";
  const eventTime = formData.get("eventTime")?.toString().trim() ?? "";
  const specialRequests =
    formData.get("specialRequests")?.toString().trim() ?? "";
  const dietaryRestrictions =
    formData.get("dietaryRestrictions")?.toString().trim() ?? "";
  

  // Get delivery information from the form.
  const streetAddress =
    formData.get("streetAddress")?.toString().trim() ?? "";
  const city = formData.get("city")?.toString().trim() ?? "";
  const state = formData.get("state")?.toString().trim() ?? "";
  const postalCode = formData.get("postalCode")?.toString().trim() ?? "";
  const deliveryNotes =
    formData.get("deliveryNotes")?.toString().trim() ?? "";

  // Basic validation to make sure required fields are present.
  if (
    !fullName ||
    !email ||
    !phone ||
    !arrangementSize ||
    !dietaryRestrictions ||
    !eventDate ||
    !eventTime ||
    !streetAddress ||
    !city ||
    !state ||
    !postalCode
  ) {
    throw new Error("Missing required order information.");
  }

  // Convert the form arrangement size into the database enum value.
  const arrangementSizeEnum = getArrangementSizeEnum(arrangementSize);

  // Combine the event date and event time into one Date object for the database.
  const combinedEventDate = new Date(`${eventDate}T${eventTime}`);

  // Make sure the event date is at least 10 days from today.
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const soonestAllowedDate = new Date(today);
  soonestAllowedDate.setDate(today.getDate() + 10);

  const selectedEventDate = new Date(eventDate);
  selectedEventDate.setHours(0, 0, 0, 0);

  if (selectedEventDate < soonestAllowedDate) {
    throw new Error("Orders must be placed at least 10 days in advance.");
  }
  // Make sure the date is valid before saving it.
  if (Number.isNaN(combinedEventDate.getTime())) {
    throw new Error("Invalid event date or time.");
  }

  // Get the payment preference from the form and validate it.
  const paymentPreference =
    formData.get("paymentPreference")?.toString().trim().toLowerCase() ?? "";
    
  if (!["venmo", "paypal", "zelle"].includes(paymentPreference)) {
    throw new Error("Please select a valid payment preference.");
  }

  // Generate the customer-friendly order code.
  const readableOrderCode = generateOrderCode();

  // Save the order to the database.
  await db.insert(Order).values({
    readableOrderCode,

    // Connect the order to the signed-in user.
    userId: session.user.id,

    // Store customer information at the time of purchase.
    customerNameAtPurchase: fullName,
    customerPhoneAtPurchase: phone,
    customerEmailAtPurchase: email,

    // Store arrangement details. The database uses S, M, L, XL instead of 10-20, 20-30, etc.
    arrangementSize: arrangementSizeEnum,
    specialRequests,

    // Store price.
    totalPrice: getPriceByArrangementSize(arrangementSize),

    // Store event and delivery details.
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

    // Dietary restrictions field.
    dietaryRestrictions: dietaryRestrictions ? [dietaryRestrictions] : [],

    // Store payment preference.
    paymentPreference,

    // New orders start as pending.
    status: "pending",
  });

  // Redirect the customer to the confirmation page after the order is saved.
  redirect(`/order/confirmation?code=${readableOrderCode}`);
}
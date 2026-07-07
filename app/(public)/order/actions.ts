"use server";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { Order } from "@/db/schema";

function generateOrderCode() {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return `DA-${randomNumber}`;
}

function getPriceByArrangementSize(size: string) {
  switch (size) {
    case "10-20":
      return "675.00";
    case "20-30":
      return "800.00";
    case "30-40":
      return "1050.00";
    default:
      return "0.00";
  }
}

export async function createOrder(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || !session.user.email) {
    redirect("/api/auth/signin");
  }

  const fullName = formData.get("fullName")?.toString() ?? "";
  const email = formData.get("email")?.toString() ?? "";
  const phone = formData.get("phone")?.toString() ?? "";
  const arrangementSize = formData.get("arrangementSize")?.toString() ?? "";
  const eventDate = formData.get("eventDate")?.toString() ?? "";
  const eventTime = formData.get("eventTime")?.toString() ?? "";
  const specialRequests = formData.get("specialRequests")?.toString() ?? "";

  const streetAddress = formData.get("streetAddress")?.toString() ?? "";
  const city = formData.get("city")?.toString() ?? "";
  const state = formData.get("state")?.toString() ?? "";
  const postalCode = formData.get("postalCode")?.toString() ?? "";
  const deliveryNotes = formData.get("deliveryNotes")?.toString() ?? "";

  if (
    !fullName ||
    !email ||
    !phone ||
    !arrangementSize ||
    !eventDate ||
    !eventTime ||
    !streetAddress ||
    !city ||
    !state
  ) {
    throw new Error("Missing required order information.");
  }

  const readableOrderCode = generateOrderCode();

  const combinedEventDate = new Date(`${eventDate}T${eventTime}`);

  await db.insert(Order).values({
    readableOrderCode,
    userId: session.user.id,
    customerNameAtPurchase: fullName,
    customerPhoneAtPurchase: phone,
    customerEmailAtPurchase: email,
    arrangementSize,
    specialRequests,
    totalPrice: getPriceByArrangementSize(arrangementSize),
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
    dietaryRestrictions: [],
    status: "pending",
  });

  redirect(`/order/confirmation?code=${readableOrderCode}`);
}
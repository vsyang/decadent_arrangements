// app/(admin)/orders/new/actions.ts

"use server";

import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { db } from "@/app/db";
import { Order, Product, users } from "@/app/db/schema";
import { authOptions } from "@/app/lib/auth";
import {
  sendOwnerEmail,
  sendCustomerConfirmation,
} from "@/app/lib/notification";

export type OrderFormErrors = {
  fullName?: string;
  email?: string;
  phone?: string;
  productId?: string;
  eventDate?: string;
  eventTime?: string;
  dietaryRestrictions?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  paymentPreference?: string;
  agreeToPayment?: string;
  agreeToTermsAndConditions?: string;
  agreeToLegalNotice?: string;
};

export type OrderFormState = {
  errors: OrderFormErrors;
  message?: string;
};

const validStates = new Set([
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
]);

// Creates a customer-friendly order code.
function generateOrderCode() {
  const now = new Date();

  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const datePart = `${yy}${mm}${dd}`;

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Hour to letter.
  const hourLetter = alphabet[now.getHours()];

  // Minutes to letter or number.
  const minutes = now.getMinutes();
  let minuteLetter = "";

  if (minutes < 26) {
    minuteLetter = alphabet[minutes];
  } else if (minutes < 52) {
    minuteLetter = alphabet[minutes - 26].toLowerCase();
  } else {
    minuteLetter = String(minutes - 52);
  }

  return `${hourLetter}${minuteLetter}-${datePart}`;
}

// This server action runs when the customer submits the order form.
export async function createOrder(
  _previousState: OrderFormState,
  formData: FormData,
): Promise<OrderFormState> {
  // Get the current signed-in user.
  const session = await getServerSession(authOptions);

  // Customers must sign in before placing an order.
  if (!session?.user?.id || !session.user.email) {
    redirect("/api/auth/signin");
  }

  // Read customer information.
  const fullName = formData.get("fullName")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";
  const formattedPhone = formData.get("phone")?.toString().trim() ?? "";
  const phone = formattedPhone.replace(/\D/g, "");

  // Read arrangement and event information.
  const productId = formData.get("productId")?.toString().trim() ?? "";
  const eventDate = formData.get("eventDate")?.toString().trim() ?? "";
  const eventHour = formData.get("eventHour")?.toString().trim() ?? "";
  const eventMinute = formData.get("eventMinute")?.toString().trim() ?? "";
  const eventPeriod = formData.get("eventPeriod")?.toString().trim() ?? "";
  const specialRequests =
    formData.get("specialRequests")?.toString().trim() ?? "";
  const dietaryRestrictions =
    formData.get("dietaryRestrictions")?.toString().trim() ?? "";

  // Read delivery information.
  const streetAddress = formData.get("streetAddress")?.toString().trim() ?? "";
  const city = formData.get("city")?.toString().trim() ?? "";
  const state = formData.get("state")?.toString().trim().toUpperCase() ?? "";
  const postalCode = formData.get("postalCode")?.toString().trim() ?? "";
  const deliveryNotes = formData.get("deliveryNotes")?.toString().trim() ?? "";

  // Read payment and agreement information.
  const paymentPreference =
    formData.get("paymentPreference")?.toString().trim().toLowerCase() ?? "";
  const agreeToPayment = formData.get("agreeToPayment") === "on";
  const agreeToTermsAndConditions =
    formData.get("agreeToTermsAndConditions") === "on";
  const agreeToLegalNotice = formData.get("agreeToLegalNotice") === "on";

  const errors: OrderFormErrors = {};

  // Validate customer information.
  if (!fullName) {
    errors.fullName = "Please enter your full name.";
  } else if (fullName.length < 2 || fullName.length > 100) {
    errors.fullName = "Please enter a valid full name.";
  }

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!phone) {
    errors.phone = "Please enter your phone number.";
  } else if (!/^\d{10}$/.test(phone)) {
    errors.phone = "Please enter a valid 10-digit phone number.";
  }

  // Validate arrangement and event information.
  if (!productId) {
    errors.productId = "Please select an arrangement.";
  }

  const validHours = Array.from({ length: 12 }, (_, index) =>
    String(index + 1),
  );
  const validMinutes = ["00", "15", "30", "45"];

  if (!eventDate) {
    errors.eventDate = "Please select an event date.";
  }

  if (
    !validHours.includes(eventHour) ||
    !validMinutes.includes(eventMinute) ||
    !["AM", "PM"].includes(eventPeriod)
  ) {
    errors.eventTime = "Please select a valid event time.";
  }

  if (!dietaryRestrictions) {
    errors.dietaryRestrictions =
      "Please list dietary restrictions or enter None.";
  }

  // Validate delivery information.
  if (!streetAddress) {
    errors.streetAddress = "Please enter the delivery street address.";
  }

  if (!city) {
    errors.city = "Please enter the delivery city.";
  }

  if (!state) {
    errors.state = "Please select a state.";
  } else if (!validStates.has(state)) {
    errors.state = "Please select a valid state.";
  }

  if (!postalCode) {
    errors.postalCode = "Please enter the ZIP code.";
  } else if (!/^\d{5}(-\d{4})?$/.test(postalCode)) {
    errors.postalCode = "Please enter a valid ZIP code.";
  }

  // Validate payment and acknowledgments.
  if (!["venmo", "paypal", "zelle"].includes(paymentPreference)) {
    errors.paymentPreference = "Please select a payment preference.";
  }

  if (!agreeToPayment) {
    errors.agreeToPayment =
      "You must acknowledge that payment is required before work begins.";
  }

  if (!agreeToTermsAndConditions) {
    errors.agreeToTermsAndConditions =
      "You must accept the policies and terms.";
  }

  if (!agreeToLegalNotice) {
    errors.agreeToLegalNotice = "You must acknowledge the legal notice.";
  }

  // Validate the date and the 10-day minimum.
  let selectedEventDate: Date | null = null;
  let combinedEventDate: Date | null = null;

  if (!errors.eventDate && !errors.eventTime) {
    const dateParts = eventDate.split("-").map(Number);
    const [year, month, day] = dateParts;

    if (dateParts.length !== 3 || !year || !month || !day) {
      errors.eventDate = "Please select a valid event date.";
    } else {
      selectedEventDate = new Date(year, month - 1, day);
      selectedEventDate.setHours(0, 0, 0, 0);

      const dateIsValid =
        selectedEventDate.getFullYear() === year &&
        selectedEventDate.getMonth() === month - 1 &&
        selectedEventDate.getDate() === day;

      if (!dateIsValid) {
        errors.eventDate = "Please select a valid event date.";
      } else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const soonestAllowedDate = new Date(today);
        soonestAllowedDate.setDate(soonestAllowedDate.getDate() + 10);

        if (selectedEventDate < soonestAllowedDate) {
          errors.eventDate =
            "Orders must be placed at least 10 days in advance.";
        }

        let hour = Number(eventHour);

        if (eventPeriod === "PM" && hour !== 12) {
          hour += 12;
        }

        if (eventPeriod === "AM" && hour === 12) {
          hour = 0;
        }

        combinedEventDate = new Date(
          year,
          month - 1,
          day,
          hour,
          Number(eventMinute),
          0,
          0,
        );

        if (Number.isNaN(combinedEventDate.getTime())) {
          errors.eventTime = "Please select a valid event time.";
        }
      }
    }
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      message: "Please correct the highlighted fields and submit again.",
    };
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
    return {
      errors: {
        productId: "The selected arrangement could not be found.",
      },
      message: "Please select another arrangement and submit again.",
    };
  }

  // These values are guaranteed by the validation above.
  if (!combinedEventDate) {
    return {
      errors: {
        eventDate: "Please select a valid event date and time.",
      },
      message: "Please correct the highlighted field and submit again.",
    };
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

    // Save snapshots so old orders remain accurate even if the product is renamed later.
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

    dietaryRestrictions: [dietaryRestrictions],

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

  // Send the owner a new order has been made.
  try {
    await sendOwnerEmail({
      orderCode: readableOrderCode,
    });
  } catch (error) {
    console.error("Failed to send owner email notification:", error);
  }

  // Send the customer an order confirmation email.
  try {
    await sendCustomerConfirmation({
      customerEmail: email,
      customerName: fullName,
      customerPhone: phone,
      orderCode: readableOrderCode,
      productName: selectedProduct.name,
      productCapacity: selectedProduct.capacity,
      eventDate: combinedEventDate,
      totalPrice: selectedProduct.price,
      paymentPreference,
      specialRequests,
      dietaryRestrictions,
      streetAddress,
      city,
      state,
      postalCode,
      deliveryNotes,
    });
  } catch (error) {
    console.error("Failed to send customer confirmation email:", error);
  }
  // Send the customer to the confirmation page.
  redirect(`/orders/new/confirmation?code=${readableOrderCode}`);
}

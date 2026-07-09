// app/(public)/order/confirmation/page.tsx

import Link from "next/link";
import { db } from "@/db";
import { Order } from "@/db/schema";
import { eq } from "drizzle-orm";

// This page expects an optional order code from the URL, like: /order/confirmation?code=DA-123456
type ConfirmationPageProps = {
  searchParams: Promise<{
    code?: string;
  }>;
};

// The address that was saved inside the database.
type DeliveryAddress = {
  id?: string;
  label?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  deliveryNotes?: string;
};

// This helper safely formats the delivery address.
function formatDeliveryAddress(address: unknown) {
  const deliveryAddress = address as DeliveryAddress | null;

  if (!deliveryAddress) {
    return "No delivery address listed.";
  }

  const streetAddress = deliveryAddress.streetAddress ?? "";
  const city = deliveryAddress.city ?? "";
  const state = deliveryAddress.state?.toUpperCase() ?? "";
  const postalCode = deliveryAddress.postalCode ?? "";

  const cityStateZip = [city, state, postalCode].filter(Boolean).join(" ");

  if (!streetAddress && !cityStateZip) {
    return "No delivery address listed.";
  }

  return (
    <>
      <br />
      {streetAddress && <>{streetAddress}</>}
      {streetAddress && cityStateZip && <br />}
      {cityStateZip && (
        <>{cityStateZip.replace(`${city} ${state}`, `${city}, ${state}`)}</>
      )}
    </>
  );
}

// This helper turns the database arrangement size into a customer-friendly label.
function formatArrangementSize(size: string) {
  switch (size) {
    case "S":
      return "10-20 people";
    case "M":
      return "20-30 people";
    case "L":
      return "30-40 people";
    case "XL":
      return "Table arrangement, 50+ people";
    default:
      return size;
  }
}

// This helper formats the event date and time in a cleaner way.
function formatEventDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}

// This helper formats a phone number as xxx-xxx-xxxx.
function formatPhoneNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");

  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  // If the phone number is not exactly 10 digits, show it the way it was saved instead of breaking the page.
  return phone;
}

// Displays a thank-you message, order code, and a summary of the order details.
export default async function ConfirmationPage({
  searchParams,
}: ConfirmationPageProps) {
  // Get the search parameters from the URL.
  const params = await searchParams;

  // Get the order code from the URL. If no code is found, use an empty string so we do not search with "Unavailable".
  const orderCode = params.code ?? "";

  // Look up the order in the database using the readable order code.
  const foundOrders = orderCode
    ? await db
        .select()
        .from(Order)
        .where(eq(Order.readableOrderCode, orderCode))
        .limit(1)
    : [];

  // Get the first matching order, or undefined if no order was found.
  const order = foundOrders[0];

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 text-[#545454]">
      {/* Main confirmation card */}
      <div className="rounded-lg border border-[#03989e]/40 bg-[#ffffff] p-8 shadow-sm">
        {/* Page title */}
        <h1 className="mb-4 text-4xl font-bold text-[#545454]">
          Order Submitted
        </h1>

        {/* Thank-you message */}
        <p className="mb-4 text-lg">
          Thank you for placing an order with Decadent Arrangements.
        </p>

        {/* Order code section */}
        <div className="mb-6 rounded-lg bg-[#03989e]/10 p-4">
          <p className="font-semibold text-[#545454]">
            Your order confirmation code:
          </p>

          <p className="mt-1 text-2xl font-bold text-[#03989e]">
            {orderCode || "Unavailable"}
          </p>
        </div>

        {/* If the order was found, show the order details */}
        {order ? (
          <div className="mb-6 rounded-lg border border-[#807973]/30 bg-[#ffffff] p-5 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-[#545454]">
              Order Summary
            </h2>

            <div className="space-y-3">
              {/* Customer name */}
              <p>
                <span className="font-semibold">Customer Name:</span>{" "}
                {order.customerNameAtPurchase}
              </p>

              {/* Customer phone */}
              <p>
                <span className="font-semibold">Phone Number:</span>{" "}
                {formatPhoneNumber(order.customerPhoneAtPurchase)}
              </p>

              {/* Customer email */}
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {order.customerEmailAtPurchase}
              </p>

              {/* Delivery address */}
              <p>
                <span className="font-semibold">Delivery Address:</span>{" "}
                {formatDeliveryAddress(order.deliveryAddress)}
              </p>

              {/* Delivery notes */}
              {(order.deliveryAddress as DeliveryAddress | null)
                ?.deliveryNotes && (
                <p>
                  <span className="font-semibold">Delivery Notes:</span>{" "}
                  {(order.deliveryAddress as DeliveryAddress).deliveryNotes}
                </p>
              )}

              {/* Arrangement size / number of people */}
              <p>
                <span className="font-semibold">Serving Size:</span>{" "}
                {formatArrangementSize(order.arrangementSize)}
              </p>

              {/* Event date and time */}
              <p>
                <span className="font-semibold">Event Date and Time:</span>{" "}
                {formatEventDate(order.eventDate)}
              </p>

              {/* Special requests / restrictions */}
              <p>
                <span className="font-semibold">
                  Special Requests or Restrictions:
                </span>{" "}
                {order.specialRequests || "None listed"}
              </p>

              {/* Total price */}
              <p>
                <span className="font-semibold">Estimated Total:</span> $
                {order.totalPrice}
              </p>

              {/* Order status */}
              <p>
                <span className="font-semibold">Order Status:</span>{" "}
                <span className="capitalize">{order.status}</span>
              </p>
            </div>
          </div>
        ) : (
          // If the order was not found, show a friendly message instead of breaking the page.
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            We could not find order details for this confirmation code. Please
            contact Decadent Arrangements if you need help confirming your
            order.
          </div>
        )}

        {/* Order status message */}
        <p className="mb-4">
          Your order has been received and is currently pending. Decadent
          Arrangements will review your order details and confirm availability.
        </p>

        {/* Payment instruction message */}
        <p className="mb-6">
          Please follow the payment instructions provided by the business owner.
          Your order will not begin until payment is received.
        </p>

        {/* Link back to the catalog page */}
        <Link
          href="/catalog"
          className="inline-block rounded-md bg-[#03989e] px-6 py-3 font-semibold text-[#ffffff] hover:opacity-90"
        >
          Back to Catalog
        </Link>
      </div>
    </main>
  );
}

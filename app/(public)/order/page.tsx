// app/(public)/order/page.tsx

"use client";

import { useState } from "react";

// This page will display the customer order form.
// Customers will use this form to request an arrangement and let the business owner know the delivery details.
export default function OrderPage() {
  // Tracks which arrangement size the customer selected.
  const [arrangementSize, setArrangementSize] = useState("");

  // Checks if the customer selected the table arrangement option.
  const isTableArrangement = arrangementSize === "50-plus";

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 text-[#545454]">
      {/* Page title */}
      <h1 className="mb-6 text-4xl font-bold text-[#545454]">Place an Order</h1>

      {/* Main order form */}
      <form className="space-y-6">
        {/* Customer information section */}
        <div className="rounded-lg border border-[#807973]/30 bg-[#ffffff] p-6 shadow-sm">
          <h3 className="mb-4 text-2xl font-semibold text-[#545454]">
            Customer Information
          </h3>

          {/* Basic customer information */}
          <div className="mb-4">
            <label className="mb-1 block font-medium text-[#545454]">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              required
              className="w-full rounded-md border border-[#807973]/40 px-3 py-2 text-[#000000] focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
            />
          </div>

          <div className="mb-4">
            <label className="mb-1 block font-medium text-[#545454]">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-md border border-[#807973]/40 px-3 py-2 text-[#000000] focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
            />
          </div>

          <div className="mb-4">
            <label className="mb-1 block font-medium text-[#545454]">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              required
              className="w-full rounded-md border border-[#807973]/40 px-3 py-2 text-[#000000] focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
            />
          </div>
        </div>

        {/* Arrangement information section */}
        <div className="rounded-lg border border-[#807973]/30 bg-[#ffffff] p-6 shadow-sm">
          <h3 className="mb-4 text-2xl font-semibold text-[#545454]">
            Arrangement Information
          </h3>

          {/* Customer selects the arrangement size */}
          <div className="mb-4">
            <label className="mb-1 block font-medium text-[#545454]">
              Arrangement Size
            </label>
            <select
              name="arrangementSize"
              value={arrangementSize}
              onChange={(event) => setArrangementSize(event.target.value)}
              required
              className="w-full rounded-md border border-[#807973]/40 px-3 py-2 text-[#000000] focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
            >
              <option value="">Select a size</option>
              <option value="10-15">10-15 people</option>
              <option value="15-20">15-20 people</option>
              <option value="20-30">20-30 people</option>
              <option value="50-plus">Table arrangement, 50+ people</option>
            </select>
          </div>

          {/* Shows a consultation message instead of the regular order fields for table arrangements */}
          {isTableArrangement ? (
            <div className="mt-6 rounded-lg border border-[#03989e]/40 bg-[#03989e]/10 p-5">
              <h4 className="mb-2 text-xl font-semibold text-[#545454]">
                Consultation Required
              </h4>

              <p className="mb-4 text-[#545454]">
                Table arrangements require more customization and must be
                discussed before the order can be confirmed. Please contact
                Decadent Arrangements directly so the owner can review your
                event details, guest count, design preferences, delivery needs,
                and final pricing.
              </p>

              <a
                href="mailto:decadentarrangements2023@gmail.com?subject=Table%20Arrangement%20Consultation%20Request&body=Hello%20Decadent%20Arrangements%2C%0A%0AI%20am%20interested%20in%20a%20table%20arrangement%20for%2050%2B%20people.%20Please%20contact%20me%20to%20discuss%20customization%2C%20pricing%2C%20and%20delivery.%0A%0AThank%20you!"
                className="inline-block rounded-md bg-[#03989e] px-5 py-3 font-semibold text-[#ffffff] hover:opacity-90"
              >
                Email Decadent Arrangements
              </a>
            </div>
          ) : (
            <>
              {/* Event date and event time are split into two inputs for better spacing */}
              <div className="grid gap-8 md:grid-cols-2">
                <div className="mb-4">
                  <label className="mb-1 block font-medium text-[#545454]">
                    Event Date
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    required
                    className="w-full rounded-md border border-[#807973]/40 px-3 py-2 text-[#000000] focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
                  />
                </div>

                <div className="mb-4">
                  <label className="mb-1 block font-medium text-[#545454]">
                    Event Time
                  </label>
                  <input
                    type="time"
                    name="eventTime"
                    required
                    className="w-full rounded-md border border-[#807973]/40 px-3 py-2 text-[#000000] focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
                  />
                </div>
              </div>

              {/* Special requests */}
              <div className="mb-4">
                <label className="mb-1 block font-medium text-[#545454]">
                  Special Requests
                </label>
                <textarea
                  name="specialRequests"
                  rows={4}
                  placeholder="Colors, theme, allergies, dietary restrictions, or other details."
                  className="w-full rounded-md border border-[#807973]/40 px-3 py-2 text-[#000000] placeholder:text-[#807973] focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
                />
              </div>
            </>
          )}
        </div>

        {/* Only show delivery and payment sections if table arrangement is NOT selected */}
        {!isTableArrangement && (
          <>
            {/* Delivery information section */}
            <div className="rounded-lg border border-[#807973]/30 bg-[#ffffff] p-6 shadow-sm">
              <h3 className="mb-4 text-2xl font-semibold text-[#545454]">
                Delivery Information
              </h3>

              {/* Delivery address */}
              <div className="mb-4">
                <label className="mb-1 block font-medium text-[#545454]">
                  Street Address
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  required
                  className="w-full rounded-md border border-[#807973]/40 px-3 py-2 text-[#000000] focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="mb-4">
                  <label className="mb-1 block font-medium text-[#545454]">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    className="w-full rounded-md border border-[#807973]/40 px-3 py-2 text-[#000000] focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
                  />
                </div>

                <div className="mb-4">
                  <label className="mb-1 block font-medium text-[#545454]">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    className="w-full rounded-md border border-[#807973]/40 px-3 py-2 text-[#000000] focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
                  />
                </div>

                <div className="mb-4">
                  <label className="mb-1 block font-medium text-[#545454]">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    className="w-full rounded-md border border-[#807973]/40 px-3 py-2 text-[#000000] focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
                  />
                </div>
              </div>

              {/* Extra delivery instructions */}
              <div className="mb-4">
                <label className="mb-1 block font-medium text-[#545454]">
                  Delivery Notes
                </label>
                <textarea
                  name="deliveryNotes"
                  rows={3}
                  placeholder="Apartment number, gate code, or drop-off instructions."
                  className="w-full rounded-md border border-[#807973]/40 px-3 py-2 text-[#000000] placeholder:text-[#807973] focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
                />
              </div>
            </div>

            {/* Payment confirmation section */}
            <div className="rounded-lg border border-[#03989e]/40 bg-[#03989e]/10 p-6 shadow-sm">
              <h3 className="mb-4 text-2xl font-semibold text-[#545454]">
                Payment Notice
              </h3>

              {/* Required confirmation checkbox */}
              <label className="flex gap-5 text-[#545454]">
                <input
                  type="checkbox"
                  name="agreeToPayment"
                  required
                  className="mt-1 accent-[#03989e]"
                />
                <span>
                  I understand that my order will not begin until payment is
                  received. (We can add something else like: Venmo instructions will be provided after the order is submitted.)
                </span>
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="rounded-md bg-[#03989e] px-6 py-3 font-semibold text-[#ffffff] hover:opacity-90"
            >
              Submit Order
            </button>
          </>
        )}
      </form>
    </main>
  );
}

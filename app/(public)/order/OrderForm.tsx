// app/(public)/order/OrderForm.tsx

"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { createOrder } from "./actions";
// If repeat customer information is available, it will be passed to the order form so it can be prefilled.
type SavedCustomer = {
  name: string;
  // lastname: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  deliveryNotes: string;
};

type OrderFormProps = {
  savedCustomer?: SavedCustomer;
};

// This displays the customer order form.
export default function OrderForm({ savedCustomer }: OrderFormProps) {
  // Reads the arrangement size from the URL if the customer came from the catalog page.
  const searchParams = useSearchParams();
  const querySize = searchParams.get("arrangement") || "";

  // Tracks which arrangement size the customer selected.
  const [arrangementSize, setArrangementSize] = useState(querySize);

  // Tracks the customer's phone number.
  const [phone, setPhone] = useState(savedCustomer?.phone ?? "");

  // Checks if the customer selected the table arrangement option.
  const isTableArrangement = arrangementSize === "50-plus";

  // Calculates the soonest event date allowed. Customers must order at least 10 days in advance.
  const today = new Date();
  const soonestAllowedDate = new Date(today);
  soonestAllowedDate.setDate(today.getDate() + 10);

  // Formats the date as YYYY-MM-DD.
  const minimumEventDate = soonestAllowedDate.toISOString().split("T")[0];

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 text-[#545454]">
      {/* Page title */}
      <h1 className="mb-6 text-4xl font-bold text-[#545454]">Place an Order</h1>

      {/* Main order form */}
      <form action={createOrder} className="space-y-6">
        {/* Customer information section */}
        <div className="rounded-lg border border-[#807973]/30 bg-[#ffffff] p-6 shadow-sm">
          <h3 className="mb-4 text-2xl font-semibold text-[#545454]">
            Customer Information
          </h3>

          {/* Customer full name */}
          <div className="mb-4">
            <label className="mb-1 block font-medium text-[#545454]">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              required
              defaultValue={savedCustomer?.name ?? ""}
              className="w-full rounded-md border border-[#807973]/40 px-3 py-2 text-[#000000] focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
            />
          </div>
          {/* <div className="mb-4">
            <label className="mb-1 block font-medium text-[#545454]">
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              required
              defaultValue={savedCustomer?.lastname ?? ""}
              className="w-full rounded-md border border-[#807973]/40 px-3 py-2 text-[#000000] focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
            />
          </div> */}

          {/* Customer email */}
          <div className="mb-4">
            <label className="mb-1 block font-medium text-[#545454]">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              defaultValue={savedCustomer?.email ?? ""}
              className="w-full rounded-md border border-[#807973]/40 px-3 py-2 text-[#000000] focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
            />
          </div>

          {/* Customer phone number */}
          <div className="mb-4">
            <label className="mb-1 block font-medium text-[#545454]">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={(event) => {
                // Removes anything that is not a number.
                const numbersOnly = event.target.value.replace(/\D/g, "");

                // Limits the phone number to 10 digits.
                setPhone(numbersOnly.slice(0, 10));
              }}
              required
              inputMode="numeric"
              pattern="[0-9]{10}"
              maxLength={10}
              placeholder="Enter 10 digit phone number"
              className="w-full rounded-md border border-[#807973]/40 px-3 py-2 text-[#000000] focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
            />
          </div>
        </div>

        {/* Arrangement information section */}
        <div className="rounded-lg border border-[#807973]/30 bg-[#ffffff] p-6 shadow-sm">
          <h3 className="mb-4 text-2xl font-semibold text-[#545454]">
            Arrangement Information
          </h3>

          {/* Arrangement size dropdown */}
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
              <option value="" disabled>
                Select a size
              </option>
              <option value="10-20">10-20 people</option>
              <option value="20-30">20-30 people</option>
              <option value="30-40">30-40 people</option>
              <option value="50-plus">Table arrangement, 50+ people</option>
            </select>
          </div>

          {/* If table arrangement is selected, show consultation message instead of normal order fields */}
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
              {/* Event date and time fields */}
              <div className="grid gap-8 md:grid-cols-2">
                <div className="mb-4">
                  <label className="mb-1 block font-medium text-[#545454]">
                    Event Date
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    min={minimumEventDate}
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
                  placeholder="Colors, theme, or other details."
                  className="w-full rounded-md border border-[#807973]/40 px-3 py-2 text-[#000000] placeholder:text-[#807973] focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
                />
              </div>

              {/* Dietary restrictions */}
              <div className="mb-4">
                <label className="mb-1 block font-medium text-[#545454]">
                  Dietary Restrictions
                </label>
                <textarea
                  name="dietaryRestrictions"
                  rows={4}
                  placeholder="Any dietary restrictions or allergies. If none, type 'None'."
                  required
                  className="w-full rounded-md border border-[#807973]/40 px-3 py-2 text-[#000000] placeholder:text-[#807973] focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
                />
              </div>
            </>
          )}
        </div>

        {/* Only show delivery, payment, and submit button if table arrangement is not selected */}
        {!isTableArrangement && (
          <>
            {/* Delivery information section */}
            <div className="rounded-lg border border-[#807973]/30 bg-[#ffffff] p-6 shadow-sm">
              <h3 className="mb-4 text-2xl font-semibold text-[#545454]">
                Delivery Information
              </h3>

              {/* Street address */}
              <div className="mb-4">
                <label className="mb-1 block font-medium text-[#545454]">
                  Street Address
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  required
                  defaultValue={savedCustomer?.streetAddress ?? ""}
                  className="w-full rounded-md border border-[#807973]/40 px-3 py-2 text-[#000000] focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
                />
              </div>

              {/* City, state, and zip code */}
              <div className="grid gap-4 md:grid-cols-3">
                {/* City */}
                <div className="mb-4">
                  <label className="mb-1 block font-medium text-[#545454]">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    defaultValue={savedCustomer?.city ?? ""}
                    className="h-10 w-full rounded-md border border-[#807973]/40 px-3 py-2 text-[#000000] focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
                  />
                </div>

                {/* State dropdown */}
                <div className="mb-4">
                  <label className="mb-1 block font-medium text-[#545454]">
                    State
                  </label>
                  <select
                    name="state"
                    required
                    defaultValue={savedCustomer?.state ?? ""}
                    className="h-10 w-full rounded-md border border-[#807973]/40 px-3 py-2 text-[#000000] focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
                  >
                    <option value="">Select a state</option>
                    <option value="AL">AL</option>
                    <option value="AK">AK</option>
                    <option value="AZ">AZ</option>
                    <option value="AR">AR</option>
                    <option value="CA">CA</option>
                    <option value="CO">CO</option>
                    <option value="CT">CT</option>
                    <option value="DE">DE</option>
                    <option value="FL">FL</option>
                    <option value="GA">GA</option>
                    <option value="HI">HI</option>
                    <option value="ID">ID</option>
                    <option value="IL">IL</option>
                    <option value="IN">IN</option>
                    <option value="IA">IA</option>
                    <option value="KS">KS</option>
                    <option value="KY">KY</option>
                    <option value="LA">LA</option>
                    <option value="ME">ME</option>
                    <option value="MD">MD</option>
                    <option value="MA">MA</option>
                    <option value="MI">MI</option>
                    <option value="MN">MN</option>
                    <option value="MS">MS</option>
                    <option value="MO">MO</option>
                    <option value="MT">MT</option>
                    <option value="NE">NE</option>
                    <option value="NV">NV</option>
                    <option value="NH">NH</option>
                    <option value="NJ">NJ</option>
                    <option value="NM">NM</option>
                    <option value="NY">NY</option>
                    <option value="NC">NC</option>
                    <option value="ND">ND</option>
                    <option value="OH">OH</option>
                    <option value="OK">OK</option>
                    <option value="OR">OR</option>
                    <option value="PA">PA</option>
                    <option value="RI">RI</option>
                    <option value="SC">SC</option>
                    <option value="SD">SD</option>
                    <option value="TN">TN</option>
                    <option value="TX">TX</option>
                    <option value="UT">UT</option>
                    <option value="VT">VT</option>
                    <option value="VA">VA</option>
                    <option value="WA">WA</option>
                    <option value="WV">WV</option>
                    <option value="WI">WI</option>
                    <option value="WY">WY</option>
                  </select>
                </div>

                {/* Zip code */}
                <div className="mb-4">
                  <label className="mb-1 block font-medium text-[#545454]">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    defaultValue={savedCustomer?.postalCode ?? ""}
                    className="h-10 w-full rounded-md border border-[#807973]/40 px-3 py-2 text-[#000000] focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
                  />
                </div>
              </div>

              {/* Delivery notes */}
              <div className="mb-4">
                <label className="mb-1 block font-medium text-[#545454]">
                  Delivery Notes
                </label>
                <textarea
                  name="deliveryNotes"
                  rows={3}
                  defaultValue={savedCustomer?.deliveryNotes ?? ""}
                  placeholder="Apartment number, gate code, or drop-off instructions."
                  className="w-full rounded-md border border-[#807973]/40 px-3 py-2 text-[#000000] placeholder:text-[#807973] focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
                />
              </div>
            </div>

            {/* Payment preference section */}
            <div className="rounded-lg border border-[#807973]/30 bg-[#ffffff] p-6 shadow-sm">
              <h3 className="mb-4 text-2xl font-semibold text-[#545454]">
                Payment Preference
              </h3>

              <p className="mb-4 text-[#545454]">
                Please select your preferred payment method. Payment
                instructions will be provided after your order is reviewed.
              </p>

              <div className="space-y-3">
                {/* Venmo option */}
                <label className="flex items-center gap-3 rounded-md border border-[#807973]/30 p-4 text-[#545454] hover:border-[#03989e]/60">
                  <input
                    type="radio"
                    name="paymentPreference"
                    value="venmo"
                    required
                    className="accent-[#03989e]"
                  />
                  <span className="font-medium">Venmo</span>
                </label>

                {/* PayPal option */}
                <label className="flex items-center gap-3 rounded-md border border-[#807973]/30 p-4 text-[#545454] hover:border-[#03989e]/60">
                  <input
                    type="radio"
                    name="paymentPreference"
                    value="paypal"
                    required
                    className="accent-[#03989e]"
                  />
                  <span className="font-medium">PayPal</span>
                </label>

                {/* Zelle option */}
                <label className="flex items-center gap-3 rounded-md border border-[#807973]/30 p-4 text-[#545454] hover:border-[#03989e]/60">
                  <input
                    type="radio"
                    name="paymentPreference"
                    value="zelle"
                    required
                    className="accent-[#03989e]"
                  />
                  <span className="font-medium">Zelle</span>
                </label>
              </div>
            </div>

            {/* Payment notice section */}
            <div className="rounded-lg border border-[#03989e]/40 bg-[#03989e]/10 p-6 shadow-sm">
              <h3 className="mb-4 text-2xl font-semibold text-[#545454]">
                Payment Notice
              </h3>

              {/* Customer must confirm payment requirement before submitting */}
              <label className="flex gap-5 text-[#545454]">
                <input
                  type="checkbox"
                  name="agreeToPayment"
                  required
                  className="mt-1 accent-[#03989e]"
                />
                <span>
                  I understand that my order will not begin until payment is
                  received.
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

// app/(admin)/orders/new/OrderForm.tsx

"use client";

import { useState } from "react";
import { createOrder } from "./actions";

// Information for one product shown in the arrangement dropdown.
type OrderProduct = {
  id: string;
  name: string;
  capacity: string;
  price: number;
  imageUrl?: string | null;
};

// Saved repeat-customer information passed from the page.
type SavedCustomer = {
  name: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  deliveryNotes: string;
};

type OrderFormProps = {
  products: OrderProduct[];
  defaultProductId?: string;
  savedCustomer?: SavedCustomer;
};

// Displays the customer order form.
export default function OrderForm({
  products,
  defaultProductId = "",
  savedCustomer,
}: OrderFormProps) {
  // Tracks the product selected by the customer.
  const [selectedProductId, setSelectedProductId] = useState(defaultProductId);

  // Tracks and formats the customer's phone number.
  function formatPhoneNumber(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 10);

    if (digits.length <= 3) {
      return digits;
    }

    if (digits.length <= 6) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    }

    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  const [phone, setPhone] = useState(
    formatPhoneNumber(savedCustomer?.phone ?? ""),
  );

  // Find the complete product that matches the selected ID.
  const selectedProduct = products.find(
    (product) => product.id === selectedProductId,
  );

  // Table arrangements require a consultation instead of the normal online order process.
  const isTableArrangement = selectedProduct?.capacity === "50-plus";

  // Customers must place an order at least 10 days ahead.
  const today = new Date();
  const soonestAllowedDate = new Date(today);

  soonestAllowedDate.setDate(today.getDate() + 10);

  // Format the minimum date as YYYY-MM-DD for the date input.
  const minimumEventDate = soonestAllowedDate.toISOString().split("T")[0];

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 text-[#545454]">
      {/* Page title */}
      <h1 className="mb-6 text-4xl font-bold text-[#545454]">Place an Order</h1>

      {/* Main order form */}
      <form action={createOrder} className="space-y-6">
        {/* Customer information */}
        <div className="rounded-lg border border-[#807973]/30 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-2xl font-semibold text-[#545454]">
            Customer Information
          </h3>

          {/* Customer full name */}
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="mb-1 block font-medium text-[#545454]"
            >
              Full Name
            </label>

            <input
              id="fullName"
              type="text"
              name="fullName"
              required
              defaultValue={savedCustomer?.name ?? ""}
              className="w-full rounded-md border border-[#807973]/40 px-3 py-2 text-black focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
            />
          </div>

          {/* Customer email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-1 block font-medium text-[#545454]"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              required
              defaultValue={savedCustomer?.email ?? ""}
              className="w-full rounded-md border border-[#807973]/40 px-3 py-2 text-black focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
            />
          </div>

          {/* Customer phone number */}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="mb-1 block font-medium text-[#545454]"
            >
              Phone Number
            </label>

            <input
              id="phone"
              type="tel"
              name="phone"
              value={phone}
              onChange={(event) => {
                setPhone(formatPhoneNumber(event.target.value));
              }}
              required
              inputMode="numeric"
              maxLength={12}
              placeholder="123-456-7890"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              className="w-full rounded-md border border-[#807973]/40 px-3 py-2 text-black focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
            />
          </div>
        </div>

        {/* Arrangement information */}
        <div className="rounded-lg border border-[#807973]/30 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-2xl font-semibold text-[#545454]">
            Arrangement Information
          </h3>

          {/* Product dropdown */}
          <div className="mb-4">
            <label
              htmlFor="productId"
              className="mb-1 block font-medium text-[#545454]"
            >
              Arrangement
            </label>

            <select
              id="productId"
              name="productId"
              value={selectedProductId}
              onChange={(event) => setSelectedProductId(event.target.value)}
              required
              className="w-full rounded-md border border-[#807973]/40 px-3 py-2 text-black focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
            >
              <option value="" disabled>
                Select an arrangement
              </option>

              {/* Products come directly from the database. */}
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} —{" "}
                  {product.capacity === "50-plus"
                    ? "50+ people"
                    : `${product.capacity} people`}
                </option>
              ))}
            </select>
          </div>

          {/* Show information about the currently selected product. */}
          {selectedProduct && (
            <div className="mb-4 rounded-md bg-slate-50 p-4 text-sm">
              <p>
                <span className="font-semibold">Selected Product:</span>{" "}
                {selectedProduct.name}
              </p>

              <p className="mt-1">
                <span className="font-semibold">Capacity:</span>{" "}
                {selectedProduct.capacity === "50-plus"
                  ? "50+ people"
                  : `${selectedProduct.capacity} people`}
              </p>

              <p className="mt-1">
                <span className="font-semibold">Price:</span>{" "}
                {selectedProduct.price > 0
                  ? `$${Number(selectedProduct.price).toFixed(2)}`
                  : "Upon request"}
              </p>
            </div>
          )}

          {/* Table arrangements require direct consultation with owner. */}
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
                className="inline-block rounded-md bg-[#03989e] px-5 py-3 font-semibold text-white hover:opacity-90"
              >
                Email Decadent Arrangements
              </a>
            </div>
          ) : (
            <>
              {/* Event date and time */}
              <div className="grid gap-8 md:grid-cols-2">
                <div className="mb-4">
                  <label
                    htmlFor="eventDate"
                    className="mb-1 block font-medium text-[#545454]"
                  >
                    Event Date
                  </label>

                  <input
                    id="eventDate"
                    type="date"
                    name="eventDate"
                    min={minimumEventDate}
                    required
                    className="w-full rounded-md border border-[#807973]/40 px-3 py-2 text-black focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
                  />
                </div>

                <div className="mb-4">
                  <label className="mb-1 block font-medium text-[#545454]">
                    Event Time
                  </label>

                  <div className="grid grid-cols-3 gap-3">
                    {/* Hour */}
                    <select
                      name="eventHour"
                      required
                      defaultValue=""
                      className="w-full rounded-md border border-[#807973]/40 px-3 py-2 text-black focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
                    >
                      <option value="" disabled>
                        Hour
                      </option>

                      {Array.from({ length: 12 }, (_, index) => {
                        const hour = index + 1;

                        return (
                          <option key={hour} value={hour}>
                            {hour}
                          </option>
                        );
                      })}
                    </select>

                    {/* Minutes */}
                    <select
                      name="eventMinute"
                      required
                      defaultValue=""
                      className="w-full rounded-md border border-[#807973]/40 px-3 py-2 text-black focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
                    >
                      <option value="" disabled>
                        Minutes
                      </option>

                      <option value="00">00</option>
                      <option value="15">15</option>
                      <option value="30">30</option>
                      <option value="45">45</option>
                    </select>

                    <select
                      name="eventPeriod"
                      required
                      defaultValue=""
                      className="w-full rounded-md border border-[#807973]/40 px-3 py-2 text-black focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
                    >
                      <option value="" disabled>
                        AM/PM
                      </option>

                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Special requests */}
              <div className="mb-4">
                <label
                  htmlFor="specialRequests"
                  className="mb-1 block font-medium text-[#545454]"
                >
                  Special Requests
                </label>

                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  rows={4}
                  placeholder="Colors, theme, or other details."
                  className="w-full rounded-md border border-[#807973]/40 px-3 py-2 text-black placeholder:text-[#807973] focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
                />
              </div>

              {/* Dietary restrictions */}
              <div className="mb-4">
                <label
                  htmlFor="dietaryRestrictions"
                  className="mb-1 block font-medium text-[#545454]"
                >
                  Dietary Restrictions
                </label>

                <textarea
                  id="dietaryRestrictions"
                  name="dietaryRestrictions"
                  rows={4}
                  placeholder="Any dietary restrictions or allergies. If none, type 'None'."
                  required
                  className="w-full rounded-md border border-[#807973]/40 px-3 py-2 text-black placeholder:text-[#807973] focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
                />
              </div>
            </>
          )}
        </div>

        {/* Hide the rest of the order form for consultation products. */}
        {!isTableArrangement && (
          <>
            {/* Delivery information */}
            <div className="rounded-lg border border-[#807973]/30 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-2xl font-semibold text-[#545454]">
                Delivery Information
              </h3>

              {/* Street address */}
              <div className="mb-4">
                <label
                  htmlFor="streetAddress"
                  className="mb-1 block font-medium text-[#545454]"
                >
                  Street Address
                </label>

                <input
                  id="streetAddress"
                  type="text"
                  name="streetAddress"
                  required
                  defaultValue={savedCustomer?.streetAddress ?? ""}
                  className="w-full rounded-md border border-[#807973]/40 px-3 py-2 text-black focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
                />
              </div>

              {/* City, state, and ZIP */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="mb-4">
                  <label
                    htmlFor="city"
                    className="mb-1 block font-medium text-[#545454]"
                  >
                    City
                  </label>

                  <input
                    id="city"
                    type="text"
                    name="city"
                    required
                    defaultValue={savedCustomer?.city ?? ""}
                    className="h-10 w-full rounded-md border border-[#807973]/40 px-3 py-2 text-black focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="state"
                    className="mb-1 block font-medium text-[#545454]"
                  >
                    State
                  </label>

                  <select
                    id="state"
                    name="state"
                    required
                    defaultValue={savedCustomer?.state ?? ""}
                    className="h-10 w-full rounded-md border border-[#807973]/40 px-3 py-2 text-black focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
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

                <div className="mb-4">
                  <label
                    htmlFor="postalCode"
                    className="mb-1 block font-medium text-[#545454]"
                  >
                    Zip Code
                  </label>

                  <input
                    id="postalCode"
                    type="text"
                    name="postalCode"
                    required
                    defaultValue={savedCustomer?.postalCode ?? ""}
                    className="h-10 w-full rounded-md border border-[#807973]/40 px-3 py-2 text-black focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
                  />
                </div>
              </div>

              {/* Delivery notes */}
              <div className="mb-4">
                <label
                  htmlFor="deliveryNotes"
                  className="mb-1 block font-medium text-[#545454]"
                >
                  Delivery Notes
                </label>

                <textarea
                  id="deliveryNotes"
                  name="deliveryNotes"
                  rows={3}
                  defaultValue={savedCustomer?.deliveryNotes ?? ""}
                  placeholder="Apartment number, gate code, or drop-off instructions."
                  className="w-full rounded-md border border-[#807973]/40 px-3 py-2 text-black placeholder:text-[#807973] focus:border-[#03989e] focus:outline-none focus:ring-2 focus:ring-[#03989e]/30"
                />
              </div>
            </div>

            {/* Payment preference */}
            <div className="rounded-lg border border-[#807973]/30 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-2xl font-semibold text-[#545454]">
                Payment Preference
              </h3>

              <p className="mb-4 text-[#545454]">
                Please select your preferred payment method. Payment
                instructions will be provided after your order is reviewed.
              </p>

              <div className="space-y-3">
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

            {/* Payment confirmation */}
            <div className="rounded-lg border border-[#03989e]/40 bg-[#03989e]/10 p-6 shadow-sm">
              <h3 className="mb-4 text-2xl font-semibold text-[#545454]">
                Payment Notice
              </h3>

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

            {/* Submit order */}
            <button
              type="submit"
              className="rounded-md bg-[#03989e] px-6 py-3 font-semibold text-white hover:opacity-90"
            >
              Submit Order
            </button>
          </>
        )}
      </form>
    </main>
  );
}

// app/(admin)/orders/new/OrderForm.tsx

"use client";

import "@/app/globals.css";

import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Mail,
  Users,
} from "lucide-react";
import { useState } from "react";

import { cormorant, montserrat } from "@/app/ui/home/fonts";
import { createOrder } from "./actions";
import Link from "next/link";

type OrderProduct = {
  id: string;
  name: string;
  capacity: string;
  price: number;
  imageUrl?: string | null;
};

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

const inputClassName =
  "w-full border border-black/20 bg-[#fffdf9] px-4 py-3 text-sm text-[#252525] outline-none transition duration-300 placeholder:text-[#807973]/70 focus:border-[#007C91] focus:ring-1 focus:ring-[#007C91]";

const labelClassName =
  "mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#545454]";

const sectionClassName =
  "border border-black/15 bg-[#f4f0ea] px-6 py-8 sm:px-8 sm:py-10";

export default function OrderForm({
  products,
  defaultProductId = "",
  savedCustomer,
}: OrderFormProps) {
  const [selectedProductId, setSelectedProductId] = useState(defaultProductId);

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

  const selectedProduct = products.find(
    (product) => product.id === selectedProductId,
  );

  const isTableArrangement = selectedProduct?.capacity === "50-plus";

  const today = new Date();
  const soonestAllowedDate = new Date(today);

  soonestAllowedDate.setDate(today.getDate() + 10);

  const minimumEventDate = soonestAllowedDate.toISOString().split("T")[0];

  return (
    <main
      className={`${montserrat.className} min-h-screen bg-[#0a0a0a] text-white`}
    >
      {/* =====================================================
          PAGE HERO
      ====================================================== */}
      <section className="relative overflow-hidden border-b border-white/10 px-6 py-20 sm:px-10 lg:py-28">
        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-[#00BCD4]/10 blur-[120px]" />

        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-white/5 blur-[120px]" />
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="animate-cinematic-image-reveal absolute inset-0 h-full w-full scale-[1.50] object-cover object-center"
        >
          <source
            src="https://jwul10vtycq0k5q2.public.blob.vercel-storage.com/movie/boxing.mp4"
            type="video/mp4"
          />
        </video>
        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/50" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="animate-cinematic-fade-up mb-7 flex items-center gap-4">
            <div className="h-px w-12 bg-[#00BCD4]" />

            <p className="text-[10px] font-medium uppercase tracking-[0.38em] text-white/65 sm:text-xs">
              Begin Your Order
            </p>
          </div>

          <h1
            className={`${cormorant.className} animate-cinematic-fade-up animation-delay-200 max-w-4xl text-5xl font-medium leading-[0.92] tracking-[-0.025em] text-white sm:text-7xl lg:text-[6.2rem]`}
          >
            Create something
            <span className="block italic text-white/60">
              made for your moment.
            </span>
          </h1>

          <p className="animate-cinematic-fade-up animation-delay-600 mt-8 max-w-2xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
            Select your arrangement and share the details that will make it
            personal. Orders must be submitted at least 10 days before the
            requested event date.
          </p>
        </div>
      </section>

      {/* =====================================================
          ORDER FORM
      ====================================================== */}
      <section className="bg-gradient-to-r from-[#a9a6a0] via-[#f4f0ea] to-[#a9a6a0] px-6 py-16 text-black sm:px-10 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <form action={createOrder} className="space-y-px bg-black/5">
            {/* =================================================
                CUSTOMER INFORMATION
            ================================================== */}
            <section className={sectionClassName}>
              <div className="mb-8 flex items-start gap-5 border-b border-black/15 pb-6">
                <div>
                  <h2
                    className={`${cormorant.className} text-4xl font-medium text-[#252525]`}
                  >
                    Customer Information
                  </h2>

                  <p className="mt-2 text-sm leading-7 text-[#545454]">
                    Confirm the contact information associated with this order.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className={labelClassName}>
                    Full Name
                  </label>

                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    required
                    defaultValue={savedCustomer?.name ?? ""}
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={labelClassName}>
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    defaultValue={savedCustomer?.email ?? ""}
                    className={inputClassName}
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="phone" className={labelClassName}>
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
                    className={inputClassName}
                  />
                </div>
              </div>
            </section>

            {/* =================================================
                ARRANGEMENT INFORMATION
            ================================================== */}
            <section className={sectionClassName}>
              <div className="mb-8 flex items-start gap-5 border-b border-black/15 pb-6">
                <div>
                  <h2
                    className={`${cormorant.className} text-4xl font-medium text-[#252525]`}
                  >
                    Arrangement Details
                  </h2>

                  <p className="mt-2 text-sm leading-7 text-[#545454]">
                    Choose your arrangement and provide the event details.
                  </p>
                </div>
              </div>

              <div>
                <label htmlFor="productId" className={labelClassName}>
                  Arrangement
                </label>
                <div className="relative">
                  <select
                    id="productId"
                    name="productId"
                    value={selectedProductId}
                    onChange={(event) =>
                      setSelectedProductId(event.target.value)
                    }
                    required
                    className={`${inputClassName} appearance-none pr-12`}
                  >
                    <option value="" disabled>
                      Select an arrangement
                    </option>

                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} —{" "}
                        {product.capacity === "50-plus"
                          ? "50+ people"
                          : `${product.capacity} people`}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#545454]"
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              {selectedProduct && (
                <div className="mt-6 grid border-y border-black/15 sm:grid-cols-3">
                  <div className="border-b border-black/15 py-5 sm:border-b-0 sm:border-r sm:pr-5">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#807973]">
                      Selected Arrangement
                    </p>

                    <p
                      className={`${cormorant.className} mt-2 text-2xl font-medium text-[#252525]`}
                    >
                      {selectedProduct.name}
                    </p>
                  </div>

                  <div className="border-b border-black/15 py-5 sm:border-b-0 sm:border-r sm:px-5">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#807973]">
                      Capacity
                    </p>

                    <p className="mt-2 flex items-center gap-2 text-sm font-medium text-[#252525]">
                      <Users
                        className="h-4 w-4 text-[#007C91]"
                        strokeWidth={1.4}
                      />

                      {selectedProduct.capacity === "50-plus"
                        ? "50+ people"
                        : `${selectedProduct.capacity} people`}
                    </p>
                  </div>

                  <div className="py-5 sm:pl-5">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#807973]">
                      Investment
                    </p>

                    <p
                      className={`${cormorant.className} mt-2 text-2xl font-medium text-[#252525]`}
                    >
                      {selectedProduct.price > 0
                        ? `$${Number(selectedProduct.price).toFixed(2)}`
                        : "Upon request"}
                    </p>
                  </div>
                </div>
              )}

              {isTableArrangement ? (
                <div className="mt-8 border border-[#007C91]/40 bg-[#007C91]/10 p-6 sm:p-8">
                  <div className="flex items-start gap-5">
                    <Mail
                      className="mt-1 h-6 w-6 shrink-0 text-[#007C91]"
                      strokeWidth={1.35}
                    />

                    <div>
                      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#007C91]">
                        Consultation Required
                      </p>

                      <h3
                        className={`${cormorant.className} text-3xl font-medium text-[#252525]`}
                      >
                        Let&apos;s plan your grazing table together.
                      </h3>

                      <p className="mt-4 max-w-3xl text-sm leading-7 text-[#545454]">
                        Table arrangements require additional customization.
                        Please contact Decadent Arrangements so the owner can
                        review your event details, guest count, presentation,
                        delivery needs, and final pricing.
                      </p>

                      <a
                        href="mailto:decadentarrangements2023@gmail.com?subject=Table%20Arrangement%20Consultation%20Request&body=Hello%20Decadent%20Arrangements%2C%0A%0AI%20am%20interested%20in%20a%20table%20arrangement%20for%2050%2B%20people.%20Please%20contact%20me%20to%20discuss%20customization%2C%20pricing%2C%20and%20delivery.%0A%0AThank%20you!"
                        className="group mt-6 inline-flex items-center justify-center gap-3 bg-black px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition duration-300 hover:bg-[#00BCD4] hover:text-black"
                      >
                        Email Decadent Arrangements
                        <ArrowRight
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                          strokeWidth={1.4}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mt-8 grid gap-6 md:grid-cols-2">
                    <div className="min-w-0">
                      <label htmlFor="eventDate" className={labelClassName}>
                        Event Date
                      </label>

                      <input
                        id="eventDate"
                        type="date"
                        name="eventDate"
                        min={minimumEventDate}
                        required
                        className={`${inputClassName} block min-w-0 max-w-full`}
                      />
                    </div>

                    <div>
                      <label className={labelClassName}>Event Time</label>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="relative">
                          <select
                            name="eventHour"
                            required
                            defaultValue=""
                            className={`${inputClassName} appearance-none pr-12`}
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

                          <ChevronDown
                            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#545454]"
                            strokeWidth={1.5}
                          />
                        </div>

                        <div className="relative">
                          <select
                            name="eventMinute"
                            required
                            defaultValue=""
                            className={`${inputClassName} appearance-none pr-12`}
                          >
                            <option value="" disabled>
                              Min
                            </option>
                            <option value="00">00</option>
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="45">45</option>
                          </select>
                          <ChevronDown
                            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#545454]"
                            strokeWidth={1.5}
                          />
                        </div>

                        <div className="relative">
                          <select
                            name="eventPeriod"
                            required
                            defaultValue=""
                            className={`${inputClassName} appearance-none pr-12`}
                          >
                            <option value="" disabled>
                              AM/PM
                            </option>
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                          </select>

                          <ChevronDown
                            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#545454]"
                            strokeWidth={1.5}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label htmlFor="specialRequests" className={labelClassName}>
                      Special Requests
                    </label>

                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      rows={4}
                      placeholder="Colors, theme, occasion, or other meaningful details."
                      className={inputClassName}
                    />
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="dietaryRestrictions"
                      className={labelClassName}
                    >
                      Dietary Restrictions
                    </label>

                    <textarea
                      id="dietaryRestrictions"
                      name="dietaryRestrictions"
                      rows={4}
                      placeholder="List dietary restrictions or allergies. If none, type 'None'."
                      required
                      className={inputClassName}
                    />
                  </div>
                </>
              )}
            </section>

            {!isTableArrangement && (
              <>
                {/* =============================================
                    DELIVERY INFORMATION
                ============================================== */}
                <section className={sectionClassName}>
                  <div className="mb-8 flex items-start gap-5 border-b border-black/15 pb-6">
                    <div>
                      <h2
                        className={`${cormorant.className} text-4xl font-medium text-[#252525]`}
                      >
                        Delivery Information
                      </h2>

                      <p className="mt-2 text-sm leading-7 text-[#545454]">
                        Provide the location and any helpful delivery
                        instructions.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="streetAddress" className={labelClassName}>
                      Street Address
                    </label>

                    <input
                      id="streetAddress"
                      type="text"
                      name="streetAddress"
                      required
                      defaultValue={savedCustomer?.streetAddress ?? ""}
                      className={inputClassName}
                    />
                  </div>

                  <div className="mt-6 grid gap-6 md:grid-cols-3">
                    <div>
                      <label htmlFor="city" className={labelClassName}>
                        City
                      </label>

                      <input
                        id="city"
                        type="text"
                        name="city"
                        required
                        defaultValue={savedCustomer?.city ?? ""}
                        className={inputClassName}
                      />
                    </div>

                    <div>
                      <label htmlFor="state" className={labelClassName}>
                        State
                      </label>

                      <div className="relative">
                        <select
                          id="state"
                          name="state"
                          required
                          defaultValue={savedCustomer?.state ?? ""}
                          className={`${inputClassName} appearance-none pr-12`}
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
                        <ChevronDown
                          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#545454]"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="postalCode" className={labelClassName}>
                        Zip Code
                      </label>

                      <input
                        id="postalCode"
                        type="text"
                        name="postalCode"
                        required
                        defaultValue={savedCustomer?.postalCode ?? ""}
                        className={inputClassName}
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label htmlFor="deliveryNotes" className={labelClassName}>
                      Delivery Notes
                    </label>

                    <textarea
                      id="deliveryNotes"
                      name="deliveryNotes"
                      rows={3}
                      defaultValue={savedCustomer?.deliveryNotes ?? ""}
                      placeholder="Apartment number, gate code, or drop-off instructions."
                      className={inputClassName}
                    />
                  </div>
                </section>

                {/* =============================================
                    PAYMENT PREFERENCE
                ============================================== */}
                <section className={sectionClassName}>
                  <div className="mb-8 flex items-start gap-5 border-b border-black/15 pb-6">
                    <div>
                      <h2
                        className={`${cormorant.className} text-4xl font-medium text-[#252525]`}
                      >
                        Payment Preference
                      </h2>

                      <p className="mt-2 text-sm leading-7 text-[#545454]">
                        Payment instructions will be provided after the order
                        has been reviewed.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-px bg-black/20 sm:grid-cols-3">
                    {[
                      { value: "venmo", label: "Venmo" },
                      { value: "paypal", label: "PayPal" },
                      { value: "zelle", label: "Zelle" },
                    ].map((method) => (
                      <label
                        key={method.value}
                        className="flex cursor-pointer items-center justify-center gap-4 bg-[#f4f0ea] p-5 text-[#252525] transition duration-300 hover:bg-[#ebe5de]"
                      >
                        <input
                          type="radio"
                          name="paymentPreference"
                          value={method.value}
                          required
                          className="h-4 w-4 accent-[#007C91]"
                        />

                        <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                          {method.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </section>

                {/* =============================================
                    PAYMENT NOTICE & AGREEMENT
                ============================================== */}
                <section className="border border-[#007C91]/35 bg-[#bcc6c8] px-6 py-8 sm:px-8">
                  <div className="flex items-start gap-5">
                    <div className="w-full">
                      <h2
                        className={`${cormorant.className} flex gap-4 text-3xl font-medium text-[#252525]`}
                      >
                        <CheckCircle2
                          className="mt-1 h-6 w-6 shrink-0 text-[#007C91]"
                          strokeWidth={1.35}
                        />
                        Final acknowledgment
                      </h2>

                      <label className="mt-5 flex cursor-pointer items-start gap-4 text-sm leading-7 text-[#000000]">
                        <input
                          type="checkbox"
                          name="agreeToPayment"
                          required
                          className="mt-1 h-4 w-4 shrink-0 accent-[#007C91]"
                        />

                        <span>
                          I understand that my order will not begin until
                          payment is received.
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="w-full">
                      <label className="mt-5 flex cursor-pointer items-start gap-4 text-sm leading-7 text-[#000000]">
                        <input
                          type="checkbox"
                          name="agreeToTermsAndConditions"
                          required
                          className="mt-1 h-4 w-4 shrink-0 accent-[#007C91]"
                        />
                        <div>
                          <span>
                            {
                              "By placing your order, you accept our Terms and Conditions, ensuring you have read and aligned with our policies. This includes our "
                            }
                          </span>

                          <Link
                            href="/cookie-policy"
                            className="underline decoration-[#00BCD4] font-bold hover:underline"
                          >
                            Cookies Policy
                          </Link>
                          <span>{", "}</span>

                          <Link
                            href="/terms-of-service"
                            className="underline decoration-[#00BCD4] font-bold hover:underline"
                          >
                            Terms of Service
                          </Link>

                          <span>{", "}</span>

                          <Link
                            href="/privacy-policy"
                            className="underline decoration-[#00BCD4] font-bold hover:underline"
                          >
                            Privacy Policy
                          </Link>

                          <span>{"."}</span>
                        </div>
                      </label>
                    </div>
                    <p></p>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="w-full">
                      <label className="mt-5 flex cursor-pointer items-start gap-4 text-sm leading-7 text-[#000000]">
                        <input
                          type="checkbox"
                          name="agreeToLegalNotice"
                          required
                          className="mt-1 h-4 w-4 shrink-0 accent-[#007C91]"
                        />

                        <span>
                          <strong>Legal Notice:</strong> I acknowlegde that
                          fraudulent orders will not be processed. Any malicious
                          checkout attempts are considered a breach of{" "}
                          <strong>
                            Decadent Arrangements Terms and Conditions
                          </strong>{" "}
                          previously stated and will be reported to appropriate
                          legal and financial institutions.
                        </span>
                      </label>
                    </div>
                  </div>
                </section>

                {/* =============================================
                    SUBMIT
                ============================================== */}
                <button
                  type="submit"
                  className="group flex w-full cursor-pointer items-center justify-center gap-4 bg-black px-8 py-5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-[#00BCD4] hover:text-black"
                >
                  Send My Order
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={1.5}
                  />
                </button>
              </>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}

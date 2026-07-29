import { PoliciesSection } from "@/app/ui/admin/policies/PoliciesSection";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import Link from "next/link";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function TermsOfServicePage() {
  return (
    <main className={`${montserrat.className} min-h-screen text-white`}>
      {/* Page header */}
      <section className="border-b border-white/10 bg-black px-6 py-20 sm:px-10 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.34em] text-[#00BCD4]">
            Legal Information
          </p>

          <h1
            className={`${cormorant.className} text-5xl font-medium leading-none tracking-tight text-white sm:text-6xl lg:text-7xl`}
          >
            Terms of Service
          </h1>

          <p className="mt-6 text-sm text-white/50">
            Last updated: July 26, 2026
          </p>
        </div>
      </section>

      {/* Terms content */}
      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-10 lg:py-24 bg-white">
        {/* Introduction */}
        <section className="space-y-5">
          <p className="leading-8 text-black">
            Welcome to <strong>Decadent Arrangements</strong>. These Terms of
            Service govern your use of our website, products, services, and any
            orders placed through our platform.
          </p>

          <p className="leading-8 text-black">
            By accessing our website, creating an account, or placing an order
            with us, you agree to be bound by these Terms of Service. If you do
            not agree with any part of these terms, please do not use our
            website or services.
          </p>
        </section>

        {/* Section 1 */}
        <PoliciesSection number="01" title="About Our Services">
          <p>
            Decadent Arrangements provides custom food arrangements, grazing
            tables, charcuterie arrangements, gift arrangements, desserts, and
            related services.
          </p>

          <p>
            Product availability, ingredients, arrangement options, delivery
            options, and services may vary depending on location, requested
            date, seasonal availability, and other circumstances.
          </p>
        </PoliciesSection>

        {/* Section 2 */}
        <PoliciesSection number="02" title="Orders and Purchases">
          <p>
            When you place an order through our website, you agree to provide
            accurate and complete information necessary to organize and fulfill
            your order.
          </p>

          <p>This information may include:</p>

          <TermsList
            items={[
              "Your name",
              "Phone number",
              "Email address",
              "Delivery address",
              "Event date",
              "Selected arrangement",
              "Preferred payment method",
              "Dietary restrictions",
              "Allergy information",
              "Special instructions or requests",
            ]}
          />

          <p>
            Orders should generally be submitted at least 10 days before the
            requested event date. Submitting an order request does not
            automatically guarantee acceptance or availability.
          </p>

          <p>
            All orders are subject to review, availability, and confirmation by
            Decadent Arrangements. We reserve the right to refuse, cancel, or
            request modifications to an order when necessary, including when a
            requested product, ingredient, date, or delivery option is
            unavailable.
          </p>
        </PoliciesSection>

        {/* Section 3 */}
        <PoliciesSection number="03" title="Order Confirmation">
          <p>
            An order submission through the website is considered a request
            until it has been reviewed and accepted by Decadent Arrangements.
          </p>

          <p>
            An order may not be considered fully confirmed until the customer
            has received confirmation from the business and any required payment
            or deposit has been received.
          </p>

          <p>
            Customers are responsible for reviewing all confirmation details and
            promptly notifying us if any information is incorrect.
          </p>
        </PoliciesSection>

        {/* Section 4 */}
        <PoliciesSection number="04" title="Food and Product Information">
          <p>
            We make reasonable efforts to ensure that product descriptions,
            photographs, ingredients, capacities, prices, and other information
            displayed on our website are accurate.
          </p>

          <p>
            Actual products and arrangements may vary from photographs or
            descriptions because of ingredient availability, seasonal items,
            substitutions, and the handmade or customized nature of each
            arrangement.
          </p>

          <p>
            Customers are responsible for informing us of known allergies,
            dietary restrictions, religious dietary requirements, or other
            food-related concerns when placing each order.
          </p>

          <p>
            While reasonable precautions may be taken during preparation, we
            cannot guarantee that products will be completely free from
            allergens or cross-contact with allergens.
          </p>
        </PoliciesSection>

        {/* Section 5 */}
        <PoliciesSection number="05" title="Custom and Special Requests">
          <p>
            Products and arrangements may be customized according to customer
            preferences when possible. Custom requests are subject to
            availability and may require additional preparation time or
            additional charges.
          </p>

          <p>
            We will make reasonable efforts to accommodate special requests.
            However, we cannot guarantee that every request can be fulfilled
            exactly as submitted.
          </p>

          <p>
            When an exact ingredient, decoration, flower, container, color, or
            other product is unavailable, a reasonable substitution may be
            discussed or used when appropriate.
          </p>
        </PoliciesSection>

        {/* Section 6 */}
        <PoliciesSection number="06" title="Pricing and Payment">
          <p>
            Prices displayed on our website are listed in U.S. dollars unless
            otherwise stated.
          </p>

          <p>
            Prices may change without prior notice. However, price changes will
            not affect an order that has already been accepted and confirmed at
            an agreed price.
          </p>

          <p>
            Customers may select a preferred payment method, including PayPal,
            Venmo, or Zelle. The website records only the selected payment
            preference and does not directly collect payment card numbers or
            bank account credentials.
          </p>

          <p>
            Payment instructions are handled separately between the customer and
            Decadent Arrangements. An order may not be considered confirmed
            until any required payment or deposit has been received.
          </p>
        </PoliciesSection>

        {/* Section 7 */}
        <PoliciesSection number="07" title="Delivery and Pickup">
          <p>
            Customers are responsible for providing complete and accurate
            delivery information, including the recipient&apos;s name, address,
            phone number, and any relevant delivery instructions.
          </p>

          <p>
            Delivery and pickup times are estimates and may be affected by
            traffic, weather, events, holidays, product availability, or other
            circumstances outside our reasonable control.
          </p>

          <p>
            The customer or recipient should be available at the agreed delivery
            or pickup time. If delivery cannot be completed because the
            recipient is unavailable or the provided information is incorrect,
            an additional delivery fee may apply.
          </p>

          <p>
            Responsibility for the arrangement transfers to the customer or
            recipient after delivery or pickup. Customers are responsible for
            following appropriate storage, refrigeration, and food-safety
            instructions after receiving the order.
          </p>
        </PoliciesSection>

        {/* Section 8 */}
        <PoliciesSection number="08" title="Cancellations and Refunds">
          <p>
            Cancellation and refund eligibility may depend on how far in advance
            the request is made and whether ingredients, supplies, or custom
            materials have already been purchased or prepared.
          </p>

          <p>
            Orders that have already been prepared, customized, delivered, or
            otherwise fulfilled may not be eligible for cancellation or refund.
          </p>

          <p>
            Deposits or payments used to purchase ingredients, supplies, or
            customized materials may be nonrefundable where permitted by law.
          </p>

          <p>
            Requests involving cancellations, refunds, missing items, damage, or
            other order concerns should be submitted as soon as reasonably
            possible by contacting Decadent Arrangements.
          </p>

          <p>
            Refunds or replacements, when approved, will be determined based on
            the circumstances of the order.
          </p>
        </PoliciesSection>

        {/* Section 9 */}
        <PoliciesSection number="09" title="Customer Responsibilities">
          <p>
            Customers agree to provide accurate information and use our website
            and services only for lawful purposes.
          </p>

          <p>
            Customers are responsible for reviewing their order details before
            submitting an order, including:
          </p>

          <TermsList
            items={[
              "Product or arrangement selection",
              "Quantity and capacity",
              "Event date",
              "Delivery information",
              "Dietary restrictions",
              "Allergy information",
              "Special instructions",
              "Preferred payment method",
            ]}
          />

          <p>
            Customers should promptly notify Decadent Arrangements if any order
            information changes after submission.
          </p>
        </PoliciesSection>

        {/* Section 10 */}
        <PoliciesSection number="10" title="Accounts and Website Access">
          <p>
            Certain website features may require users to sign in using a
            supported Google account.
          </p>

          <p>
            You are responsible for maintaining control of your Google account
            and for activity performed through your authenticated session.
          </p>

          <p>
            You agree not to interfere with the operation or security of the
            website, attempt to access restricted areas without authorization,
            or use the website in a way that could harm the business or other
            users.
          </p>
        </PoliciesSection>

        {/* Section 11 */}
        <PoliciesSection number="11" title="Intellectual Property">
          <p>
            All content available on this website, including logos, branding,
            photographs, graphics, text, product descriptions, designs, and
            other materials, is owned by or licensed to Decadent Arrangements.
          </p>

          <p>
            Website content may not be copied, reproduced, distributed,
            modified, published, or used for commercial purposes without prior
            written permission.
          </p>
        </PoliciesSection>

        {/* Section 12 */}
        <PoliciesSection number="12" title="Third-Party Services">
          <p>
            Our website may rely on or link to third-party services, including
            Google, Vercel, PayPal, Venmo, Zelle, and other technology or
            payment providers.
          </p>

          <p>
            Decadent Arrangements does not control the terms, privacy practices,
            availability, or operation of third-party services. Your use of
            those services is subject to their own terms and policies.
          </p>
        </PoliciesSection>

        {/* Section 13 */}
        <PoliciesSection number="13" title="Limitation of Liability">
          <p>
            To the extent permitted by applicable law, Decadent Arrangements
            shall not be liable for indirect, incidental, special, or
            consequential damages arising from the use of our website, products,
            or services.
          </p>

          <p>
            Nothing in these Terms of Service is intended to exclude or limit
            liability where such exclusion or limitation is not permitted by
            applicable law.
          </p>
        </PoliciesSection>

        {/* Section 14 */}
        <PoliciesSection number="14" title="Changes to These Terms">
          <p>
            We may update these Terms of Service from time to time to reflect
            changes in our website, services, policies, technology, or legal
            requirements.
          </p>

          <p>
            Any changes will be posted on this page with an updated effective
            date. Your continued use of the website after changes are posted
            constitutes acknowledgment of the updated Terms of Service.
          </p>
        </PoliciesSection>

        {/* Section 15 */}
        <PoliciesSection number="15" title="Governing Law">
          <p>
            These Terms of Service shall be governed by and interpreted in
            accordance with the laws of the State of Colorado and applicable
            United States law, without regard to conflict-of-law principles.
          </p>
        </PoliciesSection>

        {/* Section 16 */}
        <PoliciesSection number="16" title="Contact Us">
          <p>
            If you have questions about these Terms of Service, an order,
            cancellation, refund, or other concern, please contact us.
          </p>

          <div className="mt-7 border border-white/15 bg-black/[0.04] p-6 sm:p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-black">
              Business
            </p>

            <p className={`${cormorant.className} mt-2 text-3xl text-black`}>
              Decadent Arrangements
            </p>

            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-black">
              Location
            </p>

            <p className="mt-2 text-black">Denver, Colorado</p>

            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-black">
              Email
            </p>

            <a
              href="mailto:decadentarrangements2023@gmail.com"
              className="mt-2 inline-block break-all text-[#00BCD4] underline decoration-[#00BCD4]/50 underline-offset-4 transition hover:text-black"
            >
              decadentarrangements2023@gmail.com
            </a>
          </div>
        </PoliciesSection>

        {/* Footer navigation */}
        <footer className="mt-20 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-5 text-sm text-black sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} Decadent Arrangements. All rights
              reserved.
            </p>

            <div className="flex gap-6">
              <Link href="/" className="transition hover:text-[#00BCD4]">
                Home
              </Link>

              <Link href="/privacy" className="transition hover:text-[#00BCD4]">
                Privacy Policy
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

/* =========================================================
   REUSABLE TERMS COMPONENTS
========================================================= */

function TermsList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 pl-1">
      {items.map((item) => (
        <li key={item} className="flex gap-4">
          <span className="mt-[13px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#00BCD4]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

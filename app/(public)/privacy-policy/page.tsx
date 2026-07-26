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

export default function PrivacyPolicyPage() {
  return (
    <main
      className={`${montserrat.className} min-h-screen bg-[#0a0a0a] text-white`}
    >
      {/* Page header */}
      <section className="border-b border-white/10 bg-black px-6 py-20 sm:px-10 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.34em] text-[#00BCD4]">
            Legal Information
          </p>

          <h1
            className={`${cormorant.className} text-5xl font-medium leading-none tracking-tight text-white sm:text-6xl lg:text-7xl`}
          >
            Privacy Policy
          </h1>

          <p className="mt-6 text-sm text-white/50">
            Last updated: July 26, 2026
          </p>
        </div>
      </section>

      {/* Policy content */}
      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-10 lg:py-24">
        {/* Introduction */}
        <section className="space-y-5">
          <p className="leading-8 text-white/70">
            Decadent Arrangements (&quot;Decadent Arrangements,&quot;
            &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your
            privacy and is committed to protecting the personal information you
            provide when using our website and services.
          </p>

          <p className="leading-8 text-white/70">
            This Privacy Policy explains what information we collect, how we use
            it, how we protect it, and the choices available to you when you use
            our website at{" "}
            <a
              href="https://decadent-arrangements.vercel.app"
              className="font-medium text-[#00BCD4] underline decoration-[#00BCD4]/50 underline-offset-4 transition hover:text-white"
            >
              decadent-arrangements.vercel.app
            </a>
            .
          </p>

          <p className="leading-8 text-white/70">
            By using our website, creating an account, or placing an order, you
            acknowledge the practices described in this Privacy Policy.
          </p>
        </section>

        {/* Section 1 */}
        <PolicySection number="01" title="Information We Collect">
          <p>
            We collect information that you voluntarily provide when you create
            an account, place an order, or communicate with us.
          </p>

          <PolicySubheading>Account Information</PolicySubheading>

          <p>
            To use certain features of our website and place orders, users are
            required to authenticate their identity using a supported Google
            account. When you create or use an account, we may receive and
            retain information associated with your authenticated account,
            including:
          </p>

          <PolicyList items={["Your name", "Your email address"]} />

          <PolicySubheading>Order Information</PolicySubheading>

          <p>
            When you place an order, we may collect information necessary to
            organize and fulfill your order, including:
          </p>

          <PolicyList
            items={[
              "Customer name",
              "Phone number",
              "Email address",
              "Delivery address",
              "Event date",
              "Selected arrangement and product information",
              "Special instructions",
              "Notes or messages related to the order",
              "Allergy information",
              "Dietary restrictions",
              "Religious dietary restrictions",
              "Selected payment preference, such as PayPal, Venmo, or Zelle",
            ]}
          />
        </PolicySection>

        {/* Section 2 */}
        <PolicySection number="02" title="How We Use Your Information">
          <p>
            We use the information we collect only for legitimate business and
            operational purposes related to providing our services.
          </p>

          <p>This may include using your information to:</p>

          <PolicyList
            items={[
              "Create and manage your customer account",
              "Authenticate your identity and maintain your signed-in session",
              "Allow you to place and manage orders",
              "Automatically fill previously provided information when appropriate",
              "Process and organize orders",
              "Communicate with you regarding your orders",
              "Send order-related notifications",
              "Confirm whether an order is pending, preparing, delivered, or cancelled",
              "Coordinate delivery when necessary",
              "Respond to customer questions and requests",
              "Improve the organization and functionality of our website",
              "Protect the security and integrity of our website and services",
            ]}
          />

          <p>
            We do not currently use customer information to send promotional
            newsletters or marketing emails.
          </p>
        </PolicySection>

        {/* Section 3 */}
        <PolicySection
          number="03"
          title="Food Allergies and Dietary Information"
        >
          <p>
            Customers may provide information about food allergies, dietary
            restrictions, religious dietary requirements, or other food-related
            considerations when placing an order.
          </p>

          <p>
            This information is provided for the purpose of preparing and
            fulfilling the specific order for which it was submitted.
          </p>

          <p>
            We do not intentionally maintain a permanent dietary or allergy
            profile for customers. Customers should provide any applicable
            allergy, dietary, or food-related requirements with each new order,
            even if similar information was provided in a previous order.
          </p>

          <p>
            Information entered into an order may be retained as part of the
            order record where necessary for order management, documentation, or
            business operations. Customers should not assume that information
            from a previous order will automatically be applied to future
            orders.
          </p>
        </PolicySection>

        {/* Section 4 */}
        <PolicySection number="04" title="Payment Information">
          <p>
            Decadent Arrangements does not directly process or store
            customers&apos; payment card numbers, bank account credentials, or
            other sensitive payment credentials through the website.
          </p>

          <p>
            Customers may select a preferred payment method, such as PayPal,
            Venmo, or Zelle. The website may record the selected payment
            preference for purposes of organizing and managing the order.
          </p>

          <p>
            Actual payment arrangements and payment requests are handled
            separately between the customer and the business owner through the
            selected payment method. Customers should review the privacy
            policies and terms of the applicable payment service before using
            it.
          </p>
        </PolicySection>

        {/* Section 5 */}
        <PolicySection number="05" title="Authentication and Login Sessions">
          <p>
            Our website uses Google account authentication to help ensure that
            users placing orders are authenticated users.
          </p>

          <p>
            When you sign in using Google, Google may provide authentication
            information to our application. We use this information to
            authenticate your account and provide access to features available
            to authenticated users.
          </p>

          <p>
            Our website may also use session cookies, tokens, or similar
            technologies to maintain your authenticated session and help protect
            the security of your account.
          </p>

          <p>
            Your use of Google authentication is also subject to Google&apos;s
            own privacy policies and terms.
          </p>
        </PolicySection>

        {/* Section 6 */}
        <PolicySection number="06" title="Sharing of Information">
          <p>We do not sell your personal information.</p>

          <p>
            We may share limited information when reasonably necessary to
            operate the business or fulfill an order.
          </p>

          <PolicySubheading>Delivery</PolicySubheading>

          <p>
            When necessary to complete a delivery, relevant information such as
            the recipient&apos;s name, phone number, delivery address, and order
            details may be provided to the person responsible for delivering the
            order.
          </p>

          <p>
            In most cases, deliveries are handled directly by the business
            owner. If a third-party delivery service is used, only information
            reasonably necessary to complete the delivery may be shared.
          </p>

          <PolicySubheading>Service Providers</PolicySubheading>

          <p>
            Our website relies on third-party technology providers to operate
            certain aspects of the service, including website hosting,
            authentication, database infrastructure, image storage, email
            delivery, and other technical services.
          </p>

          <p>
            These providers may process information on our behalf as necessary
            to provide their services. We do not knowingly share customer
            information with third parties for their own independent marketing
            purposes.
          </p>
        </PolicySection>

        {/* Section 7 */}
        <PolicySection number="07" title="Website Hosting and Database">
          <p>
            Our website relies on third-party technology providers, including
            Google for authentication, Vercel for website hosting and image
            storage, and database infrastructure providers used to store
            customer and order information.
          </p>

          <p>
            We take reasonable measures to protect information stored through
            our website. However, no internet transmission or electronic storage
            system can be guaranteed to be completely secure.
          </p>
        </PolicySection>

        {/* Section 8 */}
        <PolicySection number="08" title="Order-Related Communications">
          <p>
            We may use your email address to communicate with you regarding
            activities directly related to your account or orders.
          </p>

          <p>
            These communications may include order confirmations and status
            notifications, such as when an order is pending, being prepared,
            delivered, or cancelled.
          </p>

          <p>
            These communications are considered transactional or service-related
            communications and are not promotional marketing messages.
          </p>
        </PolicySection>

        {/* Section 9 */}
        <PolicySection number="09" title="Data Retention">
          <p>
            We retain personal information for as long as reasonably necessary
            to provide our services, manage customer accounts, maintain order
            records, resolve disputes, comply with legal obligations, and
            maintain appropriate business records.
          </p>

          <p>
            The amount of time information is retained may vary depending on the
            type of information and the reason it was collected.
          </p>
        </PolicySection>

        {/* Section 10 */}
        <PolicySection number="10" title="Your Privacy Rights">
          <p>
            Depending on applicable law, you may have the right to request
            information about the personal data we maintain about you.
          </p>

          <p>You may contact us to request:</p>

          <PolicyList
            items={[
              "Access to personal information we maintain about you",
              "Correction of inaccurate or incomplete information",
              "Deletion of personal information, where legally permitted",
              "Information about how your personal information is used",
            ]}
          />

          <p>
            We will make reasonable efforts to respond to privacy requests in a
            timely manner. Depending on the nature and complexity of a request,
            additional time may be required to verify the request and complete
            the requested action.
          </p>

          <p>
            To protect your account and personal information, we may need to
            verify your identity before completing certain requests.
          </p>
        </PolicySection>

        {/* Section 11 */}
        <PolicySection number="11" title="Children's Privacy">
          <p>
            Our website is not intended for children under the age of 13. We do
            not knowingly collect personal information from children under 13.
          </p>

          <p>
            If we learn that we have collected personal information from a child
            under 13 without appropriate consent, we will take reasonable steps
            to delete that information.
          </p>
        </PolicySection>

        {/* Section 12 */}
        <PolicySection number="12" title="Changes to This Privacy Policy">
          <p>
            We may update this Privacy Policy from time to time to reflect
            changes in our services, technology, legal requirements, or business
            practices.
          </p>

          <p>
            When changes are made, the updated policy will be posted on this
            page and the &quot;Last updated&quot; date will be revised.
          </p>
        </PolicySection>

        {/* Section 13 */}
        <PolicySection number="13" title="Contact Us">
          <p>
            If you have questions about this Privacy Policy or would like to
            submit a privacy-related request, please contact us.
          </p>

          <div className="mt-7 border border-white/15 bg-white/[0.04] p-6 sm:p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-white/40">
              Business
            </p>

            <p className={`${cormorant.className} mt-2 text-3xl text-white`}>
              Decadent Arrangements
            </p>

            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-white/40">
              Email
            </p>

            <a
              href="mailto:decadentarrangements2023@gmail.com"
              className="mt-2 inline-block break-all text-[#00BCD4] underline decoration-[#00BCD4]/50 underline-offset-4 transition hover:text-white"
            >
              decadentarrangements2023@gmail.com
            </a>
          </div>
        </PolicySection>

        {/* Footer navigation */}
        <footer className="mt-20 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-5 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} Decadent Arrangements. All rights
              reserved.
            </p>

            <div className="flex gap-6">
              <Link href="/" className="transition hover:text-[#00BCD4]">
                Home
              </Link>

              <Link href="/terms" className="transition hover:text-[#00BCD4]">
                Terms of Service
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

/* =========================================================
   REUSABLE POLICY COMPONENTS
========================================================= */

type PolicySectionProps = {
  number: string;
  title: string;
  children: React.ReactNode;
};

function PolicySection({ number, title, children }: PolicySectionProps) {
  return (
    <section className="mt-16 border-t border-white/10 pt-10">
      <div className="grid gap-6 sm:grid-cols-[55px_1fr]">
        <span
          className={`${cormorant.className} text-2xl italic text-[#00BCD4]`}
        >
          {number}
        </span>

        <div>
          <h2
            className={`${cormorant.className} mb-6 text-3xl font-medium text-white sm:text-4xl`}
          >
            {title}
          </h2>

          <div className="space-y-5 leading-8 text-white/70">{children}</div>
        </div>
      </div>
    </section>
  );
}

function PolicySubheading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className={`${cormorant.className} pt-3 text-2xl font-medium text-white`}
    >
      {children}
    </h3>
  );
}

function PolicyList({ items }: { items: string[] }) {
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

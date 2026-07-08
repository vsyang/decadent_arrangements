// app/(public)/order/confirmation/page.tsx

import Link from "next/link";

// Defines the type for the URL search parameters. This page expects an optional order code from the URL, like: /order/confirmation?code=DA-123456
type ConfirmationPageProps = {
  searchParams: Promise<{
    code?: string;
  }>;
};

// This page is shown after a customer successfully submits an order. It displays a thank-you message and the customer's order code.
export default async function ConfirmationPage({
  searchParams,
}: ConfirmationPageProps) {
  // Get the search parameters from the URL.
  const params = await searchParams;

  // Get the order code from the URL. If no code is found, show "Unavailable" instead.
  const orderCode = params.code ?? "Unavailable";

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
          <p className="font-semibold text-[#545454]">Your order code:</p>

          <p className="mt-1 text-2xl font-bold text-[#03989e]">{orderCode}</p>
        </div>

        {/* Order status message */}
        <p className="mb-4">
          Your order has been received and is currently pending. Decadent
          Arrangements will review your order details and confirm availability.
        </p>

        {/* Payment instruction message */}
        <p className="mb-6">
          Please follow the payment instructions provided by the business owner.
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

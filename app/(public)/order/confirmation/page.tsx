import Link from "next/link";

type ConfirmationPageProps = {
  searchParams: Promise<{
    code?: string;
  }>;
};

export default async function ConfirmationPage({
  searchParams,
}: ConfirmationPageProps) {
  const params = await searchParams;
  const orderCode = params.code ?? "Unavailable";

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 text-[#545454]">
      <div className="rounded-lg border border-[#03989e]/40 bg-[#ffffff] p-8 shadow-sm">
        <h1 className="mb-4 text-4xl font-bold text-[#545454]">
          Order Submitted
        </h1>

        <p className="mb-4 text-lg">
          Thank you for placing an order with Decadent Arrangements.
        </p>

        <div className="mb-6 rounded-lg bg-[#03989e]/10 p-4">
          <p className="font-semibold text-[#545454]">Your order code:</p>
          <p className="mt-1 text-2xl font-bold text-[#03989e]">{orderCode}</p>
        </div>

        <p className="mb-4">
          Your order has been received and is currently pending. Decadent
          Arrangements will review your order details and confirm availability.
        </p>

        <p className="mb-6">
          Payment is required before the arrangement is started because supplies
          must be purchased first. Please follow the payment instructions
          provided by the business owner.
        </p>

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

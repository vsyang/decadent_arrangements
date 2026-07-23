import { fetchOrderById } from "@/db/queries";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IsAdminProtection } from "../../dashboard/adminAction";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";
import { MousePointerClick } from "lucide-react";
import { CopyTextButton } from "@/components/admin/CopyTextButton";
import { FingerPrintIcon } from "@heroicons/react/24/outline";
import { SpecialRequestsModal } from "@/components/admin/RequestsModal";

// Formats a 10-digit phone number as xxx-xxx-xxxx.
function formatPhoneNumber(phone: string) {
  // Remove any existing spaces, dashes, or other characters.
  const digits = phone.replace(/\D/g, "");

  // If the value is not exactly 10 digits, return the original value.
  if (digits.length !== 10) {
    return phone;
  }

  // Return the phone number in xxx-xxx-xxxx format.
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default async function OrderDetailsPage(props: {
  params: Promise<{ id: string }>;
}) {
  // Get the order ID from the route.
  const { id: orderId } = await props.params;

  // Find the order in the database.
  const order = await fetchOrderById(orderId);

  // Show the 404 page if the order does not exist.
  if (!order) return notFound();

  // Format the phone number for display and copying.
  const formattedPhone = formatPhoneNumber(order.phone);

  // Check whether the signed-in user is an administrator.
  const authorized = await IsAdminProtection();

  // Format the delivery address into one readable string.
  const customerAddress = order.address
    ? `${order.address.streetAddress}, ${order.address.city}, ${
        order.address.state
      }${order.address.postalCode ? ` ${order.address.postalCode}` : ""}`
    : "No Address";

  return (
    <main className="m-auto max-w-7xl py-5">
      {/* Show admin breadcrumbs when the user is authorized. */}
      {authorized ? (
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
          <Link
            href="/dashboard"
            className="flex items-center gap-1 transition-colors hover:text-[#c97c5d]"
          >
            Management
          </Link>

          <ChevronRightIcon className="h-3 w-3" />

          <Link
            href="/orders"
            className="transition-colors hover:text-[#c97c5d]"
          >
            Orders
          </Link>

          <ChevronRightIcon className="h-3 w-3" />

          <span className="max-w-50 truncate text-[#6b4f3f]">
            {order.idReadable}
          </span>
        </nav>
      ) : (
        /* Show customer breadcrumbs when the user is not an administrator. */
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
          <Link
            href="/orders"
            className="transition-colors hover:text-[#c97c5d]"
          >
            My Orders
          </Link>

          <ChevronRightIcon className="h-3 w-3" />

          <span className="max-w-50 truncate text-[#6b4f3f]">
            {order.idReadable}
          </span>
        </nav>
      )}

      <div className="flex w-full flex-col gap-3">
        {/* Main order information */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <h1 className="flex text-2xl font-bold text-slate-900">
            
            <span>Order #</span>
            <CopyTextButton text={order.idReadable} name="Order Number" order={true} />
          </h1>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="my-2 mt-2 flex flex-wrap gap-3 text-sm text-slate-600">
              <span>
                <b>Created:</b> {new Date(order.createdAt).toLocaleDateString()}
              </span>

              {/* Only administrators can see the last-updated date. */}
              {authorized && (
                <span>
                  <b>Last updated:</b>{" "}
                  {new Date(order.updatedAt).toLocaleDateString()}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <label
                htmlFor="order-status"
                className="text-sm font-semibold text-slate-700"
              >
                Status:
              </label>

              {/* Administrators can update the status. */}
              {authorized ? (
                <OrderStatusSelect
                  orderId={order.id}
                  currentStatus={order.status}
                />
              ) : (
                /* Customers can only view the current status. */
                <span
                  className={`w-full appearance-none rounded-lg border-3 px-2 py-2 text-sm font-semibold text-slate-700 shadow-sm ${
                    order.status === "preparing"
                      ? "border-yellow-500 bg-yellow-500/10"
                      : order.status === "delivered"
                        ? "border-green-500 bg-green-500/5"
                        : order.status === "cancelled"
                          ? "border-red-500 bg-red-500/5"
                          : "bg-gray-100/50"
                  }`}
                >
                  {order.status}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Arrangement Details */}
        <section className="flex-1 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="text-lg font-semibold text-slate-900">
                  Arrangement Details
              </h2>

              <div className="w-full grid gap-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] mt-4">

                <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
                  <div>

                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Name
                    </h3>

                    <p className="mt-1 font-semibold text-slate-900">
                      {order.productName}
                    </p>

                  </div>

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Capacity (Size)
                    </h3>

                    <p className="mt-1 font-semibold text-slate-900">
                      {order.capacity} people
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">

                  <div>

                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Price
                    </h3>
                    <p className="mt-1 font-semibold text-slate-900">
                      ${order.price}
                    </p>

                  </div>

                  <div>

                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Payment Method
                    </h3>
                    <p className="mt-1 font-semibold text-slate-900 uppercase">
                      {order.payment}
                    </p>

                  </div>
                </div>
              </div>

              {/* Delivery Notes */}

              <div>

                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Delivery Notes
                </h3>

                <p className="mt-1 font-semibold text-slate-900">
                  {order.address.deliveryNotes}
                </p>

              </div>

            </section>

        {/* Details of order */}

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Customer information */}
            <section className="flex-1 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                Customer Info
              </h2>

              <div className="mt-4 space-y-5">
                {/* Customer name */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Name
                  </h3>

                  <p className="mt-1 font-semibold text-slate-900">
                    {order.clientName}
                  </p>
                </div>

                {/* Customer phone number */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Phone
                  </h3>

                  {(authorized) ? (
                      // Administrators can click to copy the formatted phone number.
                    <CopyTextButton text={order.phone} name="Phone" order={false} />
                  ) : (
                    // Customers see the same formatted phone number.
                    <span className="mt-1 font-semibold text-slate-900">
                      {formattedPhone}
                    </span>
                  )}
                </div>

                {/* Customer email */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Email
                  </h3>
                  {(authorized) ? (
                    <CopyTextButton text={order.email} name="Email" order={false} />
                  ) : (
                    <span className="mt-1 font-semibold text-slate-900">
                      {order.email}
                    </span>
                  )}
                </div>
              </div>
            </section>

            {/* Customer requests */}
            <section className="flex min-w-[240px] flex-1 flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                Customer Requests
              </h2>

              {/* Special requests */}
              <div className="flex flex-col gap-2 border-b-2 border-slate-300 hover:border-blue-600">
                <SpecialRequestsModal
                  requestTitle="Special Requests"
                  specialRequest={order.specialRequest}
                  isAllergy={false}
                />
              </div>

              {/* Dietary restrictions and allergies */}
              <div className="flex flex-col gap-2 border-b-2 border-red-300 bg-red-50/80 hover:border-orange-600">
                <SpecialRequestsModal
                  requestTitle="Dietary Restrictions"
                  specialRequest={order.dietaryRestrictions}
                  isAllergy={true}
                />
              </div>

              <p className="mt-1 text-center text-[13px] leading-none text-slate-700">
                <MousePointerClick
                  className="mr-1 hidden h-5 w-5 md:inline"
                  strokeWidth={1.5}
                />

                <FingerPrintIcon
                  className="inline h-6 w-6 md:hidden"
                  strokeWidth={1.5}
                />

                <span>
                  Click on any request section to see more details about it.
                </span>
              </p>
            </section>
          </div>

          {/* Event and delivery information */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Event & Delivery
            </h2>

            <div className="mt-6 flex gap-4 md:flex-row">
              {/* Event date */}
              <div className="flex-1">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Event Date
                </h3>

                <p className="mt-2 font-semibold text-slate-900">
                  {new Date(order.eventDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="w-px bg-slate-600" />

              {/* Delivery address */}
              <div className="flex-1">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Delivery Address
                </h3>

                {(authorized) ? (
                    <CopyTextButton text={customerAddress} name="Delivery Address" order={false} />
                  ) : (
                    <p className="mt-1 font-semibold text-slate-900">
                      {customerAddress}
                    </p>
                  )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

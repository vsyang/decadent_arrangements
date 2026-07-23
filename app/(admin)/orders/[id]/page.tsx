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

export default async function OrderDetailsPage(props: { 
  params: Promise<{ id: string }>;
}) {

  const { id: orderId } = await props.params;

  const order = await fetchOrderById(orderId)

  if (!order) return notFound();

  const authorized = await IsAdminProtection();

  const customerAddress = `${order.address 
    ? `${order.address.streetAddress}, ${order.address.city}, ${order.address.state} ${order.address.postalCode ? ` ${order.address.postalCode}` : ""}`
    : "No Address"}`
  
  return (
    <main className="max-w-7xl m-auto py-5">

      {(authorized) ? (

        // Breadcrumbs
      <>
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">

            <Link
              href="/dashboard"
              className="hover:text-[#c97c5d] transition-colors flex items-center gap-1"
            >
              Management
            </Link>
            <ChevronRightIcon className="w-3 h-3" />

            <Link
              href={`/orders`}
              className="hover:text-[#c97c5d] transition-colors"
            >
              Orders
            </Link>

            <ChevronRightIcon className="w-3 h-3" />

            <span className="text-[#6b4f3f] truncate max-w-50">{order.idReadable}</span>
            </nav>
      </>

      ) : (
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
 
        <Link
          href={`/orders`}
          className="hover:text-[#c97c5d] transition-colors"
        >
          My Orders
        </Link>
  
        <ChevronRightIcon className="w-3 h-3" />
  
        <span className="text-[#6b4f3f] truncate max-w-50">{order.idReadable}</span>
      </nav>
      )}

      <div className="flex flex-col gap-3 w-full">

        {/* Easy display of main info */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <h1 className="flex text-2xl font-bold text-slate-900">
            
            <span>Order #</span>
            <CopyTextButton text={order.idReadable} name="Order Number" order={true} />
          </h1>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            

            <div className="flex mt-2 flex-wrap gap-3 text-sm text-slate-600 my-2">

              <span>
                <b>Created:</b>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </span>

              {(authorized) && (
                <span>
                  <b>Last updated:</b>{" "}
                  {new Date(order.updatedAt).toLocaleDateString()}
                </span>
              )}

            </div>

            <div className="flex items-center gap-3">

              <label htmlFor="order-status" className="text-sm font-semibold text-slate-700">
                  Status:
              </label>

              {(authorized) ? (
                
                <OrderStatusSelect orderId={order.id} currentStatus={order.status}
                  />
              ) : (
                <span className={`w-full appearance-none rounded-lg border-3 py-2 px-2 text-sm font-semibold text-slate-700 shadow-sm ${
                  order.status === "preparing" ? "border-yellow-500 bg-yellow-500/10" :
                  order.status === "delivered" ? "border-green-500 bg-green-500/5" :
                  order.status === "cancelled" ? "border-red-500 bg-red-500/5" : "bg-gray-100/50"}`
                }>{order.status}</span>
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

          <div className="flex flex-col sm:flex-row gap-4">

            {/* Customer Info */}

            <section className="flex-1 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="text-lg font-semibold text-slate-900">
                  Customer Info
              </h2>

              <div className="mt-4 space-y-5">

                <div>

                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Name
                  </h3>

                  <p className="mt-1 font-semibold text-slate-900">
                    {order.clientName}
                  </p>

                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Phone
                  </h3>

                  {(authorized) ? (
                    <CopyTextButton text={order.phone} name="Phone" order={false} />
                  ) : (
                    <span className="mt-1 font-semibold text-slate-900">{order.phone}</span>
                  )}
                </div>

                <div>

                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Email
                  </h3>
                  {(authorized) ? (
                    <CopyTextButton text={order.email} name="Email" order={false} />
                  ) : (
                    <span className="mt-1 font-semibold text-slate-900">{order.email}</span>
                  )}

                </div>

              </div>

            </section>


          {/* Customer Requests: Allergies/Restrictions and special ones */}

            <section className="flex-1 rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col gap-4 min-w-[240px]">

              <h2 className="text-lg font-semibold text-slate-900">
                  Customer Requests
              </h2>
              
              <div className="flex flex-col gap-2 border-b-2 border-slate-300 hover:border-blue-600">

                <SpecialRequestsModal requestTitle={"Special Requests"} specialRequest={order.specialRequest} isAllergy={false} />
              </div>


              <div className="flex flex-col gap-2 bg-red-50/80 border-b-2 border-red-300 hover:border-orange-600">

                <SpecialRequestsModal requestTitle={"Special Requests"} specialRequest={order.dietaryRestrictions} isAllergy={true} />

              </div>

              <p className="mt-1 text-[13px] text-slate-700 text-center leading-none">
                <MousePointerClick className="h-5 w-5 hidden md:inline mr-1" strokeWidth={1.5} />
                <FingerPrintIcon className="h-6 w-6 md:hidden inline" strokeWidth={1.5} />
                <span>Click on any request section to see more details about it.</span>
              </p>

            </section>
          </div>
        


        {/* Event & Delivary */}

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold text-slate-900">
              Event & Delivery
            </h2>

            <div className="mt-6 flex md:flex-row gap-4">

              <div className="flex-1">

                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Event Date
                </h3>

                <p className="mt-2 font-semibold text-slate-900">
                  {new Date(order.eventDate).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>

              </div>

              <div className="w-px bg-slate-600" />

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

        {/*  */}
        </div>
      </div>

    </main>
  );
}
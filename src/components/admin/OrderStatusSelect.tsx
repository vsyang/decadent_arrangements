"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  OrderStatus,
  UpdateOrderStatus,
} from "../../../app/(admin)/orders/actions";
import { orderStatusEnum } from "@/db/schema";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function OrderStatusSelect({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: OrderStatus;
}) {
  const router = useRouter();

  const [status, setStatus] = useState(currentStatus);

  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as OrderStatus;

    setStatus(newStatus);

    startTransition(async () => {
      try {
        const updated = await UpdateOrderStatus(orderId, newStatus);

        if (!updated) {
          setStatus(currentStatus);

          alert("Failed to update order status.");

          return;
        }

        router.refresh(); // Pide las cosas de nuevo al server
      } catch (error) {
        // Por si algo pasa

        setStatus(currentStatus);

        alert(
          `Something went wrong while updating the status of this order. Error: ${error}`,
        );
      }
    });
  };

  return (
    <div className="relative inline-block w-48">
      <select
        id="order-status"
        onChange={handleChange}
        value={status}
        disabled={isPending}
        className={`w-full appearance-none rounded-lg border-3 py-2 px-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 focus:outline-none focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60 ${
          status === "preparing"
            ? "border-yellow-500 bg-yellow-500/10"
            : status === "delivered"
              ? "border-green-500 bg-green-500/5"
              : status === "cancelled"
                ? "border-red-500 bg-red-500/5"
                : "bg-gray-100/50"
        }`}
      >
        {orderStatusEnum.enumValues.map((status) => (
          <option key={status} value={status} className="bg-white">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </option>
        ))}
      </select>

      {isPending ? (
        <span className="text-xs text-slate-400">Saving...</span>
      ) : (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ChevronDownIcon className="h-5 w-5 text-black" aria-hidden="true" />
        </div>
      )}

      {/* Order #DA-393704 */}
    </div>
  );
}

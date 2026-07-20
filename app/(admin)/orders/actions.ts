"use server";

import { db } from "@/db";
import { Order, orderStatusEnum } from "@/db/schema";
import { eq } from "drizzle-orm";

export type OrderStatus =
  (typeof orderStatusEnum.enumValues)[number];

export async function UpdateOrderStatus(
  orderId: string,
  status: OrderStatus,
) {
  try {

    const result = await db
      .update(Order)
      .set({
        status: status,
        updatedAt: new Date(),
      })
      .where(eq(Order.id, orderId))
      .returning({
        updatedId: Order.id,
      });

    return result.length === 1;

  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update order status.");
  }
}
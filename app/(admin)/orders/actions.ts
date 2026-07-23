"use server";

import { db } from "@/db";
import { Order, orderStatusEnum } from "@/db/schema";
import { eq } from "drizzle-orm";
import { sendCustomerDeliveryEmail } from "@/lib/notification";

export type OrderStatus = (typeof orderStatusEnum.enumValues)[number];

export async function UpdateOrderStatus(orderId: string, status: OrderStatus) {
  try {
    // Find the order before updating
    const existingOrder = await db.query.Order.findFirst({
      where: eq(Order.id, orderId),
    });

    // Stop if the order could not be found
    if (!existingOrder) {
      throw new Error("Order not found.");
    }

    // Update the order status in the database
    const result = await db
      .update(Order)
      .set({
        status,
        updatedAt: new Date(),
      })
      .where(eq(Order.id, orderId))
      .returning({
        updatedId: Order.id,
      });

    const wasUpdated = result.length === 1;
    // Send the customer an email
    if (
      wasUpdated &&
      status === "delivered" &&
      existingOrder.status !== "delivered"
    ) {
      try {
        await sendCustomerDeliveryEmail({
          customerEmail: existingOrder.customerEmailAtPurchase,
          customerName: existingOrder.customerNameAtPurchase,
          productName: existingOrder.productNameAtPurchase,
        });
      } catch (emailError) {
        // The status remains updated even if the email fails
        console.error("Failed to send customer delivery email:", emailError);
      }
    }

    return wasUpdated;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update order status.");
  }
}

import { db } from './index';
import { Order, Product } from './schema';
import { asc, eq, sql } from 'drizzle-orm';

export async function getProducts() {

  const allProducts = await db.select().from(Product);

  return allProducts;
}

export async function fetchProducts() {
  try {
    const data = await db
      .select({
        id: Product.id,
        name: Product.name,
        description: Product.description,
        size: Product.size,
        capacity: Product.capacity,
        price: sql<number>`cast(${Product.price} as float)`,
        imageUrl: Product.imageUrl,
      })
      .from(Product)
      .orderBy(asc(Product.size));

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products data.');
  }
}


export async function getAllOrders() {

  const allOrders = await db.select().from(Order);

  return allOrders;
}


export async function fetchAllOrders() {
  try {
    const data = await db
      .select({
        id: Order.id,
        idReadable: Order.readableOrderCode,
        clientName: Order.customerNameAtPurchase,
        eventDate: Order.eventDate,
        size: Order.arrangementSize,
        status: Order.status,
      })
      .from(Order)
      .orderBy(asc(Order.eventDate));

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch orders data.');
  }
}


export async function fetchAllOrdersByCustomerId(customerId: string) {
  try {
    const data = await db
      .select({
        id: Order.id,
        idReadable: Order.readableOrderCode,
        clientName: Order.customerNameAtPurchase,
        eventDate: Order.eventDate,
        size: Order.arrangementSize,
        status: Order.status,
      })
      .from(Order)
      .where(eq(Order.userId, customerId))
      .orderBy(asc(Order.eventDate));

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch orders data.");
  }
}
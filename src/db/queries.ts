import { ProductInput } from '../../app/(admin)/dashboard/actions';
import { db } from './index';
import { Order, Product, ProductImage } from './schema';
import { asc, eq, sql } from 'drizzle-orm';

export async function getProducts() {
  const allProducts = await db.select().from(Product);
  return allProducts;
}

export async function fetchProducts(): Promise<ProductInput[]> {
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

    return data as ProductInput[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products data.');
  }
}

// 🟢 INTEGRADO: Obtenido de main
export async function fetchProductById(productId: string) {
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
      .where(eq(Product.id, productId));

    return data[0] || null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product data.");
  }
}
// Get all product images by product size
export async function fetchImagesByProductSize(
  productSize: "S" | "M" | "L" | "XL"
) {
  try {
    return await db
      .select({
        id: ProductImage.id,
        size: ProductImage.size,
        imageUrl: ProductImage.imageUrl,
        pathname: ProductImage.pathname,
        fileName: ProductImage.fileName,
        createdAt: ProductImage.createdAt,
        updatedAt: ProductImage.updatedAt,
      })
      .from(ProductImage)
      .where(eq(ProductImage.size, productSize))
      .orderBy(asc(ProductImage.fileName));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product images.");
  }
}

export async function fetchProductImageById(imageId: string) {
  try {
    const data = await db
      .select()
      .from(ProductImage)
      .where(eq(ProductImage.id, imageId));

    return data[0] || null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product image.");
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

// 🟢 INTEGRADO: Obtenido de main
export async function fetchOrderById(orderId: string) {
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
      .where(eq(Order.id, orderId));

    return data[0] || null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch order data.");
  }
}
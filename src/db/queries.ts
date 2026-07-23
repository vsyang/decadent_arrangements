import { ProductRecord } from "../../app/(admin)/products/actions";
import { db } from "./index";
import { Order, Product, ProductImage } from "./schema";
import { asc, eq, or, sql } from "drizzle-orm";

// ==========================================
// PRODUCT QUERIES
// ==========================================

// Get every product.
export async function getProducts() {
  const allProducts = await db
    .select()
    .from(Product)
    .orderBy(asc(Product.name));

  return allProducts;
}

// Get every product for the public and admin product lists.
export async function fetchProducts(): Promise<ProductRecord[]> {
  try {
    const data = await db
      .select({
        id: Product.id,
        name: Product.name,
        description: Product.description,
        capacity: Product.capacity,
        price: sql<number>`cast(${Product.price} as float)`,
        imageUrl: Product.imageUrl,
      })
      .from(Product)
      .orderBy(
        sql<number>`
        CAST(
          SUBSTRING(${Product.capacity} FROM '^[0-9]+')
          AS INTEGER
        )
      `,
        // If two products start with the same number, sort them alphabetically by name.
        asc(Product.name),
      );

    return data as ProductRecord[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch products data.");
  }
}

// Get one product using its product ID.
export async function fetchProductById(productId: string) {
  try {
    const data = await db
      .select({
        id: Product.id,
        name: Product.name,
        description: Product.description,
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

// Get every gallery image connected to one product.
export async function fetchImagesByProductId(productId: string) {
  try {
    return await db
      .select({
        id: ProductImage.id,
        productId: ProductImage.productId,
        imageUrl: ProductImage.imageUrl,
        pathname: ProductImage.pathname,
        fileName: ProductImage.fileName,
        createdAt: ProductImage.createdAt,
        updatedAt: ProductImage.updatedAt,
      })
      .from(ProductImage)
      .where(eq(ProductImage.productId, productId))
      .orderBy(asc(ProductImage.fileName));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product images.");
  }
}

// Get all product images.
export async function fetchAllProductImages() {
  try {
    return await db
      .select({
        id: ProductImage.id,
        productId: ProductImage.productId,
        imageUrl: ProductImage.imageUrl,
        pathname: ProductImage.pathname,
        fileName: ProductImage.fileName,
        createdAt: ProductImage.createdAt,
        updatedAt: ProductImage.updatedAt,
      })
      .from(ProductImage)
      .orderBy(asc(ProductImage.fileName));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product images.");
  }
}

// Get one gallery image using its image ID.
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

// ==========================================
// ORDER QUERIES
// ==========================================

// Get every order.
export async function getAllOrders() {
  const allOrders = await db.select().from(Order).orderBy(asc(Order.eventDate));

  return allOrders;
}

// Get all orders for the admin orders list.
export async function fetchAllOrders() {
  try {
    const data = await db
      .select({
        id: Order.id,
        idReadable: Order.readableOrderCode,
        clientName: Order.customerNameAtPurchase,

        // Product details saved at the time of purchase.
        productName: Order.productNameAtPurchase,
        capacity: Order.productCapacityAtPurchase,

        eventDate: Order.eventDate,
        status: Order.status,
      })
      .from(Order)
      .orderBy(asc(Order.eventDate));

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch orders data.");
  }
}

// Get all orders placed by one customer.
export async function fetchAllOrdersByCustomerId(customerId: string) {
  try {
    const data = await db
      .select({
        id: Order.id,
        idReadable: Order.readableOrderCode,
        clientName: Order.customerNameAtPurchase,

        // Product details saved at the time of purchase.
        productName: Order.productNameAtPurchase,
        capacity: Order.productCapacityAtPurchase,

        eventDate: Order.eventDate,
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

// Get one complete order using its database ID.
export async function fetchOrderById(orderId: string) {
  try {
    const data = await db
      .select({
        id: Order.id,
        idReadable: Order.readableOrderCode,

        clientName: Order.customerNameAtPurchase,
        phone: Order.customerPhoneAtPurchase,
        email: Order.customerEmailAtPurchase,

        // Product relationship and purchase-time snapshots.
        productId: Order.productId,
        productName: Order.productNameAtPurchase,
        capacity: Order.productCapacityAtPurchase,

        price: Order.totalPrice,
        eventDate: Order.eventDate,
        status: Order.status,

        address: Order.deliveryAddress,
        dietaryRestrictions: Order.dietaryRestrictions,
        specialRequest: Order.specialRequests,
        payment: Order.paymentPreference,

        createdAt: Order.createdAt,
        updatedAt: Order.updatedAt,
      })
      .from(Order)
      .where(eq(Order.id, orderId));

    return data[0] || null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch order data.");
  }
}

// Get delivered and cancelled orders.
export async function fetchAllOrdersCompleted() {
  try {
    const data = await db
      .select({
        id: Order.id,
        idReadable: Order.readableOrderCode,
        clientName: Order.customerNameAtPurchase,

        productName: Order.productNameAtPurchase,
        capacity: Order.productCapacityAtPurchase,

        eventDate: Order.eventDate,
        status: Order.status,
      })
      .from(Order)
      .where(or(eq(Order.status, "delivered"), eq(Order.status, "cancelled")))
      .orderBy(asc(Order.eventDate));

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch completed orders.");
  }
}

// Get pending and preparing orders.
export async function fetchAllOrdersIncompleted() {
  try {
    const data = await db
      .select({
        id: Order.id,
        idReadable: Order.readableOrderCode,
        clientName: Order.customerNameAtPurchase,

        productName: Order.productNameAtPurchase,
        capacity: Order.productCapacityAtPurchase,

        eventDate: Order.eventDate,
        status: Order.status,
      })
      .from(Order)
      .where(or(eq(Order.status, "pending"), eq(Order.status, "preparing")))
      .orderBy(asc(Order.eventDate));

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch incomplete orders.");
  }
}

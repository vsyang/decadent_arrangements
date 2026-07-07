import { db } from './index';
import { Product } from './schema';
import { asc, sql } from 'drizzle-orm';

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
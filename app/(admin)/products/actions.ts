"use server";

import { db } from "@/db";
import { Product } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Used when creating or editing a product.
export interface ProductInput {
  id?: string;
  name: string;
  description: string;
  capacity: string;
  price: number;
  imageUrl?: string | null;
}

// Used when reading a saved product from the database.
export interface ProductRecord extends ProductInput {
  id: string;
}

export async function CreateProduct(data: ProductInput) {
  try {
    await db.insert(Product).values({
      name: data.name,
      description: data.description,
      capacity: data.capacity,
      price: String(data.price),
      imageUrl: data.imageUrl || null,
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create product.");
  }

  revalidatePath("/products");
  revalidatePath("/catalog");

  redirect("/products");
}

export async function UpdateProductById(
  productId: string,
  data: ProductInput,
) {
  try {
    await db
      .update(Product)
      .set({
        name: data.name,
        description: data.description,
        capacity: data.capacity,
        price: String(data.price),
        imageUrl: data.imageUrl || null,
        updatedAt: new Date(),
      })
      .where(eq(Product.id, productId));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update product.");
  }

  revalidatePath("/products");
  revalidatePath("/catalog");

  redirect("/products");
}

export async function DeleteProductById(productId: string) {
  try {
    await db
      .delete(Product)
      .where(eq(Product.id, productId));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete product.");
  }

  revalidatePath("/products");
  revalidatePath("/catalog");

  redirect("/products");
}
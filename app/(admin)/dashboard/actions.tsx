"use server";

import { db } from "@/db";
import { Product, productSizeEnum } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


// PRODUCTS ACTIONS

export type ProductSize = typeof productSizeEnum.enumValues[number];

export interface ProductInput { // Defining el input
  id?: string;
  name: string;
  description: string;
  size: ProductSize;
  capacity: string;
  price: number;
  imageUrl?: string;
}

export async function CreateProduct(data: ProductInput) {

  // << Product >>
  // id: UUID (solo)
  // name: text
  // description: text
  // size: enum(S,M,L,XL)
  // capacity: text
  // price: number (10,2)
  // image_url: text (puede no existir. Can be the "Comming soon" image)
  // created_at: timestamp (Se hace solo)
  // updated_at: timestamp (Problema para update aka Joe del futuro)

  try {
    await db.insert(Product).values({
      name: data.name,
      description: data.description,
      size: data.size,
      capacity: data.capacity,
      price: String(data.price),
      imageUrl: data.imageUrl || null,
    });

  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create product.");
  }

  revalidatePath("/products");
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
        size: data.size,
        capacity: data.capacity,
        price: String(data.price),
        imageUrl: data.imageUrl || null,
        updatedAt: new Date(), // La fecha se necesita updatear
      })
      .where(eq(Product.id, productId));

  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update product.");
  }

  revalidatePath("/products");
  redirect("/products");
}


export async function DeleteProductById(productId: string) {

  try {
    await db
      .delete(Product)
      .where(eq(Product.id, productId))
      
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete product.");
  }

  revalidatePath("/products");
  redirect("/products");
}

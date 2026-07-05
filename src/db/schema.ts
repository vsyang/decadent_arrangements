import { pgTable, uuid, text, timestamp, jsonb, pgEnum, numeric } from 'drizzle-orm/pg-core';

export interface UserAddress {
  id: string;
  label: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode?: string;
  deliveryNotes?: string;
}

// ==========================================
// ENUMS
// ==========================================

export const productSizeEnum = pgEnum('product_size', ['S', 'M', 'L', 'XL']);

export const orderStatusEnum = pgEnum('order_status', [
  'pending',     // Pendiente
  'preparing',   // Preparando
  'delivered',   // Entregado
  'cancelled'    // Cancelado
]);

// ==========================================
// USERS TABLE
// ==========================================

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  lastname: text('lastname').notNull(),
  middlename: text('middlename'), 
  email: text('email').notNull().unique(),
  phones: text('phones').array().notNull().default([]),
  preferredContactMethod: text('preferred_contact_method').notNull().default('whatsapp'),
  addresses: jsonb('addresses').$type<UserAddress[]>().notNull().default([]),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// ==========================================
// PRODUCT TABLE
// ==========================================

export const Product = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  size: productSizeEnum('size').notNull(),
  capacity: text('capacity').notNull(), // Ex: "10-20 guests", "20-30 guests"
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  imageUrl: text('image_url'),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// ==========================================
// ORDERS TABLE
// ==========================================

export const Order = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  readableOrderCode: text('readable_order_code').notNull().unique(),

  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'restrict' }),

  customerNameAtPurchase: text('customer_name_at_purchase').notNull(),
  customerPhoneAtPurchase: text('customer_phone_at_purchase').notNull(),
  customerEmailAtPurchase: text('customer_email_at_purchase').notNull(),

  totalPrice: numeric('total_price', { precision: 10, scale: 2 }).notNull(),
  eventDate: timestamp('event_date', { withTimezone: true }).notNull(),
  deliveryAddress: jsonb('delivery_address').$type<UserAddress>().notNull(),
  dietaryRestrictions: text('dietary_restrictions').array().notNull().default([]),   // Ex: ["Nuts-free", "Gluten-free"])
  status: orderStatusEnum('status').notNull().default('pending'),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});
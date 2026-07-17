import { pgTable, uuid, text, timestamp, jsonb, pgEnum, numeric, primaryKey, boolean } from 'drizzle-orm/pg-core';
import type { AdapterAccount } from 'next-auth/adapters';

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
export const userRoleEnum = pgEnum('user_role', ['user', 'admin']);

export const productSizeEnum = pgEnum('product_size', ['S', 'M', 'L', 'XL']);

export const orderStatusEnum = pgEnum('order_status', [
  'pending',
  'preparing',
  'delivered',
  'cancelled',
]);

export const notificationCategoryEnum = pgEnum('notification_category', [
  'orders',
  'promotions',
  'account',
]);

// ==========================================
// AUTH.JS TABLES
// ==========================================

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name'),
  lastname: text('lastname').notNull().default(''),
  middlename: text('middlename'),
  email: text('email').notNull().unique(),
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  image: text('image'),
  phones: text('phones').array(),
  addresses: jsonb('addresses').$type<UserAddress[]>().default([]),
  preferredContactMethod: text('preferred_contact_method').notNull().default('whatsapp'),
  role: userRoleEnum('role').notNull().default('user'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const accounts = pgTable(
  'account',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount['type']>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('provider_account_id').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: numeric('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
);

export const sessions = pgTable('session', {
  sessionToken: text('session_token').primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
  'verification_token',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => [
    {
      compoundKey: primaryKey({
        columns: [vt.identifier, vt.token],
      }),
    },
  ]
);

// ==========================================
// BUSINESS TABLES
// ==========================================

export const Product = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  size: productSizeEnum('size').notNull(),
  capacity: text('capacity').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  imageUrl: text('image_url'),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const Order = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  readableOrderCode: text('readable_order_code').notNull().unique(),

  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'restrict' }),

  customerNameAtPurchase: text('customer_name_at_purchase').notNull(),
  customerPhoneAtPurchase: text('customer_phone_at_purchase').notNull(),
  customerEmailAtPurchase: text('customer_email_at_purchase').notNull(),

  arrangementSize: productSizeEnum('arrangement_size').notNull(),
  specialRequests: text('special_requests'),

  totalPrice: numeric('total_price', { precision: 10, scale: 2 }).notNull(),
  eventDate: timestamp('event_date', { withTimezone: true }).notNull(),
  deliveryAddress: jsonb('delivery_address').$type<UserAddress>().notNull(),
  dietaryRestrictions: text('dietary_restrictions').array().notNull().default([]),
  paymentPreference: text("payment_preference").notNull().default('venmo'),
  status: orderStatusEnum('status').notNull().default('pending'),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const Notification = pgTable('notifications', {
  id: uuid('id').defaultRandom().primaryKey(),

  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  title: text('title').notNull(),
  message: text('message').notNull(),

  category: notificationCategoryEnum('category').notNull().default('orders'),

  isRead: boolean('is_read').notNull().default(false),

  actionUrl: text('action_url'),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});
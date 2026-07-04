import { pgTable, uuid, text, timestamp, jsonb } from 'drizzle-orm/pg-core';

export interface UserAddress {
  id: string;
  label: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode?: string;
  deliveryNotes?: string;
}

// 1. Define the Users table
export const user = pgTable('user', {
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

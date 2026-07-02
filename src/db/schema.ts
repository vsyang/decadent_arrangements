import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// 1. Define the Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  lastname: text('lastname').notNull(),
  middlename: text('middlename').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});


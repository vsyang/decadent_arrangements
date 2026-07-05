import 'dotenv/config'
import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const databaseUrl = process.env.DATABASE_URL?.trim();

if (!databaseUrl) {
  throw new Error("DATABASE_URL is undefined in .env.local");
}

export default defineConfig({
  schema: './src/db/schema.ts', // Path to your schema
  out: './drizzle',             // Folder where SQL files will save
  dialect: 'postgresql',        // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    url: databaseUrl,
  },
 
});


import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../shared/schema.js";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
}

const isExternalDb = process.env.DATABASE_URL?.includes("neon") ||
  process.env.DATABASE_URL?.includes("supabase") ||
  process.env.DATABASE_URL?.includes("vercel");

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isExternalDb ? { rejectUnauthorized: false } : undefined,
});
export const db = drizzle(pool, { schema });

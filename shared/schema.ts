import { pgTable, text, boolean, integer, jsonb, timestamp, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const umrahPrograms = pgTable("umrah_programs", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  nama_program: text("nama_program").notNull(),
  slug_url: text("slug_url").notNull().unique(),
  poster_image: text("poster_image").notNull(),
  subtitle: text("subtitle"),
  bulan_keberangkatan: text("bulan_keberangkatan").notNull(),
  durasi_hari: text("durasi_hari").notNull(),
  harga_mulai: text("harga_mulai").notNull(),
  kota_keberangkatan: text("kota_keberangkatan").notNull().default("Jakarta (CGK)"),
  hotel_makkah: text("hotel_makkah").notNull(),
  hotel_madinah: text("hotel_madinah").notNull(),
  maskapai: text("maskapai").notNull(),
  bonus_program: text("bonus_program"),
  harga_detail: jsonb("harga_detail").default([]),
  fasilitas_include: text("fasilitas_include").array().default([]),
  fasilitas_exclude: text("fasilitas_exclude").array().default([]),
  catatan_program: text("catatan_program").array().default([]),
  rekening_pembayaran: jsonb("rekening_pembayaran").default([]),
  whatsapp_booking_link: text("whatsapp_booking_link").notNull().default("https://wa.me/6281234567890"),
  is_active: boolean("is_active").notNull().default(true),
  sort_order: integer("sort_order").notNull().default(0),
  badge: text("badge"),
  created_at: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type UmrahProgram = typeof umrahPrograms.$inferSelect;
export type InsertUmrahProgram = typeof umrahPrograms.$inferInsert;

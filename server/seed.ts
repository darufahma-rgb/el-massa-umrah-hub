import { db } from "./db.js";
import { umrahPrograms } from "../shared/schema.js";
import { eq } from "drizzle-orm";

const posterBase = "/poster-";

const programs = [
  {
    slug_url: "umrah-reguler-juli",
    nama_program: "Umrah Reguler",
    subtitle: "Paket ibadah umrah terjangkau dengan pelayanan terbaik",
    bulan_keberangkatan: "Juli 2026",
    durasi_hari: "9 Hari",
    kota_keberangkatan: "Jakarta (CGK)",
    harga_mulai: "Rp 25.900.000",
    poster_image: `${posterBase}reguler.jpg`,
    hotel_makkah: "Grand Zamzam Hotel ⭐⭐⭐⭐",
    hotel_madinah: "Millennium Al Aqeeq ⭐⭐⭐⭐",
    maskapai: "Saudi Airlines (Direct Flight)",
    bonus_program: "City Tour Jeddah",
    badge: "Populer",
    sort_order: 1,
    harga_detail: [
      { city: "Jakarta (CGK)", price: "Rp 25.900.000" },
      { city: "Pangkal Pinang (PGK)", price: "Rp 27.500.000" },
    ],
    fasilitas_include: [
      "Tiket Pesawat PP", "Hotel Makkah 4 Malam", "Hotel Madinah 3 Malam",
      "Visa Umrah", "Makan 3x Sehari (Catering)", "Transportasi Bus AC",
      "Muthawwif Berpengalaman", "Perlengkapan Umrah", "Air Zamzam 5 Liter",
      "Asuransi Perjalanan", "Handling Bandara", "Manasik Umrah",
    ],
    fasilitas_exclude: [
      "Paspor (jika belum punya)", "Suntik Meningitis", "Kelebihan Bagasi",
      "Pengeluaran Pribadi", "Tips Guide Lokal",
    ],
    catatan_program: [
      "Upgrade kamar single supplement: +Rp 3.500.000",
      "Harga anak (2-12 tahun) tanpa bed: diskon 15%",
      "DP minimal Rp 5.000.000 untuk booking seat",
      "Pelunasan paling lambat H-30 keberangkatan",
    ],
    rekening_pembayaran: [
      { bank: "Bank Syariah Indonesia (BSI)", accountNumber: "123-456-7890", accountName: "PT El Massa Tour & Travel" },
      { bank: "Bank Mandiri", accountNumber: "098-765-4321", accountName: "PT El Massa Tour & Travel" },
    ],
    whatsapp_booking_link: "https://wa.me/6281234567890",
  },
  {
    slug_url: "umrah-vip-agustus",
    nama_program: "Umrah VIP",
    subtitle: "Pengalaman umrah mewah dengan akomodasi bintang 5",
    bulan_keberangkatan: "Agustus 2026",
    durasi_hari: "12 Hari",
    kota_keberangkatan: "Jakarta (CGK)",
    harga_mulai: "Rp 45.000.000",
    poster_image: `${posterBase}vip.jpg`,
    hotel_makkah: "Raffles Makkah Palace ⭐⭐⭐⭐⭐",
    hotel_madinah: "The Oberoi Madinah ⭐⭐⭐⭐⭐",
    maskapai: "Garuda Indonesia (Direct Flight)",
    bonus_program: "City Tour Jeddah + Kereta Cepat Haramain",
    badge: "Premium",
    sort_order: 2,
    harga_detail: [
      { city: "Jakarta (CGK)", price: "Rp 45.000.000" },
      { city: "Pangkal Pinang (PGK)", price: "Rp 47.500.000" },
    ],
    fasilitas_include: [
      "Tiket Pesawat PP (Business Class)", "Hotel Makkah 5 Malam", "Hotel Madinah 4 Malam",
      "Visa Umrah", "Makan 3x Sehari (Buffet Hotel)", "Transportasi VIP",
      "Muthawwif Privat", "Perlengkapan Umrah Premium", "Air Zamzam 10 Liter",
      "Asuransi Perjalanan Premium", "Fast Track Bandara", "Manasik Umrah",
    ],
    fasilitas_exclude: ["Paspor", "Suntik Meningitis", "Kelebihan Bagasi", "Pengeluaran Pribadi"],
    catatan_program: [
      "Grup kecil maksimal 15 jamaah",
      "Upgrade suite room tersedia",
      "DP minimal Rp 10.000.000",
      "Pelunasan H-45 keberangkatan",
    ],
    rekening_pembayaran: [
      { bank: "Bank Syariah Indonesia (BSI)", accountNumber: "123-456-7890", accountName: "PT El Massa Tour & Travel" },
      { bank: "Bank Mandiri", accountNumber: "098-765-4321", accountName: "PT El Massa Tour & Travel" },
    ],
    whatsapp_booking_link: "https://wa.me/6281234567890",
  },
  {
    slug_url: "umrah-plus-september",
    nama_program: "Umrah Plus Istanbul",
    subtitle: "Kombinasi umrah dan wisata religi ke Istanbul, Turki",
    bulan_keberangkatan: "September 2026",
    durasi_hari: "14 Hari",
    kota_keberangkatan: "Jakarta (CGK)",
    harga_mulai: "Rp 38.500.000",
    poster_image: `${posterBase}plus.jpg`,
    hotel_makkah: "Swissotel Al Maqam ⭐⭐⭐⭐⭐",
    hotel_madinah: "Pullman Madinah ⭐⭐⭐⭐",
    maskapai: "Turkish Airlines (Transit Istanbul)",
    bonus_program: "City Tour Istanbul 3 Hari",
    badge: "Program Baru",
    sort_order: 3,
    harga_detail: [
      { city: "Jakarta (CGK)", price: "Rp 38.500.000" },
      { city: "Pangkal Pinang (PGK)", price: "Rp 40.500.000" },
    ],
    fasilitas_include: [
      "Tiket Pesawat PP", "Hotel Makkah 4 Malam", "Hotel Madinah 3 Malam",
      "Hotel Istanbul 3 Malam", "Visa Umrah + Visa Turki", "Makan 3x Sehari",
      "Transportasi Bus AC", "City Tour Istanbul (Hagia Sophia, Blue Mosque, Grand Bazaar)",
      "Muthawwif Berpengalaman", "Air Zamzam 5 Liter", "Asuransi Perjalanan", "Manasik Umrah",
    ],
    fasilitas_exclude: ["Paspor", "Suntik Meningitis", "Kelebihan Bagasi", "Pengeluaran Pribadi", "Optional Tour"],
    catatan_program: [
      "Rute: Jakarta → Istanbul → Madinah → Makkah → Jakarta",
      "DP minimal Rp 7.500.000",
      "Pelunasan H-30 keberangkatan",
    ],
    rekening_pembayaran: [
      { bank: "Bank Syariah Indonesia (BSI)", accountNumber: "123-456-7890", accountName: "PT El Massa Tour & Travel" },
      { bank: "Bank Mandiri", accountNumber: "098-765-4321", accountName: "PT El Massa Tour & Travel" },
    ],
    whatsapp_booking_link: "https://wa.me/6281234567890",
  },
  {
    slug_url: "umrah-ramadhan-2027",
    nama_program: "Umrah Ramadhan",
    subtitle: "Rasakan kekhusyukan ibadah di bulan suci Ramadhan",
    bulan_keberangkatan: "Maret 2027",
    durasi_hari: "15 Hari",
    kota_keberangkatan: "Jakarta (CGK)",
    harga_mulai: "Rp 42.000.000",
    poster_image: `${posterBase}ramadhan.jpg`,
    hotel_makkah: "Hilton Suites Makkah ⭐⭐⭐⭐⭐",
    hotel_madinah: "Dar Al Taqwa Madinah ⭐⭐⭐⭐⭐",
    maskapai: "Saudi Airlines (Direct Flight)",
    bonus_program: "Iftar di Masjidil Haram",
    badge: "Kuota Terbatas",
    sort_order: 4,
    harga_detail: [
      { city: "Jakarta (CGK)", price: "Rp 42.000.000" },
      { city: "Pangkal Pinang (PGK)", price: "Rp 44.500.000" },
    ],
    fasilitas_include: [
      "Tiket Pesawat PP", "Hotel Makkah 8 Malam", "Hotel Madinah 5 Malam",
      "Visa Umrah", "Makan Sahur & Iftar", "Transportasi Bus AC",
      "Muthawwif Berpengalaman", "Perlengkapan Umrah", "Air Zamzam 5 Liter",
      "Asuransi Perjalanan", "Manasik Umrah", "Handling Bandara",
    ],
    fasilitas_exclude: ["Paspor", "Suntik Meningitis", "Kelebihan Bagasi", "Pengeluaran Pribadi"],
    catatan_program: [
      "Seat terbatas, booking secepatnya",
      "DP minimal Rp 10.000.000",
      "Pelunasan H-60 keberangkatan",
    ],
    rekening_pembayaran: [
      { bank: "Bank Syariah Indonesia (BSI)", accountNumber: "123-456-7890", accountName: "PT El Massa Tour & Travel" },
      { bank: "Bank Mandiri", accountNumber: "098-765-4321", accountName: "PT El Massa Tour & Travel" },
    ],
    whatsapp_booking_link: "https://wa.me/6281234567890",
  },
  {
    slug_url: "umrah-hemat-oktober",
    nama_program: "Umrah Hemat",
    subtitle: "Paket umrah ekonomis tanpa mengurangi kenyamanan",
    bulan_keberangkatan: "Oktober 2026",
    durasi_hari: "9 Hari",
    kota_keberangkatan: "Jakarta (CGK)",
    harga_mulai: "Rp 21.500.000",
    poster_image: `${posterBase}hemat.jpg`,
    hotel_makkah: "Al Massa Hotel ⭐⭐⭐",
    hotel_madinah: "Rawda Al Madinah ⭐⭐⭐",
    maskapai: "Batik Air (Transit)",
    bonus_program: "Ziarah Jabal Uhud",
    badge: "Best Value",
    sort_order: 5,
    harga_detail: [
      { city: "Jakarta (CGK)", price: "Rp 21.500.000" },
      { city: "Pangkal Pinang (PGK)", price: "Rp 23.500.000" },
    ],
    fasilitas_include: [
      "Tiket Pesawat PP", "Hotel Makkah 4 Malam", "Hotel Madinah 3 Malam",
      "Visa Umrah", "Makan 3x Sehari", "Transportasi Bus AC",
      "Muthawwif", "Perlengkapan Umrah", "Air Zamzam 5 Liter", "Asuransi Perjalanan",
    ],
    fasilitas_exclude: ["Paspor", "Suntik Meningitis", "Kelebihan Bagasi", "Pengeluaran Pribadi", "Tips Guide"],
    catatan_program: [
      "Kamar berisi 4 orang",
      "Upgrade quad ke triple: +Rp 1.500.000",
      "DP minimal Rp 5.000.000",
    ],
    rekening_pembayaran: [
      { bank: "Bank Syariah Indonesia (BSI)", accountNumber: "123-456-7890", accountName: "PT El Massa Tour & Travel" },
      { bank: "Bank Mandiri", accountNumber: "098-765-4321", accountName: "PT El Massa Tour & Travel" },
    ],
    whatsapp_booking_link: "https://wa.me/6281234567890",
  },
  {
    slug_url: "umrah-exclusive-november",
    nama_program: "Umrah Exclusive",
    subtitle: "Perjalanan spiritual eksklusif dengan layanan privat",
    bulan_keberangkatan: "November 2026",
    durasi_hari: "10 Hari",
    kota_keberangkatan: "Jakarta (CGK)",
    harga_mulai: "Rp 55.000.000",
    poster_image: `${posterBase}exclusive.jpg`,
    hotel_makkah: "Jabal Omar Hyatt Regency ⭐⭐⭐⭐⭐",
    hotel_madinah: "Shaza Al Madinah ⭐⭐⭐⭐⭐",
    maskapai: "Garuda Indonesia (Direct Flight)",
    bonus_program: "Private City Tour + Kereta Cepat Haramain",
    badge: "Exclusive",
    sort_order: 6,
    harga_detail: [
      { city: "Jakarta (CGK)", price: "Rp 55.000.000" },
      { city: "Pangkal Pinang (PGK)", price: "Rp 57.500.000" },
    ],
    fasilitas_include: [
      "Tiket Pesawat PP (Business Class)", "Hotel Makkah 5 Malam (Suite Room)",
      "Hotel Madinah 4 Malam (Suite Room)", "Visa Umrah", "Private Dining",
      "Luxury Vehicle", "Private Muthawwif", "Premium Umrah Kit",
      "Air Zamzam 10 Liter", "Comprehensive Insurance", "VIP Airport Lounge", "Private Manasik",
    ],
    fasilitas_exclude: ["Paspor", "Suntik Meningitis", "Pengeluaran Pribadi"],
    catatan_program: [
      "Maksimal 8 jamaah per grup",
      "Full private experience",
      "DP minimal Rp 15.000.000",
      "Pelunasan H-45 keberangkatan",
    ],
    rekening_pembayaran: [
      { bank: "Bank Syariah Indonesia (BSI)", accountNumber: "123-456-7890", accountName: "PT El Massa Tour & Travel" },
      { bank: "Bank Mandiri", accountNumber: "098-765-4321", accountName: "PT El Massa Tour & Travel" },
    ],
    whatsapp_booking_link: "https://wa.me/6281234567890",
  },
];

async function seed() {
  console.log("Seeding database...");
  for (const program of programs) {
    const existing = await db
      .select()
      .from(umrahPrograms)
      .where(eq(umrahPrograms.slug_url, program.slug_url))
      .limit(1);

    if (existing.length === 0) {
      await db.insert(umrahPrograms).values(program);
      console.log(`Inserted: ${program.nama_program}`);
    } else {
      console.log(`Skipped (already exists): ${program.nama_program}`);
    }
  }
  console.log("Seed complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});

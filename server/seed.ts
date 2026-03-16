import { db } from "./db.js";
import { umrahPrograms } from "../shared/schema.js";

const fasilitasInclude = [
  "Tiket Pesawat PP CGK–JED (Saudia/Garuda)",
  "Tiket Pesawat PP JED–CGK (Saudia/Garuda)",
  "Bagasi 1 x 23 KG Sesuai Maskapai",
  "Visa Umrah",
  "Hotel Makkah & Madinah",
  "Makan 3x Sehari",
  "Bus AC Modern",
  "Perlengkapan Umrah + Koper",
  "Tour Leader & Muthowwif Berpengalaman",
  "Handling Bandara Jakarta & Jeddah",
  "Bimbingan Manasik 3x Sebelum Berangkat",
  "Free Medical Checkup 30 Hari Sebelum Berangkat",
  "Air Zamzam 5 Liter Saat Kepulangan",
  "Free Ayam Albaik Saat Kepulangan",
  "Dokumentasi Foto & Video",
  "Bingkisan Kenangan Saat Kepulangan",
  "Air Zamzam 5 Liter Gratis Untuk Acara Selamatan",
];

const fasilitasExclude = [
  "Biaya Pembuatan Paspor",
  "Biaya Suntik Vaksin",
  "Bagasi Tambahan",
];

const rekening = [
  {
    bank: "Bank BTN",
    accountNumber: "20901880001965",
    accountName: "PT AL MASSA AZKA WISATA",
  },
];

const waBase = "https://wa.me/6281249476778";
const waText = (program: string, bulan: string) =>
  `${waBase}?text=${encodeURIComponent(`Assalamualaikum, saya tertarik dengan paket ${program} bulan ${bulan} dari El Massa Tour. Mohon informasi lebih lanjut. Terima kasih 🙏`)}`;

const programs = [
  {
    slug_url: "umrah-kemerdekaan-agustus",
    nama_program: "Umrah Kemerdekaan",
    subtitle: "Umrah Reguler spesial Hari Kemerdekaan Indonesia",
    bulan_keberangkatan: "Agustus 2026",
    durasi_hari: "10 Hari",
    kota_keberangkatan: "Pangkal Pinang / Jakarta",
    harga_mulai: "Rp 29.900.000",
    poster_image: "/poster-agustus.png",
    hotel_makkah: "Grand Al Massa /setaraf",
    hotel_madinah: "Daar El Naeem /setaraf",
    maskapai: "Saudia / Garuda Indonesia",
    bonus_program: "City Tour Bonus Thaif",
    badge: "Populer",
    sort_order: 1,
    harga_detail: [
      { city: "Pangkal Pinang (PGK)", price: "Rp 29.900.000" },
      { city: "Jakarta (CGK)", price: "Rp 26.700.000" },
    ],
    fasilitas_include: [...fasilitasInclude, "Free Pembuatan Paspor & Vaksin"],
    fasilitas_exclude: fasilitasExclude,
    catatan_program: [
      "Harga untuk kamar standar 4 kasur",
      "Upgrade kamar double: +Rp 5 jt/pax",
      "Upgrade kamar triple: +Rp 3 jt/pax",
      "Include All In — Tanpa Biaya Tambahan",
    ],
    rekening_pembayaran: rekening,
    whatsapp_booking_link: waText("Umrah Kemerdekaan", "Agustus 2026"),
  },
  {
    slug_url: "umrah-ekslusif-maulid-september",
    nama_program: "Umrah Eksklusif Bulan Maulid",
    subtitle: "Paket eksklusif menyambut Maulid Nabi Muhammad SAW",
    bulan_keberangkatan: "September 2026",
    durasi_hari: "10 Hari",
    kota_keberangkatan: "Pangkal Pinang / Jakarta",
    harga_mulai: "Rp 36.700.000",
    poster_image: "/poster-eksklusif-september.png",
    hotel_makkah: "Shofwah / Zam Tower /setaraf",
    hotel_madinah: "Dallah / Sanabel /setaraf",
    maskapai: "Saudia / Garuda Indonesia",
    bonus_program: "City Tour Bonus Thaif + Free Kereta Cepat Madinah ke Makkah",
    badge: "Eksklusif",
    sort_order: 2,
    harga_detail: [
      { city: "Pangkal Pinang (PGK)", price: "Rp 36.700.000" },
      { city: "Jakarta (CGK)", price: "Rp 35.200.000" },
    ],
    fasilitas_include: [...fasilitasInclude, "Free Kereta Cepat Madinah–Makkah"],
    fasilitas_exclude: fasilitasExclude,
    catatan_program: [
      "Harga untuk kamar standar 4 kasur",
      "Include All In — Tanpa Biaya Tambahan",
      "Hotel bintang 5 dekat Masjidil Haram",
    ],
    rekening_pembayaran: rekening,
    whatsapp_booking_link: waText("Umrah Eksklusif Bulan Maulid", "September 2026"),
  },
  {
    slug_url: "umrah-reguler-maulid-september",
    nama_program: "Umrah Reguler Maulid 12 Hari",
    subtitle: "Umrah Reguler paket 12 hari momen Maulid Nabi",
    bulan_keberangkatan: "September 2026",
    durasi_hari: "12 Hari",
    kota_keberangkatan: "Pangkal Pinang / Jakarta",
    harga_mulai: "Rp 33.500.000",
    poster_image: "/poster-reguler-september-12d.png",
    hotel_makkah: "Grand Al Massa /setaraf",
    hotel_madinah: "Daar El Naeem /setaraf",
    maskapai: "Saudia / Garuda Indonesia",
    bonus_program: "City Tour Bonus Thaif",
    badge: "Program Baru",
    sort_order: 3,
    harga_detail: [
      { city: "Pangkal Pinang (PGK)", price: "Rp 33.500.000" },
      { city: "Jakarta (CGK)", price: "Rp 31.500.000" },
    ],
    fasilitas_include: fasilitasInclude,
    fasilitas_exclude: fasilitasExclude,
    catatan_program: [
      "Harga untuk kamar standar 4 kasur",
      "Upgrade kamar double: +Rp 5 jt/pax",
      "Upgrade kamar triple: +Rp 3 jt/pax",
      "Include All In — Tanpa Biaya Tambahan",
    ],
    rekening_pembayaran: rekening,
    whatsapp_booking_link: waText("Umrah Reguler Maulid 12 Hari", "September 2026"),
  },
  {
    slug_url: "umrah-reguler-oktober-10d",
    nama_program: "Umrah Reguler Special Oktober",
    subtitle: "Paket umrah reguler spesial Oktober 10 hari dengan harga terjangkau",
    bulan_keberangkatan: "Oktober 2026",
    durasi_hari: "10 Hari",
    kota_keberangkatan: "Pangkal Pinang / Jakarta",
    harga_mulai: "Rp 29.900.000",
    poster_image: "/poster-oktober-10d.png",
    hotel_makkah: "Grand Al Massa /setaraf",
    hotel_madinah: "Daar El Naeem /setaraf",
    maskapai: "Saudia / Garuda Indonesia",
    bonus_program: "City Tour Bonus Thaif",
    badge: "Best Value",
    sort_order: 4,
    harga_detail: [
      { city: "Pangkal Pinang (PGK)", price: "Rp 29.900.000" },
      { city: "Jakarta (CGK)", price: "Rp 27.500.000" },
    ],
    fasilitas_include: fasilitasInclude,
    fasilitas_exclude: fasilitasExclude,
    catatan_program: [
      "Harga untuk kamar standar 4 kasur",
      "Include All In — Tanpa Biaya Tambahan",
    ],
    rekening_pembayaran: rekening,
    whatsapp_booking_link: waText("Umrah Reguler Special Oktober", "Oktober 2026"),
  },
  {
    slug_url: "umrah-spesial-oktober-12d",
    nama_program: "Umrah Reguler Special Oktober 12 Hari",
    subtitle: "Paket umrah reguler spesial Oktober 12 hari pilihan terbaik",
    bulan_keberangkatan: "Oktober 2026",
    durasi_hari: "12 Hari",
    kota_keberangkatan: "Pangkal Pinang / Jakarta",
    harga_mulai: "Rp 33.500.000",
    poster_image: "/poster-oktober-12d.png",
    hotel_makkah: "Grand Al Massa /setaraf",
    hotel_madinah: "Daar El Naeem /setaraf",
    maskapai: "Saudia / Garuda Indonesia",
    bonus_program: "City Tour Bonus Thaif",
    badge: "Pilihan Terbaik",
    sort_order: 5,
    harga_detail: [
      { city: "Pangkal Pinang (PGK)", price: "Rp 33.500.000" },
      { city: "Jakarta (CGK)", price: "Rp 31.500.000" },
    ],
    fasilitas_include: fasilitasInclude,
    fasilitas_exclude: fasilitasExclude,
    catatan_program: [
      "Harga untuk kamar standar 4 kasur",
      "Upgrade kamar double bintang 5: +Rp 7 jt/pax",
      "Upgrade kamar triple bintang 5: +Rp 5 jt/pax",
      "Include All In — Tanpa Biaya Tambahan",
    ],
    rekening_pembayaran: rekening,
    whatsapp_booking_link: waText("Umrah Reguler Special Oktober 12 Hari", "Oktober 2026"),
  },
  {
    slug_url: "umrah-reguler-november-10d",
    nama_program: "Umrah Reguler November",
    subtitle: "Paket umrah reguler spesial November 10 hari",
    bulan_keberangkatan: "November 2026",
    durasi_hari: "10 Hari",
    kota_keberangkatan: "Pangkal Pinang / Jakarta",
    harga_mulai: "Rp 30.500.000",
    poster_image: "/poster-november.png",
    hotel_makkah: "Grand Al Massa /setaraf",
    hotel_madinah: "Daar El Naeem /setaraf",
    maskapai: "Saudia / Garuda Indonesia",
    bonus_program: "City Tour Bonus Thaif",
    badge: "Tersedia",
    sort_order: 6,
    harga_detail: [
      { city: "Pangkal Pinang (PGK)", price: "Rp 30.500.000" },
      { city: "Jakarta (CGK)", price: "Rp 30.300.000" },
    ],
    fasilitas_include: [...fasilitasInclude, "Free Pembuatan Paspor & Vaksin"],
    fasilitas_exclude: fasilitasExclude,
    catatan_program: [
      "Harga untuk kamar standar 4 kasur",
      "Include All In — Tanpa Biaya Tambahan",
      "Free Pembuatan Paspor & Vaksin",
    ],
    rekening_pembayaran: rekening,
    whatsapp_booking_link: waText("Umrah Reguler November", "November 2026"),
  },
];

async function seed() {
  console.log("Clearing existing programs...");
  await db.delete(umrahPrograms);

  console.log("Seeding real programs...");
  for (const program of programs) {
    await db.insert(umrahPrograms).values(program);
    console.log(`Inserted: ${program.nama_program} (${program.bulan_keberangkatan})`);
  }
  console.log("Seed complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});

import posterReguler from "@/assets/poster-reguler.jpg";
import posterVip from "@/assets/poster-vip.jpg";
import posterPlus from "@/assets/poster-plus.jpg";
import posterRamadhan from "@/assets/poster-ramadhan.jpg";
import posterHemat from "@/assets/poster-hemat.jpg";
import posterExclusive from "@/assets/poster-exclusive.jpg";

export interface UmrahProgram {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  month: string;
  duration: string;
  departure: string;
  priceFrom: string;
  poster: string;
  hotelMakkah: string;
  hotelMadinah: string;
  airline: string;
  bonus: string;
  prices: { city: string; price: string }[];
  facilities: string[];
  excludes: string[];
  notes: string[];
  bankAccounts: { bank: string; accountNumber: string; accountName: string }[];
}

export const programs: UmrahProgram[] = [
  {
    id: "1",
    slug: "umrah-reguler-juli",
    name: "Umrah Reguler",
    subtitle: "Paket ibadah umrah terjangkau dengan pelayanan terbaik",
    month: "Juli 2026",
    duration: "9 Hari",
    departure: "Jakarta (CGK)",
    priceFrom: "Rp 25.900.000",
    poster: posterReguler,
    hotelMakkah: "Grand Zamzam Hotel ⭐⭐⭐⭐",
    hotelMadinah: "Millennium Al Aqeeq ⭐⭐⭐⭐",
    airline: "Saudi Airlines (Direct Flight)",
    bonus: "City Tour Jeddah",
    prices: [
      { city: "Jakarta (CGK)", price: "Rp 25.900.000" },
      { city: "Pangkal Pinang (PGK)", price: "Rp 27.500.000" },
    ],
    facilities: [
      "Tiket Pesawat PP",
      "Hotel Makkah 4 Malam",
      "Hotel Madinah 3 Malam",
      "Visa Umrah",
      "Makan 3x Sehari (Catering)",
      "Transportasi Bus AC",
      "Muthawwif Berpengalaman",
      "Perlengkapan Umrah",
      "Air Zamzam 5 Liter",
      "Asuransi Perjalanan",
      "Handling Bandara",
      "Manasik Umrah",
    ],
    excludes: [
      "Paspor (jika belum punya)",
      "Suntik Meningitis",
      "Kelebihan Bagasi",
      "Pengeluaran Pribadi",
      "Tips Guide Lokal",
    ],
    notes: [
      "Upgrade kamar single supplement: +Rp 3.500.000",
      "Harga anak (2-12 tahun) tanpa bed: diskon 15%",
      "DP minimal Rp 5.000.000 untuk booking seat",
      "Pelunasan paling lambat H-30 keberangkatan",
    ],
    bankAccounts: [
      { bank: "Bank Syariah Indonesia (BSI)", accountNumber: "123-456-7890", accountName: "PT El Massa Tour & Travel" },
      { bank: "Bank Mandiri", accountNumber: "098-765-4321", accountName: "PT El Massa Tour & Travel" },
    ],
  },
  {
    id: "2",
    slug: "umrah-vip-agustus",
    name: "Umrah VIP",
    subtitle: "Pengalaman umrah mewah dengan akomodasi bintang 5",
    month: "Agustus 2026",
    duration: "12 Hari",
    departure: "Jakarta (CGK)",
    priceFrom: "Rp 45.000.000",
    poster: posterVip,
    hotelMakkah: "Raffles Makkah Palace ⭐⭐⭐⭐⭐",
    hotelMadinah: "The Oberoi Madinah ⭐⭐⭐⭐⭐",
    airline: "Garuda Indonesia (Direct Flight)",
    bonus: "City Tour Jeddah + Kereta Cepat Haramain",
    prices: [
      { city: "Jakarta (CGK)", price: "Rp 45.000.000" },
      { city: "Pangkal Pinang (PGK)", price: "Rp 47.500.000" },
    ],
    facilities: [
      "Tiket Pesawat PP (Business Class)",
      "Hotel Makkah 5 Malam",
      "Hotel Madinah 4 Malam",
      "Visa Umrah",
      "Makan 3x Sehari (Buffet Hotel)",
      "Transportasi VIP",
      "Muthawwif Privat",
      "Perlengkapan Umrah Premium",
      "Air Zamzam 10 Liter",
      "Asuransi Perjalanan Premium",
      "Fast Track Bandara",
      "Manasik Umrah",
    ],
    excludes: ["Paspor", "Suntik Meningitis", "Kelebihan Bagasi", "Pengeluaran Pribadi"],
    notes: [
      "Grup kecil maksimal 15 jamaah",
      "Upgrade suite room tersedia",
      "DP minimal Rp 10.000.000",
      "Pelunasan H-45 keberangkatan",
    ],
    bankAccounts: [
      { bank: "Bank Syariah Indonesia (BSI)", accountNumber: "123-456-7890", accountName: "PT El Massa Tour & Travel" },
      { bank: "Bank Mandiri", accountNumber: "098-765-4321", accountName: "PT El Massa Tour & Travel" },
    ],
  },
  {
    id: "3",
    slug: "umrah-plus-september",
    name: "Umrah Plus Istanbul",
    subtitle: "Kombinasi umrah dan wisata religi ke Istanbul, Turki",
    month: "September 2026",
    duration: "14 Hari",
    departure: "Jakarta (CGK)",
    priceFrom: "Rp 38.500.000",
    poster: posterPlus,
    hotelMakkah: "Swissotel Al Maqam ⭐⭐⭐⭐⭐",
    hotelMadinah: "Pullman Madinah ⭐⭐⭐⭐",
    airline: "Turkish Airlines (Transit Istanbul)",
    bonus: "City Tour Istanbul 3 Hari",
    prices: [
      { city: "Jakarta (CGK)", price: "Rp 38.500.000" },
      { city: "Pangkal Pinang (PGK)", price: "Rp 40.500.000" },
    ],
    facilities: [
      "Tiket Pesawat PP",
      "Hotel Makkah 4 Malam",
      "Hotel Madinah 3 Malam",
      "Hotel Istanbul 3 Malam",
      "Visa Umrah + Visa Turki",
      "Makan 3x Sehari",
      "Transportasi Bus AC",
      "City Tour Istanbul (Hagia Sophia, Blue Mosque, Grand Bazaar)",
      "Muthawwif Berpengalaman",
      "Air Zamzam 5 Liter",
      "Asuransi Perjalanan",
      "Manasik Umrah",
    ],
    excludes: ["Paspor", "Suntik Meningitis", "Kelebihan Bagasi", "Pengeluaran Pribadi", "Optional Tour"],
    notes: [
      "Rute: Jakarta → Istanbul → Madinah → Makkah → Jakarta",
      "DP minimal Rp 7.500.000",
      "Pelunasan H-30 keberangkatan",
    ],
    bankAccounts: [
      { bank: "Bank Syariah Indonesia (BSI)", accountNumber: "123-456-7890", accountName: "PT El Massa Tour & Travel" },
      { bank: "Bank Mandiri", accountNumber: "098-765-4321", accountName: "PT El Massa Tour & Travel" },
    ],
  },
  {
    id: "4",
    slug: "umrah-ramadhan-2027",
    name: "Umrah Ramadhan",
    subtitle: "Rasakan kekhusyukan ibadah di bulan suci Ramadhan",
    month: "Maret 2027",
    duration: "15 Hari",
    departure: "Jakarta (CGK)",
    priceFrom: "Rp 42.000.000",
    poster: posterRamadhan,
    hotelMakkah: "Hilton Suites Makkah ⭐⭐⭐⭐⭐",
    hotelMadinah: "Dar Al Taqwa Madinah ⭐⭐⭐⭐⭐",
    airline: "Saudi Airlines (Direct Flight)",
    bonus: "Iftar di Masjidil Haram",
    prices: [
      { city: "Jakarta (CGK)", price: "Rp 42.000.000" },
      { city: "Pangkal Pinang (PGK)", price: "Rp 44.500.000" },
    ],
    facilities: [
      "Tiket Pesawat PP",
      "Hotel Makkah 8 Malam",
      "Hotel Madinah 5 Malam",
      "Visa Umrah",
      "Makan Sahur & Iftar",
      "Transportasi Bus AC",
      "Muthawwif Berpengalaman",
      "Perlengkapan Umrah",
      "Air Zamzam 5 Liter",
      "Asuransi Perjalanan",
      "Manasik Umrah",
      "Handling Bandara",
    ],
    excludes: ["Paspor", "Suntik Meningitis", "Kelebihan Bagasi", "Pengeluaran Pribadi"],
    notes: [
      "Seat terbatas, booking secepatnya",
      "DP minimal Rp 10.000.000",
      "Pelunasan H-60 keberangkatan",
    ],
    bankAccounts: [
      { bank: "Bank Syariah Indonesia (BSI)", accountNumber: "123-456-7890", accountName: "PT El Massa Tour & Travel" },
      { bank: "Bank Mandiri", accountNumber: "098-765-4321", accountName: "PT El Massa Tour & Travel" },
    ],
  },
  {
    id: "5",
    slug: "umrah-hemat-oktober",
    name: "Umrah Hemat",
    subtitle: "Paket umrah ekonomis tanpa mengurangi kenyamanan",
    month: "Oktober 2026",
    duration: "9 Hari",
    departure: "Jakarta (CGK)",
    priceFrom: "Rp 21.500.000",
    poster: posterHemat,
    hotelMakkah: "Al Massa Hotel ⭐⭐⭐",
    hotelMadinah: "Rawda Al Madinah ⭐⭐⭐",
    airline: "Batik Air (Transit)",
    bonus: "Ziarah Jabal Uhud",
    prices: [
      { city: "Jakarta (CGK)", price: "Rp 21.500.000" },
      { city: "Pangkal Pinang (PGK)", price: "Rp 23.500.000" },
    ],
    facilities: [
      "Tiket Pesawat PP",
      "Hotel Makkah 4 Malam",
      "Hotel Madinah 3 Malam",
      "Visa Umrah",
      "Makan 3x Sehari",
      "Transportasi Bus AC",
      "Muthawwif",
      "Perlengkapan Umrah",
      "Air Zamzam 5 Liter",
      "Asuransi Perjalanan",
    ],
    excludes: ["Paspor", "Suntik Meningitis", "Kelebihan Bagasi", "Pengeluaran Pribadi", "Tips Guide"],
    notes: [
      "Kamar berisi 4 orang",
      "Upgrade quad ke triple: +Rp 1.500.000",
      "DP minimal Rp 5.000.000",
    ],
    bankAccounts: [
      { bank: "Bank Syariah Indonesia (BSI)", accountNumber: "123-456-7890", accountName: "PT El Massa Tour & Travel" },
      { bank: "Bank Mandiri", accountNumber: "098-765-4321", accountName: "PT El Massa Tour & Travel" },
    ],
  },
  {
    id: "6",
    slug: "umrah-exclusive-november",
    name: "Umrah Exclusive",
    subtitle: "Perjalanan spiritual eksklusif dengan layanan privat",
    month: "November 2026",
    duration: "10 Hari",
    departure: "Jakarta (CGK)",
    priceFrom: "Rp 55.000.000",
    poster: posterExclusive,
    hotelMakkah: "Jabal Omar Hyatt Regency ⭐⭐⭐⭐⭐",
    hotelMadinah: "Shaza Al Madinah ⭐⭐⭐⭐⭐",
    airline: "Garuda Indonesia (Direct Flight)",
    bonus: "Private City Tour + Kereta Cepat Haramain",
    prices: [
      { city: "Jakarta (CGK)", price: "Rp 55.000.000" },
      { city: "Pangkal Pinang (PGK)", price: "Rp 57.500.000" },
    ],
    facilities: [
      "Tiket Pesawat PP (Business Class)",
      "Hotel Makkah 5 Malam (Suite Room)",
      "Hotel Madinah 4 Malam (Suite Room)",
      "Visa Umrah",
      "Private Dining",
      "Luxury Vehicle",
      "Private Muthawwif",
      "Premium Umrah Kit",
      "Air Zamzam 10 Liter",
      "Comprehensive Insurance",
      "VIP Airport Lounge",
      "Private Manasik",
    ],
    excludes: ["Paspor", "Suntik Meningitis", "Pengeluaran Pribadi"],
    notes: [
      "Maksimal 8 jamaah per grup",
      "Full private experience",
      "DP minimal Rp 15.000.000",
      "Pelunasan H-45 keberangkatan",
    ],
    bankAccounts: [
      { bank: "Bank Syariah Indonesia (BSI)", accountNumber: "123-456-7890", accountName: "PT El Massa Tour & Travel" },
      { bank: "Bank Mandiri", accountNumber: "098-765-4321", accountName: "PT El Massa Tour & Travel" },
    ],
  },
];

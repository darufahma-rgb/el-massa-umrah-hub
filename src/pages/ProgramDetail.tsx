import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import {
  Calendar, Clock, MapPin, Building2, Plane, Star, Check, X,
  CreditCard, MessageCircle, ArrowLeft, Train, ChevronDown, ChevronUp
} from "lucide-react";
import { useState } from "react";

const facilityIcons: Record<string, React.ReactNode> = {
  "Tiket Pesawat": <Plane size={18} />,
  "Hotel": <Building2 size={18} />,
  "Visa": <Check size={18} />,
  "Makan": <Check size={18} />,
  "Transportasi": <Check size={18} />,
  "Muthawwif": <Check size={18} />,
  "Air Zamzam": <Check size={18} />,
  "Asuransi": <Check size={18} />,
  "Handling": <Check size={18} />,
  "Manasik": <Check size={18} />,
  "Perlengkapan": <Check size={18} />,
  "Fast Track": <Star size={18} />,
  "VIP": <Star size={18} />,
  "Private": <Star size={18} />,
  "Lounge": <Star size={18} />,
  "Business": <Star size={18} />,
  "Suite": <Star size={18} />,
  "Premium": <Star size={18} />,
  "Luxury": <Star size={18} />,
  "Comprehensive": <Check size={18} />,
  "Dining": <Check size={18} />,
  "Sahur": <Check size={18} />,
  "Iftar": <Check size={18} />,
  "City Tour": <Check size={18} />,
};

function getFacilityIcon(facility: string) {
  for (const key in facilityIcons) {
    if (facility.includes(key)) return facilityIcons[key];
  }
  return <Check size={18} />;
}

interface PriceItem {
  city: string;
  price: string;
}

interface BankAccount {
  bank: string;
  accountNumber: string;
  accountName: string;
}

const ProgramDetail = () => {
  const { slug } = useParams();
  const [notesOpen, setNotesOpen] = useState(false);

  const { data: program, isLoading } = useQuery({
    queryKey: ["umrah-program", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("umrah_programs")
        .select("*")
        .eq("slug_url", slug!)
        .eq("is_active", true)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!program) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4">Program tidak ditemukan</h1>
          <Link to="/" className="btn-booking">Kembali ke Home</Link>
        </div>
      </div>
    );
  }

  const prices = (program.harga_detail as unknown as PriceItem[] | null) || [];
  const bankAccounts = (program.rekening_pembayaran as unknown as BankAccount[] | null) || [];
  const waLink = program.whatsapp_booking_link;

  return (
    <main className="pt-14 md:pt-16 lg:pt-20 pb-20 md:pb-8">
      {/* Hero */}
      <section className="relative h-[45vh] sm:h-[50vh] md:h-[55vh] lg:h-[60vh] overflow-hidden">
        <img src={program.poster_image} alt={program.nama_program} className="absolute inset-0 w-full h-full object-cover" />
        <div className="poster-gradient absolute inset-0" />
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
          <Link to="/" className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-card/80 backdrop-blur-sm text-foreground text-xs sm:text-sm font-body hover:bg-card transition-colors">
            <ArrowLeft size={14} />
            Kembali
          </Link>
        </div>
        <div className="relative h-full flex flex-col justify-end section-container pb-6 sm:pb-8">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block self-start px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-body font-semibold bg-primary text-primary-foreground mb-2 sm:mb-3"
          >
            {program.bulan_keberangkatan}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-1 sm:mb-2"
          >
            {program.nama_program}
          </motion.h1>
          <p className="font-body text-primary-foreground/70 text-xs sm:text-sm md:text-base max-w-lg">
            {program.subtitle}
          </p>
        </div>
      </section>

      <div className="section-container">
        {/* Quick Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card -mt-6 sm:-mt-8 relative z-10 grid grid-cols-3 gap-2 sm:gap-4 text-center"
        >
          <div>
            <Calendar size={16} className="mx-auto text-primary mb-0.5 sm:mb-1 sm:w-5 sm:h-5" />
            <p className="font-body text-[10px] sm:text-xs text-muted-foreground">Bulan</p>
            <p className="font-display text-[11px] sm:text-sm font-semibold text-foreground">{program.bulan_keberangkatan}</p>
          </div>
          <div>
            <Clock size={16} className="mx-auto text-primary mb-0.5 sm:mb-1 sm:w-5 sm:h-5" />
            <p className="font-body text-[10px] sm:text-xs text-muted-foreground">Durasi</p>
            <p className="font-display text-[11px] sm:text-sm font-semibold text-foreground">{program.durasi_hari}</p>
          </div>
          <div>
            <MapPin size={16} className="mx-auto text-primary mb-0.5 sm:mb-1 sm:w-5 sm:h-5" />
            <p className="font-body text-[10px] sm:text-xs text-muted-foreground">Keberangkatan</p>
            <p className="font-display text-[11px] sm:text-sm font-semibold text-foreground leading-tight">{program.kota_keberangkatan}</p>
          </div>
        </motion.div>

        {/* Highlights */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 sm:mt-10">
          <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-4 sm:mb-6">Highlight Program</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              { icon: <Building2 size={20} />, label: "Hotel Makkah", value: program.hotel_makkah },
              { icon: <Building2 size={20} />, label: "Hotel Madinah", value: program.hotel_madinah },
              { icon: <Plane size={20} />, label: "Maskapai", value: program.maskapai },
              { icon: <Train size={20} />, label: "Bonus", value: program.bonus_program },
            ].map((item, i) => (
              <div key={i} className="glass-card flex items-start gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="font-body text-[10px] sm:text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-body text-xs sm:text-sm font-semibold text-foreground break-words">{item.value || '-'}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Prices */}
        {prices.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 sm:mt-10">
            <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-4 sm:mb-6">Harga Keberangkatan</h2>
            <div className="space-y-2 sm:space-y-3">
              {prices.map((p, i) => (
                <div key={i} className="glass-card flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <MapPin size={16} className="text-primary shrink-0 sm:w-[18px] sm:h-[18px]" />
                    <span className="font-body text-xs sm:text-sm text-foreground truncate">{p.city}</span>
                  </div>
                  <span className="font-display text-sm sm:text-base md:text-lg font-bold text-primary whitespace-nowrap">{p.price}</span>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Facilities Include */}
        {program.fasilitas_include && program.fasilitas_include.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 sm:mt-10">
            <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-4 sm:mb-6">Fasilitas Include</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
              {program.fasilitas_include.map((f, i) => (
                <div key={i} className="glass-card !p-2.5 sm:!p-3 flex items-start gap-2 sm:gap-3">
                  <div className="text-primary shrink-0 mt-0.5">{getFacilityIcon(f)}</div>
                  <span className="font-body text-[11px] sm:text-xs md:text-sm text-foreground text-left leading-snug">{f}</span>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Notes */}
        {program.catatan_program && program.catatan_program.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 sm:mt-10">
            <button onClick={() => setNotesOpen(!notesOpen)} className="w-full glass-card flex items-center justify-between">
              <h2 className="font-display text-base sm:text-lg font-bold text-foreground">Catatan Program</h2>
              {notesOpen ? <ChevronUp size={18} className="text-foreground shrink-0" /> : <ChevronDown size={18} className="text-foreground shrink-0" />}
            </button>
            {notesOpen && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2">
                {program.catatan_program.map((n, i) => (
                  <div key={i} className="flex items-start gap-2 sm:gap-3 font-body text-xs sm:text-sm text-foreground/80 px-2">
                    <span className="text-primary mt-0.5 shrink-0">•</span>
                    <span>{n}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.section>
        )}

        {/* Exclude */}
        {program.fasilitas_exclude && program.fasilitas_exclude.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-6 sm:mt-8">
            <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3 sm:mb-4">Fasilitas Exclude</h2>
            <div className="space-y-1.5 sm:space-y-2">
              {program.fasilitas_exclude.map((e, i) => (
                <div key={i} className="flex items-center gap-2 sm:gap-3 font-body text-xs sm:text-sm text-muted-foreground">
                  <X size={14} className="text-destructive shrink-0 sm:w-4 sm:h-4" />
                  <span>{e}</span>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Bank Accounts */}
        {bankAccounts.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 sm:mt-10">
            <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-4 sm:mb-6">Rekening Pembayaran</h2>
            <div className="space-y-2 sm:space-y-3">
              {bankAccounts.map((acc, i) => (
                <div key={i} className="glass-card">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                    <CreditCard size={16} className="text-primary shrink-0 sm:w-[18px] sm:h-[18px]" />
                    <span className="font-body text-xs sm:text-sm font-semibold text-foreground">{acc.bank}</span>
                  </div>
                  <p className="font-body text-base sm:text-lg font-bold text-foreground tracking-wider">{acc.accountNumber}</p>
                  <p className="font-body text-[10px] sm:text-xs text-muted-foreground">a.n. {acc.accountName}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Desktop CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-10 sm:mt-12 hidden md:block text-center">
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-booking text-base lg:text-lg">
            <MessageCircle size={20} />
            Booking via WhatsApp
          </a>
        </motion.div>
      </div>

      {/* Sticky Mobile CTA */}
      <div className="sticky-cta md:hidden">
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-booking w-full text-center text-sm">
          <MessageCircle size={18} />
          Booking via WhatsApp
        </a>
      </div>
    </main>
  );
};

export default ProgramDetail;

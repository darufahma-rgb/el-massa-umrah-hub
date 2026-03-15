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
  "Tiket Pesawat": <Plane size={20} />,
  "Hotel": <Building2 size={20} />,
  "Visa": <Check size={20} />,
  "Makan": <Check size={20} />,
  "Transportasi": <Check size={20} />,
  "Muthawwif": <Check size={20} />,
  "Air Zamzam": <Check size={20} />,
  "Asuransi": <Check size={20} />,
  "Handling": <Check size={20} />,
  "Manasik": <Check size={20} />,
  "Perlengkapan": <Check size={20} />,
  "Fast Track": <Star size={20} />,
  "VIP": <Star size={20} />,
  "Private": <Star size={20} />,
  "Lounge": <Star size={20} />,
  "Business": <Star size={20} />,
  "Suite": <Star size={20} />,
  "Premium": <Star size={20} />,
  "Luxury": <Star size={20} />,
  "Comprehensive": <Check size={20} />,
  "Dining": <Check size={20} />,
  "Sahur": <Check size={20} />,
  "Iftar": <Check size={20} />,
  "City Tour": <Check size={20} />,
};

function getFacilityIcon(facility: string) {
  for (const key in facilityIcons) {
    if (facility.includes(key)) return facilityIcons[key];
  }
  return <Check size={20} />;
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
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!program) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">Program tidak ditemukan</h1>
          <Link to="/" className="btn-booking">Kembali ke Home</Link>
        </div>
      </div>
    );
  }

  const prices = (program.harga_detail as unknown as PriceItem[] | null) || [];
  const bankAccounts = (program.rekening_pembayaran as unknown as BankAccount[] | null) || [];
  const waLink = program.whatsapp_booking_link;

  return (
    <main className="pt-16 md:pt-20 pb-24 md:pb-8">
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img src={program.poster_image} alt={program.nama_program} className="absolute inset-0 w-full h-full object-cover" />
        <div className="poster-gradient absolute inset-0" />
        <div className="absolute top-4 left-4 z-10">
          <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm text-foreground text-sm font-body hover:bg-card transition-colors">
            <ArrowLeft size={16} />
            Kembali
          </Link>
        </div>
        <div className="relative h-full flex flex-col justify-end section-container pb-8">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block self-start px-3 py-1 rounded-full text-xs font-body font-semibold bg-primary text-primary-foreground mb-3"
          >
            {program.bulan_keberangkatan}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-2"
          >
            {program.nama_program}
          </motion.h1>
          <p className="font-body text-primary-foreground/70 text-sm md:text-base max-w-lg">
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
          className="glass-card -mt-8 relative z-10 grid grid-cols-3 gap-4 text-center"
        >
          <div>
            <Calendar size={20} className="mx-auto text-primary mb-1" />
            <p className="font-body text-xs text-muted-foreground">Bulan</p>
            <p className="font-display text-sm font-semibold text-foreground">{program.bulan_keberangkatan}</p>
          </div>
          <div>
            <Clock size={20} className="mx-auto text-primary mb-1" />
            <p className="font-body text-xs text-muted-foreground">Durasi</p>
            <p className="font-display text-sm font-semibold text-foreground">{program.durasi_hari}</p>
          </div>
          <div>
            <MapPin size={20} className="mx-auto text-primary mb-1" />
            <p className="font-body text-xs text-muted-foreground">Keberangkatan</p>
            <p className="font-display text-sm font-semibold text-foreground">{program.kota_keberangkatan}</p>
          </div>
        </motion.div>

        {/* Highlights */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-10">
          <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-6">Highlight Program</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: <Building2 size={22} />, label: "Hotel Makkah", value: program.hotel_makkah },
              { icon: <Building2 size={22} />, label: "Hotel Madinah", value: program.hotel_madinah },
              { icon: <Plane size={22} />, label: "Maskapai", value: program.maskapai },
              { icon: <Train size={22} />, label: "Bonus", value: program.bonus_program },
            ].map((item, i) => (
              <div key={i} className="glass-card flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="font-body text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-body text-sm font-semibold text-foreground">{item.value || '-'}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Prices */}
        {prices.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-10">
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-6">Harga Keberangkatan</h2>
            <div className="space-y-3">
              {prices.map((p, i) => (
                <div key={i} className="glass-card flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-primary" />
                    <span className="font-body text-sm text-foreground">{p.city}</span>
                  </div>
                  <span className="font-display text-lg font-bold text-primary">{p.price}</span>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Facilities Include */}
        {program.fasilitas_include && program.fasilitas_include.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-10">
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-6">Fasilitas Include</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {program.fasilitas_include.map((f, i) => (
                <div key={i} className="facility-icon glass-card !p-3 flex-row !items-start gap-3">
                  <div className="text-primary shrink-0">{getFacilityIcon(f)}</div>
                  <span className="font-body text-xs md:text-sm text-foreground text-left">{f}</span>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Notes */}
        {program.catatan_program && program.catatan_program.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-10">
            <button onClick={() => setNotesOpen(!notesOpen)} className="w-full glass-card flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-foreground">Catatan Program</h2>
              {notesOpen ? <ChevronUp size={20} className="text-foreground" /> : <ChevronDown size={20} className="text-foreground" />}
            </button>
            {notesOpen && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 space-y-2">
                {program.catatan_program.map((n, i) => (
                  <div key={i} className="flex items-start gap-3 font-body text-sm text-foreground/80 px-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{n}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.section>
        )}

        {/* Exclude */}
        {program.fasilitas_exclude && program.fasilitas_exclude.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-6">
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-4">Fasilitas Exclude</h2>
            <div className="space-y-2">
              {program.fasilitas_exclude.map((e, i) => (
                <div key={i} className="flex items-center gap-3 font-body text-sm text-muted-foreground">
                  <X size={16} className="text-destructive shrink-0" />
                  <span>{e}</span>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Bank Accounts */}
        {bankAccounts.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-10">
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-6">Rekening Pembayaran</h2>
            <div className="space-y-3">
              {bankAccounts.map((acc, i) => (
                <div key={i} className="glass-card">
                  <div className="flex items-center gap-3 mb-2">
                    <CreditCard size={18} className="text-primary" />
                    <span className="font-body text-sm font-semibold text-foreground">{acc.bank}</span>
                  </div>
                  <p className="font-body text-lg font-bold text-foreground tracking-wider">{acc.accountNumber}</p>
                  <p className="font-body text-xs text-muted-foreground">a.n. {acc.accountName}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Desktop CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 hidden md:block text-center">
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-booking text-lg">
            <MessageCircle size={22} />
            Booking via WhatsApp
          </a>
        </motion.div>
      </div>

      {/* Sticky Mobile CTA */}
      <div className="sticky-cta md:hidden">
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-booking w-full text-center">
          <MessageCircle size={20} />
          Booking via WhatsApp
        </a>
      </div>
    </main>
  );
};

export default ProgramDetail;

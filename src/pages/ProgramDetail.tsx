import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type UmrahProgram = Tables<"umrah_programs">;
import {
  Clock, MapPin, Building2, Plane, Star, Check, X,
  CreditCard, MessageCircle, ArrowLeft, Train, ChevronDown, ChevronUp, Navigation
} from "lucide-react";
import { getHotelMapsUrl } from "@/lib/hotelMaps";
import { useState, useEffect } from "react";

const facilityIcons: Record<string, React.ReactNode> = {
  "Tiket Pesawat": <Plane size={16} />,
  "Hotel": <Building2 size={16} />,
  "Visa": <Check size={16} />,
  "Makan": <Check size={16} />,
  "Transportasi": <Check size={16} />,
  "Muthawwif": <Check size={16} />,
  "Air Zamzam": <Check size={16} />,
  "Asuransi": <Check size={16} />,
  "Handling": <Check size={16} />,
  "Manasik": <Check size={16} />,
  "Perlengkapan": <Check size={16} />,
  "Fast Track": <Star size={16} />,
  "VIP": <Star size={16} />,
  "Private": <Star size={16} />,
  "Lounge": <Star size={16} />,
  "Business": <Star size={16} />,
  "Suite": <Star size={16} />,
  "Premium": <Star size={16} />,
  "Luxury": <Star size={16} />,
  "Comprehensive": <Check size={16} />,
  "Dining": <Check size={16} />,
  "Sahur": <Check size={16} />,
  "Iftar": <Check size={16} />,
  "City Tour": <Check size={16} />,
};

function getFacilityIcon(facility: string) {
  for (const key in facilityIcons) {
    if (facility.includes(key)) return facilityIcons[key];
  }
  return <Check size={16} />;
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
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightboxOpen]);

  const { data: program, isLoading } = useQuery<UmrahProgram>({
    queryKey: ["umrah-program", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("umrah_programs")
        .select("*")
        .eq("slug_url", slug!)
        .eq("is_active", true)
        .maybeSingle();
      if (error) throw error;
      if (!data) throw new Error("Program not found");
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
    <main className="min-h-screen bg-background pb-20 md:pb-8">

      {/* ── Top: Poster + Info side by side ── */}
      <section className="section-container pt-20 md:pt-24 pb-8">

        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 mb-5 px-3 py-1.5 rounded-full bg-card border border-border text-foreground text-xs font-body hover:bg-muted transition-colors"
        >
          <ArrowLeft size={13} />
          Kembali
        </Link>

        <div className="flex gap-5 sm:gap-7 md:gap-10 items-start">

          {/* Poster image — portrait aspect ratio, clickable */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-shrink-0"
            style={{ width: "clamp(110px, 32vw, 220px)" }}
          >
            <button
              onClick={() => setLightboxOpen(true)}
              className="block w-full focus:outline-none group"
              aria-label="Lihat poster lebih besar"
            >
              <div
                className="relative overflow-hidden rounded-2xl transition-transform duration-200 group-hover:scale-[1.02] group-active:scale-[0.98]"
                style={{
                  aspectRatio: "1441 / 2495",
                  boxShadow: "0 8px 40px -8px hsl(328 76% 50% / 0.25), 0 0 0 2px white",
                }}
              >
                <img
                  src={program.poster_image}
                  alt={program.nama_program}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-end justify-center pb-3">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[10px] font-body text-white bg-black/50 px-2 py-0.5 rounded-full">
                    Tap untuk perbesar
                  </span>
                </div>
              </div>
            </button>
          </motion.div>

          {/* Info — outside the poster */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="flex-1 min-w-0 flex flex-col gap-3 pt-1"
          >
            {/* Badge */}
            <span className="inline-block self-start px-2.5 py-0.5 rounded-full text-[10px] font-body font-semibold bg-primary text-primary-foreground">
              {program.bulan_keberangkatan}
            </span>

            {/* Title */}
            <h1
              className="font-display font-extrabold text-foreground leading-tight tracking-tight"
              style={{ fontSize: "clamp(1.2rem, 5vw, 2.5rem)" }}
            >
              {program.nama_program}
            </h1>

            {/* Subtitle */}
            {program.subtitle && (
              <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {program.subtitle}
              </p>
            )}

            {/* Quick stats */}
            <div className="flex flex-col gap-1.5 mt-1">
              {[
                { icon: Clock, label: program.durasi_hari },
                { icon: MapPin, label: program.kota_keberangkatan },
                { icon: Plane, label: program.maskapai },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon size={12} className="text-primary shrink-0" />
                  <span className="font-body text-[11px] sm:text-xs text-foreground/70 leading-snug">{label}</span>
                </div>
              ))}
            </div>

          </motion.div>

        </div>

        {/* Price — exclusive card below poster + info */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mt-5"
        >
          <div
            className="rounded-2xl px-5 py-4"
            style={{
              background: "linear-gradient(135deg, hsl(335,85%,97%) 0%, hsl(345,80%,93%) 100%)",
              border: "1px solid hsl(335,80%,85%)",
              boxShadow: "0 4px 20px -4px hsl(328,76%,50%,0.15)",
            }}
          >
            <p className="font-body text-[9px] uppercase tracking-widest text-primary/50 mb-1">Mulai dari</p>
            <p className="font-display font-extrabold text-primary" style={{ fontSize: "clamp(1.4rem, 5vw, 2rem)" }}>
              {program.harga_mulai}
            </p>
          </div>
        </motion.div>

      </section>

      <div className="section-container">

        {/* Highlights */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 sm:mt-10">
          <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-4 sm:mb-5">Highlight Program</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              { icon: <Building2 size={18} />, label: "Hotel Makkah", value: program.hotel_makkah, isHotel: true },
              { icon: <Building2 size={18} />, label: "Hotel Madinah", value: program.hotel_madinah, isHotel: true },
              { icon: <Plane size={18} />, label: "Maskapai", value: program.maskapai, isHotel: false },
              { icon: <Train size={18} />, label: "Bonus", value: program.bonus_program, isHotel: false },
            ].map((item, i) => {
              const mapsUrl = item.isHotel && item.value ? getHotelMapsUrl(item.value) : null;
              return (
                <div key={i} className="glass-card flex items-start gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary shrink-0">
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-body text-[10px] sm:text-xs text-muted-foreground">{item.label}</p>
                    <p className="font-body text-xs sm:text-sm font-semibold text-foreground break-words">{item.value || '-'}</p>
                    {mapsUrl && (
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-body font-semibold bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-colors"
                      >
                        <Navigation size={8} />
                        Lihat di Google Maps
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Prices */}
        {prices.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 sm:mt-10">
            <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-4 sm:mb-5">Harga Keberangkatan</h2>
            <div className="space-y-2 sm:space-y-3">
              {prices.map((p, i) => (
                <div key={i} className="glass-card flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <MapPin size={14} className="text-primary shrink-0" />
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
            <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-4 sm:mb-5">Fasilitas Include</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
              {program.fasilitas_include.map((f, i) => (
                <div key={i} className="glass-card !p-2.5 sm:!p-3 flex items-start gap-2 sm:gap-2.5">
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
              {notesOpen ? <ChevronUp size={18} className="text-foreground/60 shrink-0" /> : <ChevronDown size={18} className="text-foreground/60 shrink-0" />}
            </button>
            {notesOpen && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2">
                {program.catatan_program.map((n, i) => (
                  <div key={i} className="flex items-start gap-2 sm:gap-3 font-body text-xs sm:text-sm text-foreground/70 px-2">
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
                  <X size={14} className="text-destructive shrink-0" />
                  <span>{e}</span>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Bank Accounts */}
        {bankAccounts.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 sm:mt-10">
            <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-4 sm:mb-5">Rekening Pembayaran</h2>
            <div className="space-y-2 sm:space-y-3">
              {bankAccounts.map((acc, i) => (
                <div key={i} className="glass-card">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                    <CreditCard size={16} className="text-primary shrink-0" />
                    <span className="font-body text-xs sm:text-sm font-semibold text-foreground">{acc.bank}</span>
                  </div>
                  <p className="font-body text-base sm:text-lg font-bold text-foreground tracking-wider">{acc.accountNumber}</p>
                  <p className="font-body text-[10px] sm:text-xs text-muted-foreground">a.n. {acc.accountName}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-10 sm:mt-12">
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-booking w-full justify-center text-sm sm:text-base">
            <MessageCircle size={18} />
            Booking via WhatsApp
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Tutup"
          >
            <X size={20} />
          </button>
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
            src={program.poster_image}
            alt={program.nama_program}
            className="max-h-[90vh] max-w-full object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </main>
  );
};

export default ProgramDetail;

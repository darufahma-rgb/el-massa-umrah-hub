import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Plane, Hotel, Clock, Users, Phone, Star, AlertCircle, Navigation } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type UmrahProgram = Tables<"umrah_programs">;
import { getHotelMapsUrl } from "@/lib/hotelMaps";

const SEAT_DATA: Record<string, { total: number; sisa: number }> = {
  "umrah-kemerdekaan-agustus":       { total: 40, sisa: 40 },
  "umrah-ekslusif-maulid-september": { total: 40, sisa: 33 },
  "umrah-reguler-maulid-september":  { total: 40, sisa: 40 },
  "umrah-reguler-oktober-10d":       { total: 40, sisa: 40 },
  "umrah-spesial-oktober-12d":       { total: 40, sisa: 40 },
  "umrah-reguler-november-10d":      { total: 40, sisa: 40 },
};

function getSeatColor(sisa: number, total: number) {
  const pct = sisa / total;
  if (pct <= 0.25) return { bar: "#ef4444", badge: "bg-red-500",   text: "text-red-600",   label: "Hampir Penuh!" };
  if (pct <= 0.55) return { bar: "#f59e0b", badge: "bg-amber-400", text: "text-amber-600", label: "Segera Daftar" };
  return              { bar: "#22c55e", badge: "bg-emerald-500", text: "text-emerald-600", label: "Tersedia" };
}

const SeatCard = ({ program, index }: { program: UmrahProgram; index: number }) => {
  const seat = SEAT_DATA[program.slug_url] ?? { total: 40, sisa: 40 };
  const { bar, badge, text, label } = getSeatColor(seat.sisa, seat.total);
  const pct = Math.round((seat.sisa / seat.total) * 100);
  const isUrgent = pct <= 25;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="rounded-2xl overflow-hidden shadow-lg"
      style={{ border: "1px solid rgba(225,29,130,0.18)" }}
    >
      {/* Card header — pink gradient */}
      <div
        className="px-4 py-3 flex items-start justify-between gap-3"
        style={{ background: "linear-gradient(135deg, hsl(340,80%,52%) 0%, hsl(345,80%,65%) 100%)" }}
      >
        <div>
          <p className="font-body text-[10px] font-semibold uppercase tracking-widest text-white/70 mb-0.5">
            {program.bulan_keberangkatan}
          </p>
          <h3 className="font-display text-base sm:text-lg font-bold text-white leading-tight">
            {program.nama_program}
          </h3>
        </div>
        <div className="flex-shrink-0 flex items-center gap-1.5 bg-white/20 rounded-lg px-2.5 py-1.5">
          <Plane size={11} className="text-white" />
          <span className="font-body text-[10px] font-semibold text-white">{program.maskapai}</span>
        </div>
      </div>

      {/* Card body */}
      <div className="bg-card p-4 flex flex-col gap-3">

        {/* Hotels row */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Hotel Makkah", name: program.hotel_makkah },
            { label: "Hotel Madinah", name: program.hotel_madinah },
          ].map((h) => {
            const mapsUrl = getHotelMapsUrl(h.name);
            return (
              <div key={h.label} className="rounded-xl bg-muted/60 px-3 py-2">
                <p className="font-body text-[9px] text-muted-foreground uppercase tracking-wider mb-0.5">{h.label}</p>
                <div className="flex items-center gap-1">
                  <Hotel size={10} className="shrink-0 text-primary/60" />
                  <p className="font-display text-xs font-semibold text-foreground leading-snug line-clamp-1">{h.name}</p>
                </div>
                <div className="flex items-center gap-0.5 mt-0.5 mb-1">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} size={7} className="fill-amber-400 text-amber-400" />
                  ))}
                  <span className="font-body text-[8px] text-muted-foreground ml-0.5">setaraf</span>
                </div>
                {mapsUrl && (
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[8px] font-body font-semibold bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-colors"
                  >
                    <Navigation size={7} />
                    Maps
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {/* Duration + Price row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 bg-primary/8 rounded-full px-3 py-1">
            <Clock size={11} className="text-primary" />
            <span className="font-body text-xs font-semibold text-primary">{program.durasi_hari}</span>
          </div>
          <div className="text-right">
            <p className="font-body text-[9px] text-muted-foreground uppercase tracking-widest">Mulai dari</p>
            <p className="font-display text-base font-extrabold text-primary leading-none">{program.harga_mulai}</p>
          </div>
        </div>

        {/* Bonus */}
        {program.bonus_program && (
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-3 py-1 w-fit">
            <Star size={9} className="fill-amber-400 text-amber-400 shrink-0" />
            <span className="font-body text-[10px] font-semibold text-amber-700">{program.bonus_program}</span>
          </div>
        )}

        {/* ── SEAT AVAILABILITY ── */}
        <div
          className="rounded-xl p-3"
          style={{ background: isUrgent ? "rgba(239,68,68,0.06)" : "rgba(225,29,130,0.05)", border: `1px solid ${bar}30` }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Users size={12} className={text} />
              <span className={`font-body text-xs font-bold ${text}`}>Ketersediaan Kursi</span>
            </div>
            {isUrgent && (
              <span className="flex items-center gap-1 font-body text-[9px] font-bold text-red-600 bg-red-50 border border-red-200 rounded-full px-2 py-0.5">
                <AlertCircle size={9} />
                {label}
              </span>
            )}
            {!isUrgent && (
              <span className={`font-body text-[9px] font-bold text-white ${badge} rounded-full px-2.5 py-0.5`}>
                {label}
              </span>
            )}
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-muted overflow-hidden mb-2">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.07, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ background: bar }}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="font-body text-[10px] text-muted-foreground">
              <span className="font-bold" style={{ color: bar }}>{seat.sisa} kursi</span> tersisa dari {seat.total}
            </span>
            <a
              href={program.whatsapp_booking_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-body text-[10px] font-bold text-white rounded-full px-3 py-1 transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg, hsl(328,76%,50%), hsl(345,80%,65%))" }}
            >
              <Phone size={9} />
              Booking
            </a>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

const SkeletonCard = () => (
  <div className="rounded-2xl overflow-hidden border border-border animate-pulse">
    <div className="h-16 bg-primary/20" />
    <div className="p-4 flex flex-col gap-3 bg-card">
      <div className="grid grid-cols-2 gap-2">
        <div className="h-14 rounded-xl bg-muted" />
        <div className="h-14 rounded-xl bg-muted" />
      </div>
      <div className="h-6 w-32 rounded-full bg-muted" />
      <div className="h-16 rounded-xl bg-muted" />
    </div>
  </div>
);

const UpdateSeat = () => {
  const { data: programs, isLoading } = useQuery<UmrahProgram[]>({
    queryKey: ["umrah-programs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("umrah_programs")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  return (
    <main className="min-h-screen bg-background">

      {/* ── Header ── */}
      <div
        className="pt-20 pb-10 sm:pt-24 sm:pb-12 text-center"
        style={{ background: "linear-gradient(135deg, hsl(340,80%,58%) 0%, hsl(328,76%,50%) 50%, hsl(345,80%,65%) 100%)" }}
      >
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-body font-medium bg-white/15 backdrop-blur-sm text-white border border-white/25">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />
              Update Realtime
            </span>
            <h1
              className="font-display font-extrabold text-white tracking-tight leading-tight"
              style={{ fontSize: "clamp(1.8rem, 6vw, 3.2rem)", textShadow: "0 2px 16px rgba(0,0,0,0.2)" }}
            >
              Update Ketersediaan Kursi
            </h1>
            <p className="font-body text-sm sm:text-base text-white/80 max-w-sm sm:max-w-md leading-relaxed">
              Paket Umrah El Massa 2026. Pesan sekarang sebelum kursi habis!
            </p>
            <a
              href="https://wa.me/6281249476778?text=Assalamualaikum,%20saya%20ingin%20bertanya%20tentang%20ketersediaan%20kursi%20umrah"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-1 px-6 py-2.5 rounded-full font-body font-bold text-sm bg-white text-primary hover:opacity-90 transition-opacity shadow-lg"
            >
              <Phone size={14} />
              Tanya Ketersediaan
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Cards grid ── */}
      <div className="section-container py-10 sm:py-14">
        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          {[
            { color: "bg-emerald-500", label: "Tersedia (> 55%)" },
            { color: "bg-amber-400",   label: "Segera Daftar (25–55%)" },
            { color: "bg-red-500",     label: "Hampir Penuh (< 25%)" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
              <span className="font-body text-xs text-muted-foreground">{l.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {isLoading
            ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
            : (programs ?? []).map((p, i) => (
                <SeatCard key={p.id} program={p} index={i} />
              ))
          }
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div
            className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-6 px-6 sm:px-10 py-5 rounded-2xl"
            style={{ background: "linear-gradient(135deg, hsl(340,80%,58%) 0%, hsl(345,80%,65%) 100%)" }}
          >
            <div className="text-white text-center sm:text-left">
              <p className="font-display font-bold text-base sm:text-lg">Hubungi El Massa Tour Sekarang!</p>
              <p className="font-body text-sm text-white/80">Untuk Ibadah Umrahmu di tahun 2026!</p>
            </div>
            <a
              href="https://wa.me/6281249476778"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white font-body font-bold text-sm whitespace-nowrap transition-opacity hover:opacity-90"
              style={{ color: "hsl(328,76%,40%)" }}
            >
              <Phone size={14} />
              081249476778
            </a>
          </div>
        </motion.div>
      </div>

    </main>
  );
};

export default UpdateSeat;

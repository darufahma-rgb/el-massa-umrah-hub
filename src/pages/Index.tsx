import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import PosterCard from "@/components/PosterCard";
import TrustSection from "@/components/TrustSection";
import { ChevronRight, CalendarDays, Play, Phone, ArrowRight } from "lucide-react";
import type { UmrahProgram } from "../../shared/schema";
import { useRef } from "react";

const MONTH_ORDER: Record<string, number> = {
  Januari: 1, Februari: 2, Maret: 3, April: 4,
  Mei: 5, Juni: 6, Juli: 7, Agustus: 8,
  September: 9, Oktober: 10, November: 11, Desember: 12,
};

function parseMonthYear(val: string): number {
  const parts = val.trim().split(" ");
  const month = MONTH_ORDER[parts[0]] ?? 0;
  const year = parseInt(parts[1] ?? "2026", 10);
  return year * 100 + month;
}

function groupByMonth(programs: UmrahProgram[]): { month: string; items: UmrahProgram[] }[] {
  const map = new Map<string, UmrahProgram[]>();
  for (const p of programs) {
    const key = p.bulan_keberangkatan;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(p);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => parseMonthYear(a) - parseMonthYear(b))
    .map(([month, items]) => ({ month, items }));
}

const ProgramRow = ({ month, programs }: { month: string; programs: UmrahProgram[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
  };

  return (
    <div className="mb-10 sm:mb-12 md:mb-14">
      <div className="section-container">
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 rounded-full bg-primary" />
            <div className="flex items-center gap-2.5">
              <CalendarDays size={15} className="text-primary/70" />
              <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground tracking-tight">
                {month}
              </h2>
              <span className="hidden sm:inline text-[10px] font-body text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full border border-border/50">
                {programs.length} program
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => scroll("left")}
              className="p-1.5 rounded-full bg-card hover:bg-muted border border-border text-muted-foreground hover:text-foreground transition-all"
              aria-label="Scroll left"
            >
              <ChevronRight size={14} className="rotate-180" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-1.5 rounded-full bg-card hover:bg-muted border border-border text-muted-foreground hover:text-foreground transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
      <div className="section-container">
        <div ref={scrollRef} className="row-scroll">
          {programs.map((program, i) => (
            <div
              key={program.id}
              className="flex-shrink-0"
              style={{ width: "clamp(220px, 38vw, 340px)" }}
            >
              <PosterCard program={program} index={i} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SkeletonRow = () => (
  <div className="mb-12">
    <div className="section-container">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-6 bg-muted rounded-full" />
        <div className="h-6 w-32 bg-muted animate-pulse rounded" />
      </div>
      <div className="flex gap-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 bg-muted animate-pulse rounded-2xl"
            style={{ width: "clamp(220px, 38vw, 340px)", aspectRatio: "2/3" }}
          />
        ))}
      </div>
    </div>
  </div>
);

const Index = () => {
  const { data: programs, isLoading } = useQuery<UmrahProgram[]>({
    queryKey: ["umrah-programs"],
    queryFn: async () => {
      const res = await fetch("/api/programs");
      if (!res.ok) throw new Error("Failed to fetch programs");
      return res.json();
    },
  });

  const monthGroups = groupByMonth(programs ?? []);

  return (
    <main className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <section className="relative w-full overflow-hidden" style={{ height: "100vh", minHeight: 480, maxHeight: 900 }}>

        {/* Background image — fills the full viewport */}
        <img
          src="/hero-bg.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          aria-hidden="true"
        />

        {/* Gradient overlays */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(8,4,12,0.95) 0%, rgba(8,4,12,0.60) 40%, rgba(8,4,12,0.25) 70%, rgba(8,4,12,0.10) 100%)",
          }}
        />

        {/* Content — centered bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center text-center"
          style={{ paddingBottom: "clamp(2.5rem, 7vh, 5.5rem)", paddingLeft: "1rem", paddingRight: "1rem" }}
        >
          {/* Brand badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex items-center gap-2 mb-3 sm:mb-4"
          >
            <img src="/logo-white.png" alt="El Massa" className="h-5 sm:h-6 object-contain" />
            <span
              className="font-body font-bold uppercase text-white/90"
              style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.75rem)", letterSpacing: "0.2em" }}
            >
              Program Umrah
            </span>
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-display font-black text-white leading-[0.86] tracking-tight mb-4 sm:mb-5"
            style={{
              fontSize: "clamp(3rem, 12vw, 8rem)",
              textShadow: "0 4px 32px rgba(0,0,0,0.5)",
            }}
          >
            Paket Umrah<br />
            <span className="text-primary" style={{ textShadow: "0 2px 30px rgba(225,29,130,0.55)" }}>
              El Massa
            </span>
          </motion.h1>

          {/* Short description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-body text-sm sm:text-base text-white/75 max-w-sm sm:max-w-md leading-relaxed mb-5 sm:mb-6"
          >
            Pelayanan terbaik, hotel nyaman di Makkah & Madinah, dan harga terjangkau. Berangkat dari Pangkal Pinang & Jakarta.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-3"
          >
            <a
              href="#programs"
              className="inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded font-body font-bold text-sm sm:text-base text-white transition-opacity hover:opacity-85 active:opacity-70"
              style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.28)" }}
            >
              <Play size={16} fill="white" />
              Lihat Program
            </a>
            <a
              href="https://wa.me/6281249476778?text=Assalamualaikum,%20saya%20ingin%20bertanya%20tentang%20paket%20umrah"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded font-body font-bold text-sm sm:text-base text-white transition-opacity hover:opacity-90 active:opacity-75"
              style={{ background: "#e11d82" }}
            >
              <Phone size={15} />
              Hubungi Kami
            </a>
          </motion.div>
        </div>

      </section>

      {/* ── Program Section Heading ── */}
      <div id="programs" className="pt-14 sm:pt-16 md:pt-20 pb-2">
        <div className="section-container mb-10 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-start gap-3"
          >
            <span className="pill-label">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
              Program Tersedia
            </span>
            <h2
              className="font-display font-extrabold text-foreground tracking-tight leading-tight"
              style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)" }}
            >
              Pilih Program Umrah Anda
            </h2>
            <p className="font-body text-sm text-muted-foreground max-w-sm">
              Tersedia berbagai pilihan paket dengan keberangkatan dari Pangkal Pinang dan Jakarta.
            </p>
          </motion.div>
        </div>

        {/* Program rows */}
        {isLoading ? (
          <>
            <SkeletonRow />
            <SkeletonRow />
          </>
        ) : monthGroups.length === 0 ? (
          <div className="section-container py-16 text-center">
            <p className="font-body text-muted-foreground">Belum ada program tersedia.</p>
          </div>
        ) : (
          monthGroups.map(({ month, items }) => (
            <ProgramRow key={month} month={month} programs={items} />
          ))
        )}
      </div>

      <TrustSection />
    </main>
  );
};

export default Index;

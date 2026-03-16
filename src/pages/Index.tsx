import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import PosterCard from "@/components/PosterCard";
import TrustSection from "@/components/TrustSection";
import { ChevronRight, CalendarDays } from "lucide-react";
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
              style={{ width: "clamp(140px, 22vw, 210px)" }}
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
            style={{ width: "clamp(140px, 22vw, 210px)", aspectRatio: "2/3" }}
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
      <section className="relative min-h-[80vh] sm:min-h-[85vh] flex flex-col items-start justify-end text-left overflow-hidden pb-14 sm:pb-20">

        {/* Background image */}
        <img
          src="/hero-bg.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          aria-hidden="true"
        />

        {/* Gradient overlay — dark at bottom for legibility, lighter at top */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(20,5,15,0.75) 0%, rgba(20,5,15,0.45) 45%, rgba(20,5,15,0.15) 100%)",
          }}
        />
        {/* subtle left-edge vignette to ground the text */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(20,5,15,0.35) 0%, transparent 55%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-start gap-4 sm:gap-5 max-w-3xl section-container" style={{ paddingTop: 0, paddingBottom: 0 }}>

          {/* Eyebrow label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-body font-medium bg-white/15 backdrop-blur-sm text-white border border-white/25">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
              El Massa Tour & Travel 2026
            </span>
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-extrabold text-white tracking-tight leading-[0.88]"
            style={{ fontSize: "clamp(2.6rem, 10vw, 6.5rem)", textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}
          >
            Paket Umrah<br />
            <span className="text-primary" style={{ textShadow: "0 2px 24px rgba(225,29,130,0.5)" }}>El Massa</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-body text-sm sm:text-base text-white/80 max-w-xs sm:max-w-sm leading-relaxed"
          >
            Temukan paket umrah pilihan dengan pelayanan terbaik, hotel nyaman, dan harga terjangkau.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-3 mt-1"
          >
            <a
              href="https://wa.me/6281249476778?text=Assalamualaikum,%20saya%20ingin%20bertanya%20tentang%20paket%20umrah"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-booking gap-2"
            >
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

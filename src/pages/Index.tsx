import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import PosterCard from "@/components/PosterCard";
import TrustSection from "@/components/TrustSection";
import { ChevronRight, CalendarDays, ArrowDown } from "lucide-react";
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
  const minPrice = programs && programs.length > 0
    ? "Rp 29,9 JT"
    : "—";

  const stats = [
    { label: "TOTAL PROGRAM", value: programs ? `${programs.length} Paket` : "—" },
    { label: "DURASI", value: "10 – 12 Hari" },
    { label: "KOTA KEBERANGKATAN", value: "2 Kota" },
    { label: "HARGA MULAI", value: minPrice },
  ];

  return (
    <main className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <section className="relative min-h-[80vh] sm:min-h-[85vh] flex flex-col items-center justify-center text-center overflow-hidden px-4 pt-20 pb-16">

        {/* Gradient glow blob */}
        <div
          className="absolute top-[-5%] left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: "min(800px, 140vw)",
            height: "min(700px, 130vw)",
            background: "radial-gradient(ellipse at center, hsl(328 76% 65% / 0.28) 0%, hsl(328 76% 55% / 0.12) 45%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute bottom-[-10%] right-[5%] pointer-events-none"
          style={{
            width: "min(400px, 70vw)",
            height: "min(400px, 70vw)",
            background: "radial-gradient(ellipse at center, hsl(280 60% 60% / 0.10) 0%, transparent 65%)",
            filter: "blur(50px)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-5 sm:gap-6 max-w-3xl mx-auto">

          {/* Eyebrow label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="pill-label">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
              El Massa Tour & Travel 2026
            </span>
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-extrabold text-foreground tracking-tight leading-[0.88]"
            style={{ fontSize: "clamp(2.6rem, 10vw, 6.5rem)" }}
          >
            Paket Umrah<br />
            <span className="text-primary">El Massa</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-body text-sm sm:text-base text-muted-foreground max-w-xs sm:max-w-sm leading-relaxed"
          >
            Temukan paket umrah pilihan dengan pelayanan terbaik, hotel nyaman, dan harga terjangkau.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-3 mt-2"
          >
            <a href="#programs" className="btn-booking gap-2">
              <ArrowDown size={15} />
              Lihat Semua Program
            </a>
            <Link
              to="/kontak"
              className="font-body text-sm font-medium text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
            >
              Hubungi Kami
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        className="border-y border-border bg-card/60 backdrop-blur-sm"
      >
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {stats.map((stat) => (
              <div key={stat.label} className="py-5 px-4 sm:px-6 md:px-8">
                <p className="font-body text-[9px] sm:text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-1.5">
                  {stat.label}
                </p>
                <p className="font-display text-base sm:text-lg md:text-xl font-bold text-foreground">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

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

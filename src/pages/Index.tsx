import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import PosterCard from "@/components/PosterCard";
import TrustSection from "@/components/TrustSection";
import { CalendarDays, Play, Phone } from "lucide-react";
import type { UmrahProgram } from "../../shared/schema";

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
  return (
    <div className="mb-10 sm:mb-12 md:mb-14">
      <div className="section-container">
        <div className="flex items-center mb-4 sm:mb-5 gap-3">
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
        <div className="grid grid-cols-2 gap-4 sm:gap-5">
          {programs.map((program, i) => (
            <PosterCard key={program.id} program={program} index={i} />
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
      <section className="relative w-full overflow-hidden" style={{ height: "100vh", minHeight: 520, maxHeight: 960 }}>

        {/* Background image */}
        <img
          src="/hero-wallpaper.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          aria-hidden="true"
        />

        {/* Mobile: bottom dark overlay for text readability */}
        <div
          className="absolute inset-0 pointer-events-none lg:hidden"
          style={{
            background:
              "linear-gradient(to top, rgba(100,0,40,0.90) 0%, rgba(120,0,50,0.60) 38%, rgba(100,0,40,0.15) 68%, transparent 100%)",
          }}
        />

        {/* Desktop: right-side gradient so text on right stays readable */}
        <div
          className="absolute inset-0 pointer-events-none hidden lg:block"
          style={{
            background:
              "linear-gradient(to left, rgba(90,0,35,0.88) 0%, rgba(110,0,45,0.70) 30%, rgba(100,0,40,0.30) 55%, transparent 78%)",
          }}
        />
        {/* Desktop: subtle bottom fade */}
        <div
          className="absolute inset-0 pointer-events-none hidden lg:block"
          style={{
            background: "linear-gradient(to top, rgba(80,0,30,0.60) 0%, transparent 30%)",
          }}
        />

        {/* ── Content ── */}
        {/* Mobile: centered | Desktop: right-aligned */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div
            className="w-full flex flex-col items-center text-center lg:items-end lg:text-right"
            style={{ padding: "0 1.25rem" }}
          >
            {/* Desktop wrapper — pushes content to right side */}
            <div className="lg:max-w-lg xl:max-w-xl lg:pr-14 xl:pr-24 2xl:pr-32">

              {/* Brand badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="flex items-center justify-center lg:justify-end gap-2 mb-3 sm:mb-4"
              >
                <span
                  className="font-body font-bold uppercase text-white/85"
                  style={{ fontSize: "clamp(0.6rem, 1.1vw, 0.72rem)", letterSpacing: "0.22em" }}
                >
                  Program Umrah
                </span>
              </motion.div>

              {/* Main title */}
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="font-display font-black leading-[1.05] tracking-tight mb-4 sm:mb-5"
                style={{
                  fontSize: "clamp(3rem, 10vw, 7rem)",
                  color: "rgba(255, 245, 250, 1)",
                  textShadow: "0 1px 6px rgba(120,0,50,0.25)",
                }}
              >
                Paket Umrah<br />
                <span style={{
                  color: "rgba(255,255,255,1)",
                  textShadow: "0 1px 6px rgba(160,0,70,0.20)",
                }}>
                  El Massa
                </span>
              </motion.h1>

              {/* Short description */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-body text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8"
                style={{ color: "rgba(255, 228, 240, 0.92)", maxWidth: "36rem" }}
              >
                Pelayanan terbaik, hotel nyaman di Makkah & Madinah,<br className="hidden lg:block" /> dan harga terjangkau. Berangkat dari Pangkal Pinang & Jakarta.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center justify-center lg:justify-end gap-3"
              >
                <a
                  href="#programs"
                  className="inline-flex items-center gap-2 rounded-full font-body font-semibold transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: "rgba(255,255,255,0.96)",
                    color: "hsl(328,76%,36%)",
                    boxShadow: "0 4px 20px rgba(160,0,70,0.28)",
                    padding: "clamp(0.5rem,1.2vw,0.75rem) clamp(1.2rem,2.5vw,1.75rem)",
                    fontSize: "clamp(0.8rem,1.2vw,0.95rem)",
                  }}
                >
                  <Play size={13} fill="hsl(328,76%,36%)" strokeWidth={0} />
                  Lihat Program
                </a>
                <a
                  href="https://wa.me/6281249476778?text=Assalamualaikum,%20saya%20ingin%20bertanya%20tentang%20paket%20umrah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full font-body font-semibold text-white transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: "rgba(90,0,38,0.50)",
                    backdropFilter: "blur(14px)",
                    border: "1.5px solid rgba(255,175,210,0.40)",
                    boxShadow: "0 4px 20px rgba(90,0,38,0.28)",
                    padding: "clamp(0.5rem,1.2vw,0.75rem) clamp(1.2rem,2.5vw,1.75rem)",
                    fontSize: "clamp(0.8rem,1.2vw,0.95rem)",
                  }}
                >
                  <Phone size={13} />
                  Hubungi Kami
                </a>
              </motion.div>

            </div>
          </div>
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

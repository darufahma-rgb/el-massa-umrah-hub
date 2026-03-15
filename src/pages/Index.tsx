import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import PosterCard from "@/components/PosterCard";
import TrustSection from "@/components/TrustSection";
import heroBg from "@/assets/hero-bg.jpg";
import { Play, Info, ChevronRight, CalendarDays } from "lucide-react";
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
    <div className="mb-8 sm:mb-10 md:mb-12">
      <div className="section-container">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2.5">
            <CalendarDays size={18} className="text-primary shrink-0" />
            <h2 className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
              {month}
            </h2>
            <span className="hidden sm:inline text-xs font-body text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full">
              {programs.length} program
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => scroll("left")}
              className="p-1.5 rounded-full bg-card hover:bg-muted border border-border text-foreground/60 hover:text-foreground transition-all"
              aria-label="Scroll left"
            >
              <ChevronRight size={16} className="rotate-180" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-1.5 rounded-full bg-card hover:bg-muted border border-border text-foreground/60 hover:text-foreground transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight size={16} />
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
  <div className="mb-10">
    <div className="section-container">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 bg-muted animate-pulse rounded" />
        <div className="h-6 w-36 bg-muted animate-pulse rounded" />
      </div>
      <div className="flex gap-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 bg-muted animate-pulse rounded-xl"
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

  const featured = programs?.[0];
  const monthGroups = groupByMonth(programs ?? []);

  return (
    <main className="min-h-screen bg-background">
      {/* ── Hero ── */}
      <section className="relative h-[80vh] sm:h-[85vh] md:h-screen min-h-[520px] overflow-hidden">
        <img
          src={featured?.poster_image ?? heroBg}
          alt={featured?.nama_program ?? "El Massa"}
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        <div className="hero-gradient absolute inset-0" />

        <div className="relative h-full flex flex-col justify-end pb-16 sm:pb-20 md:pb-24">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-xl lg:max-w-2xl"
            >
              <span className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-xs font-body font-semibold bg-primary/25 text-primary-foreground border border-primary/35 tracking-wider uppercase mb-3 sm:mb-4">
                El Massa Tour & Travel
              </span>

              <h1 className="font-display text-[2rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-3 sm:mb-4">
                {featured?.nama_program ?? (
                  <>Temukan Program<br />Umrah <span className="text-primary italic">Pilihan Anda</span></>
                )}
              </h1>

              {featured && (
                <p className="font-body text-primary-foreground/75 text-sm sm:text-base max-w-md mb-2">
                  {featured.subtitle}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-primary-foreground/55 text-xs font-body mb-5 sm:mb-7">
                {featured ? (
                  <>
                    <span className="flex items-center gap-1">
                      <CalendarDays size={12} /> {featured.bulan_keberangkatan}
                    </span>
                    <span>•</span>
                    <span>{featured.durasi_hari}</span>
                    <span>•</span>
                    <span>{featured.kota_keberangkatan}</span>
                    <span>•</span>
                    <span className="text-primary font-semibold text-sm">{featured.harga_mulai}</span>
                  </>
                ) : (
                  <span>Jelajahi berbagai pilihan paket umrah premium dengan pelayanan terbaik.</span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {featured ? (
                  <>
                    <Link to={`/program/${featured.slug_url}`} className="btn-booking gap-2">
                      <Play size={15} fill="currentColor" />
                      Lihat Detail
                    </Link>
                    <a
                      href={featured.whatsapp_booking_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary gap-2"
                    >
                      <Info size={15} />
                      Booking Sekarang
                    </a>
                  </>
                ) : (
                  <a href="#programs" className="btn-booking gap-2">
                    Jelajahi Program
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Program Rows by Month ── */}
      <div id="programs" className="pt-8 sm:pt-10 md:pt-12 pb-4">
        {isLoading ? (
          <>
            <SkeletonRow />
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

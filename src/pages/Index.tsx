import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import PosterCard from "@/components/PosterCard";
import TrustSection from "@/components/TrustSection";
import heroBg from "@/assets/hero-bg.jpg";
import { Play, Info, CalendarDays } from "lucide-react";
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
    <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-24">
      <div className="section-container">
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <CalendarDays size={20} className="text-primary shrink-0" />
          <h2 className="font-display text-2xl sm:text-3xl md:text-[2rem] lg:text-[2.25rem] font-bold text-foreground">
            {month}
          </h2>
          <span className="text-xs font-body text-muted-foreground bg-muted px-3 py-1 rounded-full">
            {programs.length} program
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7">
          {programs.map((program, i) => (
            <PosterCard key={program.id} program={program} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

const SkeletonRow = () => (
  <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-24">
    <div className="section-container">
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <div className="w-5 h-5 bg-muted animate-pulse rounded" />
        <div className="h-8 w-48 bg-muted animate-pulse rounded" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-muted animate-pulse rounded-xl"
            style={{ aspectRatio: "2/3" }}
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

              <h1 className="font-display text-[2.25rem] leading-[1.1] sm:text-[2.75rem] md:text-5xl lg:text-[3.25rem] font-bold text-primary-foreground mb-3 sm:mb-4">
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
      <div id="programs" className="pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-12 md:pb-16">
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

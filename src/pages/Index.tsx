import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import PosterCard from "@/components/PosterCard";
import TrustSection from "@/components/TrustSection";
import heroBg from "@/assets/hero-bg.jpg";
import { ChevronDown, Play, Info, ChevronRight } from "lucide-react";
import type { UmrahProgram } from "../../shared/schema";
import { useRef } from "react";

const ProgramRow = ({ title, programs }: { title: string; programs: UmrahProgram[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
  };

  if (programs.length === 0) return null;

  return (
    <div className="mb-8 sm:mb-10 md:mb-12">
      <div className="section-container">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h2 className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
            {title}
          </h2>
          <div className="flex items-center gap-1">
            <button
              onClick={() => scroll("left")}
              className="p-1.5 rounded-full bg-card/60 hover:bg-card border border-border/50 text-foreground/60 hover:text-foreground transition-all"
              aria-label="Scroll left"
            >
              <ChevronRight size={16} className="rotate-180" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-1.5 rounded-full bg-card/60 hover:bg-card border border-border/50 text-foreground/60 hover:text-foreground transition-all"
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
              style={{ width: "clamp(140px, 22vw, 220px)" }}
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
      <div className="h-7 w-48 bg-muted animate-pulse rounded mb-4" />
      <div className="flex gap-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 bg-muted animate-pulse rounded-xl"
            style={{ width: "clamp(140px, 22vw, 220px)", aspectRatio: "2/3" }}
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
  const allPrograms = programs ?? [];

  const popular = allPrograms.filter((p) => p.badge === "Populer" || p.badge === "Best Value");
  const premium = allPrograms.filter((p) => p.badge === "Premium" || p.badge === "Exclusive");
  const special = allPrograms.filter((p) => p.badge === "Program Baru" || p.badge === "Kuota Terbatas");

  return (
    <main className="min-h-screen bg-background">
      {/* ── Hero ── */}
      <section className="relative h-[80vh] sm:h-[85vh] md:h-screen min-h-[520px] overflow-hidden">
        {featured ? (
          <img
            src={featured.poster_image}
            alt={featured.nama_program}
            className="absolute inset-0 w-full h-full object-cover object-center scale-105"
          />
        ) : (
          <img
            src={heroBg}
            alt="El Massa"
            className="absolute inset-0 w-full h-full object-cover object-center scale-105"
          />
        )}

        <div className="hero-gradient absolute inset-0" />

        <div className="relative h-full flex flex-col justify-end pb-16 sm:pb-20 md:pb-24">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-xl lg:max-w-2xl"
            >
              <span className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-xs font-body font-semibold bg-primary/20 text-primary border border-primary/30 tracking-wider uppercase mb-3 sm:mb-4">
                El Massa Tour & Travel
              </span>

              <h1 className="font-display text-[2rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-3 sm:mb-4">
                {featured ? (
                  <>
                    {featured.nama_program}
                  </>
                ) : (
                  <>
                    Temukan Program<br />
                    Umrah <span className="text-primary italic">Pilihan Anda</span>
                  </>
                )}
              </h1>

              {featured && (
                <p className="font-body text-foreground/70 text-sm sm:text-base max-w-md mb-2">
                  {featured.subtitle}
                </p>
              )}

              <div className="flex items-center gap-2 sm:gap-3 text-foreground/50 text-xs font-body mb-5 sm:mb-7">
                {featured ? (
                  <>
                    <span>{featured.bulan_keberangkatan}</span>
                    <span>•</span>
                    <span>{featured.durasi_hari}</span>
                    <span>•</span>
                    <span>{featured.kota_keberangkatan}</span>
                    <span>•</span>
                    <span className="text-primary font-semibold">{featured.harga_mulai}</span>
                  </>
                ) : (
                  <span>Jelajahi berbagai pilihan paket umrah premium dengan pelayanan terbaik.</span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {featured ? (
                  <>
                    <Link to={`/program/${featured.slug_url}`} className="btn-booking gap-2">
                      <Play size={16} fill="currentColor" />
                      Lihat Detail
                    </Link>
                    <a
                      href={featured.whatsapp_booking_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary gap-2"
                    >
                      <Info size={16} />
                      Booking Sekarang
                    </a>
                  </>
                ) : (
                  <a href="#programs" className="btn-booking gap-2">
                    <ChevronDown size={16} className="animate-bounce" />
                    Jelajahi Program
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Program Rows ── */}
      <div id="programs" className="py-6 sm:py-8 md:py-10">
        {isLoading ? (
          <>
            <SkeletonRow />
            <SkeletonRow />
          </>
        ) : (
          <>
            <ProgramRow title="Semua Program Umrah" programs={allPrograms} />
            {popular.length > 0 && <ProgramRow title="Populer & Terjangkau" programs={popular} />}
            {premium.length > 0 && <ProgramRow title="Premium & Eksklusif" programs={premium} />}
            {special.length > 0 && <ProgramRow title="Program Spesial" programs={special} />}
          </>
        )}
      </div>

      <TrustSection />
    </main>
  );
};

export default Index;

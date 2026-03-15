import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import PosterCard from "@/components/PosterCard";
import TrustSection from "@/components/TrustSection";
import heroBg from "@/assets/hero-bg.jpg";
import { ChevronDown } from "lucide-react";
import type { UmrahProgram } from "../../shared/schema";

const Index = () => {
  const { data: programs, isLoading } = useQuery<UmrahProgram[]>({
    queryKey: ["umrah-programs"],
    queryFn: async () => {
      const res = await fetch("/api/programs");
      if (!res.ok) throw new Error("Failed to fetch programs");
      return res.json();
    },
  });

  return (
    <main className="pt-14 md:pt-16 lg:pt-20">
      {/* Hero */}
      <section className="relative h-[65vh] sm:h-[70vh] md:h-[80vh] lg:h-[85vh] overflow-hidden">
        <img
          src={heroBg}
          alt="Masjidil Haram"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/30 to-background" />
        <div className="relative h-full flex flex-col justify-center items-center text-center px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-4 md:mb-6"
          >
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-body font-semibold bg-primary/20 text-primary-foreground border border-primary-foreground/20 backdrop-blur-sm tracking-wider uppercase">
              El Massa Tour & Travel
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-[1.75rem] leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground mb-3 md:mb-5"
          >
            Temukan Program
            <br />
            Umrah <span className="text-primary italic">Pilihan Anda</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-body text-primary-foreground/70 text-xs sm:text-sm md:text-base lg:text-lg max-w-md md:max-w-xl mb-6 md:mb-10 leading-relaxed"
          >
            Jelajahi berbagai pilihan paket umrah premium dengan pelayanan terbaik.
            Dari reguler hingga eksklusif — semua untuk ibadah yang sempurna.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            href="#programs"
            className="btn-booking"
          >
            Jelajahi Program
            <ChevronDown size={18} className="animate-bounce" />
          </motion.a>
        </div>

        {/* Scroll indicator - hidden on small screens */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 hidden sm:block"
        >
          <div className="w-5 h-8 md:w-6 md:h-10 rounded-full border-2 border-primary-foreground/30 flex justify-center pt-1.5 md:pt-2">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-primary-foreground/50"
            />
          </div>
        </motion.div>
      </section>

      {/* Program Catalog Grid */}
      <section id="programs" className="py-10 sm:py-14 md:py-20 lg:py-24">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10 md:mb-14 lg:mb-16"
          >
            <span className="inline-block px-3 py-1 sm:px-4 rounded-full text-[10px] sm:text-xs font-body font-semibold bg-primary/10 text-primary tracking-wider uppercase mb-3 md:mb-4">
              Katalog Program
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 md:mb-4">
              Program Umrah Kami
            </h2>
            <p className="font-body text-muted-foreground max-w-md lg:max-w-lg mx-auto text-xs sm:text-sm md:text-base">
              Pilih paket yang sesuai dengan kebutuhan dan budget Anda. Klik poster untuk melihat detail lengkap program.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="poster-card bg-muted animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
              {programs?.map((program, i) => (
                <PosterCard key={program.id} program={program} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <TrustSection />
    </main>
  );
};

export default Index;

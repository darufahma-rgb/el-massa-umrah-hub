import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import PosterCard from "@/components/PosterCard";
import TrustSection from "@/components/TrustSection";
import { supabase } from "@/integrations/supabase/client";
import heroBg from "@/assets/hero-bg.jpg";
import { ChevronDown } from "lucide-react";

const Index = () => {
  const { data: programs, isLoading } = useQuery({
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
    <main className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="relative h-[75vh] md:h-[85vh] overflow-hidden">
        <img src={heroBg} alt="Masjidil Haram" className="absolute inset-0 w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/30 to-background" />
        <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-body font-semibold bg-primary/20 text-primary-foreground border border-primary-foreground/20 backdrop-blur-sm tracking-wider uppercase">
              El Massa Tour & Travel
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-5 leading-[1.1]"
          >
            Temukan Program
            <br />
            Umrah <span className="text-primary italic">Pilihan Anda</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-body text-primary-foreground/70 text-sm md:text-lg max-w-xl mb-10 leading-relaxed"
          >
            Jelajahi berbagai pilihan paket umrah premium dengan pelayanan terbaik.
            Dari reguler hingga eksklusif — semua untuk ibadah yang sempurna.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            href="#programs"
            className="btn-booking text-base md:text-lg"
          >
            Jelajahi Program
            <ChevronDown size={20} className="animate-bounce" />
          </motion.a>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 rounded-full bg-primary-foreground/50"
            />
          </div>
        </motion.div>
      </section>

      {/* Program Catalog Grid */}
      <section id="programs" className="py-16 md:py-24">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full text-xs font-body font-semibold bg-primary/10 text-primary tracking-wider uppercase mb-4">
              Katalog Program
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              Program Umrah Kami
            </h2>
            <p className="font-body text-muted-foreground max-w-lg mx-auto text-sm md:text-base">
              Pilih paket yang sesuai dengan kebutuhan dan budget Anda. Klik poster untuk melihat detail lengkap program.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="poster-card bg-muted animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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

import { motion } from "framer-motion";
import PosterCard from "@/components/PosterCard";
import TrustSection from "@/components/TrustSection";
import { programs } from "@/data/programs";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <main className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img src={heroBg} alt="Masjidil Haram" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/20 to-background" />
        <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 leading-tight"
          >
            Wujudkan Perjalanan
            <br />
            <span className="text-primary">Suci Anda</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body text-primary-foreground/80 text-sm md:text-base max-w-md mb-8"
          >
            Pilih program umrah terbaik untuk perjalanan ibadah yang berkesan bersama El Massa Tour & Travel
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            href="#programs"
            className="btn-booking"
          >
            Lihat Program Umrah
          </motion.a>
        </div>
      </section>

      {/* Program Grid */}
      <section id="programs" className="py-16 md:py-20">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-14"
          >
            <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-3">
              Program Umrah Kami
            </h2>
            <p className="font-body text-muted-foreground max-w-md mx-auto">
              Pilih paket yang sesuai dengan kebutuhan dan budget Anda
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {programs.map((program, i) => (
              <PosterCard key={program.id} program={program} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <TrustSection />
    </main>
  );
};

export default Index;

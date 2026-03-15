import { motion } from "framer-motion";
import { Shield, Award, Plane, Users } from "lucide-react";

const trustItems = [
  {
    icon: Shield,
    title: "Izin Resmi Kemenag",
    desc: "Terdaftar & berizin resmi di Kementerian Agama RI sebagai penyelenggara umrah.",
  },
  {
    icon: Award,
    title: "10+ Tahun Pengalaman",
    desc: "Lebih dari satu dekade dipercaya ribuan jamaah dalam setiap perjalanan ibadah.",
  },
  {
    icon: Plane,
    title: "Partner Maskapai Resmi",
    desc: "Bekerja sama langsung dengan Saudia Airlines & Garuda Indonesia.",
  },
  {
    icon: Users,
    title: "5.000+ Jamaah",
    desc: "Ribuan jamaah telah merasakan kenyamanan dan keprofesionalan layanan kami.",
  },
];

const TrustSection = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 border-t border-border">
      <div className="section-container">

        {/* Section header — centered like the reference */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center gap-4 mb-12 sm:mb-14 md:mb-16"
        >
          {/* Decorative star */}
          <span className="text-primary text-2xl select-none">✦</span>

          <span className="pill-label">
            <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
            Tentang El Massa
          </span>

          <h2
            className="font-display font-extrabold text-foreground tracking-tight leading-tight"
            style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)" }}
          >
            Kenapa Pilih El Massa?
          </h2>

          <p className="font-body text-sm sm:text-base text-muted-foreground max-w-sm sm:max-w-md leading-relaxed">
            Kami hadir untuk memastikan setiap langkah perjalanan ibadah Anda berjalan lancar, nyaman, dan penuh keberkahan.
          </p>
        </motion.div>

        {/* Numbered feature cards — like reference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative overflow-hidden rounded-2xl bg-card border border-border p-5 sm:p-6 flex flex-col gap-3"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <item.icon size={20} />
              </div>

              {/* Text */}
              <div className="flex-1">
                <h4 className="font-display text-base font-bold text-foreground mb-1.5 leading-snug">
                  {item.title}
                </h4>
                <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Big number watermark in corner — like reference */}
              <span
                className="absolute bottom-3 right-4 font-display font-extrabold text-foreground/[0.05] select-none pointer-events-none"
                style={{ fontSize: "clamp(3.5rem, 8vw, 5rem)", lineHeight: 1 }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrustSection;

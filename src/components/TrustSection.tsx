import { motion } from "framer-motion";
import { Shield, Plane, Users } from "lucide-react";

const trustItems = [
  {
    icon: Shield,
    title: "Izin Resmi Kemenag",
    desc: "Terdaftar resmi di Kementerian Agama RI",
    stat: "100%",
    statLabel: "Legal",
  },
  {
    icon: Plane,
    title: "Maskapai Resmi",
    desc: "Saudia Airlines & Garuda Indonesia",
    stat: "2",
    statLabel: "Maskapai",
  },
  {
    icon: Users,
    title: "5.000+ Jamaah",
    desc: "Dipercaya ribuan jamaah di seluruh Indonesia",
    stat: "5K+",
    statLabel: "Jamaah",
  },
];

const TrustSection = () => {
  return (
    <section
      className="py-14 sm:py-16 md:py-20"
      style={{ background: "hsl(25, 40%, 18%)" }}
    >
      <div className="section-container">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-start gap-2 mb-8 sm:mb-10"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-body font-medium bg-white/10 text-white/80 border border-white/15">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
            Kenapa El Massa?
          </span>
          <h2
            className="font-display font-extrabold text-white tracking-tight leading-tight"
            style={{ fontSize: "clamp(1.6rem, 4.5vw, 2.6rem)" }}
          >
            Dipercaya, Berpengalaman,<br className="hidden sm:block" /> & Terpercaya
          </h2>
        </motion.div>

        {/* Items — plain text with dividers */}
        <div className="flex flex-col">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              {i > 0 && (
                <div className="h-px bg-white/10 my-5" />
              )}
              <div className="flex items-center gap-5">
                {/* Stat */}
                <div className="flex-shrink-0 w-16 text-center">
                  <p className="font-display font-extrabold text-2xl text-amber-400 leading-none">{item.stat}</p>
                  <p className="font-body text-[9px] uppercase tracking-wider text-white/50 mt-0.5">{item.statLabel}</p>
                </div>

                {/* Text */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <item.icon size={13} className="shrink-0 text-white/60" />
                    <h4 className="font-display text-sm font-bold text-white">{item.title}</h4>
                  </div>
                  <p className="font-body text-xs text-white/55 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="font-body text-xs text-white/50 text-center mt-8"
        >
          Kami hadir memastikan setiap langkah perjalanan ibadah Anda berjalan lancar & penuh keberkahan.
        </motion.p>

      </div>
    </section>
  );
};

export default TrustSection;

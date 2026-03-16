import { motion } from "framer-motion";
import { Shield, Plane, Users, CheckCircle2 } from "lucide-react";

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
      style={{ background: "linear-gradient(135deg, hsl(340, 80%, 58%) 0%, hsl(328, 76%, 50%) 50%, hsl(315, 72%, 44%) 100%)" }}
    >
      <div className="section-container">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-start gap-2 mb-8 sm:mb-10"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-body font-medium bg-white/15 backdrop-blur-sm text-white border border-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
            Kenapa El Massa?
          </span>
          <h2
            className="font-display font-extrabold text-white tracking-tight leading-tight"
            style={{ fontSize: "clamp(1.6rem, 4.5vw, 2.6rem)", textShadow: "0 2px 12px rgba(0,0,0,0.15)" }}
          >
            Dipercaya, Berpengalaman,<br className="hidden sm:block" /> & Terpercaya
          </h2>
        </motion.div>

        {/* Cards — glassy, blending with gradient */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-4 rounded-2xl p-4 sm:p-5"
              style={{
                background: "rgba(255,255,255,0.10)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              {/* Stat bubble */}
              <div
                className="flex-shrink-0 flex flex-col items-center justify-center rounded-xl w-16 h-16"
                style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.20)" }}
              >
                <span className="font-display font-extrabold text-lg leading-none text-white">{item.stat}</span>
                <span className="font-body text-[9px] uppercase tracking-wider mt-0.5 text-white/70">{item.statLabel}</span>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <item.icon size={13} className="shrink-0 text-white/80" />
                  <h4 className="font-display text-sm font-bold leading-snug text-white">
                    {item.title}
                  </h4>
                </div>
                <p className="font-body text-xs leading-relaxed text-white/65">
                  {item.desc}
                </p>
              </div>

              <CheckCircle2 size={16} className="shrink-0 text-white/25" />
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="font-body text-xs text-white/70 text-center mt-6"
        >
          Kami hadir memastikan setiap langkah perjalanan ibadah Anda berjalan lancar & penuh keberkahan.
        </motion.p>

      </div>
    </section>
  );
};

export default TrustSection;

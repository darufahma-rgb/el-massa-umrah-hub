import { motion } from "framer-motion";
import { Shield, Plane, Users, CheckCircle2 } from "lucide-react";

const trustItems = [
  {
    icon: Shield,
    title: "Izin Resmi Kemenag",
    desc: "Terdaftar resmi di Kementerian Agama RI",
    stat: "100%",
    statLabel: "Legal",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  {
    icon: Plane,
    title: "Maskapai Resmi",
    desc: "Saudia Airlines & Garuda Indonesia",
    stat: "2",
    statLabel: "Maskapai",
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-200",
  },
  {
    icon: Users,
    title: "5.000+ Jamaah",
    desc: "Dipercaya ribuan jamaah di seluruh Indonesia",
    stat: "5K+",
    statLabel: "Jamaah",
    color: "text-primary",
    bg: "bg-primary/5",
    border: "border-primary/20",
  },
];

const TrustSection = () => {
  return (
    <section
      className="py-14 sm:py-16 md:py-20"
      style={{ backgroundColor: "hsl(328, 76%, 50%)" }}
    >
      <div className="section-container">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-start gap-2 mb-8 sm:mb-10"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-body font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30">
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

        {/* Compact cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {trustItems.map((item, i) => {
            const isPink = i % 2 === 1;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 rounded-2xl p-4 sm:p-5"
                style={{
                  backgroundColor: isPink ? "hsl(328, 76%, 44%)" : "rgba(255,255,255,0.97)",
                  boxShadow: isPink
                    ? "0 4px 24px rgba(0,0,0,0.18)"
                    : "0 4px 24px rgba(0,0,0,0.10)",
                }}
              >
                {/* Stat bubble */}
                {isPink ? (
                  <div className="flex-shrink-0 flex flex-col items-center justify-center rounded-xl w-16 h-16 bg-white/20">
                    <span className="font-display font-extrabold text-lg leading-none text-white">{item.stat}</span>
                    <span className="font-body text-[9px] uppercase tracking-wider mt-0.5 text-white/80">{item.statLabel}</span>
                  </div>
                ) : (
                  <div className={`flex-shrink-0 flex flex-col items-center justify-center rounded-xl ${item.bg} border ${item.border} w-16 h-16`}>
                    <span className={`font-display font-extrabold text-lg leading-none ${item.color}`}>{item.stat}</span>
                    <span className={`font-body text-[9px] uppercase tracking-wider mt-0.5 ${item.color} opacity-80`}>{item.statLabel}</span>
                  </div>
                )}

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <item.icon size={13} className={`shrink-0 ${isPink ? "text-white/90" : item.color}`} />
                    <h4 className={`font-display text-sm font-bold leading-snug ${isPink ? "text-white" : "text-foreground"}`}>
                      {item.title}
                    </h4>
                  </div>
                  <p className={`font-body text-xs leading-relaxed ${isPink ? "text-white/75" : "text-muted-foreground"}`}>
                    {item.desc}
                  </p>
                </div>

                {/* Check */}
                <CheckCircle2 size={16} className={`shrink-0 ${isPink ? "text-white/35" : "text-muted-foreground/30"}`} />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="font-body text-xs text-white/80 text-center mt-6"
        >
          Kami hadir memastikan setiap langkah perjalanan ibadah Anda berjalan lancar & penuh keberkahan.
        </motion.p>

      </div>
    </section>
  );
};

export default TrustSection;

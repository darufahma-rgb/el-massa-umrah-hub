import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, ArrowUpRight } from "lucide-react";
import type { UmrahProgram } from "../../shared/schema";

interface PosterCardProps {
  program: UmrahProgram;
  index: number;
}

const badgeStyles: Record<string, string> = {
  "Populer": "bg-primary text-white",
  "Premium": "bg-amber-500 text-white",
  "Program Baru": "bg-emerald-500 text-white",
  "Kuota Terbatas": "bg-destructive text-white",
  "Best Value": "bg-primary text-white",
  "Eksklusif": "bg-amber-500 text-white",
  "Exclusive": "bg-amber-500 text-white",
  "Pilihan Terbaik": "bg-primary text-white",
  "Tersedia": "bg-muted text-muted-foreground",
};

const PosterCard = ({ program, index }: PosterCardProps) => {
  const badge = program.badge;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.3) }}
      className="w-full group"
    >
      <Link to={`/program/${program.slug_url}`} className="block">

        {/* ── Image ── */}
        <div className="poster-card relative mb-3">
          <img
            src={program.poster_image}
            alt={program.nama_program}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />

          {/* Subtle top fade for badge legibility */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/15 transition-all duration-300 hidden sm:flex items-center justify-center rounded-2xl">
            <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-3 group-hover:translate-y-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-white text-[10px] font-semibold font-body shadow-lg">
              Lihat Detail
              <ArrowUpRight size={11} />
            </span>
          </div>

          {/* Badge */}
          {badge && (
            <div className="absolute top-2.5 left-2.5 z-10">
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-body font-bold uppercase tracking-wider ${badgeStyles[badge] || "bg-primary text-white"}`}>
                {badge}
              </span>
            </div>
          )}
        </div>

        {/* ── Info below image ── */}
        <div className="px-0.5">
          <h3 className="font-display text-sm sm:text-[0.9rem] font-bold text-foreground leading-snug mb-1.5 group-hover:text-primary transition-colors">
            {program.nama_program}
          </h3>

          <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] font-body mb-2">
            <Clock size={10} className="shrink-0" />
            <span>{program.durasi_hari}</span>
            <span className="text-border">·</span>
            <span className="truncate">{program.kota_keberangkatan.split("/")[0].trim()}</span>
          </div>

          <div className="flex items-end justify-between gap-1">
            <div>
              <p className="font-body text-[9px] text-muted-foreground uppercase tracking-wider mb-0.5">Mulai dari</p>
              <p className="font-display text-sm font-bold text-primary leading-none">
                {program.harga_mulai}
              </p>
            </div>
            <span className="text-[9px] font-body text-muted-foreground/60 underline underline-offset-2 shrink-0">
              Detail →
            </span>
          </div>
        </div>

      </Link>
    </motion.div>
  );
};

export default PosterCard;

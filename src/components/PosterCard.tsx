import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { UmrahProgram } from "../../shared/schema";

interface PosterCardProps {
  program: UmrahProgram;
  index: number;
}

const badgeStyles: Record<string, string> = {
  "Populer": "bg-primary text-primary-foreground",
  "Premium": "bg-amber-500 text-white",
  "Program Baru": "bg-emerald-500 text-white",
  "Kuota Terbatas": "bg-destructive text-destructive-foreground",
  "Best Value": "bg-primary text-primary-foreground",
  "Exclusive": "bg-amber-500 text-white",
  "Eksklusif": "bg-amber-500 text-white",
  "Pilihan Terbaik": "bg-emerald-500 text-white",
  "Tersedia": "bg-primary text-primary-foreground",
};

const PosterCard = ({ program, index }: PosterCardProps) => {
  const badge = program.badge;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.3) }}
      className="w-full"
    >
      <Link to={`/program/${program.slug_url}`} className="block poster-card group">
        <img
          src={program.poster_image}
          alt={program.nama_program}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        <div className="poster-gradient absolute inset-0 transition-opacity duration-300" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-all duration-300 hidden sm:flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold font-body">
            Lihat Detail
            <ArrowRight size={14} />
          </span>
        </div>

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-body font-bold uppercase tracking-wider ${badgeStyles[badge] || "bg-primary text-primary-foreground"}`}>
              {badge}
            </span>
          </div>
        )}

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-4 sm:p-5">
          <span className="inline-block self-start px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-body font-semibold bg-white/10 backdrop-blur-sm text-foreground/85 border border-white/20 mb-2">
            {program.bulan_keberangkatan}
          </span>
          <h3 className="font-display text-base sm:text-lg md:text-xl font-bold text-foreground leading-tight mb-2">
            {program.nama_program}
          </h3>
          <div className="flex items-center gap-2.5 text-foreground/65 text-[11px] sm:text-xs font-body mb-2.5">
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              {program.bulan_keberangkatan}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {program.durasi_hari}
            </span>
          </div>
          <div>
            <p className="font-body text-[10px] sm:text-xs text-foreground/50 uppercase tracking-wider mb-0.5">Mulai dari</p>
            <p className="font-display text-base sm:text-lg font-bold text-primary">
              {program.harga_mulai}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PosterCard;

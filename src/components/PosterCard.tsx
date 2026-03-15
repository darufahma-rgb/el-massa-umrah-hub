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
  "Premium": "bg-foreground text-primary-foreground",
  "Program Baru": "bg-accent text-accent-foreground",
  "Kuota Terbatas": "bg-destructive text-destructive-foreground",
  "Best Value": "bg-primary text-primary-foreground",
  "Exclusive": "bg-foreground text-primary-foreground",
};

const PosterCard = ({ program, index }: PosterCardProps) => {
  const badge = program.badge;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link to={`/program/${program.slug_url}`} className="block poster-card group">
        {/* Poster Image */}
        <img
          src={program.poster_image}
          alt={program.nama_program}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Default gradient */}
        <div className="poster-gradient absolute inset-0 transition-opacity duration-300" />

        {/* Hover overlay - hidden on touch devices */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/50 transition-all duration-300 hidden sm:flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 btn-booking !px-5 !py-2.5 text-sm">
            Lihat Detail
            <ArrowRight size={16} />
          </span>
        </div>

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
            <span className={`inline-block px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-body font-bold uppercase tracking-wider ${badgeStyles[badge] || "bg-primary text-primary-foreground"}`}>
              {badge}
            </span>
          </div>
        )}

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-4 sm:p-5 md:p-6">
          <span className="inline-block self-start px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-body font-semibold bg-card/20 backdrop-blur-sm text-primary-foreground border border-primary-foreground/20 mb-2 sm:mb-3">
            {program.bulan_keberangkatan}
          </span>
          <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-primary-foreground leading-tight mb-1 sm:mb-1.5">
            {program.nama_program}
          </h3>
          <div className="flex items-center gap-2 sm:gap-3 text-primary-foreground/70 text-[10px] sm:text-xs font-body mb-2 sm:mb-3">
            <span className="flex items-center gap-1">
              <Calendar size={11} className="sm:w-3 sm:h-3" />
              {program.bulan_keberangkatan}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={11} className="sm:w-3 sm:h-3" />
              {program.durasi_hari}
            </span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="font-body text-[9px] sm:text-[10px] text-primary-foreground/60 uppercase tracking-wider mb-0.5">Mulai dari</p>
              <p className="font-display text-base sm:text-lg md:text-xl font-bold text-primary-foreground">
                {program.harga_mulai}
              </p>
            </div>
            <span className="font-body text-[10px] sm:text-xs text-primary-foreground/60 group-hover:text-primary transition-colors flex items-center gap-1">
              Detail <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PosterCard;

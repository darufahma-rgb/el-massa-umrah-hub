import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, Clock, Star, Users } from "lucide-react";
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
      className="w-full group flex flex-col"
    >
      {/* ── Poster Image — links to detail ── */}
      <Link to={`/program/${program.slug_url}`} className="block">
        <div className="card-glow rounded-2xl mb-3" style={{ borderRadius: "1rem" }}>
          <div className="poster-card relative">
            <img
              src={program.poster_image}
              alt={program.nama_program}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-2xl flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 px-3 py-1.5 rounded-full bg-primary text-white text-[10px] font-semibold font-body shadow-lg">
                Lihat Detail →
              </span>
            </div>
            {badge && (
              <div className="absolute top-2.5 left-2.5 z-10">
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-body font-bold uppercase tracking-wider ${badgeStyles[badge] || "bg-primary text-white"}`}>
                  {badge}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── Info ── */}
        <div className="px-0.5 flex flex-col gap-1.5">
          <h3 className="font-display text-sm sm:text-[0.9rem] font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {program.nama_program}
          </h3>
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <span className="flex items-center gap-1 text-[10px] font-body text-muted-foreground">
              <CalendarDays size={9} className="shrink-0 text-primary/60" />
              {program.bulan_keberangkatan}
            </span>
            <span className="flex items-center gap-1 text-[10px] font-body text-muted-foreground">
              <Clock size={9} className="shrink-0 text-primary/60" />
              {program.durasi_hari}
            </span>
          </div>
          {program.bonus_program && (
            <span className="inline-flex items-center gap-1 text-[9px] font-body text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5 w-fit leading-tight">
              <Star size={8} className="shrink-0 fill-amber-400 text-amber-400" />
              <span className="line-clamp-1">{program.bonus_program}</span>
            </span>
          )}
        </div>
      </Link>

      {/* ── Price + Buttons — outside main Link ── */}
      <div
        className="mt-2 rounded-xl px-3 pt-2 pb-2.5 flex flex-col gap-2"
        style={{
          background: "linear-gradient(135deg, hsl(335,85%,97%) 0%, hsl(345,80%,94%) 100%)",
          border: "1px solid hsl(335,80%,87%)",
        }}
      >
        {/* Price row */}
        <div>
          <p className="font-body text-[7px] text-primary/50 uppercase tracking-widest mb-0.5">Mulai dari</p>
          <p className="font-display text-[0.78rem] font-bold text-primary leading-none">
            {program.harga_mulai}
          </p>
        </div>

        {/* Buttons row */}
        <div className="flex items-center gap-1.5">
          <Link
            to="/update-seat"
            className="flex-1 inline-flex items-center justify-center gap-1 text-[9px] font-body font-semibold px-2 py-1.5 rounded-lg transition-all hover:opacity-80 active:scale-95"
            style={{ background: "rgba(225,29,130,0.10)", color: "hsl(328,76%,45%)", border: "1px solid hsl(328,76%,80%)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Users size={8} />
            Cek Seat
          </Link>
          <Link
            to={`/program/${program.slug_url}`}
            className="flex-1 inline-flex items-center justify-center text-[9px] font-body font-semibold px-2 py-1.5 rounded-lg transition-all hover:opacity-90 active:scale-95"
            style={{ background: "hsl(328,76%,50%)", color: "white" }}
            onClick={(e) => e.stopPropagation()}
          >
            Detail →
          </Link>
        </div>
      </div>

    </motion.div>
  );
};

export default PosterCard;

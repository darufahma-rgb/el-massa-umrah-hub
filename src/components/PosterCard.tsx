import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type UmrahProgram = Database["public"]["Tables"]["umrah_programs"]["Row"];

interface PosterCardProps {
  program: UmrahProgram;
  index: number;
}

const PosterCard = ({ program, index }: PosterCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/program/${program.slug_url}`} className="block poster-card group">
        <img
          src={program.poster_image}
          alt={program.nama_program}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="poster-gradient absolute inset-0" />
        <div className="relative h-full flex flex-col justify-end p-5 md:p-6">
          <span className="inline-block self-start px-3 py-1 rounded-full text-xs font-body font-semibold bg-primary text-primary-foreground mb-3">
            {program.bulan_keberangkatan}
          </span>
          <h3 className="font-display text-xl md:text-2xl font-bold text-primary-foreground leading-tight mb-1">
            {program.nama_program}
          </h3>
          <div className="flex items-center gap-3 text-primary-foreground/80 text-xs font-body mb-3">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {program.bulan_keberangkatan}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {program.durasi_hari}
            </span>
          </div>
          <p className="font-body text-xs text-primary-foreground/70 mb-1">Mulai dari</p>
          <p className="font-display text-lg md:text-xl font-bold text-primary-foreground">
            {program.harga_mulai}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default PosterCard;

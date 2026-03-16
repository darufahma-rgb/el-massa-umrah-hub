import { motion } from "framer-motion";
import { MapPin, Phone, Clock, MessageCircle, ArrowRight, Instagram } from "lucide-react";

const waLink = "https://wa.me/6281249476778?text=Assalamualaikum,%20saya%20ingin%20informasi%20program%20umrah%20El%20Massa";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay },
});

const ContactPage = () => {
  return (
    <main className="min-h-screen bg-background pb-20">

      {/* ── Hero ── */}
      <section
        className="relative pt-28 pb-14 px-4 overflow-hidden"
        style={{ background: "linear-gradient(160deg, hsl(25,40%,14%) 0%, hsl(25,38%,20%) 100%)" }}
      >
        <div
          className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-[460px] h-[260px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, hsl(328,76%,50%,0.16) 0%, transparent 70%)" }}
        />
        <div className="section-container relative text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-body font-medium border mb-5"
            style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
            Kami Siap Membantu
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.07 }}
            className="font-display font-extrabold text-white leading-tight mb-3"
            style={{ fontSize: "clamp(2rem, 6vw, 3.2rem)" }}
          >
            Hubungi El Massa
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.14 }}
            className="font-body text-sm sm:text-base leading-relaxed max-w-md mx-auto"
            style={{ color: "rgba(255,230,240,0.78)" }}
          >
            Konsultasi program umrah, tanya biaya, atau langsung daftar — tim kami siap merespons dengan cepat.
          </motion.p>
        </div>
      </section>

      <div className="section-container mt-10 flex flex-col gap-5">

        {/* ── Primary: WhatsApp CTA ── */}
        <motion.a
          {...fadeUp(0)}
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-4 rounded-2xl px-6 py-5 group transition-all hover:scale-[1.01] active:scale-[0.99]"
          style={{
            background: "linear-gradient(135deg, hsl(328,76%,50%), hsl(345,80%,62%))",
            boxShadow: "0 8px 40px -8px hsl(328,76%,50%,0.40)",
          }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <MessageCircle size={22} className="text-white" />
            </div>
            <div>
              <p className="font-body text-[10px] uppercase tracking-widest text-white/70 mb-0.5">Cara Tercepat</p>
              <p className="font-display font-bold text-white text-base leading-tight">Chat via WhatsApp</p>
              <p className="font-body text-xs text-white/75 mt-0.5">0812-4947-6778 · Respon cepat</p>
            </div>
          </div>
          <ArrowRight size={20} className="text-white/70 group-hover:translate-x-1 transition-transform shrink-0" />
        </motion.a>

        {/* ── Info grid: Telepon + Jam Buka ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.a
            {...fadeUp(0.05)}
            href="tel:081249476778"
            className="flex items-center gap-4 rounded-2xl px-5 py-4 group transition-all hover:scale-[1.01]"
            style={{ background: "hsl(335,60%,98%)", border: "1px solid hsl(335,60%,90%)" }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg, hsl(328,76%,50%), hsl(345,80%,62%))" }}
            >
              <Phone size={17} className="text-white" />
            </div>
            <div className="min-w-0">
              <p className="font-body text-[9px] uppercase tracking-widest text-muted-foreground mb-0.5">Telepon</p>
              <p className="font-display font-bold text-foreground text-sm">0812-4947-6778</p>
              <p className="font-body text-[10px] text-muted-foreground">Tekan untuk menelepon</p>
            </div>
          </motion.a>

          <motion.div
            {...fadeUp(0.08)}
            className="flex items-center gap-4 rounded-2xl px-5 py-4"
            style={{ background: "hsl(335,60%,98%)", border: "1px solid hsl(335,60%,90%)" }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg, hsl(328,76%,50%), hsl(345,80%,62%))" }}
            >
              <Clock size={17} className="text-white" />
            </div>
            <div>
              <p className="font-body text-[9px] uppercase tracking-widest text-muted-foreground mb-0.5">Jam Operasional</p>
              <p className="font-display font-bold text-foreground text-sm">Senin – Sabtu</p>
              <p className="font-body text-[10px] text-muted-foreground">09:00 – 17:00 WIB</p>
            </div>
          </motion.div>
        </div>

        {/* ── Alamat + Maps ── */}
        <motion.div
          {...fadeUp(0.1)}
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid hsl(335,60%,90%)" }}
        >
          {/* Map embed */}
          <div className="w-full" style={{ height: "200px", background: "hsl(335,30%,96%)" }}>
            <iframe
              title="Lokasi El Massa Tour & Travel"
              src="https://www.google.com/maps?q=Komplek+Ruko+Best+Cinema,+Jln+Gabek+Raya,+Selindung+Baru,+Kec+Gabek,+Pangkal+Pinang&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Address row */}
          <div className="flex items-start gap-4 px-5 py-4" style={{ background: "hsl(335,60%,98%)" }}>
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: "linear-gradient(135deg, hsl(328,76%,50%), hsl(345,80%,62%))" }}
            >
              <MapPin size={17} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body text-[9px] uppercase tracking-widest text-muted-foreground mb-1">Alamat Kantor</p>
              <p className="font-display font-bold text-foreground text-sm leading-snug">
                Komplek Ruko Best Cinema
              </p>
              <p className="font-body text-xs text-muted-foreground mt-0.5 leading-relaxed">
                Jln. Gabek Raya, Selindung Baru, Kec. Gabek, Pangkal Pinang
              </p>
              <a
                href="https://maps.google.com/?q=Komplek+Ruko+Best+Cinema+Jln+Gabek+Raya+Selindung+Baru+Kec+Gabek+Pangkal+Pinang"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2 font-body text-[10px] font-semibold text-primary hover:underline"
              >
                Buka di Google Maps
                <ArrowRight size={10} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── Instagram ── */}
        <motion.a
          {...fadeUp(0.12)}
          href="https://instagram.com/elmassa_tour"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-2xl px-5 py-4 group transition-all hover:scale-[1.01]"
          style={{ background: "hsl(335,60%,98%)", border: "1px solid hsl(335,60%,90%)" }}
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366)" }}
          >
            <Instagram size={17} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="font-body text-[9px] uppercase tracking-widest text-muted-foreground mb-0.5">Instagram</p>
            <p className="font-display font-bold text-foreground text-sm">@elmassa_tour</p>
          </div>
          <ArrowRight size={16} className="text-muted-foreground group-hover:translate-x-1 transition-transform shrink-0" />
        </motion.a>

      </div>
    </main>
  );
};

export default ContactPage;

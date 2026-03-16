import { motion } from "framer-motion";
import { Shield, Heart, Users, Award, MapPin, Phone, Star, CheckCircle2 } from "lucide-react";

const stats = [
  { value: "10+", label: "Tahun Pengalaman" },
  { value: "500+", label: "Jamaah Diberangkatkan" },
  { value: "2", label: "Kota Keberangkatan" },
  { value: "100%", label: "Izin Resmi Kemenag" },
];

const pillars = [
  {
    icon: Shield,
    title: "Legalitas Resmi",
    desc: "Terdaftar resmi di Kementerian Agama RI dengan izin penyelenggaraan perjalanan ibadah umrah yang sah.",
  },
  {
    icon: Heart,
    title: "Pelayanan Sepenuh Hati",
    desc: "Setiap jamaah kami layani seperti keluarga — dari pendaftaran, keberangkatan, hingga kepulangan ke tanah air.",
  },
  {
    icon: Users,
    title: "Tim Berpengalaman",
    desc: "Didukung muthawwif profesional dan tim operasional berpengalaman lebih dari satu dekade di bidang perjalanan umrah.",
  },
  {
    icon: Award,
    title: "Kualitas Terjamin",
    desc: "Hotel bintang 4–5 di Makkah & Madinah, maskapai pilihan, dan fasilitas lengkap untuk kenyamanan ibadah Anda.",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-background pb-20">

      {/* ── Hero ── */}
      <section
        className="relative pt-28 pb-16 px-4 overflow-hidden"
        style={{ background: "linear-gradient(160deg, hsl(25,40%,14%) 0%, hsl(25,38%,20%) 100%)" }}
      >
        {/* Soft glow */}
        <div
          className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, hsl(328,76%,50%,0.18) 0%, transparent 70%)" }}
        />
        <div className="section-container relative text-center">
          <motion.span
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-body font-medium border mb-5"
            style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
            Mengenal El Massa
          </motion.span>
          <motion.h1
            {...fadeUp(0.07)}
            className="font-display font-extrabold text-white leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}
          >
            Biro Umrah Terpercaya<br />
            <span style={{ color: "hsl(345,80%,70%)" }}>dari Pangkal Pinang</span>
          </motion.h1>
          <motion.p
            {...fadeUp(0.14)}
            className="font-body text-sm sm:text-base leading-relaxed max-w-xl mx-auto"
            style={{ color: "rgba(255,230,240,0.80)" }}
          >
            El Massa Tour & Travel hadir untuk membantu Anda menunaikan ibadah umrah dengan nyaman, aman, dan berkesan — didukung pengalaman lebih dari satu dekade.
          </motion.p>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="section-container -mt-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0"
          style={{
            background: "white",
            border: "1px solid hsl(335,60%,90%)",
            boxShadow: "0 8px 40px -8px hsl(328,76%,50%,0.12)",
            divideColor: "hsl(335,60%,92%)",
          }}
        >
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center justify-center py-5 px-3 text-center">
              <p className="font-display font-extrabold text-primary" style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)" }}>
                {s.value}
              </p>
              <p className="font-body text-[10px] sm:text-xs text-muted-foreground mt-0.5 leading-snug">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Profil singkat ── */}
      <section className="section-container mt-14">
        <div className="flex flex-col md:flex-row gap-8 md:gap-14 items-start">
          <motion.div {...fadeUp(0)} className="flex-1">
            <p className="font-body text-[10px] uppercase tracking-widest text-primary font-semibold mb-3">Siapa Kami</p>
            <h2 className="font-display font-extrabold text-foreground leading-tight mb-4" style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)" }}>
              Perjalanan Ibadah yang<br />Lebih dari Sekadar Wisata
            </h2>
            <div className="flex flex-col gap-3 font-body text-sm text-muted-foreground leading-relaxed">
              <p>
                El Massa Tour & Travel berdiri dengan satu tujuan: membantu umat Islam menunaikan ibadah umrah dengan layanan yang tulus, profesional, dan harga yang terjangkau.
              </p>
              <p>
                Kami melayani jamaah dari <strong className="text-foreground">Pangkal Pinang & Jakarta</strong>, dengan program reguler hingga eksklusif yang dapat disesuaikan dengan kebutuhan Anda.
              </p>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="flex-1 flex flex-col gap-2.5">
            {[
              "Program umrah sepanjang tahun",
              "Hotel pilihan dekat Masjidil Haram & Nabawi",
              "Pendampingan muthawwif berpengalaman",
              "Proses administrasi & visa dibantu penuh",
              "Harga transparan tanpa biaya tersembunyi",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                <span className="font-body text-sm text-foreground/80">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Pilar unggulan ── */}
      <section className="section-container mt-14">
        <motion.div {...fadeUp(0)} className="mb-8">
          <p className="font-body text-[10px] uppercase tracking-widest text-primary font-semibold mb-2">Komitmen Kami</p>
          <h2 className="font-display font-extrabold text-foreground leading-tight" style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)" }}>
            Empat Pilar El Massa
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pillars.map((item, i) => (
            <motion.div
              key={item.title}
              {...fadeUp(i * 0.08)}
              className="flex items-start gap-4 rounded-2xl p-5"
              style={{ background: "hsl(335,60%,98%)", border: "1px solid hsl(335,60%,92%)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, hsl(328,76%,50%), hsl(345,80%,62%))" }}
              >
                <item.icon size={18} className="text-white" />
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground text-sm mb-1">{item.title}</h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Visi & Misi ── */}
      <section className="section-container mt-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div
            {...fadeUp(0)}
            className="rounded-2xl px-6 py-7"
            style={{ background: "linear-gradient(135deg, hsl(25,40%,14%), hsl(25,38%,22%))", border: "1px solid hsl(25,30%,28%)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Star size={14} className="text-primary fill-primary" />
              <p className="font-body text-xs font-bold uppercase tracking-widest text-white/60">Visi</p>
            </div>
            <p className="font-display font-bold text-white leading-snug" style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)" }}>
              Menjadi biro umrah terdepan yang mengedepankan kualitas layanan dan nilai-nilai spiritual dalam setiap perjalanan ibadah.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp(0.08)}
            className="rounded-2xl px-6 py-7"
            style={{ background: "hsl(335,60%,98%)", border: "1px solid hsl(335,60%,90%)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 size={14} className="text-primary" />
              <p className="font-body text-xs font-bold uppercase tracking-widest text-primary/60">Misi</p>
            </div>
            <ul className="flex flex-col gap-2">
              {[
                "Memberikan layanan umrah terbaik dan terpercaya",
                "Menghadirkan pengalaman ibadah yang nyaman & berkesan",
                "Membina hubungan jangka panjang dengan jamaah",
              ].map((m, i) => (
                <li key={i} className="flex items-start gap-2 font-body text-sm text-foreground/80 leading-snug">
                  <span className="text-primary mt-0.5 shrink-0 font-bold">{i + 1}.</span>
                  {m}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-container mt-14">
        <motion.div
          {...fadeUp(0)}
          className="rounded-2xl px-6 py-8 text-center"
          style={{
            background: "linear-gradient(135deg, hsl(328,76%,50%), hsl(345,80%,62%))",
            boxShadow: "0 8px 40px -8px hsl(328,76%,50%,0.35)",
          }}
        >
          <h2 className="font-display font-extrabold text-white mb-2" style={{ fontSize: "clamp(1.2rem, 4vw, 1.8rem)" }}>
            Siap Berangkat Umrah Bersama Kami?
          </h2>
          <p className="font-body text-sm text-white/80 mb-6 max-w-md mx-auto leading-relaxed">
            Hubungi kami sekarang untuk konsultasi program umrah yang sesuai dengan kebutuhan dan anggaran Anda.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/6281249476778?text=Assalamualaikum,%20saya%20ingin%20bertanya%20tentang%20paket%20umrah"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-body font-bold text-sm transition-all hover:scale-105 active:scale-95"
              style={{ background: "white", color: "hsl(328,76%,45%)" }}
            >
              <Phone size={14} />
              Hubungi via WhatsApp
            </a>
            <a
              href="/kontak"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-body font-bold text-sm text-white border border-white/30 transition-all hover:bg-white/10 active:scale-95"
            >
              <MapPin size={14} />
              Lihat Lokasi Kantor
            </a>
          </div>
        </motion.div>
      </section>

    </main>
  );
};

export default AboutPage;

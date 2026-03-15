import { motion } from "framer-motion";
import { Shield, Heart, Users, Award } from "lucide-react";

const AboutPage = () => {
  return (
    <main className="pt-20 md:pt-24 pb-16">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">Tentang Kami</h1>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            El Massa Tour & Travel adalah biro perjalanan umrah terpercaya yang berkomitmen menghadirkan pengalaman ibadah terbaik bagi setiap jamaah.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {[
            { icon: Shield, title: "Legalitas Resmi", desc: "Terdaftar di Kementerian Agama RI dengan izin penyelenggaraan umrah yang sah dan terpercaya." },
            { icon: Heart, title: "Pelayanan Sepenuh Hati", desc: "Kami melayani setiap jamaah seperti keluarga sendiri, dari mulai pendaftaran hingga kepulangan." },
            { icon: Users, title: "Tim Berpengalaman", desc: "Didukung oleh muthawwif profesional dan tim operasional yang telah berpengalaman lebih dari 10 tahun." },
            { icon: Award, title: "Kualitas Terjamin", desc: "Hotel bintang 4-5, maskapai terbaik, dan fasilitas premium untuk kenyamanan ibadah Anda." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card"
            >
              <item.icon size={32} className="text-primary mb-4" />
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{item.title}</h3>
              <p className="font-body text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card text-center"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Visi Kami</h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Menjadi biro perjalanan umrah terdepan di Indonesia yang mengedepankan kualitas layanan, kenyamanan jamaah, dan nilai-nilai spiritual dalam setiap perjalanan ibadah.
          </p>
        </motion.div>
      </div>
    </main>
  );
};

export default AboutPage;

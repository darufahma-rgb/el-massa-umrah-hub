import { motion } from "framer-motion";
import { Shield, Award, Plane, Users } from "lucide-react";

const trustItems = [
  { icon: Shield, title: "Izin Resmi Kemenag", desc: "Terdaftar & berizin resmi" },
  { icon: Award, title: "10+ Tahun Pengalaman", desc: "Dipercaya ribuan jamaah" },
  { icon: Plane, title: "Partner Maskapai Resmi", desc: "Saudi Airlines, Garuda, dll" },
  { icon: Users, title: "5000+ Jamaah", desc: "Telah berangkat bersama kami" },
];

const TrustSection = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
            Dipercaya Ribuan Jamaah
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mx-auto">
            El Massa Tour & Travel berkomitmen menghadirkan perjalanan umrah yang aman, nyaman, dan penuh keberkahan.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="trust-badge"
            >
              <item.icon size={32} className="text-primary" />
              <h4 className="font-display text-sm md:text-base font-semibold text-foreground">{item.title}</h4>
              <p className="font-body text-xs text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;

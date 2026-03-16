import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";

const ContactPage = () => {
  const waLink = "https://wa.me/6281249476778?text=Assalamualaikum,%20saya%20ingin%20informasi%20program%20umrah%20El%20Massa";

  return (
    <main className="pt-20 md:pt-24 pb-16">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">Hubungi Kami</h1>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Siap membantu Anda merencanakan perjalanan umrah terbaik. Hubungi kami kapan saja!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[
            { icon: MapPin, title: "Alamat", value: "Komplek Ruko Best Cinema\nJln. Gabek Raya, Selindung Baru\nKec. Gabek, Pangkal Pinang" },
            { icon: Phone, title: "Telepon", value: "081249476778" },
            { icon: Mail, title: "Email", value: "info@elmassa.co.id" },
            { icon: Clock, title: "Jam Operasional", value: "Senin - Sabtu, 09:00 - 17:00 WIB" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <item.icon size={22} />
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="font-body text-sm text-muted-foreground whitespace-pre-line">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-booking text-lg">
            <MessageCircle size={22} />
            Chat via WhatsApp
          </a>
        </motion.div>
      </div>
    </main>
  );
};

export default ContactPage;

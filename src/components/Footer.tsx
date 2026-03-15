import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground/80 mt-20">
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-display text-2xl font-bold text-primary-foreground mb-3">El Massa</h3>
            <p className="text-sm font-body leading-relaxed text-primary-foreground/60">
              Tour & Travel terpercaya untuk perjalanan umrah Anda. Melayani dengan hati, membimbing dengan ilmu.
            </p>
          </div>
          <div>
            <h4 className="font-display text-lg font-semibold text-primary-foreground mb-4">Menu</h4>
            <div className="flex flex-col gap-2 font-body text-sm">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <Link to="/tentang" className="hover:text-primary transition-colors">Tentang Kami</Link>
              <Link to="/kontak" className="hover:text-primary transition-colors">Kontak</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display text-lg font-semibold text-primary-foreground mb-4">Kontak</h4>
            <div className="flex flex-col gap-2 font-body text-sm text-primary-foreground/60">
              <p>📍 Jl. Sudirman No. 123, Jakarta</p>
              <p>📞 +62 812-3456-7890</p>
              <p>✉️ info@elmassa.co.id</p>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center font-body text-xs text-primary-foreground/40">
          © 2026 El Massa Tour & Travel. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

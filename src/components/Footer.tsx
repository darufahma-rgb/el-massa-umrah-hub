import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{ background: "linear-gradient(135deg, hsl(340, 80%, 58%) 0%, hsl(328, 76%, 50%) 50%, hsl(315, 72%, 44%) 100%)" }}>
      <div className="section-container py-8 sm:py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">El Massa</h3>
            <p className="text-xs sm:text-sm font-body leading-relaxed text-white/80">
              Tour & Travel terpercaya untuk perjalanan umrah Anda. Melayani dengan hati, membimbing dengan ilmu.
            </p>
          </div>
          <div>
            <h4 className="font-display text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Menu</h4>
            <div className="flex flex-col gap-1.5 sm:gap-2 font-body text-xs sm:text-sm text-white/80">
              <Link to="/" className="hover:text-white transition-colors py-0.5">Home</Link>
              <Link to="/tentang" className="hover:text-white transition-colors py-0.5">Tentang Kami</Link>
              <Link to="/kontak" className="hover:text-white transition-colors py-0.5">Kontak</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Kontak</h4>
            <div className="flex flex-col gap-1.5 sm:gap-2 font-body text-xs sm:text-sm text-white/80">
              <p>📍 Jl. Sudirman No. 123, Jakarta</p>
              <p>📞 +62 812-3456-7890</p>
              <p>✉️ info@elmassa.co.id</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-6 text-center font-body text-[10px] sm:text-xs text-white/60">
          © 2026 El Massa Tour & Travel. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

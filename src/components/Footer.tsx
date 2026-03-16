import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{ background: "hsl(25, 40%, 18%)" }}>
      <div className="section-container py-4 sm:py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">

          <span className="font-display font-bold text-white text-sm sm:text-base tracking-tight">
            El Massa Tour & Travel
          </span>

          <div className="flex items-center gap-4 sm:gap-6 font-body text-xs text-white/80">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/update-seat" className="hover:text-white transition-colors">Update Seat</Link>
            <Link to="/tentang" className="hover:text-white transition-colors">Tentang</Link>
            <Link to="/kontak" className="hover:text-white transition-colors">Kontak</Link>
          </div>

          <p className="font-body text-[10px] text-white/55">
            © 2026 El Massa. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;

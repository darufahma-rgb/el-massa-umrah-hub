import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Program Umrah", path: "/#programs" },
  { label: "Tentang Kami", path: "/tentang" },
  { label: "Kontak", path: "/kontak" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleNavClick = (path: string) => {
    setIsOpen(false);
    if (path.includes("#programs")) {
      if (location.pathname === "/") {
        setTimeout(() => {
          document.getElementById("programs")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="section-container flex items-center justify-between h-14 md:h-16 lg:h-20">
        <Link to="/" className="flex items-center gap-1.5 min-w-0">
          <span className="font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground tracking-tight whitespace-nowrap">
            El Massa
          </span>
          <span className="hidden sm:inline text-[10px] md:text-xs font-body text-muted-foreground tracking-widest uppercase">
            Tour & Travel
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path.includes("#") ? "/" : item.path}
              onClick={() => handleNavClick(item.path)}
              className="font-body text-sm font-medium text-foreground/70 hover:text-primary transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://wa.me/6281234567890?text=Assalamualaikum,%20saya%20ingin%20booking%20program%20umrah"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-booking !px-5 !py-2 text-sm"
          >
            Booking Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 -mr-2 text-foreground"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="section-container py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path.includes("#") ? "/" : item.path}
                  onClick={() => handleNavClick(item.path)}
                  className="font-body text-base font-medium text-foreground/70 hover:text-primary active:text-primary py-3 px-2 rounded-xl transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="https://wa.me/6281234567890?text=Assalamualaikum,%20saya%20ingin%20booking%20program%20umrah"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-booking text-center mt-3"
              >
                Booking Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

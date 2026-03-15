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
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled || isOpen
          ? "hsl(var(--background) / 0.96)"
          : "transparent",
        backdropFilter: scrolled || isOpen ? "blur(16px)" : "none",
        borderBottom: scrolled || isOpen ? "1px solid hsl(var(--border))" : "1px solid transparent",
      }}
    >
      <div className="section-container flex items-center justify-between h-14 md:h-16">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 min-w-0">
          <span className="font-display text-xl md:text-2xl font-extrabold text-foreground tracking-tight whitespace-nowrap">
            El Massa
            <span className="text-primary">.</span>
          </span>
        </Link>

        {/* Desktop Nav — centered */}
        <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path.includes("#") ? "/" : item.path}
              onClick={() => handleNavClick(item.path)}
              className="font-body text-sm font-medium text-foreground/60 hover:text-foreground transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <a
            href="https://wa.me/6281249476778?text=Assalamualaikum,%20saya%20ingin%20booking%20program%20umrah"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-booking !py-2 !px-5 text-sm"
          >
            Booking Now
          </a>
        </div>

        {/* Mobile hamburger */}
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
            className="lg:hidden border-t border-border overflow-hidden bg-background/98"
          >
            <div className="section-container py-5 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path.includes("#") ? "/" : item.path}
                  onClick={() => handleNavClick(item.path)}
                  className="font-body text-base font-medium text-foreground/70 hover:text-primary py-3 px-2 rounded-xl transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="https://wa.me/6281249476778?text=Assalamualaikum,%20saya%20ingin%20booking%20program%20umrah"
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

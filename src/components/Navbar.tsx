import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Program Umrah", path: "/#programs" },
  { label: "Update Seat", path: "/update-seat" },
  { label: "Tentang Kami", path: "/tentang" },
  { label: "Kontak", path: "/kontak" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

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
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 navbar-glass"
      >
        {/* Thin gradient accent line at very top — desktop only */}
        <div
          className="hidden lg:block absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent 0%, hsl(328,76%,50%) 40%, hsl(345,80%,65%) 60%, transparent 100%)",
          }}
        />

        <div className="section-container flex items-center justify-between h-15 md:h-17" style={{ height: "3.75rem" }}>

          {/* Logo */}
          <Link to="/" className="flex items-center min-w-0 relative z-50 group">
            <img
              src="/logo-white.png"
              alt="El Massa Tour & Travel"
              className="h-9 md:h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav — centered with pill active indicator */}
          <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => {
              const isActive = item.path === "/" && location.pathname === "/";
              return (
                <Link
                  key={item.path}
                  to={item.path.includes("#") ? "/" : item.path}
                  onClick={() => handleNavClick(item.path)}
                  className="relative px-4 py-1.5 font-body text-sm font-medium transition-colors duration-200 rounded-full whitespace-nowrap"
                  style={{
                    color: isActive
                      ? "hsl(328, 76%, 50%)"
                      : "rgba(255,255,255,0.75)",
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: "rgba(225,29,130,0.12)", border: "1px solid rgba(225,29,130,0.25)" }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <a
              href="https://wa.me/6281249476778?text=Assalamualaikum,%20saya%20ingin%20booking%20program%20umrah"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body font-semibold text-sm text-white px-5 py-2 rounded-full transition-all duration-200 hover:opacity-90 hover:-translate-y-px active:scale-95"
              style={{
                background: "linear-gradient(135deg, hsl(328,76%,50%), hsl(345,80%,65%))",
                boxShadow: "0 2px 16px hsl(328,76%,50%,0.35)",
              }}
            >
              Booking Now
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 -mr-1.5 relative z-50 rounded-lg transition-colors text-white"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Full-screen Mobile Menu — slides from right */}
      <AnimatePresence>
        {isOpen && (
          <>

            {/* Full-screen panel */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
              className="lg:hidden fixed inset-0 z-40 flex flex-col"
              style={{ background: "hsl(25, 40%, 18%)" }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: "linear-gradient(90deg, transparent, hsl(328,76%,50%), hsl(345,80%,65%))" }}
              />

              {/* Close button */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4">
                <img src="/logo-white.png" alt="El Massa" className="h-8 object-contain opacity-80" />
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-full text-white/70 hover:text-white transition-colors"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                  aria-label="Tutup menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col flex-1 px-6 pb-10 overflow-y-auto">
                {/* Nav links */}
                <nav className="flex flex-col mt-6 flex-1">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 + i * 0.06, duration: 0.28, ease: "easeOut" }}
                    >
                      <Link
                        to={item.path.includes("#") ? "/" : item.path}
                        onClick={() => handleNavClick(item.path)}
                        className="font-display text-3xl font-bold text-white/80 hover:text-white py-4 block transition-colors border-b"
                        style={{ borderColor: "rgba(255,255,255,0.08)" }}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Bottom CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38, duration: 0.3 }}
                  className="flex flex-col gap-3 mt-10"
                >
                  <a
                    href="https://wa.me/6281249476778?text=Assalamualaikum,%20saya%20ingin%20booking%20program%20umrah"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 font-body font-bold text-sm text-white px-5 py-3.5 rounded-full transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, hsl(328,76%,50%), hsl(345,80%,65%))", boxShadow: "0 4px 20px hsl(328,76%,50%,0.35)" }}
                    onClick={() => setIsOpen(false)}
                  >
                    <Phone size={15} />
                    Hubungi & Booking
                  </a>
                  <p className="font-body text-[10px] text-white/30 text-center">
                    El Massa Tour & Travel · 2026
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

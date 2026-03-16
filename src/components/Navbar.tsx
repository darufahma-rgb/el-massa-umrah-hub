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
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "rgba(15, 8, 28, 0.38)",
          backdropFilter: "blur(24px) saturate(160%)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.10)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
        }}
      >
        {/* Thin gradient accent line at very top */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent 0%, hsl(328,76%,50%) 40%, hsl(315,72%,44%) 60%, transparent 100%)",
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
                background: "linear-gradient(135deg, hsl(328,76%,50%), hsl(315,72%,44%))",
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
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden fixed inset-0 z-30"
              style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
              className="lg:hidden fixed top-0 right-0 bottom-0 z-40 w-72 flex flex-col"
              style={{
                background: "rgba(10, 5, 18, 0.96)",
                backdropFilter: "blur(24px)",
                borderLeft: "1px solid rgba(225,29,130,0.18)",
              }}
            >
              {/* Gradient accent line at top */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: "linear-gradient(90deg, transparent, hsl(328,76%,50%), hsl(315,72%,44%))" }}
              />

              <div className="flex flex-col h-full pt-20 pb-8 px-7">

                {/* Nav links */}
                <nav className="flex flex-col gap-0.5 flex-1">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 32 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 + i * 0.07, duration: 0.32, ease: "easeOut" }}
                    >
                      <Link
                        to={item.path.includes("#") ? "/" : item.path}
                        onClick={() => handleNavClick(item.path)}
                        className="font-display text-2xl font-bold text-white/75 hover:text-white py-3 block transition-colors"
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
                  transition={{ delay: 0.32, duration: 0.32 }}
                  className="flex flex-col gap-3"
                >
                  <a
                    href="https://wa.me/6281249476778?text=Assalamualaikum,%20saya%20ingin%20booking%20program%20umrah"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 font-body font-bold text-sm text-white px-5 py-3 rounded-full transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, hsl(328,76%,50%), hsl(315,72%,44%))", boxShadow: "0 4px 20px hsl(328,76%,50%,0.35)" }}
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

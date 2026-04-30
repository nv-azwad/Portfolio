import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = ["Home", "About", "Projects", "Skills", "Contact"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const userClickedAt = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active link follows scroll position via IntersectionObserver.
  // We track the section whose center is closest to the viewport's center.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.toLowerCase()))
      .filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    let raf = 0;
    const update = () => {
      // Suppress scroll-driven updates for ~700ms after user clicks a link
      // so the smooth-scroll lands on the intended section without flicker.
      if (Date.now() - userClickedAt.current < 700) return;

      const center = window.innerHeight / 2;
      let bestId = sections[0].id;
      let bestDist = Infinity;
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        const sc = r.top + r.height / 2;
        const d = Math.abs(sc - center);
        if (d < bestDist) {
          bestDist = d;
          bestId = s.id;
        }
      }
      const matched = navLinks.find((l) => l.toLowerCase() === bestId);
      if (matched) setActiveLink(matched);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) {
      userClickedAt.current = Date.now();
      el.scrollIntoView({ behavior: "smooth" });
      setActiveLink(id);
      setMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
      style={{
        // True frosted glass — minimal bg tint so the navbar inherits whatever
        // section is currently behind it (violet, warm, mint, etc).
        background: scrolled ? "rgba(10,10,36,0.22)" : "rgba(10,10,36,0)",
        backdropFilter: scrolled ? "blur(28px) saturate(1.4)" : "blur(0px)",
        WebkitBackdropFilter: scrolled ? "blur(28px) saturate(1.4)" : "blur(0px)",
        borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0)"}`,
        transition:
          "background 300ms ease, backdrop-filter 300ms ease, -webkit-backdrop-filter 300ms ease, border-color 300ms ease",
      }}
    >
      {/* Logo slot (intentionally empty — keeps flex spacing) */}
      <div aria-hidden style={{ width: 1 }} />

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8 relative">
        {navLinks.map((link) => {
          const isActive = activeLink === link;
          return (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="nav-link relative"
              data-active={isActive}
              data-cursor={link}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "0.78rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: isActive ? "#ffffff" : "rgba(255,255,255,0.38)",
                transition: "color 0.25s var(--ease-out)",
                background: "none",
                border: "none",
                padding: "4px 0",
                position: "relative",
              }}
            >
              {link}
              {isActive && (
                <motion.div
                  layoutId="navUnderline"
                  className="absolute -bottom-1 left-0 right-0"
                  style={{
                    height: 1,
                    background: "var(--grad-main)",
                    borderRadius: 9999,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* CTA Button */}
      <motion.button
        className="hidden md:block relative overflow-hidden"
        style={{
          padding: "9px 20px",
          borderRadius: 10,
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "0.78rem",
          letterSpacing: "0.04em",
          color: "#fff",
          background: "var(--grad-main)",
          border: "1px solid rgba(124,58,237,0.45)",
        }}
        whileHover={{
          y: -2,
          boxShadow: "0 0 28px rgba(124,58,237,0.6)",
        }}
        whileTap={{ scale: 0.96 }}
        onClick={() => scrollTo("Contact")}
        data-cursor="Let's Talk"
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--grad-shine)" }}
          initial={{ x: "-120%" }}
          whileHover={{ x: "120%" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        />
        <span className="relative z-10">Let's Talk</span>
      </motion.button>

      {/* Mobile menu button */}
      <button
        className="md:hidden text-white p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <div className="space-y-1.5">
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-white"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 bg-white"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-white"
          />
        </div>
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 md:hidden p-6 space-y-4"
            style={{
              background: "rgba(10,10,36,0.95)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => scrollTo(link)}
                className="block w-full text-left py-2"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  color: activeLink === link ? "#fff" : "rgba(255,255,255,0.55)",
                }}
              >
                {link}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-link:hover { color: #ffffff !important; }
      `}</style>
    </motion.nav>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = ["Home", "About", "Projects", "Skills", "Contact"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveLink(id);
      setMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,10,26,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(139,92,246,0.15)" : "none",
      }}
    >
      {/* Logo */}
      <motion.div
        className="relative cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => scrollTo("home")}
      >
        <span
          className="text-xl font-black tracking-wider"
          style={{
            background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          AN
        </span>
        <motion.div
          className="absolute -inset-2 rounded-lg -z-10"
          style={{ background: "rgba(139,92,246,0.1)" }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      </motion.div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <motion.button
            key={link}
            onClick={() => scrollTo(link)}
            className="relative text-sm tracking-wide"
            style={{
              color: activeLink === link ? "#8b5cf6" : "rgba(255,255,255,0.7)",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = activeLink === link ? "#8b5cf6" : "rgba(255,255,255,0.7)"; }}
          >
            {link}
            <motion.div
              className="absolute -bottom-1 left-0 h-px rounded-full"
              style={{ background: "linear-gradient(90deg, #8b5cf6, #3b82f6)" }}
              initial={{ scaleX: activeLink === link ? 1 : 0 }}
              animate={{ scaleX: activeLink === link ? 1 : 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
            {activeLink === link && (
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-px rounded-full"
                style={{ background: "linear-gradient(90deg, #8b5cf6, #3b82f6)" }}
                layoutId="activeIndicator"
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* CTA Button */}
      <motion.button
        className="hidden md:block relative px-5 py-2 rounded-lg text-sm font-medium overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
          border: "1px solid rgba(139,92,246,0.5)",
          color: "#fff",
        }}
        whileHover={{ scale: 1.06, boxShadow: "0 0 24px rgba(139,92,246,0.5)" }}
        whileTap={{ scale: 0.93 }}
        onClick={() => scrollTo("Contact")}
        data-cursor="Let's Talk"
      >
        <motion.div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        />
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%)" }}
          initial={{ x: "-120%" }}
          whileHover={{ x: "120%" }}
          transition={{ duration: 0.45 }}
        />
        <span className="relative z-10">Let's Talk</span>
      </motion.button>

      {/* Mobile menu button */}
      <button
        className="md:hidden text-white p-2"
        onClick={() => setMenuOpen(!menuOpen)}
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
              background: "rgba(10,10,26,0.95)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(139,92,246,0.2)",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => scrollTo(link)}
                className="block w-full text-left py-2 text-white hover:text-purple-400 transition-colors"
              >
                {link}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

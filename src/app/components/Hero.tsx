import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useState, useEffect, useRef, ReactNode } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const roles = [
  "Cybersecurity Enthusiast",
  "Full Stack Developer",
  "Security Researcher",
  "Problem Solver",
];

function TypewriterText() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < role.length) {
      timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 70);
    } else if (!deleting && displayed.length === role.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, currentRole]);

  return (
    <span style={{ background: "linear-gradient(135deg, #60a5fa, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        style={{ WebkitTextFillColor: "#a78bfa", color: "#a78bfa" }}
      >|</motion.span>
    </span>
  );
}

function MagneticButton({ children, primary, onClick }: { children: ReactNode; primary?: boolean; onClick?: () => void }) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.3);
    y.set((e.clientY - cy) * 0.3);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.button
      ref={btnRef}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{
        x: sx,
        y: sy,
        ...(primary
          ? { background: "linear-gradient(135deg, #7c3aed, #6d28d9)", color: "#fff", border: "1px solid rgba(139,92,246,0.5)" }
          : { background: "rgba(255,255,255,0.05)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)" }),
      }}
      className="relative px-6 py-3 rounded-xl text-sm font-medium overflow-hidden"
      whileTap={{ scale: 0.93 }}
      data-cursor={primary ? "Let's Talk" : "Projects"}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: primary ? "linear-gradient(135deg, #8b5cf6, #3b82f6)" : "rgba(255,255,255,0.06)" }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: hovered ? ["200% 0", "-50% 0"] : "200% 0" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      <span className="relative z-10">{children}</span>
      {hovered && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{ boxShadow: primary ? "0 0 30px rgba(139,92,246,0.6), 0 0 60px rgba(139,92,246,0.25)" : "0 0 20px rgba(255,255,255,0.08)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.button>
  );
}

const socialLinks = [
  {
    icon: <Github className="w-[18px] h-[18px]" />,
    label: "GitHub",
    href: "https://github.com/nv-azwad",
  },
  {
    icon: <Linkedin className="w-[18px] h-[18px]" />,
    label: "LinkedIn",
    href: "https://linkedin.com/in/azwad-jilani/",
  },
  {
    icon: <Mail className="w-[18px] h-[18px]" />,
    label: "Email",
    href: "mailto:jilaniazwad@gmail.com",
  },
];

function SocialIcon({ link, delay }: { link: { icon: ReactNode; label: string; href: string }; delay: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={link.href}
      target={link.href.startsWith("mailto:") ? undefined : "_blank"}
      rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
      title={link.label}
      className="relative flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: `1px solid ${hovered ? "rgba(139,92,246,0.55)" : "rgba(255,255,255,0.1)"}`,
        color: hovered ? "#c084fc" : "rgba(255,255,255,0.5)",
        transition: "border 0.2s, color 0.2s",
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.18, y: -2 }}
      whileTap={{ scale: 0.9 }}
      data-cursor={link.label}
    >
      <motion.div
        className="absolute inset-0"
        style={{ background: "rgba(139,92,246,0.12)" }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      {hovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)" }}
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 0.4 }}
        />
      )}
      <span className="relative z-10">{link.icon}</span>
    </motion.a>
  );
}

function ConicBorderFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative p-[2px] rounded-3xl overflow-hidden">
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{ background: "conic-gradient(from 0deg, #8b5cf6, #3b82f6, #a855f7, #60a5fa, #8b5cf6)" }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <div className="relative rounded-3xl overflow-hidden" style={{ background: "#0d0d2b" }}>
        {children}
      </div>
    </div>
  );
}

function FloatingChip({ children, bottom, top, left, right, border, floatDir, delay }: {
  children: ReactNode; bottom?: string; top?: string; left?: string; right?: string;
  border: string; floatDir: number; delay: number;
}) {
  return (
    <motion.div
      className="absolute px-4 py-2 rounded-xl text-xs"
      style={{
        bottom, top, left, right,
        background: "rgba(10,10,26,0.92)",
        border: `1px solid ${border}`,
        backdropFilter: "blur(12px)",
        color: "rgba(255,255,255,0.75)",
        boxShadow: `0 4px 20px rgba(0,0,0,0.3)`,
      }}
      animate={{ y: [0, floatDir, 0] }}
      transition={{ duration: 3 + delay, repeat: Infinity, ease: "easeInOut", delay }}
      whileHover={{ scale: 1.08, boxShadow: `0 0 18px ${border}` }}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const orb1X = useSpring(useTransform(mouseX, [-1, 1], [-30, 30]), { stiffness: 40, damping: 20 });
  const orb1Y = useSpring(useTransform(mouseY, [-1, 1], [-20, 20]), { stiffness: 40, damping: 20 });
  const orb2X = useSpring(useTransform(mouseX, [-1, 1], [20, -20]), { stiffness: 30, damping: 20 });
  const orb2Y = useSpring(useTransform(mouseY, [-1, 1], [30, -30]), { stiffness: 30, damping: 20 });
  const orb3X = useSpring(useTransform(mouseX, [-1, 1], [-15, 15]), { stiffness: 50, damping: 25 });
  const orb3Y = useSpring(useTransform(mouseY, [-1, 1], [10, -10]), { stiffness: 50, damping: 25 });

  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(nx);
    mouseY.set(ny);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const handleSectionMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
    handleMouseMove(e);
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #06061a 0%, #0d0d2b 40%, #1a0a2e 70%, #2d1654 100%)" }}
      onMouseMove={handleSectionMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Interactive mouse spotlight */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(500px circle at ${spotlight.x}% ${spotlight.y}%, rgba(139,92,246,0.07) 0%, transparent 70%)`,
          transition: "background 0.1s ease",
        }}
      />

      {/* Parallax orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 600, height: 600,
            background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)",
            top: "-20%", left: "-10%", filter: "blur(60px)",
            x: orb1X, y: orb1Y,
          }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 500, height: 500,
            background: "radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 70%)",
            bottom: "-10%", right: "-5%", filter: "blur(60px)",
            x: orb2X, y: orb2Y,
          }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 300, height: 300,
            background: "radial-gradient(circle, rgba(168,85,247,0.14) 0%, transparent 70%)",
            bottom: "20%", left: "30%", filter: "blur(40px)",
            x: orb3X, y: orb3Y,
          }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-12 flex flex-col lg:flex-row items-center gap-16">
        {/* Left content */}
        <div className="flex-1 space-y-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)" }}
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="rgba(139,92,246,0.9)">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
              </svg>
            </motion.div>
            <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(139,92,246,0.9)" }}>
              Welcome to my Portfolio
            </span>
          </motion.div>

          {/* Name */}
          <div>
            <motion.h1
              className="font-black leading-tight text-white"
              style={{ fontSize: "clamp(2.8rem,7vw,4.5rem)" }}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              I'm
            </motion.h1>
            <motion.h1
              className="font-black leading-tight"
              style={{
                fontSize: "clamp(2.8rem,7vw,4.5rem)",
                background: "linear-gradient(135deg, #60a5fa, #a78bfa, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 30px rgba(139,92,246,0.4))",
              }}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              Azwad
            </motion.h1>
          </div>

          {/* Typewriter role */}
          <motion.div
            className="flex items-center gap-2 text-xl"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(139,92,246,0.7)" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span style={{ color: "rgba(255,255,255,0.8)" }}>
              <TypewriterText />
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p
            style={{ color: "rgba(255,255,255,0.58)" }}
            className="max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            Passionate about safeguarding digital assets and building secure,
            modern applications. Specializing in cybersecurity, ethical hacking,
            and full-stack development with JavaScript &amp; TypeScript.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            <MagneticButton primary onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              Get In Touch →
            </MagneticButton>
            <MagneticButton onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
              View My Work
            </MagneticButton>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.0 }}
          >
            {socialLinks.map((link, i) => (
              <SocialIcon key={link.label} link={link} delay={i * 0.06} />
            ))}
          </motion.div>
        </div>

        {/* Right — Photo */}
        <motion.div
          className="relative flex-shrink-0 hidden lg:block"
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
        >
          {/* Pulsing glow */}
          <motion.div
            className="absolute inset-0 rounded-3xl -z-10"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)", filter: "blur(50px)", transform: "scale(1.3)" }}
            animate={{ scale: [1.2, 1.4, 1.2], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Animated conic-gradient border */}
          <ConicBorderFrame>
            <motion.div
              className="relative overflow-hidden rounded-3xl"
              style={{ width: 320, height: 400 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.35 }}
            >
              <img
                src="/assets/profile/azwad-profile.jpg"
                alt="Azwad Jilani"
                className="w-full h-full object-cover object-top scale-125"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,13,43,0.55) 0%, transparent 60%)" }} />
            </motion.div>
          </ConicBorderFrame>

          {/* Floating chips */}
          <FloatingChip bottom="-16px" left="-24px" border="rgba(139,92,246,0.5)" floatDir={-8} delay={0}>
            🛡️ Cybersecurity
          </FloatingChip>
          <FloatingChip top="-16px" right="-24px" border="rgba(59,130,246,0.5)" floatDir={8} delay={0.5}>
            💻 Full Stack Dev
          </FloatingChip>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.28)" }}>Scroll</span>
        <motion.div
          className="w-px h-8 rounded-full"
          style={{ background: "linear-gradient(to bottom, rgba(139,92,246,0.6), transparent)" }}
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}

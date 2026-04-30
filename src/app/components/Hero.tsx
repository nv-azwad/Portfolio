import { useState, useEffect, useRef, ReactNode } from "react";
import { Github, Linkedin, Mail, Shield } from "lucide-react";
import { ParticleCanvas } from "./ParticleCanvas";
import { useCopyEmail } from "./useCopyEmail";

const HERO_SOCIAL_STYLE: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.10)",
  color: "rgba(255,255,255,0.55)",
  transition: "all 0.25s var(--ease-spring)",
  position: "relative",
};

function CopiedTooltip({ visible, label = "Copied!" }: { visible: boolean; label?: string }) {
  return (
    <span
      aria-hidden={!visible}
      style={{
        position: "absolute",
        bottom: "calc(100% + 8px)",
        left: "50%",
        padding: "5px 10px",
        borderRadius: 8,
        fontFamily: "var(--font-display)",
        fontSize: "0.62rem",
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "#c4b5fd",
        background: "rgba(10,10,36,0.95)",
        border: "1px solid rgba(139,92,246,0.5)",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
        opacity: visible ? 1 : 0,
        transform: `translateX(-50%) translateY(${visible ? 0 : 6}px) scale(${visible ? 1 : 0.85})`,
        transition: "opacity 0.22s var(--ease-out), transform 0.22s var(--ease-out)",
      }}
    >
      {label}
    </span>
  );
}

function SocialIconLink({ link }: { link: (typeof socialLinks)[number] }) {
  const isMail = link.href.startsWith("mailto:");
  const email = isMail ? link.href.replace("mailto:", "") : "";
  const { copied, copy } = useCopyEmail(email);

  if (isMail) {
    return (
      <button
        type="button"
        onClick={copy}
        title={copied ? "Email copied!" : "Copy email"}
        data-cursor={copied ? "Copied!" : link.label}
        className="social-icon"
        style={HERO_SOCIAL_STYLE}
      >
        {link.icon}
        <CopiedTooltip visible={copied} />
      </button>
    );
  }

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      title={link.label}
      data-cursor={link.label}
      className="social-icon"
      style={HERO_SOCIAL_STYLE}
    >
      {link.icon}
    </a>
  );
}

const roles = [
  "Cybersecurity Enthusiast",
  "Full Stack Developer",
  "Automation Specialist",
  "AI Engineer",
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
      timeout = setTimeout(
        () => setDisplayed(role.slice(0, displayed.length + 1)),
        70
      );
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
    <span
      style={{
        background: "var(--grad-text)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {displayed}
      <span
        style={{
          color: "#8b5cf6",
          WebkitTextFillColor: "#8b5cf6",
          display: "inline-block",
          marginLeft: 2,
          animation: "blink 0.9s infinite",
        }}
      >
        |
      </span>
    </span>
  );
}

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";

function pickSameCase(target: string): string {
  if (target === " ") return " ";
  const isUpper = target === target.toUpperCase() && target !== target.toLowerCase();
  const pool = isUpper ? UPPER : LOWER;
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * RefractiveName — the hero name treatment.
 *
 * Combines three layered effects:
 *   1. Scramble-on-first-hover (one-shot letter resolve from random → real)
 *   2. Per-letter cursor-proximity 3D tilt + lift + scale (continuous while hovered)
 *   3. A radial "flashlight" that follows the cursor under the letters
 *      using mix-blend-mode: plus-lighter for additive illumination
 *
 * All motion uses transform/opacity so it stays compositor-friendly.
 */
function RefractiveName({ text }: { text: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const lightRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);
  const startedAt = useRef<number>(0);
  const isScrambling = useRef<boolean>(false);
  const isHovering = useRef<boolean>(false);

  const resolveTimes = useRef<number[]>([]);

  useEffect(() => {
    const len = text.length;
    const total = 720;
    resolveTimes.current = Array.from({ length: len }, (_, i) => {
      const t = i / Math.max(1, len - 1);
      const eased = 1 - Math.pow(1 - t, 3);
      return eased * total;
    });
  }, [text]);

  const stopScramble = () => {
    cancelAnimationFrame(rafRef.current);
    isScrambling.current = false;
    text.split("").forEach((ch, i) => {
      const el = charsRef.current[i];
      if (el) el.textContent = ch;
    });
  };

  const startScramble = () => {
    if (isScrambling.current) return;
    isScrambling.current = true;
    startedAt.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startedAt.current;
      let allDone = true;

      text.split("").forEach((ch, i) => {
        const el = charsRef.current[i];
        if (!el) return;
        const dueAt = resolveTimes.current[i] ?? 0;
        if (elapsed >= dueAt) {
          el.textContent = ch;
        } else {
          allDone = false;
          el.textContent = pickSameCase(ch);
        }
      });

      if (!allDone && isScrambling.current) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        stopScramble();
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  const handleEnter = () => {
    isHovering.current = true;
    startScramble();
    if (lightRef.current) lightRef.current.style.opacity = "1";
  };

  const handleMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!isHovering.current) return;
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();

    // Move the flashlight to cursor position (relative to container)
    const light = lightRef.current;
    if (light) {
      const lx = e.clientX - containerRect.left;
      const ly = e.clientY - containerRect.top;
      light.style.transform = `translate(${lx - 110}px, ${ly - 110}px)`;
    }

    // Per-letter proximity tilt + lift + scale
    const RADIUS = 180;
    charsRef.current.forEach((el) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const factor = Math.max(0, 1 - dist / RADIUS);

      const rotateY = (dx / RADIUS) * 18 * factor;
      const rotateX = -(dy / RADIUS) * 12 * factor;
      const translateY = -factor * 7;
      const scale = 1 + factor * 0.05;

      el.style.transform = `translateY(${translateY.toFixed(2)}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
    });
  };

  const handleLeave = () => {
    isHovering.current = false;
    if (lightRef.current) lightRef.current.style.opacity = "0";
    charsRef.current.forEach((el) => {
      if (el) el.style.transform = "";
    });
  };

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const letterStyle: React.CSSProperties = {
    display: "inline-block",
    background: "var(--grad-text)",
    backgroundSize: "200% 100%",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    color: "transparent",
    transition:
      "transform 0.32s cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "transform",
    transformStyle: "preserve-3d",
  };

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        animation: "shimmer-pos 4s linear infinite",
        filter: "drop-shadow(0 0 30px rgba(124,58,237,0.4))",
        cursor: "pointer",
        display: "inline-block",
        position: "relative",
        perspective: "900px",
      }}
    >
      {/* Cursor-following flashlight — additive blend lights up letters near cursor */}
      <span
        ref={lightRef}
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(167,139,250,0.55) 0%, rgba(103,232,249,0.25) 35%, transparent 70%)",
          filter: "blur(8px)",
          mixBlendMode: "plus-lighter",
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity 0.4s var(--ease-out)",
          willChange: "transform, opacity",
          zIndex: 0,
        }}
      />
      <span style={{ position: "relative", zIndex: 1, display: "inline-block" }}>
        {text.split("").map((ch, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) charsRef.current[i] = el;
            }}
            style={letterStyle}
          >
            {ch}
          </span>
        ))}
      </span>
    </span>
  );
}

function MagneticButton({
  children,
  primary,
  onClick,
  delayMs = 0,
}: {
  children: ReactNode;
  primary?: boolean;
  onClick?: () => void;
  delayMs?: number;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>(
    []
  );

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${dx * 0.35}px, ${dy * 0.35}px)`;
  };
  const handleLeave = () => {
    const el = btnRef.current;
    if (el) {
      el.style.transition = "transform 0.5s var(--ease-spring)";
      el.style.transform = "translate(0, 0)";
      setTimeout(() => {
        if (el) el.style.transition = "transform 0.05s linear";
      }, 500);
    }
    setHovered(false);
  };
  const handleEnter = () => {
    const el = btnRef.current;
    if (el) el.style.transition = "transform 0.05s linear";
    setHovered(true);
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = btnRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const id = Date.now();
      setRipples((p) => [
        ...p,
        { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
      ]);
      setTimeout(
        () => setRipples((p) => p.filter((r) => r.id !== id)),
        650
      );
    }
    onClick?.();
  };

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      className="hero-entry hero-entry-fadeup relative overflow-hidden"
      style={{
        animationDelay: `${delayMs}ms`,
        padding: "13px 28px",
        borderRadius: 12,
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: "0.88rem",
        letterSpacing: "0.02em",
        color: "#ffffff",
        background: primary ? "var(--grad-main)" : "rgba(255,255,255,0.05)",
        border: primary
          ? "1px solid rgba(124,58,237,0.45)"
          : "1px solid rgba(255,255,255,0.12)",
        boxShadow: hovered
          ? primary
            ? "0 0 32px rgba(124,58,237,0.65), 0 8px 22px rgba(0,0,0,0.3)"
            : "0 6px 18px rgba(0,0,0,0.3)"
          : "none",
        cursor: "pointer",
        willChange: "transform",
      }}
      data-cursor={primary ? "Let's Talk" : "Projects"}
    >
      {/* shine sweep */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--grad-shine)",
          backgroundSize: "200% 100%",
          backgroundPosition: hovered ? "-50% 0" : "200% 0",
          transition: "background-position 0.55s var(--ease-out)",
          pointerEvents: "none",
        }}
      />
      {/* ripples */}
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden
          style={{
            position: "absolute",
            left: r.x,
            top: r.y,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.35)",
            transform: "translate(-50%,-50%) scale(0)",
            animation: "ripple-out 0.6s var(--ease-out) forwards",
            pointerEvents: "none",
          }}
        />
      ))}
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
      <style>{`
        @keyframes ripple-out {
          to {
            transform: translate(-50%,-50%) scale(20);
            opacity: 0;
          }
          from {
            opacity: 0.45;
          }
        }
      `}</style>
    </button>
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

function FloatingCard({
  label,
  color,
  delay,
  style,
}: {
  label: string;
  color: string;
  delay: number;
  style: React.CSSProperties;
}) {
  return (
    <div
      style={{
        position: "absolute",
        padding: "10px 14px",
        borderRadius: 12,
        background: "rgba(10,10,36,0.85)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: "0.72rem",
        letterSpacing: "0.05em",
        color,
        whiteSpace: "nowrap",
        animation: `float-y 3.5s ease-in-out infinite ${delay}s`,
        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
        ...style,
      }}
    >
      {label}
    </div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // Spring physics for scroll fade & orbs
  useEffect(() => {
    // Respect reduce-motion: skip the dolly + parallax loop entirely so
    // the hero stays static while everything else (real content) is fine.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const state = {
      scrollY: 0,
      content: { x: 0, v: 0, target: 0 },
      orb1: { x: 0, v: 0, target: 0, y: 0, vy: 0, ty: 0 },
      orb2: { x: 0, v: 0, target: 0, y: 0, vy: 0, ty: 0 },
      mouse: { x: 0, y: 0 },
      orbMouse1: { x: 0, y: 0 },
      orbMouse2: { x: 0, y: 0 },
    };
    let last = performance.now();

    const onScroll = () => {
      state.scrollY = window.scrollY;
    };
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      state.mouse.x = nx;
      state.mouse.y = ny;
    };

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, state.scrollY / vh));

      // content spring (k=60 d=14)
      state.content.target = -progress * 100;
      const f = -60 * (state.content.x - state.content.target) - 14 * state.content.v;
      state.content.v += f * dt;
      state.content.x += state.content.v * dt;

      // orb springs (k=30 d=12)
      state.orb1.target = -progress * 60;
      state.orb1.ty = -progress * 40;
      const f1x = -30 * (state.orb1.x - state.orb1.target) - 12 * state.orb1.v;
      const f1y = -30 * (state.orb1.y - state.orb1.ty) - 12 * state.orb1.vy;
      state.orb1.v += f1x * dt;
      state.orb1.x += state.orb1.v * dt;
      state.orb1.vy += f1y * dt;
      state.orb1.y += state.orb1.vy * dt;

      state.orb2.target = progress * 70;
      state.orb2.ty = progress * 50;
      const f2x = -30 * (state.orb2.x - state.orb2.target) - 12 * state.orb2.v;
      const f2y = -30 * (state.orb2.y - state.orb2.ty) - 12 * state.orb2.vy;
      state.orb2.v += f2x * dt;
      state.orb2.x += state.orb2.v * dt;
      state.orb2.vy += f2y * dt;
      state.orb2.y += state.orb2.vy * dt;

      // mouse parallax (gentle lerp)
      state.orbMouse1.x += (state.mouse.x * 28 - state.orbMouse1.x) * 0.06;
      state.orbMouse1.y += (state.mouse.y * 18 - state.orbMouse1.y) * 0.06;
      state.orbMouse2.x += (state.mouse.x * -20 - state.orbMouse2.x) * 0.06;
      state.orbMouse2.y += (state.mouse.y * -22 - state.orbMouse2.y) * 0.06;

      const c = contentRef.current;
      if (c) {
        // Existing fade + lift on scroll
        c.style.opacity = `${Math.max(0, 1 - progress * 1.5)}`;
        // Cinematic dolly: as we scroll out, the hero tilts back, recedes,
        // and scales down — like the camera pulling away. Begins at 35%
        // progress so initial scrolling stays calm.
        const dollyT = Math.max(0, (progress - 0.35) / 0.65); // 0..1 over latter 65%
        const eased = dollyT * dollyT; // quadratic ease-in for graceful recede
        const rotateX = -eased * 9;          // tilt back up to 9°
        const translateZ = -eased * 240;     // recede up to 240px
        const scale = 1 - eased * 0.1;       // scale to 0.9
        const yLift = state.content.x * 0.5; // existing spring offset
        c.style.transform = `translateY(${yLift}px) translateZ(${translateZ.toFixed(2)}px) rotateX(${rotateX.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      }
      const o1 = orb1Ref.current;
      if (o1) {
        o1.style.transform = `translate(${state.orb1.x + state.orbMouse1.x}px, ${state.orb1.y + state.orbMouse1.y}px)`;
      }
      const o2 = orb2Ref.current;
      if (o2) {
        o2.style.transform = `translate(${state.orb2.x + state.orbMouse2.x}px, ${state.orb2.y + state.orbMouse2.y}px)`;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      style={{
        position: "relative",
        minHeight: "200vh",
        background: "var(--grad-hero)",
      }}
    >
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          perspective: "1400px",
          perspectiveOrigin: "50% 30%",
        }}
      >
        {/* Particle canvas — z 0 */}
        <ParticleCanvas />

        {/* Grid overlay (radial mask) */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            backgroundImage:
              "linear-gradient(rgba(124,58,237,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.055) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 50%, #000 0%, rgba(0,0,0,0.7) 50%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 50%, #000 0%, rgba(0,0,0,0.7) 50%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Orbs */}
        <div
          ref={orb1Ref}
          aria-hidden
          style={{
            position: "absolute",
            width: 800,
            height: 800,
            top: "-25%",
            left: "-15%",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.20), transparent 70%)",
            filter: "blur(90px)",
            pointerEvents: "none",
            zIndex: 1,
            willChange: "transform",
          }}
        />
        <div
          ref={orb2Ref}
          aria-hidden
          style={{
            position: "absolute",
            width: 650,
            height: 650,
            bottom: "-20%",
            right: "-10%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.18), transparent 70%)",
            filter: "blur(90px)",
            pointerEvents: "none",
            zIndex: 1,
            willChange: "transform",
          }}
        />

        {/* Content */}
        <div
          ref={contentRef}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 28px",
            willChange: "transform, opacity",
            transformStyle: "preserve-3d",
            transformOrigin: "50% 50%",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,1fr) 380px",
              gap: 72,
              alignItems: "center",
              maxWidth: 1200,
              width: "100%",
            }}
            className="hero-grid"
          >
            {/* Left column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              {/* Name — two-line, word-up clip */}
              <div>
                <div
                  style={{
                    overflow: "hidden",
                    lineHeight: 1.0,
                  }}
                >
                  <h1
                    className="hero-entry hero-entry-wordup"
                    style={{
                      animationDelay: "0.44s",
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "clamp(3.2rem, 6.5vw, 5.8rem)",
                      lineHeight: 1.0,
                      color: "#ffffff",
                      margin: 0,
                    }}
                  >
                    I'm
                  </h1>
                </div>
                <div
                  style={{
                    overflow: "hidden",
                    lineHeight: 1.0,
                  }}
                >
                  <h1
                    className="hero-entry hero-entry-wordup"
                    style={{
                      animationDelay: "0.56s",
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "clamp(3.2rem, 6.5vw, 5.8rem)",
                      lineHeight: 1.0,
                      margin: 0,
                    }}
                  >
                    <RefractiveName text="Azwad" />
                  </h1>
                </div>
              </div>

              {/* Typewriter role */}
              <div
                className="hero-entry hero-entry-fadeup"
                style={{
                  animationDelay: "0.72s",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: "1.2rem",
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                <Shield
                  className="w-[18px] h-[18px]"
                  style={{ color: "rgba(124,58,237,0.7)", flexShrink: 0 }}
                />
                <TypewriterText />
              </div>

              {/* Buttons */}
              <div
                className="hero-entry hero-entry-fadeup"
                style={{ animationDelay: "0.86s", display: "flex", flexWrap: "wrap", gap: 14 }}
              >
                <MagneticButton
                  primary
                  delayMs={980}
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Get In Touch →
                </MagneticButton>
                <MagneticButton
                  delayMs={980}
                  onClick={() =>
                    document
                      .getElementById("projects")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  View My Work
                </MagneticButton>
              </div>

              {/* Socials */}
              <div
                className="hero-entry hero-entry-fadeup"
                style={{
                  animationDelay: "1.10s",
                  display: "flex",
                  gap: 12,
                  marginTop: 6,
                }}
              >
                {socialLinks.map((link) => (
                  <SocialIconLink key={link.label} link={link} />
                ))}
              </div>
            </div>

            {/* Right column — profile visual */}
            <div
              className="hero-entry hero-entry-fadescale hero-profile"
              style={{
                animationDelay: "0.62s",
                position: "relative",
                width: 330,
                height: 330,
                margin: "0 auto",
              }}
            >
              {/* Pulsing glow */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: -50,
                  background:
                    "radial-gradient(circle, rgba(124,58,237,0.35), transparent 70%)",
                  filter: "blur(40px)",
                  animation: "glow-breathe 4s ease-in-out infinite",
                  pointerEvents: "none",
                }}
              />

              {/* Gradient ring */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "var(--grad-main)",
                  padding: 2.5,
                }}
              >
                <div
                  className="profile-inner"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    overflow: "hidden",
                    background: "#060b18",
                    transition: "transform 0.6s var(--ease-out)",
                  }}
                >
                  <img
                    src="/assets/profile/azwad-profile.jpg"
                    alt="Azwad Jilani"
                    width={330}
                    height={330}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center bottom",
                      transform: "scale(1.18)",
                      transition: "transform 0.6s var(--ease-out)",
                    }}
                  />
                </div>
              </div>

              {/* Floating cards */}
              <FloatingCard
                label="AI Engineer"
                color="#a78bfa"
                delay={0}
                style={{ top: -10, right: -36 }}
              />
              <FloatingCard
                label="Full Stack Dev"
                color="#60a5fa"
                delay={0.8}
                style={{ bottom: 12, left: -50 }}
              />
              <FloatingCard
                label="Cybersecurity"
                color="#86efac"
                delay={0.4}
                style={{ top: "50%", right: -68, transform: "translateY(-50%)" }}
              />
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="hero-entry hero-entry-fadeup"
          style={{
            animationDelay: "1.60s",
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "0.62rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.30)",
            }}
          >
            Scroll
          </span>
          <span
            style={{
              width: 1,
              height: 36,
              background:
                "linear-gradient(to bottom, rgba(124,58,237,0.6), transparent)",
              animation: "glow-breathe 1.6s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        .hero-profile:hover .profile-inner img {
          transform: scale(1.24);
        }
        .social-icon:hover {
          transform: translateY(-4px) scale(1.1);
          border-color: rgba(124,58,237,0.55);
          color: #c084fc;
          background: rgba(124,58,237,0.10);
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-profile {
            order: -1;
            width: 240px !important;
            height: 240px !important;
          }
        }
      `}</style>
    </section>
  );
}

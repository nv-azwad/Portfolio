import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ScrollReveal } from "./ScrollReveal";
import { TiltCard } from "./TiltCard";

// Skills section uses an alternating cyan/lavender contrast accent system:
// adjacent categories swap hues so the grid reads as a rhythmic two-tone
// pattern (matches the design reference screenshot).
const skillCategories = [
  {
    icon: "🎨",
    title: "Frontend Development",
    color: "#a78bfa",      // lavender
    skills: [
      { name: "React & Next.js", level: 92 },
      { name: "React Native & Expo", level: 90 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 92 },
    ],
  },
  {
    icon: "⚙️",
    title: "Backend Development",
    color: "#22D3EE",      // cyan
    skills: [
      { name: "Node.js & Express", level: 90 },
      { name: "PostgreSQL & Prisma", level: 88 },
      { name: "Python & FastAPI", level: 85 },
      { name: "REST APIs & JWT Auth", level: 92 },
    ],
  },
  {
    icon: "🤖",
    title: "Automation & AI",
    color: "#22D3EE",      // cyan
    skills: [
      { name: "AI Agents & AI-Assisted Dev", level: 90 },
      { name: "Anthropic & OpenAI APIs", level: 88 },
      { name: "N8N & Webhook Integration", level: 85 },
      { name: "REST API Orchestration", level: 88 },
    ],
  },
  {
    icon: "🚀",
    title: "DevOps & Cybersecurity",
    color: "#a78bfa",      // lavender
    skills: [
      { name: "Docker & CI/CD", level: 85 },
      { name: "AWS & VPS Deployment", level: 83 },
      { name: "Kali Linux & Network Defense", level: 85 },
      { name: "Git & Version Control", level: 92 },
    ],
  },
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const [animated, setAnimated] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setAnimated(true), delay * 1000);
        observer.unobserve(el);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="mb-5 cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex justify-between items-center mb-2">
        <span
          className="text-sm transition-colors duration-200"
          style={{ color: hovered ? "#fff" : "rgba(255,255,255,0.7)" }}
        >
          {name}
        </span>
        <motion.span
          className="text-xs font-mono font-bold"
          style={{ color }}
          animate={hovered ? { scale: 1.12 } : { scale: 1 }}
        >
          {level}%
        </motion.span>
      </div>

      <div
        className="relative h-2 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}aa, ${color})`,
            boxShadow: hovered ? `0 0 14px ${color}99` : "none",
            transition: "box-shadow 0.3s",
          }}
          initial={{ width: 0 }}
          animate={{ width: animated ? `${level}%` : 0 }}
          transition={{ duration: 1.3, ease: [0.34, 1.2, 0.64, 1] }}
        />

        {animated && (
          <motion.div
            className="absolute top-0 h-full w-16 pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)" }}
            initial={{ left: "-10%" }}
            animate={{ left: `${level + 5}%` }}
            transition={{ duration: 0.6, delay: 1.3 + delay * 0.5, ease: "easeOut" }}
          />
        )}

        {hovered && animated && (
          <motion.div
            className="absolute top-0 h-full rounded-full pointer-events-none"
            style={{ width: `${level}%`, background: `linear-gradient(90deg, transparent, ${color}40)` }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        )}
      </div>
    </div>
  );
}

function TechPill({ tech, index }: { tech: string; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.span
      className="relative px-4 py-2 rounded-full text-xs cursor-default overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${hovered ? "rgba(34,211,238,0.45)" : "rgba(255,255,255,0.08)"}`,
        color: hovered ? "#67e8f9" : "rgba(255,255,255,0.6)",
        transition: "border-color 0.2s, color 0.2s",
      }}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ background: "linear-gradient(90deg, rgba(34,211,238,0.20), rgba(167,139,250,0.14))", originX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      />
      <span className="relative z-10">{tech}</span>
    </motion.span>
  );
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  // Skills rises from below as Projects recedes — completes the immersive
  // dive between the two sections (no gap, just a continuous handoff).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });
  const stageRotateX = useTransform(scrollYProgress, [0, 0.6], [9, 0]);
  const stageTranslateY = useTransform(scrollYProgress, [0, 0.6], [70, 0]);
  const stageOpacity = useTransform(scrollYProgress, [0, 0.4], [0.45, 1]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 overflow-hidden"
      style={{
        // Stays in the violet-midnight family — same surface as About/Projects.
        // The mint temperature comes from accents (bars, icons, label), not the bg.
        background: "linear-gradient(180deg, #0a0a24 0%, #0d0d2b 50%, #06061a 100%)",
        perspective: "1400px",
        perspectiveOrigin: "50% 0%",
      }}
    >
      {/* ─── Section-entry choreography ─────────────────────────────
          As Skills enters the viewport (Projects is dollying away above),
          three things happen at the top edge to mark the handoff:
            1. A horizontal cyan beam ignites across the top, sweeps wider,
               then fades — like a stage light snapping on.
            2. A soft cyan→lavender bloom blossoms downward from the seam,
               washing the first ~30% of the section.
            3. The section header rises behind it (handled below by stage*).
          All transforms are GPU-only; one-shot, no infinite loops. */}
      <motion.div
        aria-hidden
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: 1, transformOrigin: "center" }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: [0, 1, 1], opacity: [0, 1, 0] }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 1.6, times: [0, 0.4, 1], ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(90deg, transparent 0%, #22D3EE 35%, #ffffff 50%, #a78bfa 65%, transparent 100%)",
            boxShadow:
              "0 0 24px rgba(34,211,238,0.9), 0 0 60px rgba(34,211,238,0.5), 0 0 100px rgba(167,139,250,0.4)",
            borderRadius: 9999,
          }}
        />
      </motion.div>

      {/* Downward bloom — washes the first 30vh after the beam fires */}
      <motion.div
        aria-hidden
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: "30vh",
          background:
            "linear-gradient(180deg, rgba(34,211,238,0.18) 0%, rgba(167,139,250,0.10) 35%, transparent 100%)",
          mixBlendMode: "screen",
        }}
        initial={{ opacity: 0, scaleY: 0 }}
        whileInView={{ opacity: [0, 1, 0.45], scaleY: [0, 1, 1] }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 1.4, delay: 0.25, times: [0, 0.55, 1], ease: [0.16, 1, 0.3, 1] }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(34,211,238,0.10) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(167,139,250,0.10) 0%, transparent 50%)
          `,
        }}
      />

      <motion.div
        className="max-w-7xl mx-auto px-6"
        style={{
          rotateX: stageRotateX,
          y: stageTranslateY,
          opacity: stageOpacity,
          transformOrigin: "50% 0%",
          transformStyle: "preserve-3d",
          willChange: "transform, opacity",
        }}
      >
        <ScrollReveal className="text-center mb-16 flex flex-col items-center">
          <h2 className="text-4xl lg:text-5xl font-black text-white relative inline-block text-center">
            Skills &amp;{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #a78bfa 0%, #c4b5fd 50%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 24px rgba(167,139,250,0.35))",
              }}
            >
              Expertise
            </span>
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-px rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, #22D3EE, #a78bfa, #22D3EE, transparent)" }}
              initial={{ width: 0 }} whileInView={{ width: "60%" }} viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </h2>
          <p className="mt-5 text-sm max-w-xl mx-auto text-center" style={{ color: "rgba(255,255,255,0.55)" }}>
            A high-precision suite of technical capabilities spanning the entire
            software development lifecycle, specialized in secure, AI-driven architectures.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {skillCategories.map((cat, catIndex) => (
            <ScrollReveal key={cat.title} delay={catIndex * 0.15} direction="up">
              <TiltCard className="rounded-2xl h-full" intensity={7} glowColor={`${cat.color}15`}>
                <motion.div
                  className="p-6 rounded-2xl h-full relative overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                  whileHover={{ borderColor: `${cat.color}45`, boxShadow: `0 0 40px ${cat.color}12` }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Ambient corner glow */}
                  <motion.div
                    className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, ${cat.color}18 0%, transparent 70%)`,
                      filter: "blur(24px)",
                      transform: "translate(30%, -30%)",
                    }}
                    animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 4, repeat: Infinity, delay: catIndex * 0.5 }}
                  />

                  <div className="flex items-center gap-3 mb-6">
                    <motion.div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                      style={{ background: `${cat.color}22` }}
                      whileHover={{ rotate: [0, -12, 12, 0], scale: 1.12 }}
                      transition={{ duration: 0.4 }}
                    >
                      {cat.icon}
                    </motion.div>
                    <h3 className="text-lg font-black" style={{ color: "#fff" }}>{cat.title}</h3>
                  </div>

                  {cat.skills.map((skill, i) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      color={cat.color}
                      delay={catIndex * 0.1 + i * 0.08}
                    />
                  ))}
                </motion.div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Tech pill cloud */}
        <ScrollReveal className="mt-16">
          <p className="text-center text-xs mb-6 tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
            Also familiar with
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Firebase", "MongoDB", "MySQL", "Google Apps Script", "Software Testing & QA", "Digital Forensics", "Java", "C++", "SSL/HTTPS", "Bug Tracking & Debugging", "Claude Code & Cursor"].map((tech, i) => (
              <TechPill key={tech} tech={tech} index={i} />
            ))}
          </div>
        </ScrollReveal>
      </motion.div>
    </section>
  );
}

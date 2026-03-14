import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ScrollReveal } from "./ScrollReveal";
import { TiltCard } from "./TiltCard";

const skillCategories = [
  {
    icon: "🛡️",
    title: "Cybersecurity",
    color: "#8b5cf6",
    skills: [
      { name: "Penetration Testing", level: 85 },
      { name: "Kali Linux", level: 88 },
      { name: "Risk Assessment", level: 82 },
      { name: "Network Defense", level: 80 },
    ],
  },
  {
    icon: "💻",
    title: "Programming",
    color: "#3b82f6",
    skills: [
      { name: "Python", level: 90 },
      { name: "JavaScript & TypeScript", level: 88 },
      { name: "Java & C++", level: 82 },
      { name: "SQL", level: 85 },
    ],
  },
  {
    icon: "🔧",
    title: "Tools & Technologies",
    color: "#a855f7",
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "Google Apps Script", level: 92 },
      { name: "VPS & cPanel", level: 85 },
      { name: "Machine Learning", level: 78 },
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
        border: `1px solid ${hovered ? "rgba(139,92,246,0.45)" : "rgba(255,255,255,0.08)"}`,
        color: hovered ? "#c4b5fd" : "rgba(255,255,255,0.6)",
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
        style={{ background: "linear-gradient(90deg, rgba(139,92,246,0.15), rgba(59,130,246,0.1))", originX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      />
      <span className="relative z-10">{tech}</span>
    </motion.span>
  );
}

export function Skills() {
  return (
    <section
      id="skills"
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0d0d2b 0%, #080818 100%)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(139,92,246,0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(59,130,246,0.05) 0%, transparent 50%)
          `,
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <span className="text-xs tracking-widest uppercase mb-3 block" style={{ color: "#8b5cf6" }}>Expertise</span>
          <h2 className="text-4xl lg:text-5xl font-black text-white relative inline-block">
            Skills &amp; Technologies
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-px rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, #8b5cf6, #3b82f6, transparent)" }}
              initial={{ width: 0 }} whileInView={{ width: "60%" }} viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
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
            {["React", "Next.js", "Node.js", "Express", "Docker", "AWS", "Burp Suite", "Metasploit", "Wireshark", "MongoDB"].map((tech, i) => (
              <TechPill key={tech} tech={tech} index={i} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

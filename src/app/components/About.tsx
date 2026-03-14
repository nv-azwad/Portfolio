import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ScrollReveal } from "./ScrollReveal";
import { TiltCard } from "./TiltCard";

const stats = [
  { icon: "🏆", value: 2, suffix: "+", label: "Years Experience", color: "#8b5cf6" },
  { icon: "📁", value: 10, suffix: "+", label: "Projects Completed", color: "#3b82f6" },
  { icon: "🎖️", value: 4, suffix: "+", label: "Certifications", color: "#a855f7" },
  { icon: "</>", value: 50, suffix: "K+", label: "Lines of Code", color: "#60a5fa" },
];

const skills = ["Python", "JavaScript", "TypeScript", "Kali Linux", "Penetration Testing", "Machine Learning"];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const timer = setInterval(() => {
          start += 1;
          setCount(start);
          if (start >= target) clearInterval(timer);
        }, 1500 / target);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function SkillTag({ skill, index }: { skill: string; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.span
      className="relative px-3 py-1.5 rounded-lg text-xs cursor-default overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: hovered ? "#e9d5ff" : "rgba(255,255,255,0.7)",
        transition: "color 0.25s, border-color 0.25s",
        borderColor: hovered ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.1)",
      }}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 + 0.2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{ background: "linear-gradient(90deg, rgba(139,92,246,0.18), rgba(59,130,246,0.12))" }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
      <span className="relative z-10">{skill}</span>
    </motion.span>
  );
}

export function About() {
  return (
    <section
      id="about"
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0d0d2b 0%, #080818 100%)" }}
    >
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 70%)", filter: "blur(40px)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="text-xs tracking-widest uppercase mb-3 block" style={{ color: "#8b5cf6" }}>About Me</span>
          <h2 className="text-4xl lg:text-5xl font-black text-white relative inline-block">
            Crafting Digital Excellence
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-px rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, #8b5cf6, #3b82f6, transparent)" }}
              initial={{ width: 0 }} whileInView={{ width: "60%" }} viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </h2>
        </ScrollReveal>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1} direction="scale">
              <TiltCard
                className="rounded-2xl"
                glowColor={`${stat.color}20`}
                intensity={10}
              >
                <motion.div
                  className="relative p-6 rounded-2xl text-center overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                  whileHover={{ borderColor: `${stat.color}50`, boxShadow: `0 0 35px ${stat.color}18` }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: `${stat.color}1a` }}
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
                    transition={{ duration: 0.4 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <div
                    className="text-3xl font-black mb-1"
                    style={{ background: `linear-gradient(135deg, ${stat.color}, #a78bfa)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                  >
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{stat.label}</p>
                </motion.div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Bio + Image */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image with interactive scan overlay */}
          <ScrollReveal direction="left">
            <div className="relative group">
              <motion.div
                className="absolute -inset-3 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100"
                style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.25), rgba(59,130,246,0.25))", filter: "blur(24px)" }}
                transition={{ duration: 0.5 }}
              />
              <TiltCard className="rounded-2xl overflow-hidden" intensity={6} glowColor="rgba(139,92,246,0.12)">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                    alt="Cybersecurity Workspace"
                    className="w-full h-72 object-cover"
                    style={{ transition: "transform 0.5s ease" }}
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.2) 0%, transparent 60%)" }} />
                  {/* Horizontal scan line */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(139,92,246,0.12) 50%, transparent 60%)" }}
                    animate={{ y: ["-100%", "200%"] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                  />
                  {/* Corner decorations */}
                  {[["top-2 left-2", "border-t-2 border-l-2"], ["top-2 right-2", "border-t-2 border-r-2"], ["bottom-2 left-2", "border-b-2 border-l-2"], ["bottom-2 right-2", "border-b-2 border-r-2"]].map(([pos, b], i) => (
                    <div key={i} className={`absolute w-5 h-5 ${pos} ${b} opacity-60`} style={{ borderColor: "rgba(139,92,246,0.7)" }} />
                  ))}
                </div>
              </TiltCard>
            </div>
          </ScrollReveal>

          {/* Text + Skills */}
          <ScrollReveal direction="right">
            <h3 className="text-2xl font-black text-white mb-4">
              Passionate About Cybersecurity &amp; Building Secure Applications
            </h3>
            <p style={{ color: "rgba(255,255,255,0.58)" }} className="leading-relaxed mb-4">
              As a Computer Science graduate specializing in Cybersecurity from Taylor's University,
              I combine security expertise with full-stack development skills to build robust, secure applications.
            </p>
            <p style={{ color: "rgba(255,255,255,0.58)" }} className="leading-relaxed mb-6">
              With hands-on experience in{" "}
              <span style={{ color: "#c084fc" }}>penetration testing</span>,{" "}
              <span style={{ color: "#60a5fa" }}>ethical hacking</span>, and network defense,
              alongside full-stack development using JavaScript and TypeScript,
              I bridge the gap between security and development.
            </p>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => <SkillTag key={skill} skill={skill} index={i} />)}
            </div>
          </ScrollReveal>
        </div>

        {/* Education */}
        <ScrollReveal className="mt-20">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(139,92,246,0.2)" }}>🎓</div>
            <h3 className="text-2xl font-black text-white">Education</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <TiltCard className="rounded-2xl" intensity={5} glowColor="rgba(139,92,246,0.1)">
              <motion.div
                className="p-6 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                whileHover={{ borderColor: "rgba(139,92,246,0.4)", boxShadow: "0 0 30px rgba(139,92,246,0.1)" }}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-xl"
                    style={{ background: "rgba(139,92,246,0.2)" }}
                    whileHover={{ rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.4 }}
                  >🏫</motion.div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Bachelor of Computer Science (Honours)</h4>
                    <p className="text-sm mb-2" style={{ color: "#a78bfa" }}>Specializing in Cybersecurity</p>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>Taylor's University, Malaysia</p>
                    <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>Jan 2022 - Jan 2026</p>
                  </div>
                </div>
              </motion.div>
            </TiltCard>

            <TiltCard className="rounded-2xl" intensity={5} glowColor="rgba(168,85,247,0.1)">
              <motion.div
                className="p-6 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                whileHover={{ borderColor: "rgba(168,85,247,0.4)", boxShadow: "0 0 30px rgba(168,85,247,0.1)" }}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-xl"
                    style={{ background: "rgba(168,85,247,0.2)" }}
                    whileHover={{ rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.4 }}
                  >🎖️</motion.div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Certifications & Awards</h4>
                    <ul className="text-sm space-y-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                      <li>• Cisco - Introduction to Cyber Security</li>
                      <li>• Java Foundations Certified</li>
                      <li>• Advanced Python for Analytics</li>
                      <li>• Dean's List Award (March 2022)</li>
                      <li>• Inter-University Tournament Champion 2024</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </TiltCard>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

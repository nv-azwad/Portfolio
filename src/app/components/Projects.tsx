import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { TiltCard } from "./TiltCard";
import { CodePanel, type CodeLine } from "./CodePanel";
import { aiPortfolioCode, uavFypCode } from "./codePanelData";

interface ProjectCodePanel {
  filename: string;
  language: string;
  lines: CodeLine[];
}

const projects = [
  {
    id: 1,
    tag: "Project 1",
    title: "U4B Full Stack Application",
    description:
      "Single-handedly developed the complete Upcycle 4 Better web application during my internship, transforming a manual email-based donation verification process into a streamlined digital platform. The app serves 50+ bin locations across Malaysia, featuring QR code scanning for automatic bin registration, in-app video recording with GPS verification to prevent fraud, and a comprehensive admin dashboard for donation approval. Built with Next.js 16, React 19, TypeScript, and Node.js/Express backend with PostgreSQL database. Reduced verification time from 3-5 days to under 24 hours.",
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Full Stack"],
    images: [
      "/assets/projects/u4b-dashboard.png",
      "/assets/projects/u4b-login.png",
    ],
    accent: "#7c3aed",
    hasReport: true,
    reportLink: "/assets/reports/U4B-Case-Study.pdf",
    liveLink: "https://u4b-app--u4bapp.asia-southeast1.hosted.app/login",
    githubLink: undefined,
  },
  {
    id: 2,
    tag: "Project 2",
    title: "Gausul Azam Jameh Masjid — Digital Mosque Management System",
    description:
      "A full-stack mosque management platform built for Gausul Azam Jameh Masjid (Uttara, Dhaka, Bangladesh). Solo-developed the entire system end-to-end — a Next.js admin dashboard and a cross-platform mobile app (Android + PWA) serving the mosque community. Features include real-time prayer time management with auto-sync via Vercel cron, cross-platform push notifications (FCM + Web Push), full Quran reader with Arabic/Bengali/English translations, Qibla compass, Islamic calendar events, community post moderation, role-based access control, and offline support with network-first caching strategy. The system runs entirely on free tiers with zero recurring cost, serving a real community.",
    tags: ["Next.js", "React Native", "Expo", "PostgreSQL", "Prisma", "Firebase", "PWA"],
    images: [
      "/assets/projects/masjid.png",
    ],
    accent: "#059669",
    hasReport: false,
    reportLink: undefined,
    liveLink: "https://gausul-azam-masjid.vercel.app/",
    githubLink: undefined,
  },
  {
    id: 3,
    tag: "Project 3",
    title: "AI Engineering Portfolio",
    description:
      "Built a complete AI engineering system from scratch in JavaScript using LangChain and Ollama — fully local, no API keys required. Includes a RAG pipeline that reads any PDF and answers questions with zero hallucination, a hierarchical multi-agent system where a manager agent dynamically routes tasks to specialised worker agents, and an LLM function calling demo with autonomous tool selection. Tested the RAG pipeline on a real 68-page technical document with accurate retrieval.",
    tags: ["LangChain", "Ollama", "RAG", "Multi-Agent", "Node.js", "JavaScript"],
    images: [],
    accent: "#a78bfa",
    hasReport: false,
    reportLink: undefined,
    liveLink: undefined,
    githubLink: "https://github.com/nv-azwad/ai-engineering-portfolio",
    codePanel: {
      filename: "agent.ts — manager",
      language: "ts",
      lines: aiPortfolioCode,
    } as ProjectCodePanel,
  },
  {
    id: 4,
    tag: "Project 4",
    title: "CubeXTech Company Website",
    description:
      "Designed and developed the official company website for CubeX Technology, a premium tech solutions provider based in Malaysia. Built with React and modern web technologies, featuring a sleek dark theme with teal gradient accents. The website showcases the company's services including CubeX Home residential security, custom software development, and automation systems. Highlights include an animated 3D wireframe cube hero section, smooth scroll animations, responsive design, and a professional contact form with PHP backend.",
    tags: ["React", "Vite", "Tailwind CSS", "Framer Motion", "PHP"],
    images: [
      "/assets/projects/cubex-website.png",
      "/assets/projects/cubex-website-2.png",
      "/assets/projects/cubex-website-3.png",
    ],
    accent: "#3b82f6",
    hasReport: false,
    reportLink: undefined,
    liveLink: "https://cubextech.net",
    githubLink: undefined,
  },
  {
    id: 5,
    tag: "Project 5",
    title: "CubeX Visitor Management System",
    description:
      "Production VMS currently serving 3+ condominiums across Malaysia including PJS 1, MMC Ampang, and Sri Ara Residences. Built with PHP backend and Google Sheets API for data management. Features include multi-property visitor registration with custom branding per site, QR code generation for entry verification, guard verification portal with PIN authentication, resident lookup functionality, automated Telegram notifications to guards, and scheduled daily/monthly PDF reports to property managers via Google Apps Script automation.",
    tags: ["PHP", "Google Sheets API", "Telegram Bot", "QR Code", "VPS"],
    images: [
      "/assets/projects/vms-home.png",
      "/assets/projects/vms-form.png",
    ],
    accent: "#a855f7",
    hasReport: false,
    reportLink: undefined,
    liveLink: "https://vms.cubextech.net",
    githubLink: undefined,
  },
  {
    id: 6,
    tag: "Project 6",
    title: "CubeXHome — Property Security Platform",
    description:
      "Comprehensive property security and management platform designed for Malaysian condominiums. The ecosystem includes 3 role-based web dashboards (Security Head with teal theme, Site Management with purple theme, Super Admin with crimson theme) and a multi-role mobile app serving Residents, Guards, and Security Heads. Key features include OTP + biometric authentication, real-time guard tracking with patrol verification, incident management system, resident billing & feedback, visitor pre-registration, emergency SOS alerts, and an automated service killswitch for subscription management. Built with React, Node.js, PostgreSQL, Prisma, and React Native/Expo.",
    tags: ["React", "React Native", "Node.js", "PostgreSQL", "Prisma", "Security"],
    images: [
      "/assets/projects/cubexhome-security-dashboard.png",
      "/assets/projects/cubexhome-management-dashboard.png",
      "/assets/projects/cubexhome-admin-dashboard.png",
      "/assets/projects/cubexhome-resident-home.jpg",
      "/assets/projects/cubexhome-guard-dashboard.jpg",
      "/assets/projects/cubexhome-securityhead-dashboard.jpg",
      "/assets/projects/cubexhome-app-login.jpg",
      "/assets/projects/cubexhome-guard-login.jpg",
      "/assets/projects/cubexhome-securityhead-guards.jpg",
    ],
    accent: "#10b981",
    hasReport: true,
    reportLink: "/assets/reports/CubeXHome-Case-Study.pdf",
    liveLink: undefined,
    githubLink: undefined,
  },
  {
    id: 7,
    tag: "Project 7",
    title: "UAV Communication & Mobility (FYP)",
    description:
      "Final Year Project implementing reinforcement learning algorithms and Terahertz (THz) communication for enhanced UAV communication and mobility in Flying Ad-hoc Networks (FANETs). Using NS3 network simulator to create real-life simulations of UAV mobility models. Research focuses on optimizing communication reliability, analyzing network security vulnerabilities, and improving data transmission efficiency in dynamic aerial environments.",
    tags: ["Python", "NS3 Simulator", "Machine Learning", "Network Security", "Research"],
    images: [],
    accent: "#60a5fa",
    hasReport: true,
    reportLink: "/assets/reports/UAV_FYP_Report.pdf",
    codePanel: {
      filename: "fanet_train.py",
      language: "py",
      lines: uavFypCode,
    } as ProjectCodePanel,
    liveLink: undefined,
    githubLink: undefined,
  },
];

function GlowBorder({ children, color, active }: { children: React.ReactNode; color: string; active: boolean }) {
  // Static gradient border that lights up on hover. No infinite rotation.
  return (
    <motion.div
      className="relative rounded-3xl"
      style={{ overflow: "visible" }}
      animate={
        active
          ? { boxShadow: `0 0 60px rgba(124,58,237,0.12), 0 28px 56px rgba(0,0,0,0.45)` }
          : { boxShadow: `0 12px 32px rgba(0,0,0,0.25)` }
      }
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Static gradient outline — fades in on hover, no rotation */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          padding: 1,
          background: `linear-gradient(135deg, ${color}66 0%, transparent 50%, ${color}33 100%)`,
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="relative rounded-3xl overflow-hidden">{children}</div>
    </motion.div>
  );
}

function TechTag({ tag, accent }: { tag: string; accent: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.span
      className="relative px-3 py-1 rounded-lg text-xs overflow-hidden cursor-default"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: `1px solid ${hovered ? `${accent}55` : "rgba(255,255,255,0.1)"}`,
        color: hovered ? "#ffffff" : "rgba(255,255,255,0.6)",
        transition: "border-color 0.2s, color 0.2s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.06, y: -1 }}
      whileTap={{ scale: 0.96 }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `linear-gradient(90deg, ${accent}18, ${accent}0a)`, originX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.22 }}
      />
      <span className="relative z-10">{tag}</span>
    </motion.span>
  );
}

function ProjectButton({ children, href, accent, primary }: { children: React.ReactNode; href: string; accent: string; primary?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium overflow-hidden"
      style={
        primary
          ? { background: `linear-gradient(135deg, ${accent}, ${accent}bb)`, color: "#fff" }
          : { background: "rgba(255,255,255,0.05)", border: `1px solid ${hovered ? `${accent}50` : "rgba(255,255,255,0.1)"}`, color: "#fff", transition: "border-color 0.2s" }
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.05, boxShadow: primary ? `0 0 24px ${accent}55` : `0 0 16px ${accent}28` }}
      whileTap={{ scale: 0.94 }}
      data-cursor="Open"
    >
      {primary && hovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%)" }}
          initial={{ x: "-120%" }}
          animate={{ x: "120%" }}
          transition={{ duration: 0.45 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.a>
  );
}

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoverKey, setHoverKey] = useState(0);
  const imgRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  const handleImgMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = imgRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--img-x", `${(-x * 14).toFixed(2)}px`);
    el.style.setProperty("--img-y", `${(-y * 10).toFixed(2)}px`);
  };
  const handleImgLeave = () => {
    const el = imgRef.current;
    if (!el) return;
    el.style.setProperty("--img-x", `0px`);
    el.style.setProperty("--img-y", `0px`);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <ScrollReveal delay={index * 0.15}>
      <GlowBorder color={project.accent} active={hovered}>
        <div
          className="relative p-8 rounded-3xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)" }}
          onMouseEnter={() => {
            setHovered(true);
            setHoverKey((k) => k + 1);
          }}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Ambient glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at ${isEven ? "90% 10%" : "10% 10%"}, ${project.accent}25 0%, ${project.accent}08 40%, transparent 70%)` }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 items-center`}>
            {/* Visual: code panel for code-first projects, image carousel otherwise */}
            <div className="relative flex-shrink-0 w-full lg:w-1/2">
              {"codePanel" in project && project.codePanel ? (
                <TiltCard className="rounded-2xl overflow-hidden" intensity={4} glowColor={`${project.accent}25`}>
                  <CodePanel
                    filename={project.codePanel.filename}
                    language={project.codePanel.language}
                    accent={project.accent}
                    lines={project.codePanel.lines}
                  />
                </TiltCard>
              ) : (
              <TiltCard className="rounded-2xl overflow-hidden" intensity={4} glowColor={`${project.accent}20`}>
                <div
                  ref={imgRef}
                  className="relative overflow-hidden rounded-2xl group/img"
                  style={{ ["--img-x" as string]: "0px", ["--img-y" as string]: "0px" }}
                  onMouseMove={handleImgMove}
                  onMouseLeave={handleImgLeave}
                >
                  <div className="absolute inset-0 z-10 rounded-2xl pointer-events-none" style={{ border: `1px solid ${project.accent}30` }} />

                  <img
                    src={project.images[currentImageIndex]}
                    alt={project.title}
                    width={800}
                    height={450}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-56 object-cover"
                    style={{
                      transform:
                        "translate3d(var(--img-x), var(--img-y), 0) scale(1.05)",
                      transition: "transform 0.55s var(--ease-out)",
                    }}
                  />

                  {/* Gradient overlay */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{ background: `linear-gradient(135deg, ${project.accent}22 0%, transparent 60%)` }}
                    animate={{ opacity: hovered ? 1 : 0.3 }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* One-shot light sweep — fires once when card enters hover */}
                  {hovered && (
                    <motion.div
                      key={hoverKey}
                      className="absolute inset-0 pointer-events-none rounded-2xl"
                      style={{
                        background: `linear-gradient(105deg, transparent 35%, ${project.accent}55 50%, transparent 65%)`,
                        backgroundSize: "220% 100%",
                      }}
                      initial={{ backgroundPosition: "200% 0" }}
                      animate={{ backgroundPosition: "-50% 0" }}
                      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}

                  {/* Navigation arrows for multi-image projects */}
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover/img:opacity-100 transition-all duration-300 backdrop-blur-sm border border-white/20 z-20"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover/img:opacity-100 transition-all duration-300 backdrop-blur-sm border border-white/20 z-20"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      {/* Image Indicators */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 z-20">
                        {project.images.map((_, imgIndex) => (
                          <button
                            key={imgIndex}
                            onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(imgIndex); }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              currentImageIndex === imgIndex
                                ? "bg-white w-4"
                                : "bg-white/50 hover:bg-white/80"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Hover overlay with "View Project" label */}
                  {project.liveLink ? (
                    <motion.a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center rounded-2xl z-10"
                      style={{ background: `rgba(0,0,0,0.45)`, backdropFilter: "blur(2px)" }}
                      animate={{ opacity: hovered ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.span
                        className="px-4 py-2 rounded-full text-xs font-medium"
                        style={{ background: project.accent, color: "#fff" }}
                        initial={{ scale: 0.7 }}
                        animate={{ scale: hovered ? 1 : 0.7 }}
                        transition={{ duration: 0.25 }}
                      >
                        View Project ↗
                      </motion.span>
                    </motion.a>
                  ) : (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center rounded-2xl z-10 pointer-events-none"
                      style={{ background: `rgba(0,0,0,0.45)`, backdropFilter: "blur(2px)" }}
                      animate={{ opacity: hovered ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>
              </TiltCard>
              )}
            </div>

            {/* Content */}
            <div className="flex-1">
              <motion.span
                className="inline-block px-3 py-1 rounded-full text-xs mb-4"
                style={{ background: `${project.accent}18`, border: `1px solid ${project.accent}45`, color: project.accent }}
                animate={hovered ? { scale: 1.06 } : { scale: 1 }}
              >
                {project.tag}
              </motion.span>

              <h3 className="text-2xl font-black text-white mb-4">{project.title}</h3>
              <p className="leading-relaxed text-sm mb-5" style={{ color: "rgba(255,255,255,0.54)" }}>
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <TechTag key={tag} tag={tag} accent={project.accent} />
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 flex-wrap">
                {project.liveLink && (
                  <ProjectButton href={project.liveLink} accent={project.accent} primary>
                    🌐 View Live ↗
                  </ProjectButton>
                )}
                {project.githubLink && (
                  <ProjectButton href={project.githubLink} accent={project.accent} primary={!project.liveLink}>
                    💻 GitHub ↗
                  </ProjectButton>
                )}
                {project.hasReport && project.reportLink && (
                  <ProjectButton href={project.reportLink} accent={project.accent}>
                    📄 Case Study ↗
                  </ProjectButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </GlowBorder>
    </ScrollReveal>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  // Immersive-dive exit: in the last ~18% of section scroll, the content
  // recedes (rotateX/translateZ/scale/opacity) so Skills can emerge from
  // beneath without a gap between sections.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const dollyRotateX = useTransform(scrollYProgress, [0.82, 1], [0, -7]);
  const dollyTranslateZ = useTransform(scrollYProgress, [0.82, 1], [0, -180]);
  const dollyScale = useTransform(scrollYProgress, [0.82, 1], [1, 0.93]);
  const dollyOpacity = useTransform(scrollYProgress, [0.82, 1], [1, 0.35]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden"
      style={{
        // Violet-midnight surface (same as About/Skills) — peach lives in accents.
        background: "linear-gradient(180deg, #0a0a24 0%, #0d0d2b 50%, #0a0a24 100%)",
        perspective: "1400px",
        perspectiveOrigin: "50% 30%",
      }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(240,153,123,0.06) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <motion.div
        className="relative py-24"
        style={{
          rotateX: dollyRotateX,
          translateZ: dollyTranslateZ,
          scale: dollyScale,
          opacity: dollyOpacity,
          transformOrigin: "50% 50%",
          transformStyle: "preserve-3d",
          willChange: "transform, opacity",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal className="text-center mb-16">
            <span
              className="text-xs tracking-widest uppercase mb-3 block"
              style={{ color: "#F0997B", fontFamily: "var(--font-display)", fontWeight: 700 }}
            >
              Work
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-white relative inline-block">
              Featured Projects
              <motion.div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-px rounded-full"
                style={{ background: "linear-gradient(90deg, transparent, #F0997B, #ffc0a8, #F0997B, transparent)" }}
                initial={{ width: 0 }} whileInView={{ width: "60%" }} viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </h2>
            <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              Production systems serving real users and clients
            </p>
          </ScrollReveal>

          <div className="space-y-10">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

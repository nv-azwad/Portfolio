import { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { TiltCard } from "./TiltCard";

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
    accent: "#8b5cf6",
    hasReport: true,
    reportLink: "/assets/reports/U4B-Case-Study.pdf",
    liveLink: "https://u4b-app--u4bapp.asia-southeast1.hosted.app/login",
  },
  {
    id: 2,
    tag: "Project 2",
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
  },
  {
    id: 3,
    tag: "Project 3",
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
  },
  {
    id: 4,
    tag: "Project 4",
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
  },
  {
    id: 5,
    tag: "Project 5",
    title: "UAV Communication & Mobility (FYP)",
    description:
      "Final Year Project implementing reinforcement learning algorithms and Terahertz (THz) communication for enhanced UAV communication and mobility in Flying Ad-hoc Networks (FANETs). Using NS3 network simulator to create real-life simulations of UAV mobility models. Research focuses on optimizing communication reliability, analyzing network security vulnerabilities, and improving data transmission efficiency in dynamic aerial environments.",
    tags: ["Python", "NS3 Simulator", "Machine Learning", "Network Security", "Research"],
    images: [
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    accent: "#7c3aed",
    hasReport: true,
    reportLink: "/assets/reports/UAV_FYP_Report.pdf",
    liveLink: undefined,
  },
];

function GlowBorder({ children, color, active }: { children: React.ReactNode; color: string; active: boolean }) {
  return (
    <div className="relative rounded-3xl p-[1.5px] overflow-hidden">
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{ background: `conic-gradient(from 0deg, ${color}, transparent 40%, ${color}80 60%, transparent 80%, ${color})` }}
        animate={active ? { rotate: [0, 360] } : { rotate: 0 }}
        transition={active ? { duration: 3, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}
      />
      <div className="relative rounded-3xl overflow-hidden">{children}</div>
    </div>
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
  const isEven = index % 2 === 0;

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
          style={{ background: "#09091f", border: "1px solid rgba(255,255,255,0.05)" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Ambient glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at ${isEven ? "90% 10%" : "10% 10%"}, ${project.accent}0d 0%, transparent 60%)` }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 items-center`}>
            {/* Image */}
            <div className="relative flex-shrink-0 w-full lg:w-1/2">
              <TiltCard className="rounded-2xl overflow-hidden" intensity={5} glowColor={`${project.accent}20`}>
                <div className="relative overflow-hidden rounded-2xl group/img">
                  <div className="absolute inset-0 z-10 rounded-2xl pointer-events-none" style={{ border: `1px solid ${project.accent}30` }} />

                  <img
                    src={project.images[currentImageIndex]}
                    alt={project.title}
                    className="w-full h-56 object-cover"
                    style={{ transform: hovered ? "scale(1.06)" : "scale(1)", transition: "transform 0.6s ease" }}
                  />

                  {/* Gradient overlay */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{ background: `linear-gradient(135deg, ${project.accent}22 0%, transparent 60%)` }}
                    animate={{ opacity: hovered ? 1 : 0.3 }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Scan line */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
                    animate={{ opacity: hovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="absolute w-full"
                      style={{ height: 2, background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`, boxShadow: `0 0 12px ${project.accent}` }}
                      animate={hovered ? { y: ["-10%", "600%"] } : { y: "-10%" }}
                      transition={hovered ? { duration: 1.4, repeat: Infinity, ease: "linear" } : {}}
                    />
                  </motion.div>

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
  return (
    <section
      id="projects"
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #080818 0%, #0d0d2b 100%)" }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.05) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <span className="text-xs tracking-widest uppercase mb-3 block" style={{ color: "#8b5cf6" }}>Portfolio</span>
          <h2 className="text-4xl lg:text-5xl font-black text-white relative inline-block">
            Featured Projects
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-px rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, #8b5cf6, #3b82f6, transparent)" }}
              initial={{ width: 0 }} whileInView={{ width: "60%" }} viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </h2>
          <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            Production systems serving real clients across Malaysia
          </p>
        </ScrollReveal>

        <div className="space-y-10">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

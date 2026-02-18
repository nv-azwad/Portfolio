import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { FileText, ArrowUpRight, Globe, ChevronLeft, ChevronRight } from "lucide-react";

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({});

  const projects = [
    {
      title: "U4B Full Stack Application",
      description:
        "Single-handedly developed the complete Upcycle 4 Better web application during my internship, transforming a manual email-based donation verification process into a streamlined digital platform. The app serves 50+ bin locations across Malaysia, featuring QR code scanning for automatic bin registration, in-app video recording with GPS verification to prevent fraud, and a comprehensive admin dashboard for donation approval. Built with Next.js 16, React 19, TypeScript, and Node.js/Express backend with PostgreSQL database. Reduced verification time from 3-5 days to under 24 hours.",
      images: [
        "/assets/projects/u4b-dashboard.png",
        "/assets/projects/u4b-login.png",
      ],
      tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Full Stack"],
      color: "from-green-500 to-emerald-500",
      hasReport: true,
      reportLink: "/assets/reports/U4B-Case-Study.pdf",
      liveLink: "https://u4b-app--u4bapp.asia-southeast1.hosted.app/login",
    },
    {
      title: "CubeXTech Company Website",
      description:
        "Designed and developed the official company website for CubeX Technology, a premium tech solutions provider based in Malaysia. Built with React and modern web technologies, featuring a sleek dark theme with teal gradient accents. The website showcases the company's services including CubeX Home residential security, custom software development, and automation systems. Highlights include an animated 3D wireframe cube hero section, smooth scroll animations, responsive design, and a professional contact form with PHP backend.",
      images: [
        "/assets/projects/cubex-website.png",
        "/assets/projects/cubex-website-2.png",
        "/assets/projects/cubex-website-3.png",
      ],
      tags: ["React", "Vite", "Tailwind CSS", "Framer Motion", "PHP"],
      color: "from-purple-500 to-emerald-500",
      hasReport: false,
      liveLink: "https://cubextech.net",
    },
    {
      title: "CubeX Visitor Management System",
      description:
        "Production VMS currently serving 3+ condominiums across Malaysia including PJS 1, MMC Ampang, and Sri Ara Residences. Built with PHP backend and Google Sheets API for data management. Features include multi-property visitor registration with custom branding per site, QR code generation for entry verification, guard verification portal with PIN authentication, resident lookup functionality, automated Telegram notifications to guards, and scheduled daily/monthly PDF reports to property managers via Google Apps Script automation.",
      images: [
        "/assets/projects/vms-home.png",
        "/assets/projects/vms-form.png",
      ],
      tags: ["PHP", "Google Sheets API", "Telegram Bot", "QR Code", "VPS"],
      color: "from-purple-500 to-pink-500",
      hasReport: false,
      liveLink: "https://vms.cubextech.net",
    },
    {
      title: "CubeXHome — Property Security Platform",
      description:
        "Comprehensive property security and management platform designed for Malaysian condominiums. The ecosystem includes 3 role-based web dashboards (Security Head with teal theme, Site Management with purple theme, Super Admin with crimson theme) and a multi-role mobile app serving Residents, Guards, and Security Heads. Key features include OTP + biometric authentication, real-time guard tracking with patrol verification, incident management system, resident billing & feedback, visitor pre-registration, emergency SOS alerts, and an automated service killswitch for subscription management. Built with React, Node.js, PostgreSQL, Prisma, and React Native/Expo.",
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
      tags: ["React", "React Native", "Node.js", "PostgreSQL", "Prisma", "Security"],
      color: "from-cyan-500 to-emerald-500",
      hasReport: true,
      reportLink: "/assets/reports/CubeXHome-Case-Study.pdf",
    },
    {
      title: "UAV Communication & Mobility (FYP)",
      description:
        "Final Year Project implementing reinforcement learning algorithms and Terahertz (THz) communication for enhanced UAV communication and mobility in Flying Ad-hoc Networks (FANETs). Using NS3 network simulator to create real-life simulations of UAV mobility models. Research focuses on optimizing communication reliability, analyzing network security vulnerabilities, and improving data transmission efficiency in dynamic aerial environments.",
      images: [
        "https://images.unsplash.com/photo-1473968512647-3e447244af8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      ],
      tags: ["Python", "NS3 Simulator", "Machine Learning", "Network Security", "Research"],
      color: "from-violet-500 to-purple-500",
      hasReport: true,
      reportLink: "/assets/reports/UAV_FYP_Report.pdf",
    },
  ];

  const nextImage = (projectIndex: number, totalImages: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] || 0) + 1) % totalImages,
    }));
  };

  const prevImage = (projectIndex: number, totalImages: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] || 0) - 1 + totalImages) % totalImages,
    }));
  };

  const getCurrentImageIndex = (projectIndex: number) => {
    return currentImageIndex[projectIndex] || 0;
  };

  return (
    <section id="projects" className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-32 px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(168,85,247,0.1),transparent_50%)]" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Section header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-4"
            >
              <span className="text-purple-400 text-sm uppercase tracking-widest">
                Portfolio
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl text-white mb-6"
            >
              Featured Projects
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-400 text-xl max-w-2xl mx-auto"
            >
              Production systems serving real clients across Malaysia
            </motion.p>
          </div>

          {/* Projects */}
          <div className="space-y-32">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 80 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Image */}
                <div
                  className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <motion.div
                    animate={{
                      scale: hoveredIndex === index ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="relative group"
                  >
                    <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-slate-700/50 relative">
                      <img
                        src={project.images[getCurrentImageIndex(index)]}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Navigation Arrows - Only show if more than 1 image */}
                      {project.images.length > 1 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              prevImage(index, project.images.length);
                            }}
                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm border border-white/20"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              nextImage(index, project.images.length);
                            }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm border border-white/20"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                          
                          {/* Image Indicators */}
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {project.images.map((_, imgIndex) => (
                              <button
                                key={imgIndex}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCurrentImageIndex((prev) => ({
                                    ...prev,
                                    [index]: imgIndex,
                                  }));
                                }}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                  getCurrentImageIndex(index) === imgIndex
                                    ? "bg-white w-4"
                                    : "bg-white/50 hover:bg-white/80"
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Glowing border effect */}
                    <div
                      className={`absolute -inset-1 bg-gradient-to-r ${project.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10`}
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={
                      isInView
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
                    }
                    transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
                  >
                    <div className="inline-block px-4 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-full text-blue-300 text-sm mb-4">
                      Project {index + 1}
                    </div>

                    <h3 className="text-4xl text-white mb-4">
                      {project.title}
                    </h3>
                    <p className="text-slate-300 text-lg leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg text-slate-300 text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Buttons row */}
                    <div className="flex flex-wrap gap-4">
                      {/* Show View Live button for projects with live links */}
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl transition-all duration-300"
                        >
                          <Globe className="w-4 h-4" />
                          <span>View Live</span>
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                      )}

                      {/* Show View Case Study button for projects with reports */}
                      {project.hasReport && (
                        <a
                          href={project.reportLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-xl transition-all duration-300"
                        >
                          <FileText className="w-4 h-4" />
                          <span>View Case Study</span>
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

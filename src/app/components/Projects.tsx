import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { FileText, ArrowUpRight } from "lucide-react";

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const projects = [
    {
      title: "U4B Full Stack Application",
      description:
        "Single-handedly developed the complete Upcycle 4 Better mobile/web application during my internship. Built robust backend with 100% JavaScript and RESTful API architecture, frontend with 98% TypeScript for type safety. Features include user authentication, donation tracking with video verification, QR code scanning for 49+ bin locations across Malaysia, and voucher redemption system integrated with partner stores like Zalora and Best Bundle.",
      image: "/assets/projects/u4b-dashboard.png",
      tags: ["JavaScript", "TypeScript", "Full Stack", "REST API", "UI/UX Design"],
      color: "from-blue-500 to-cyan-500",
      hasReport: false,
    },
    {
      title: "CubeX Visitor Management System",
      description:
        "Comprehensive VMS serving 3+ residential properties including PJS 1, MMC Ampang, and Sri Ara Residences. Built with Google Apps Script and modern web technologies. Features include multi-property visitor registration, QR code generation for entry verification, guard verification portal, resident lookup functionality, and automated email notifications to residents upon visitor registration.",
      image: "/assets/projects/vms-home.png",
      tags: ["Google Apps Script", "VPS Hosting", "QR Code", "Web App", "Automation"],
      color: "from-purple-500 to-pink-500",
      hasReport: false,
    },
    {
      title: "Security Guard Attendance App",
      description:
        "Mobile application for security personnel to manage their attendance with GPS-verified check-ins. Features include real-time location verification ensuring guards are at assigned locations, monthly attendance summaries with hours worked tracking, detailed attendance history with check-in/out times, and seamless integration with the CubeX Admin Dashboard for supervisors to monitor guard activities.",
      image: "/assets/projects/guard-app-dashboard.png",
      tags: ["Mobile App", "GPS Verification", "Attendance", "Real-time Tracking"],
      color: "from-green-500 to-teal-500",
      hasReport: false,
    },
    {
      title: "CubeX Admin Dashboard",
      description:
        "Comprehensive security operations admin panel managing 1,247+ guards across multiple locations. Features include real-time activity feed with live check-in/out monitoring, attendance records management with GPS verification status, automated payroll calculation module handling RM330,000+ monthly, guard management system, and advanced reports & analytics with Excel/PDF/CSV export capabilities.",
      image: "/assets/projects/admin-dashboard.png",
      tags: ["React", "Dashboard", "Payroll System", "Analytics", "Admin Panel"],
      color: "from-indigo-500 to-blue-500",
      hasReport: false,
    },
    {
      title: "CubeX Home Resident App",
      description:
        "Smart living companion app for residential security management. Features OTP-based phone authentication, biometric and Face ID login options for enhanced security, visitor pre-registration allowing residents to notify guards in advance, and seamless integration with the entire CubeX security ecosystem for a unified experience.",
      image: "/assets/projects/cubex-home.png",
      tags: ["Mobile App", "Biometric Auth", "OTP", "Security", "Smart Living"],
      color: "from-emerald-500 to-green-500",
      hasReport: false,
    },
    {
      title: "UAV Communication & Mobility (FYP)",
      description:
        "Final Year Project implementing reinforcement learning algorithms and Terahertz (THz) communication for enhanced UAV communication and mobility in Flying Ad-hoc Networks (FANETs). Using NS3 network simulator to create real-life simulations of UAV mobility models. Research focuses on optimizing communication reliability and network performance in dynamic aerial environments.",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      tags: ["Machine Learning", "NS3 Simulator", "Terahertz", "Research", "UAV"],
      color: "from-violet-500 to-purple-500",
      hasReport: true,
      reportLink: "/assets/reports/UAV_FYP_Report.pdf", // Add your PDF to public/assets/reports/
    },
  ];

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
              className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent"
            >
              Featured Projects
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"
            />
          </div>

          {/* Projects grid */}
          <div className="space-y-32">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 100 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
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
                    <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-slate-700/50">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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

                    {/* Only show View Report button for FYP project */}
                    {project.hasReport && (
                      <div className="flex gap-4">
                        <a
                          href={project.reportLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-xl transition-all duration-300"
                        >
                          <FileText className="w-4 h-4" />
                          <span>View Project Report</span>
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                      </div>
                    )}
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

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Code2, Layers, Zap, Trophy, GraduationCap, Award } from "lucide-react";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { label: "Years Experience", value: "2+", icon: Trophy },
    { label: "Projects Completed", value: "10+", icon: Layers },
    { label: "Certifications", value: "4+", icon: Award },
    { label: "Lines of Code", value: "50K+", icon: Code2 },
  ];

  return (
    <section id="about" className="min-h-screen bg-slate-950 py-32 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-blue-950/30 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-950/30 to-transparent blur-3xl" />

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
              <span className="text-blue-400 text-sm uppercase tracking-widest">
                About Me
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent"
            >
              Crafting Digital Excellence
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"
            />
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 30, scale: 0.8 }
                }
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
                      <stat.icon className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                  <div className="text-4xl text-white mb-2 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-slate-400 text-sm text-center">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Content section */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border-2 border-blue-500/20">
                  <img
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                    alt="Cybersecurity Workspace"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-2xl blur-2xl -z-10" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-3xl text-white mb-4">
                Passionate About Cybersecurity & Building Secure Applications
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                As a Computer Science graduate specializing in Cybersecurity from Taylor's University, 
                I combine security expertise with full-stack development skills to build robust, 
                secure applications.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed">
                With hands-on experience in penetration testing, ethical hacking, and network defense, 
                alongside full-stack development using JavaScript and TypeScript, I bridge the gap 
                between security and development.
              </p>
              <div className="flex flex-wrap gap-3 pt-4">
                {[
                  "Python",
                  "JavaScript",
                  "TypeScript",
                  "Kali Linux",
                  "Penetration Testing",
                  "Machine Learning",
                ].map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={
                      isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
                    }
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-full text-blue-300 text-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl text-white mb-4 flex items-center justify-center gap-3">
                <GraduationCap className="w-8 h-8 text-blue-400" />
                Education
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
                    <GraduationCap className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-xl text-white mb-1">Bachelor of Computer Science (Honours)</h4>
                    <p className="text-blue-400 mb-2">Specializing in Cybersecurity</p>
                    <p className="text-slate-400">Taylor's University, Malaysia</p>
                    <p className="text-slate-500 text-sm">Jan 2022 - Jan 2026</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl">
                    <Award className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-xl text-white mb-1">Certifications & Awards</h4>
                    <ul className="text-slate-400 space-y-1 text-sm">
                      <li>• Cisco - Introduction to Cyber Security</li>
                      <li>• Java Foundations Certified</li>
                      <li>• Advanced Python for Analytics</li>
                      <li>• Dean's List Award (March 2022)</li>
                      <li>• Inter-University Tournament Champion 2024</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

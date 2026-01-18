import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      category: "Cybersecurity",
      icon: "🛡️",
      skills: [
        { name: "Penetration Testing", level: 85 },
        { name: "Kali Linux", level: 88 },
        { name: "Risk Assessment", level: 82 },
        { name: "Network Defense", level: 80 },
      ],
    },
    {
      category: "Programming",
      icon: "💻",
      skills: [
        { name: "Python", level: 90 },
        { name: "JavaScript & TypeScript", level: 88 },
        { name: "Java & C++", level: 82 },
        { name: "SQL", level: 85 },
      ],
    },
    {
      category: "Tools & Technologies",
      icon: "🔧",
      skills: [
        { name: "Git & GitHub", level: 90 },
        { name: "Google Apps Script", level: 92 },
        { name: "VPS & cPanel", level: 85 },
        { name: "Machine Learning", level: 78 },
      ],
    },
  ];

  return (
    <section id="skills" className="min-h-screen bg-slate-950 py-32 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />

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
                Expertise
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent"
            >
              Skills & Technologies
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"
            />
          </div>

          {/* Skills grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 h-full">
                  {/* Glowing effect on hover */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10" />

                  <div className="flex items-center gap-3 mb-8">
                    <div className="text-4xl">{category.icon}</div>
                    <h3 className="text-2xl text-white">{category.category}</h3>
                  </div>

                  <div className="space-y-6">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-slate-300">{skill.name}</span>
                          <span className="text-blue-400">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={
                              isInView ? { width: `${skill.level}%` } : { width: 0 }
                            }
                            transition={{
                              duration: 1.5,
                              delay:
                                categoryIndex * 0.2 + skillIndex * 0.1 + 0.5,
                              ease: "easeOut",
                            }}
                            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[length:200%_100%] rounded-full relative"
                          >
                            <motion.div
                              animate={{
                                backgroundPosition: ["0% 0%", "200% 0%"],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            />
                          </motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

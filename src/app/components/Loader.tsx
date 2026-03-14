import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "done">("loading");

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 18 + 8;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setPhase("done");
          setTimeout(onComplete, 700);
        }, 400);
      } else {
        setProgress(current);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase === "loading" && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #0a0a1a 0%, #0d0d2b 50%, #1a0a2e 100%)",
          }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 4 + 2,
                  height: Math.random() * 4 + 2,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: `rgba(${Math.random() > 0.5 ? "139,92,246" : "59,130,246"},${Math.random() * 0.6 + 0.2})`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 1, 0.2],
                }}
                transition={{
                  duration: Math.random() * 2 + 1.5,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "backOut" }}
            className="mb-12 relative"
          >
            <div
              className="text-6xl font-black tracking-tighter relative"
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #3b82f6, #a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 20px rgba(139,92,246,0.5))",
              }}
            >
              AN
            </div>
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Progress bar container */}
          <div className="w-64 relative">
            <div
              className="h-1 rounded-full overflow-hidden mb-3"
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #8b5cf6, #3b82f6, #a855f7)",
                  boxShadow: "0 0 10px rgba(139,92,246,0.8)",
                  width: `${progress}%`,
                }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            <div className="flex justify-between items-center">
              <motion.span
                className="text-xs tracking-widest uppercase"
                style={{ color: "rgba(139,92,246,0.8)" }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Loading...
              </motion.span>
              <span
                className="text-xs font-mono"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          {/* Tagline */}
          <motion.p
            className="mt-8 text-xs tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.3)" }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            Cybersecurity &amp; Full Stack Developer
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

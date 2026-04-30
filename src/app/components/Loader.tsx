import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const TAGLINES = [
  "Initializing experience",
  "Loading portfolio",
  "Booting interface",
];

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "done">("loading");
  const [taglineIdx, setTaglineIdx] = useState(0);

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

  // Cycle the tagline so it doesn't feel static while loading
  useEffect(() => {
    const id = setInterval(() => {
      setTaglineIdx((i) => (i + 1) % TAGLINES.length);
    }, 1200);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {phase === "loading" && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, #06061a 0%, #0d0d2b 40%, #1a0a2e 70%, #2d1654 100%)",
          }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 24 }).map((_, i) => (
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

          {/* Logo: name + concentric orbital rings (continuity with hero) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="mb-12 relative flex items-center justify-center"
            style={{ width: 220, height: 140 }}
          >
            {/* Outer ring */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 200,
                height: 200,
                border: "1px solid rgba(139,92,246,0.30)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            >
              <span
                style={{
                  position: "absolute",
                  top: -3,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#a78bfa",
                  boxShadow: "0 0 12px rgba(167,139,250,0.9)",
                }}
              />
            </motion.div>
            {/* Inner ring (counter-rotating) */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 140,
                height: 140,
                border: "1px solid rgba(59,130,246,0.25)",
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
            >
              <span
                style={{
                  position: "absolute",
                  bottom: -2,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "#60a5fa",
                  boxShadow: "0 0 10px rgba(96,165,250,0.9)",
                }}
              />
            </motion.div>

            {/* Soft halo */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 180,
                height: 180,
                background:
                  "radial-gradient(circle, rgba(139,92,246,0.30) 0%, transparent 65%)",
                filter: "blur(18px)",
              }}
              animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            />

            {/* Wordmark */}
            <div
              className="relative font-black tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2.6rem",
                lineHeight: 1,
                background:
                  "linear-gradient(135deg, #60a5fa, #a78bfa, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 22px rgba(139,92,246,0.55))",
              }}
            >
              Azwad
            </div>
          </motion.div>

          {/* Progress bar container */}
          <div className="w-64 relative">
            <div
              className="h-1 rounded-full overflow-hidden mb-3"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #7c3aed, #8b5cf6, #3b82f6)",
                  boxShadow: "0 0 12px rgba(139,92,246,0.8)",
                  width: `${progress}%`,
                }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            <div className="flex justify-between items-center">
              <div className="relative h-4 overflow-hidden" style={{ width: 160 }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={taglineIdx}
                    className="absolute inset-0 text-xs tracking-widest uppercase"
                    style={{
                      color: "rgba(167,139,250,0.85)",
                      fontFamily: "var(--font-display)",
                    }}
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -14, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {TAGLINES[taglineIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span
                className="text-xs"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

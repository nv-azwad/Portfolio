import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface SectionTransitionProps {
  /**
   * The accent color of the *next* section. Used by the sweep beam, the
   * label pill, and the directional glow trail. Examples: mint `#5DCAA5`,
   * peach `#F0997B`.
   */
  accent: string;
  /** Short uppercase label that rises into view as the beam clears. */
  label?: string;
  /**
   * `full` = the headline-grade transition with horizontal scan beam, glow
   *          trail, label rise, and 3D tilt.
   * `subtle` = just the background temperature crossfade (no beam, no label).
   */
  variant?: "full" | "subtle";
}

/**
 * SectionTransition — the seam between two sections.
 *
 * Mounted *between* sections in the JSX tree, it occupies ~120vh of scroll
 * and uses scroll progress to choreograph a temperature shift, an optional
 * scan beam, and a label that rises with a slight 3D lift. All transforms
 * are GPU-friendly (transform/opacity only).
 *
 * Designed in pairs:
 *  - About → Projects: variant="subtle" (just bg shift)
 *  - Projects → Skills: variant="full" (the headline moment)
 */
export function SectionTransition({
  accent,
  label,
  variant = "full",
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Beam: pinned to scroll position. Sweeps left → right between 0.32 and 0.62.
  const beamX = useTransform(scrollYProgress, [0.32, 0.62], ["-15%", "115%"]);
  const beamOpacity = useTransform(
    scrollYProgress,
    [0.28, 0.36, 0.58, 0.66],
    [0, 1, 1, 0]
  );
  const beamScaleX = useTransform(
    scrollYProgress,
    [0.32, 0.46, 0.62],
    [0.4, 1, 0.6]
  );

  // Label: rises up *behind* the beam with a 3D tilt that resolves to flat.
  const labelY = useTransform(scrollYProgress, [0.5, 0.8], [40, 0]);
  const labelRotateX = useTransform(scrollYProgress, [0.5, 0.8], [25, 0]);
  const labelOpacity = useTransform(scrollYProgress, [0.5, 0.7, 1], [0, 1, 1]);

  // Trail: a soft fading rectangle behind the beam suggests "where it's been"
  const trailOpacity = useTransform(
    scrollYProgress,
    [0.32, 0.5, 0.7],
    [0, 0.5, 0]
  );

  const isFull = variant === "full";

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: "relative",
        height: isFull ? "60vh" : "30vh",
        overflow: "hidden",
        // Crossfade base: dark, neutral. Per-section temperature lives in the
        // sections themselves; this seam just provides scroll real estate.
        background:
          "linear-gradient(180deg, transparent 0%, rgba(8,8,24,0.65) 35%, rgba(8,8,24,0.85) 65%, transparent 100%)",
        perspective: "1200px",
        pointerEvents: "none",
      }}
    >
      {/* Soft directional glow that grows toward the seam — ambient cue */}
      <motion.div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "140%",
          height: "70%",
          translateX: "-50%",
          translateY: "-50%",
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${accent}1f 0%, transparent 70%)`,
          filter: "blur(40px)",
          opacity: useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0, 0.85, 0]),
        }}
      />

      {isFull && (
        <>
          {/* Trail behind the beam */}
          <motion.div
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              translateY: "-50%",
              width: "100%",
              height: 2,
              background: `linear-gradient(90deg, transparent 0%, ${accent}66 50%, transparent 100%)`,
              filter: "blur(2px)",
              opacity: trailOpacity,
            }}
          />

          {/* The scan beam itself — sharp, narrow, glowing */}
          <motion.div
            style={{
              position: "absolute",
              top: "50%",
              translateY: "-50%",
              left: beamX,
              scaleX: beamScaleX,
              opacity: beamOpacity,
              width: 320,
              height: 2,
              background: `linear-gradient(90deg, transparent 0%, ${accent} 40%, #ffffff 50%, ${accent} 60%, transparent 100%)`,
              boxShadow: `0 0 24px ${accent}, 0 0 48px ${accent}88, 0 0 80px ${accent}44`,
              borderRadius: 9999,
              transformOrigin: "center",
              willChange: "transform, opacity",
            }}
          />

          {/* Tiny "leading edge" particle that rides the beam */}
          <motion.div
            style={{
              position: "absolute",
              top: "50%",
              translateY: "-50%",
              left: beamX,
              opacity: beamOpacity,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#ffffff",
              boxShadow: `0 0 18px ${accent}, 0 0 32px ${accent}`,
              willChange: "transform, opacity",
            }}
          />

          {/* Label that rises behind the beam */}
          {label && (
            <motion.div
              style={{
                position: "absolute",
                left: "50%",
                top: "calc(50% + 36px)",
                translateX: "-50%",
                y: labelY,
                rotateX: labelRotateX,
                opacity: labelOpacity,
                transformOrigin: "50% 0%",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "0.7rem",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: accent,
                whiteSpace: "nowrap",
                willChange: "transform, opacity",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "6px 14px",
                  borderRadius: 9999,
                  background: `${accent}14`,
                  border: `1px solid ${accent}55`,
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
              >
                {label}
              </span>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}

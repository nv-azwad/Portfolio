import { motion } from "motion/react";

/**
 * WorkspaceSVG — animated line-art replacement for the stock cybersecurity
 * workspace photo in the About section. Pure SVG, draws in on viewport entry,
 * with a slow-running radar pulse + binary stream that gives it ambient life.
 *
 * Design intent: Isometric desk scene — primary monitor with a code editor,
 * secondary monitor with a network scan, terminal, keyboard, and a coffee mug.
 * Restrained line-art (no fills), single accent color with a violet glow.
 */
export function WorkspaceSVG() {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.2, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.3, delay: i * 0.06 },
      },
    }),
  };

  const stroke = "rgba(167,139,250,0.85)";
  const strokeFaint = "rgba(167,139,250,0.45)";
  const accentBlue = "rgba(96,165,250,0.85)";

  return (
    <div
      className="relative w-full h-full"
      style={{
        background:
          "radial-gradient(ellipse at 30% 30%, rgba(139,92,246,0.18) 0%, transparent 60%)",
      }}
    >
      <svg
        viewBox="0 0 480 320"
        width="100%"
        height="100%"
        style={{ display: "block" }}
        aria-label="Illustrated cybersecurity workspace"
      >
        {/* ── Subtle floor grid ───────────────────────────────── */}
        <defs>
          <pattern
            id="floor-grid"
            x="0"
            y="0"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
            patternTransform="skewX(-30) scale(1, 0.45)"
          >
            <path
              d="M0 0 L24 0 M0 0 L0 24"
              fill="none"
              stroke="rgba(139,92,246,0.10)"
              strokeWidth="0.6"
            />
          </pattern>
          <linearGradient id="screen-glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(96,165,250,0.18)" />
            <stop offset="100%" stopColor="rgba(139,92,246,0.04)" />
          </linearGradient>
        </defs>

        <rect
          x="0"
          y="200"
          width="480"
          height="120"
          fill="url(#floor-grid)"
          opacity="0.6"
        />

        {/* ── Primary monitor (center-back, code editor) ───────────── */}
        <motion.g
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          {/* Stand */}
          <motion.path
            custom={9}
            variants={draw}
            d="M210 215 L210 235 L180 250 L300 250 L270 235 L270 215"
            fill="none"
            stroke={strokeFaint}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          {/* Bezel */}
          <motion.rect
            custom={1}
            variants={draw}
            x="150"
            y="80"
            width="180"
            height="130"
            rx="6"
            fill="none"
            stroke={stroke}
            strokeWidth="1.6"
          />
          {/* Screen fill (subtle gradient) */}
          <motion.rect
            custom={2}
            variants={draw}
            x="156"
            y="86"
            width="168"
            height="118"
            rx="3"
            fill="url(#screen-glow)"
            stroke="rgba(139,92,246,0.35)"
            strokeWidth="0.8"
          />
          {/* Code lines on screen */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const widths = [56, 92, 78, 110, 64, 88, 50];
            const xs = [166, 172, 172, 172, 178, 172, 178];
            return (
              <motion.rect
                key={i}
                custom={3 + i * 0.2}
                variants={draw}
                x={xs[i]}
                y={94 + i * 14}
                width={widths[i]}
                height="2.4"
                rx="1"
                fill="none"
                stroke={i === 3 ? accentBlue : strokeFaint}
                strokeWidth="2.2"
              />
            );
          })}
          {/* Caret */}
          <motion.rect
            x="282"
            y="135"
            width="2"
            height="6"
            fill="rgba(96,165,250,0.95)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: 1.6 }}
          />
        </motion.g>

        {/* ── Secondary monitor (right, network scan) ─────────────── */}
        <motion.g
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.path
            custom={10}
            variants={draw}
            d="M380 218 L380 232 L362 240 L420 240 L402 232 L402 218"
            fill="none"
            stroke={strokeFaint}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <motion.rect
            custom={5}
            variants={draw}
            x="346"
            y="118"
            width="92"
            height="100"
            rx="5"
            fill="none"
            stroke={stroke}
            strokeWidth="1.4"
          />
          <motion.rect
            custom={6}
            variants={draw}
            x="350"
            y="122"
            width="84"
            height="92"
            rx="2"
            fill="rgba(96,165,250,0.06)"
            stroke="rgba(139,92,246,0.30)"
            strokeWidth="0.6"
          />
          {/* Radar concentric circles */}
          <g transform="translate(392, 168)">
            {[10, 18, 26, 34].map((r, i) => (
              <motion.circle
                key={r}
                cx="0"
                cy="0"
                r={r}
                fill="none"
                stroke="rgba(139,92,246,0.40)"
                strokeWidth="0.7"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: [0, 0.7, 0], scale: [0.6, 1.3, 1.6] }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  delay: 1.6 + i * 0.5,
                  ease: "easeOut",
                }}
              />
            ))}
            <motion.circle
              cx="0"
              cy="0"
              r="2.2"
              fill="rgba(96,165,250,0.95)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.4 }}
            />
            {/* Sweep arm */}
            <motion.line
              x1="0"
              y1="0"
              x2="34"
              y2="0"
              stroke="rgba(167,139,250,0.65)"
              strokeWidth="0.9"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ rotate: [0, 360], opacity: [0, 0.8, 0.8, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: 2,
                ease: "linear",
              }}
              style={{ transformOrigin: "0 0" }}
            />
          </g>
        </motion.g>

        {/* ── Desk surface ───────────────────────────────── */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          d="M40 250 L440 250"
          stroke={stroke}
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />

        {/* ── Keyboard (foreground center) ─────────────────────────── */}
        <motion.g
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.rect
            custom={12}
            variants={draw}
            x="170"
            y="258"
            width="140"
            height="22"
            rx="3"
            fill="none"
            stroke={stroke}
            strokeWidth="1.4"
          />
          {[0, 1, 2].map((row) =>
            Array.from({ length: 11 }).map((_, col) => (
              <motion.rect
                key={`${row}-${col}`}
                custom={13 + (row * 11 + col) * 0.02}
                variants={draw}
                x={174 + col * 12}
                y={261 + row * 6.5}
                width="9"
                height="4.5"
                rx="0.8"
                fill="none"
                stroke={strokeFaint}
                strokeWidth="0.6"
              />
            ))
          )}
        </motion.g>

        {/* ── Coffee mug (left foreground) ─────────────────────────── */}
        <motion.g
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.path
            custom={14}
            variants={draw}
            d="M70 240 L70 275 Q70 282 78 282 L102 282 Q110 282 110 275 L110 240 Z"
            fill="none"
            stroke={stroke}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <motion.path
            custom={15}
            variants={draw}
            d="M110 248 Q124 250 124 260 Q124 270 110 272"
            fill="none"
            stroke={stroke}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          {/* Steam — warm amber/peach. Reads thermally hot, contrast pop. */}
          {[0, 1, 2].map((i) => (
            <motion.path
              key={i}
              d={`M${82 + i * 8} 230 q4 -10 -4 -16 q-4 -6 4 -12`}
              fill="none"
              stroke="rgba(240,153,123,0.65)"
              strokeWidth="0.9"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1, 0],
                opacity: [0, 0.85, 0.85, 0],
                y: [0, -8],
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                delay: 1.8 + i * 0.4,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.g>

        {/* ── Shield emblem (right foreground, tucked behind monitor) */}
        <motion.g
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.path
            custom={18}
            variants={draw}
            d="M62 116 L62 144 Q62 158 78 164 Q94 158 94 144 L94 116 Q78 110 62 116 Z"
            fill="rgba(139,92,246,0.06)"
            stroke={stroke}
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          {/* Shield check — mint-green, semantically "secure / verified" */}
          <motion.path
            custom={19}
            variants={draw}
            d="M70 138 L76 144 L86 130"
            fill="none"
            stroke="#5DCAA5"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 0 4px rgba(93,202,165,0.6))" }}
          />
        </motion.g>

        {/* ── Floating "binary" stream rising from desk ───────────── */}
        {/* One bit pair colored mint as a deliberate contrast accent */}
        {[
          { x: 240, delay: 2, fill: "rgba(167,139,250,0.55)" },
          { x: 290, delay: 2.6, fill: "rgba(167,139,250,0.55)" },
          { x: 195, delay: 3.2, fill: "rgba(93,202,165,0.75)" },
          { x: 340, delay: 2.4, fill: "rgba(167,139,250,0.55)" },
        ].map((b, i) => (
          <motion.text
            key={i}
            x={b.x}
            y="248"
            fontSize="6"
            fontFamily="var(--font-mono, monospace)"
            fill={b.fill}
            initial={{ opacity: 0, y: 248 }}
            animate={{ opacity: [0, 0.9, 0], y: [248, 220] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              delay: b.delay,
              ease: "easeOut",
            }}
          >
            {i % 2 === 0 ? "01" : "10"}
          </motion.text>
        ))}

        {/* ── Corner brackets (continuity with photo treatment) ───── */}
        {[
          { x: 8, y: 8, d: "M0 14 L0 0 L14 0" },
          { x: 472, y: 8, d: "M0 0 L14 0 L14 14", flip: true },
          { x: 8, y: 312, d: "M0 0 L0 14 L14 14" },
          { x: 472, y: 312, d: "M0 14 L14 14 L14 0", flip: true },
        ].map((c, i) => (
          <motion.path
            key={i}
            d={c.d}
            transform={`translate(${c.x - (c.flip ? 14 : 0)}, ${c.y - (c.y > 200 ? 14 : 0)})`}
            fill="none"
            stroke="rgba(139,92,246,0.65)"
            strokeWidth="1.6"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 1.4 }}
          />
        ))}
      </svg>
    </div>
  );
}

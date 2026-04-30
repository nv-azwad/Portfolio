import { useEffect, useRef, useState } from "react";

/**
 * CodePanel — a styled "IDE window" that renders code as the visual hero
 * for a project card. Used in place of stock photography for projects whose
 * value is the code itself (AI Engineering Portfolio, UAV FANET FYP).
 *
 * Renders:
 *  - macOS-style window chrome (traffic lights + filename tab)
 *  - Line-numbered code with simple token coloring
 *  - A blinking caret on the last line
 *  - Optional ambient gradient glow behind the panel
 */

export interface CodeLine {
  /** Raw text — used when no `tokens` are provided. */
  text?: string;
  /** Token segments for color highlighting. Falls back to `text`. */
  tokens?: { kind: TokenKind; value: string }[];
}

type TokenKind =
  | "plain"
  | "keyword"
  | "string"
  | "comment"
  | "function"
  | "type"
  | "number"
  | "operator"
  | "punct";

interface CodePanelProps {
  filename: string;
  language?: string;
  accent?: string;
  lines: CodeLine[];
  /** Auto-type the lines on intersection. Default true. */
  typewriter?: boolean;
}

const TOKEN_COLORS: Record<TokenKind, string> = {
  plain: "rgba(255,255,255,0.85)",
  keyword: "#c084fc",
  string: "#86efac",
  comment: "rgba(255,255,255,0.35)",
  function: "#60a5fa",
  type: "#a78bfa",
  number: "#fbbf24",
  operator: "rgba(255,255,255,0.55)",
  punct: "rgba(255,255,255,0.55)",
};

function lineToHTML(line: CodeLine): JSX.Element {
  if (line.tokens && line.tokens.length > 0) {
    return (
      <>
        {line.tokens.map((t, i) => (
          <span key={i} style={{ color: TOKEN_COLORS[t.kind] }}>
            {t.value}
          </span>
        ))}
      </>
    );
  }
  return <span style={{ color: TOKEN_COLORS.plain }}>{line.text ?? ""}</span>;
}

export function CodePanel({
  filename,
  language = "ts",
  accent = "#8b5cf6",
  lines,
  typewriter = true,
}: CodePanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(typewriter ? 0 : lines.length);

  useEffect(() => {
    if (!typewriter) return;
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const run = () => {
      let i = 0;
      const tick = () => {
        if (cancelled) return;
        i += 1;
        setRevealed(i);
        if (i < lines.length) {
          timer = setTimeout(tick, 90 + Math.random() * 110);
        }
      };
      timer = setTimeout(tick, 200);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          observer.unobserve(el);
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      observer.disconnect();
    };
  }, [typewriter, lines.length]);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: 320,
        borderRadius: 16,
        overflow: "hidden",
        background:
          "linear-gradient(160deg, rgba(13,13,43,0.95) 0%, rgba(8,8,24,0.98) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: `0 30px 60px rgba(0,0,0,0.45), 0 0 0 1px ${accent}22`,
      }}
    >
      {/* Ambient glow behind panel */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: -40,
          background: `radial-gradient(ellipse at 30% 0%, ${accent}26, transparent 60%)`,
          pointerEvents: "none",
        }}
      />

      {/* Window chrome */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <span style={dot("#ff5f57")} />
        <span style={dot("#febc2e")} />
        <span style={dot("#28c840")} />
        <span
          style={{
            marginLeft: 14,
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.02em",
          }}
        >
          {filename}
        </span>
        <span
          style={{
            marginLeft: "auto",
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            color: "rgba(255,255,255,0.35)",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
          }}
        >
          {language}
        </span>
      </div>

      {/* Code body */}
      <div
        style={{
          position: "relative",
          padding: "18px 0 22px 0",
          fontFamily: "var(--font-mono)",
          fontSize: "0.78rem",
          lineHeight: 1.7,
          color: TOKEN_COLORS.plain,
        }}
      >
        {lines.slice(0, revealed).map((line, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 14,
              padding: "0 18px",
              opacity: 0,
              animation: `code-fade-in 0.25s var(--ease-out) ${i * 0.03}s forwards`,
              whiteSpace: "pre",
            }}
          >
            <span
              style={{
                color: "rgba(255,255,255,0.22)",
                width: 22,
                textAlign: "right",
                userSelect: "none",
              }}
            >
              {i + 1}
            </span>
            <span style={{ flex: 1, minWidth: 0 }}>
              {lineToHTML(line)}
              {i === revealed - 1 && revealed < lines.length && (
                <span
                  style={{
                    display: "inline-block",
                    width: 7,
                    height: "0.95em",
                    marginLeft: 2,
                    background: accent,
                    verticalAlign: "text-bottom",
                    animation: "blink 0.9s infinite",
                  }}
                />
              )}
            </span>
          </div>
        ))}
        {/* Persistent caret on the last revealed line once typing finishes */}
      </div>

      <style>{`
        @keyframes code-fade-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function dot(color: string): React.CSSProperties {
  return {
    width: 11,
    height: 11,
    borderRadius: "50%",
    background: color,
    display: "inline-block",
  };
}

import { useEffect, useRef, useState } from "react";

type CursorMode = "default" | "hover" | "click";

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const pos = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number>(0);

  const [mode, setMode] = useState<CursorMode>("default");
  const [label, setLabel] = useState("");

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onDown = () => setMode("click");
    const onUp = () => setMode((m) => (m === "click" ? "hover" : m));

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const el =
        t.closest("a") ||
        t.closest("button") ||
        t.closest("[data-cursor]") ||
        (t.tagName === "A" ? t : null) ||
        (t.tagName === "BUTTON" ? t : null);

      if (el) {
        setMode("hover");
        const txt = (el as HTMLElement).dataset.cursor || "";
        setLabel(txt);
      } else if (mode !== "click") {
        setMode("default");
        setLabel("");
      }
    };

    const animate = () => {
      // 10% lerp per frame for ring
      const lag = 0.1;
      ringPos.current.x += (pos.current.x - ringPos.current.x) * lag;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * lag;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(14px, -50%)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
    };
  }, [mode]);

  const isHover = mode === "hover";
  const isClick = mode === "click";

  // v3 spec: dot 8 default → 14 hover; ring 32 default → 52 hover
  const dotSize = isHover ? 14 : isClick ? 5 : 8;
  const ringSize = isHover ? 52 : isClick ? 28 : 32;
  const ringBorder = isHover
    ? "1.5px solid rgba(59,130,246,0.6)"
    : "1.5px solid rgba(139,92,246,0.6)";
  const ringBg = isHover ? "rgba(59,130,246,0.05)" : "transparent";
  const ringGlow = isHover
    ? "0 0 24px rgba(59,130,246,0.4)"
    : "0 0 8px rgba(139,92,246,0.3)";
  const dotBg = isHover ? "#3b82f6" : "#8b5cf6";

  return (
    <>
      {/* Lagging ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: ringSize,
          height: ringSize,
          borderRadius: "50%",
          border: ringBorder,
          background: ringBg,
          boxShadow: ringGlow,
          opacity: isClick ? 0.4 : 1,
          transition:
            "width 0.2s ease, height 0.2s ease, border 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, opacity 0.15s ease",
        }}
      />

      {/* Sharp dot — mix-blend-mode: screen */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: dotSize,
          height: dotSize,
          borderRadius: "50%",
          background: dotBg,
          mixBlendMode: "screen",
          boxShadow: isHover
            ? "0 0 12px rgba(59,130,246,0.9), 0 0 24px rgba(59,130,246,0.4)"
            : "0 0 8px rgba(139,92,246,0.9)",
          transition:
            "width 0.18s ease, height 0.18s ease, background 0.18s ease, box-shadow 0.18s ease",
        }}
      />

      {/* Contextual label */}
      {label && (
        <div
          ref={labelRef}
          className="fixed top-0 left-0 pointer-events-none z-[9999] px-2 py-0.5 rounded-md whitespace-nowrap"
          style={{
            background: "rgba(124,58,237,0.85)",
            color: "#fff",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(124,58,237,0.5)",
            fontSize: 10,
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            letterSpacing: "0.04em",
          }}
        >
          {label}
        </div>
      )}
    </>
  );
}

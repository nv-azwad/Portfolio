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

  const ringSize = isHover ? 52 : isClick ? 28 : 36;
  const ringBorder = isHover ? "2px solid #a855f7" : "1.5px solid rgba(139,92,246,0.7)";
  const ringBg = isHover ? "rgba(168,85,247,0.08)" : "transparent";
  const ringGlow = isHover
    ? "0 0 24px rgba(168,85,247,0.5), 0 0 48px rgba(168,85,247,0.2)"
    : "0 0 8px rgba(139,92,246,0.3)";

  return (
    <>
      {/* Outer lagging ring */}
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
          transition: "width 0.2s ease, height 0.2s ease, border 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, opacity 0.15s ease",
        }}
      />

      {/* Sharp inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: isHover ? 6 : 7,
          height: isHover ? 6 : 7,
          borderRadius: "50%",
          background: isHover ? "#c084fc" : "#8b5cf6",
          boxShadow: isHover
            ? "0 0 10px rgba(192,132,252,1), 0 0 20px rgba(192,132,252,0.4)"
            : "0 0 6px rgba(139,92,246,0.8)",
          transition: "width 0.15s ease, height 0.15s ease, background 0.15s ease, box-shadow 0.15s ease",
        }}
      />

      {/* Contextual label */}
      {label && (
        <div
          ref={labelRef}
          className="fixed top-0 left-0 pointer-events-none z-[9999] px-2 py-0.5 rounded-md text-xs font-medium whitespace-nowrap"
          style={{
            background: "rgba(139,92,246,0.85)",
            color: "#fff",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(168,85,247,0.5)",
            fontSize: 10,
          }}
        >
          {label}
        </div>
      )}
    </>
  );
}

import { useRef, useState, ReactNode, CSSProperties } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  intensity?: number;
  glowColor?: string;
  borderGlow?: boolean;
}

export function TiltCard({
  children,
  className = "",
  style = {},
  intensity = 8,
  glowColor = "rgba(139,92,246,0.15)",
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    const rx = (e.clientX - rect.left) / rect.width - 0.5;
    const ry = (e.clientY - rect.top) / rect.height - 0.5;
    setSpotlight({ x: px, y: py, opacity: 1 });
    setTilt({ x: ry * -intensity, y: rx * intensity });
  };

  const handleMouseLeave = () => {
    setSpotlight((s) => ({ ...s, opacity: 0 }));
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  const handleMouseEnter = () => setHovered(true);

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${hovered ? 1.02 : 1}, ${hovered ? 1.02 : 1}, 1)`,
        transition: "transform 0.15s ease",
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {/* Spotlight radial gradient */}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none z-10 overflow-hidden"
        style={{
          background: `radial-gradient(250px circle at ${spotlight.x}% ${spotlight.y}%, ${glowColor}, transparent 70%)`,
          opacity: spotlight.opacity,
          transition: "opacity 0.3s ease",
        }}
      />
      {children}
    </div>
  );
}

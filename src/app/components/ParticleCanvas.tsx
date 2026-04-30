import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
}

const PARTICLE_COLORS = [
  "rgba(124,58,237,",
  "rgba(59,130,246,",
  "rgba(139,92,246,",
];

const PARTICLE_COUNT = 90;
const REPEL_RADIUS = 140;
const LINK_RADIUS = 110;

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Respect the user's OS-level reduce-motion preference. Skip the
    // entire animation loop — leaves the canvas as a transparent overlay
    // so the hero gradient stays clean.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let width = 0;
    let height = 0;
    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      const arr: Particle[] = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        arr.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          r: 0.5 + Math.random() * 1.4,
          color:
            PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        });
      }
      particlesRef.current = arr;
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      const ps = particlesRef.current;
      const m = mouseRef.current;

      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];

        if (m.active) {
          const dx = p.x - m.x;
          const dy = p.y - m.y;
          const d = Math.hypot(dx, dy);
          if (d < REPEL_RADIUS && d > 0) {
            const force = 0.025 * (1 - d / REPEL_RADIUS);
            p.vx += (dx / d) * force * 4;
            p.vy += (dy / d) * force * 4;
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Wrap edges
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.beginPath();
        ctx.fillStyle = p.color + "0.75)";
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Connect nearby particles
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const a = ps[i];
          const b = ps[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK_RADIUS) {
            const alpha = 0.18 * (1 - d / LINK_RADIUS);
            ctx.strokeStyle = `rgba(124,58,237,${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };

    resize();
    seed();
    tick();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

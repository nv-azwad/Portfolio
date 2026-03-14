import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { CustomCursor } from "./components/CustomCursor";
import { Loader } from "./components/Loader";
import { Navbar } from "@/app/components/Navbar";
import { Hero } from "@/app/components/Hero";
import { About } from "@/app/components/About";
import { Projects } from "@/app/components/Projects";
import { Skills } from "@/app/components/Skills";
import { Contact } from "@/app/components/Contact";

export default function App() {
  const [loading, setLoading] = useState(true);

  // Hide default cursor on desktop
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      * { cursor: none !important; }
      @media (max-width: 768px) { * { cursor: auto !important; } }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div
      className="relative min-h-screen"
      style={{ background: "#06061a", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Custom cursor - desktop only */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>

      {/* Loader */}
      <AnimatePresence>
        {loading && (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main content */}
      {!loading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
          </main>
        </>
      )}
    </div>
  );
}

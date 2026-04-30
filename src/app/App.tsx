import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { CustomCursor } from "@/app/components/CustomCursor";
import { Loader } from "@/app/components/Loader";
import { Navbar } from "@/app/components/Navbar";
import { Hero } from "@/app/components/Hero";
import { About } from "@/app/components/About";
import { Projects } from "@/app/components/Projects";
import { Skills } from "@/app/components/Skills";
import { Contact } from "@/app/components/Contact";

export default function App() {
  const [loading, setLoading] = useState(true);

  // Hide default cursor on desktop so the custom cursor is the only one visible.
  // Inputs/textareas/selectable text keep their native cursors so the form
  // and any selectable copy remain usable.
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      * { cursor: none !important; }
      input, textarea, select, [contenteditable="true"] { cursor: text !important; }
      input[type="checkbox"], input[type="radio"], input[type="submit"], input[type="button"], input[type="reset"] { cursor: none !important; }
      @media (max-width: 768px) {
        * { cursor: auto !important; }
        input, textarea, select, [contenteditable="true"] { cursor: text !important; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div
      className="relative min-h-screen"
      style={{
        background: "var(--bg-primary)",
        fontFamily: "var(--font-body)",
        color: "var(--text-primary)",
      }}
    >
      <div className="hidden md:block">
        <CustomCursor />
      </div>

      <AnimatePresence>
        {loading && (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

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

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, Linkedin, Mail, ArrowUp, FileDown } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { TiltCard } from "./TiltCard";
import { useCopyEmail } from "./useCopyEmail";

const footerSocials = [
  { icon: Github, label: "GitHub", href: "https://github.com/nv-azwad" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/azwad-jilani/" },
  { icon: Mail, label: "Email", href: "mailto:jilaniazwad@gmail.com" },
];

const FOOTER_SOCIAL_STYLE: React.CSSProperties = {
  width: 38,
  height: 38,
  borderRadius: 10,
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "rgba(255,255,255,0.5)",
};

const FOOTER_SOCIAL_HOVER = {
  y: -3,
  scale: 1.08,
  borderColor: "rgba(139,92,246,0.45)",
  color: "#c084fc",
  backgroundColor: "rgba(139,92,246,0.10)",
};

function FooterSocialIcon({ social }: { social: (typeof footerSocials)[number] }) {
  const Icon = social.icon;
  const isMail = social.href.startsWith("mailto:");
  const email = isMail ? social.href.replace("mailto:", "") : "";
  const { copied, copy } = useCopyEmail(email);

  if (isMail) {
    return (
      <motion.button
        type="button"
        onClick={copy}
        title={copied ? "Email copied!" : "Copy email"}
        data-cursor={copied ? "Copied!" : social.label}
        className="relative flex items-center justify-center"
        style={FOOTER_SOCIAL_STYLE}
        whileHover={FOOTER_SOCIAL_HOVER}
        transition={{ duration: 0.25 }}
      >
        <Icon className="w-[16px] h-[16px]" />
        <AnimatePresence>
          {copied && (
            <motion.span
              initial={{ opacity: 0, y: 6, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.85 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "absolute",
                bottom: "calc(100% + 8px)",
                left: "50%",
                translateX: "-50%",
                padding: "5px 10px",
                borderRadius: 8,
                fontFamily: "var(--font-display)",
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#c4b5fd",
                background: "rgba(10,10,36,0.95)",
                border: "1px solid rgba(139,92,246,0.5)",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
              }}
            >
              Copied!
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    );
  }

  return (
    <motion.a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      title={social.label}
      data-cursor={social.label}
      className="flex items-center justify-center"
      style={FOOTER_SOCIAL_STYLE}
      whileHover={FOOTER_SOCIAL_HOVER}
      transition={{ duration: 0.25 }}
    >
      <Icon className="w-[16px] h-[16px]" />
    </motion.a>
  );
}

const contactInfo = [
  { icon: "✉️", label: "Email", value: "jilaniazwad@gmail.com", href: "mailto:jilaniazwad@gmail.com", color: "#7c3aed" },
  { icon: "📞", label: "Phone", value: "+60 16-612 9670", href: "tel:+60166129670", color: "#3b82f6" },
  { icon: "📍", label: "Location", value: "Dhaka, Bangladesh", href: "#", color: "#a78bfa" },
];

function RippleButton({ children, type = "button", disabled, onClick }: {
  children: React.ReactNode; type?: "button" | "submit"; disabled?: boolean; onClick?: () => void;
}) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [hovered, setHovered] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const id = Date.now();
    setRipples((p) => [...p, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((p) => p.filter((r) => r.id !== id)), 700);
    onClick?.();
  };

  return (
    <motion.button
      ref={btnRef}
      type={type}
      disabled={disabled}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-full py-3.5 rounded-xl text-sm font-medium text-white overflow-hidden"
      style={{
        background: disabled ? "rgba(139,92,246,0.3)" : "linear-gradient(135deg, #7c3aed, #6d28d9)",
        border: "1px solid rgba(139,92,246,0.4)",
      }}
      whileHover={!disabled ? { scale: 1.015, boxShadow: "0 0 32px rgba(139,92,246,0.45)" } : {}}
      whileTap={!disabled ? { scale: 0.975 } : {}}
      data-cursor="Send"
    >
      <motion.div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}
        animate={{ opacity: hovered && !disabled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      {hovered && !disabled && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)" }}
          initial={{ x: "-120%" }}
          animate={{ x: "120%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      )}
      {ripples.map((r) => (
        <motion.div
          key={r.id}
          className="absolute rounded-full pointer-events-none"
          style={{ left: r.x, top: r.y, background: "rgba(255,255,255,0.28)", transform: "translate(-50%,-50%)" }}
          initial={{ width: 0, height: 0, opacity: 0.8 }}
          animate={{ width: 320, height: 320, opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

function FloatingInput({ label, type = "text", name, placeholder, value, onChange, textarea }: {
  label: string; type?: string; name: string; placeholder: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; textarea?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const commonStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.04)",
    border: `1px solid ${focused ? "rgba(139,92,246,0.65)" : "rgba(255,255,255,0.09)"}`,
    boxShadow: focused ? "0 0 22px rgba(139,92,246,0.12), inset 0 0 12px rgba(139,92,246,0.04)" : "none",
    color: "rgba(255,255,255,0.9)",
    outline: "none",
    transition: "border-color 0.25s, box-shadow 0.25s",
    width: "100%",
  };

  return (
    <div className="relative">
      <label
        className="block text-xs mb-2 transition-colors duration-200"
        style={{ color: focused ? "#a78bfa" : "rgba(255,255,255,0.45)" }}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={5}
          className="px-4 py-3 rounded-xl text-sm resize-none"
          style={commonStyle}
          required
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="px-4 py-3 rounded-xl text-sm"
          style={commonStyle}
          required
        />
      )}
      <motion.div
        className="absolute bottom-0 left-0 h-px rounded-full pointer-events-none"
        style={{ background: "linear-gradient(90deg, #8b5cf6, #3b82f6)" }}
        animate={{ width: focused ? "100%" : "0%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </div>
  );
}

function ContactCard({ info, index }: { info: (typeof contactInfo)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const isEmail = info.label === "Email";
  const { copied, copy } = useCopyEmail(isEmail ? info.value : "");

  const handleClick = (e: React.MouseEvent) => {
    if (isEmail) copy(e);
  };

  return (
    <motion.a
      href={info.href}
      onClick={handleClick}
      className="relative flex items-center gap-4 p-4 rounded-2xl overflow-hidden group"
      style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${hovered ? `${info.color}45` : "rgba(255,255,255,0.07)"}`, transition: "border-color 0.25s" }}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 + 0.2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ x: 5, boxShadow: `0 0 24px ${info.color}14` }}
      data-cursor={isEmail ? (copied ? "Copied!" : "Copy") : "Contact"}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `linear-gradient(90deg, ${info.color}0c, transparent)`, originX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      <motion.div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 relative z-10"
        style={{ background: `${info.color}20` }}
        animate={hovered ? { scale: 1.12, rotate: [0, -8, 8, 0] } : { scale: 1, rotate: 0 }}
        transition={{ duration: 0.35 }}
      >
        {info.icon}
      </motion.div>

      <div className="relative z-10 flex-1 min-w-0">
        <p className="text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.38)" }}>{info.label}</p>
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.p
              key="copied"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="text-sm truncate"
              style={{ color: info.color, fontWeight: 600 }}
            >
              Email copied to clipboard ✓
            </motion.p>
          ) : (
            <motion.p
              key="value"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="text-sm truncate"
              style={{ color: hovered ? "#fff" : "rgba(255,255,255,0.78)", transition: "color 0.2s" }}
            >
              {info.value}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="relative z-10 text-sm"
        style={{ color: hovered ? info.color : "rgba(255,255,255,0.2)", transition: "color 0.2s" }}
        animate={hovered ? { x: [0, 5, 0] } : { x: 0 }}
        transition={{ duration: 0.6, repeat: hovered ? Infinity : 0 }}
      >
        →
      </motion.div>
    </motion.a>
  );
}

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus("sending");

    try {
      const response = await fetch("https://formspree.io/f/xykkevna", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("idle");
      }
    } catch {
      setStatus("idle");
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0a0a24 0%, #06061a 100%)",
      }}
    >
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.07) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <span className="text-xs tracking-widest uppercase mb-3 block" style={{ color: "#8b5cf6" }}>Get In Touch</span>
          <h2 className="text-4xl lg:text-5xl font-black text-white relative inline-block">
            Let's Work Together
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-px rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, #7c3aed, #3b82f6, transparent)" }}
              initial={{ width: 0 }} whileInView={{ width: "60%" }} viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </h2>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — contact info */}
          <ScrollReveal direction="left">
            <p className="leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
              Have a project in mind or just want to chat? I'd love to hear from you.
              Drop me a message and I'll get back to you as soon as possible.
            </p>
            <div className="space-y-3">
              {contactInfo.map((info, i) => (
                <ContactCard key={info.label} info={info} index={i} />
              ))}
            </div>

            {/* Social availability badge */}
            <motion.div
              className="mt-8 flex items-center gap-3 px-4 py-3 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              whileHover={{ borderColor: "rgba(34,197,94,0.35)", boxShadow: "0 0 20px rgba(34,197,94,0.07)" }}
            >
              <motion.div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: "#22c55e", boxShadow: "0 0 8px rgba(34,197,94,0.7)" }}
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                Available for freelance &amp; full-time opportunities
              </p>
            </motion.div>
          </ScrollReveal>

          {/* Right — form */}
          <ScrollReveal direction="right">
            <TiltCard className="rounded-3xl" intensity={4} glowColor="rgba(139,92,246,0.08)">
              <motion.div
                className="p-8 rounded-3xl"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
                whileHover={{ borderColor: "rgba(139,92,246,0.2)" }}
                transition={{ duration: 0.3 }}
              >
                <AnimatePresence mode="wait">
                  {status === "sent" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <motion.div
                        className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4"
                        style={{ background: "rgba(139,92,246,0.2)" }}
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 0.5 }}
                      >
                        ✅
                      </motion.div>
                      <h3 className="text-white text-xl font-bold mb-2">Message Sent!</h3>
                      <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                        Thank you! I'll get back to you soon.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      <FloatingInput label="Your Name" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} />
                      <FloatingInput label="Your Email" type="email" name="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} />
                      <FloatingInput label="Message" name="message" placeholder="Tell me about your project..." value={formData.message} onChange={handleChange} textarea />
                      <RippleButton type="submit" disabled={status === "sending"}>
                        {status === "sending" ? (
                          <span className="flex items-center justify-center gap-2">
                            <motion.div
                              className="w-4 h-4 rounded-full border-2"
                              style={{ borderColor: "rgba(255,255,255,0.2)", borderTopColor: "#fff" }}
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            />
                            Sending...
                          </span>
                        ) : (
                          "Send Message →"
                        )}
                      </RippleButton>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            </TiltCard>
          </ScrollReveal>
        </div>
      </div>

      {/* Footer */}
      <ScrollReveal className="mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="w-full h-px mx-auto mb-10 rounded-full"
            style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.35), rgba(59,130,246,0.35), rgba(139,92,246,0.35), transparent)" }}
          />

          <div className="flex flex-col items-center gap-7">
            {/* Socials row */}
            <div className="flex gap-3">
              {footerSocials.map((s) => (
                <FooterSocialIcon key={s.label} social={s} />
              ))}
            </div>

            {/* Download CV — primary footer CTA */}
            <motion.a
              href="/assets/Azwad-Jilani-CV.pdf"
              download="Azwad-Jilani-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center gap-2.5 px-6 py-3 rounded-xl overflow-hidden"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "0.8rem",
                letterSpacing: "0.04em",
                color: "#fff",
                background: "linear-gradient(135deg, rgba(139,92,246,0.18), rgba(59,130,246,0.14))",
                border: "1px solid rgba(139,92,246,0.4)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 28px rgba(139,92,246,0.35), 0 8px 24px rgba(0,0,0,0.3)",
                borderColor: "rgba(167,139,250,0.7)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25 }}
              data-cursor="Download"
            >
              <FileDown className="w-[15px] h-[15px]" style={{ color: "#c4b5fd" }} />
              <span>Download CV</span>
            </motion.a>

            {/* Back to top */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "0.65rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.42)",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              whileHover={{
                color: "#fff",
                borderColor: "rgba(139,92,246,0.4)",
                backgroundColor: "rgba(139,92,246,0.06)",
              }}
              whileTap={{ scale: 0.96 }}
              data-cursor="Top"
            >
              <ArrowUp className="w-[12px] h-[12px]" />
              Back to top
            </motion.button>

            {/* Credits */}
            <div className="flex flex-col items-center gap-1.5 text-center">
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.32)" }}>
                Built with React, TypeScript & motion — designed and developed by Azwad.
              </p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.18)" }}>
                © 2026 Azwad Jilani. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

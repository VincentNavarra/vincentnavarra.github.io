import { useState, useRef, useEffect, createContext, useContext } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
  MotionConfig,
} from "framer-motion";
import {
  Globe,
  Database,
  ShieldCheck,
  Building2,
  Wrench,
  Code2,
  LayoutPanelLeft,
  Gauge,
  Briefcase,
  GraduationCap,
  BadgeCheck,
  Cloud,
  Star,
  Trophy,
  BookOpen,
} from 'lucide-react';
import { t, tr } from './i18n'
import type { Lang } from './i18n'
import { projects } from "./projects";
import avatar from "./assets/avatar.webp";
import logopannone from "./assets/projects/pannone-rent-assicurazioni.webp";
import dettagliopannone from "./assets/projects/pra_dettaglio.webp";
import demopannone from "./assets/projects/pra_demo.webp";
import logofulmine from "./assets/projects/fulmine.webp";
import dettagliofulmine from "./assets/projects/fulmine_dettaglio.webp";
import demofulmine from "./assets/projects/fulmine_demo.webp";
import logomdg from "./assets/projects/mdg.webp";
import dettagliomdg from "./assets/projects/mdg_dettaglio.webp";
import demomdg from "./assets/projects/mdg_demo.webp";

// ── Lang Context ──────────────────────────────────────────────
const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "it",
  setLang: () => {},
});
const useLang = () => useContext(LangCtx);

// ── Custom Cursor (non-touch only) ────────────────────────────
const Cursor = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsTouch(!mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsTouch(!e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (isTouch) return;
    const move = (e: MouseEvent) => {
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${e.clientX - 4}px,${e.clientY - 4}px)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${e.clientX - 20}px,${e.clientY - 20}px)`;
    };
    const over = (e: MouseEvent) => {
      const el = (e.target as Element)?.closest("a,button,[data-hover]");
      setHovered(!!el);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [isTouch]);

  if (isTouch) return null;
  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 9999,
          pointerEvents: "none", width: 8, height: 8,
          background: "#f0ece3", borderRadius: "50%",
          transition: "transform 0.05s linear", mixBlendMode: "difference",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 9998,
          pointerEvents: "none",
          width: hovered ? 56 : 40, height: hovered ? 56 : 40,
          borderRadius: "50%",
          border: `1px solid ${hovered ? "#f0ece3" : "rgba(240,236,227,0.4)"}`,
          transition: "width .22s ease, height .22s ease, border .2s ease, transform .12s linear",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
};

// ── Navbar ────────────────────────────────────────────────────
const Navbar = () => {
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { key: "work",       href: "#work"       },
    { key: "about",      href: "#about"      },
    { key: "skills",     href: "#skills"     },
    { key: "experience", href: "#experience" },
    { key: "services",   href: "#services"   },
    { key: "contact",    href: "#contact"    },
  ] as const;

  const linkLabel = (k: string) => {
    return t.nav[k as keyof typeof t.nav][lang] ?? k;
  };

  return (
    <>
      <motion.nav
        role="navigation"
        aria-label={lang === "it" ? "Navigazione principale" : "Main navigation"}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
          padding: "0 clamp(1.2rem,5vw,3.5rem)", height: 68,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderBottom: scrolled ? "1px solid rgba(240,236,227,0.08)" : "1px solid transparent",
          background: scrolled ? "rgba(0,0,0,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          aria-label="Vincent Navarra — home"
          style={{
            fontFamily: "'Playfair Display',serif", fontSize: "1.1rem",
            fontWeight: 700, color: "#f0ece3", textDecoration: "none",
            letterSpacing: "0.02em",
          }}
        >
          Vincent Navarra.
        </a>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="nav-desktop">
          <style>{`
            @media(max-width:900px){ .nav-desktop{ display:none !important; } .nav-hamburger{ display:flex !important; } }
          `}</style>
          {navLinks.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              style={{
                color: "rgba(240,236,227,0.45)", fontSize: "0.72rem", fontWeight: 400,
                letterSpacing: "0.09em", textDecoration: "none", textTransform: "uppercase",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#f0ece3")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,236,227,0.45)")}
              data-hover="true"
            >
              {linkLabel(key)}
            </a>
          ))}

          {/* Lang toggle */}
          <button
            onClick={() => setLang(lang === "it" ? "en" : "it")}
            aria-label={lang === "it" ? "Switch to English" : "Passa all'italiano"}
            data-hover="true"
            style={{
              background: "transparent", border: "1px solid rgba(240,236,227,0.2)",
              color: "rgba(240,236,227,0.5)", fontSize: "0.68rem", fontWeight: 500,
              letterSpacing: "0.1em", padding: "0.3rem 0.7rem",
              cursor: "pointer", transition: "all 0.2s", textTransform: "uppercase",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(240,236,227,0.5)"; e.currentTarget.style.color = "#f0ece3"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(240,236,227,0.2)"; e.currentTarget.style.color = "rgba(240,236,227,0.5)"; }}
          >
            {lang === "it" ? "EN" : "IT"}
          </button>

          <a
            href="#contact"
            data-hover="true"
            style={{
              padding: "0.45rem 1.2rem", border: "1px solid rgba(240,236,227,0.3)",
              color: "#f0ece3", fontSize: "0.72rem", fontWeight: 400,
              letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#f0ece3"; e.currentTarget.style.color = "#000"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#f0ece3"; }}
          >
            {t.nav.hireMe[lang]}
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? t.nav.closeMenu[lang] : t.nav.openMenu[lang]}
          aria-expanded={menuOpen}
          style={{
            display: "none", flexDirection: "column", gap: 5,
            background: "transparent", border: "none", padding: "6px",
            cursor: "pointer", zIndex: 600,
          }}
        >
          <span style={{ display: "block", width: 22, height: 1.5, background: "#f0ece3", transition: "all .25s", transform: menuOpen ? "rotate(45deg) translate(4.5px,4.5px)" : "none" }} />
          <span style={{ display: "block", width: 22, height: 1.5, background: "#f0ece3", transition: "opacity .25s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: 22, height: 1.5, background: "#f0ece3", transition: "all .25s", transform: menuOpen ? "rotate(-45deg) translate(4.5px,-4.5px)" : "none" }} />
        </button>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            role="dialog"
            aria-label={lang === "it" ? "Menu di navigazione" : "Navigation menu"}
            aria-modal="true"
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{
              position: "fixed", inset: 0, zIndex: 490,
              background: "rgba(0,0,0,0.97)",
              display: "flex", flexDirection: "column",
              justifyContent: "center", alignItems: "center", gap: "2rem",
            }}
            onClick={() => setMenuOpen(false)}
          >
            {navLinks.map(({ key, href }, i) => (
              <motion.a
                key={key}
                href={href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.055, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(1.8rem,7vw,2.8rem)", fontWeight: 800,
                  color: "#f0ece3", textDecoration: "none",
                  letterSpacing: "-0.02em", fontStyle: "italic",
                }}
              >
                {linkLabel(key)}
              </motion.a>
            ))}

            {/* Lang toggle mobile */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.055 + 0.05, duration: 0.3 }}
              onClick={e => { e.stopPropagation(); setLang(lang === "it" ? "en" : "it"); }}
              aria-label={lang === "it" ? "Switch to English" : "Passa all'italiano"}
              style={{
                background: "transparent", border: "1px solid rgba(240,236,227,0.25)",
                color: "rgba(240,236,227,0.6)", fontSize: "0.72rem", fontWeight: 500,
                letterSpacing: "0.12em", padding: "0.55rem 1.6rem",
                cursor: "pointer", textTransform: "uppercase",
              }}
            >
              {lang === "it" ? "EN" : "IT"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ── Hero ──────────────────────────────────────────────────────
const Hero = () => {
  const { lang } = useLang();
  const { scrollY } = useScroll();
  const yTitle = useTransform(scrollY, [0, 600], [0, -110]);
  const yAvatar = useTransform(scrollY, [0, 600], [0, -55]);
  const opacity = useTransform(scrollY, [0, 380], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cfg = { stiffness: 75, damping: 22, mass: 0.6 };
  const sX = useSpring(mouseX, cfg);
  const sY = useSpring(mouseY, cfg);
  const rotateY = useTransform(sX, [-1, 1], [-14, 14]);
  const rotateX = useTransform(sY, [-1, 1], [10, -10]);
  const shadowX = useTransform(sX, [-1, 1], [-25, 25]);
  const shadowY = useTransform(sY, [-1, 1], [-15, 15]);
  const dropShadow = useTransform(
    [shadowX, shadowY],
    ([sx, sy]: number[]) =>
      `drop-shadow(${sx * 0.5}px ${sy * 0.5 + 38}px 55px rgba(0,0,0,0.92)) drop-shadow(${sx * 0.25}px ${sy * 0.25 + 8}px 18px rgba(0,0,0,0.65))`
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  const taglineLines = t.hero.tagline[lang].split("\n");

  return (
    <section
      aria-label={lang === "it" ? "Presentazione" : "Introduction"}
      style={{
        minHeight: "100svh", position: "relative",
        overflow: "hidden", background: "#000",
        borderBottom: "1px solid rgba(240,236,227,0.1)",
      }}
    >
      {/* Grain texture */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px", opacity: 0.4,
        }}
      />

      <style>{`
        .hero-inner {
          position: relative; z-index: 1;
          min-height: 100svh; width: 100%;
        }
        @media (min-width: 769px) {
          .hero-inner { height: 100svh; display: block; }
          .hero-title-wrap {
            position: absolute; top: 0; left: 0; right: 0;
            padding-top: clamp(4.5rem,10vw,7rem); z-index: 1; pointer-events: none;
          }
          .hero-avatar-wrap {
            position: absolute; left: 0; right: 0;
            bottom: clamp(3rem,8vw,5rem); display: flex;
            justify-content: center; align-items: flex-end;
            z-index: 2; pointer-events: none;
          }
          .hero-tagline {
            position: absolute; left: clamp(1.5rem,5vw,3.5rem);
            bottom: clamp(2rem,4vw,3.5rem); z-index: 3;
          }
          .hero-cta {
            position: absolute; right: clamp(3rem,8vw,6rem);
            bottom: clamp(1.5rem,3vw,2.5rem); z-index: 3;
          }
        }
        @media (max-width: 768px) {
          .hero-inner {
            min-height: 100svh; display: flex; flex-direction: column;
            align-items: center; padding: 76px 1.2rem 3rem;
            overflow: hidden;
          }
          .hero-title-wrap {
            position: static !important; width: 100%;
            padding-top: clamp(2.8rem,8vh,5rem) !important;
            z-index: 1 !important; pointer-events: none;
          }
          .hero-title-wrap h1 {
            font-size: clamp(3.2rem,14vw,5.5rem) !important;
            line-height: 0.88 !important; letter-spacing: -0.05em !important;
          }
          .hero-avatar-wrap {
            position: static !important; width: 100%;
            display: flex; justify-content: center; align-items: center;
            margin-top: -0.5rem; z-index: 2 !important;
            pointer-events: none;
          }
          .hero-avatar-wrap img { width: clamp(240px,68vw,320px) !important; max-width: 100%; height: auto; }
          .hero-tagline { position: static !important; width: min(100%,340px); margin-top: 0.5rem; z-index: 3 !important; text-align: left; }
          .hero-tagline p { font-size: 0.64rem !important; line-height: 1.95 !important; }
          .hero-cta { position: static !important; width: min(100%,340px); margin-top: 1.4rem; align-items: flex-start !important; z-index: 3 !important; }
          .hero-cta a { padding: 0.85rem 1.8rem !important; font-size: 0.7rem !important; }
        }
        @media (max-width: 480px) {
          .hero-inner { padding: 72px 1rem 2.5rem; }
          .hero-title-wrap { padding-top: 2.2rem !important; }
          .hero-avatar-wrap img { width: min(70vw,300px) !important; }
        }
      `}</style>

      <div className="hero-inner">
        {/* Title */}
        <motion.div className="hero-title-wrap" style={{ y: yTitle }}>
          {[t.hero.line1[lang], t.hero.line2[lang]].map((line, idx) => (
            <div key={idx} style={{ overflow: "hidden" }}>
              <motion.h1
                initial={{ y: 110, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.18 + idx * 0.14, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "clamp(3.2rem,13.5vw,16rem)",
                  fontWeight: 900, lineHeight: 0.9,
                  letterSpacing: "-0.04em",
                  color: idx === 0 ? "rgba(240,236,227,0.85)" : "rgba(240,236,227,0.22)",
                  textAlign: "center", textTransform: "uppercase",
                  userSelect: "none",
                }}
              >
                {line}
              </motion.h1>
            </div>
          ))}
        </motion.div>

        {/* Avatar */}
        <motion.div
          className="hero-avatar-wrap"
          style={{ perspective: 900, y: yAvatar }}
          initial={{ opacity: 0, scale: 0.9, y: 70 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.46, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div style={{ rotateY, rotateX, transformStyle: "preserve-3d", position: "relative" }}>
            <motion.img
              src={avatar}
              alt="Vincent Navarra"
              width={580}
              height={700}
              style={{
                width: "clamp(280px,38vw,560px)", height: "auto",
                objectFit: "contain", filter: dropShadow,
                transformStyle: "preserve-3d",
              }}
            />
          </motion.div>
          {/* Ground shadow */}
          <motion.div
            aria-hidden="true"
            style={{
              position: "absolute", bottom: -18, left: "50%",
              translateX: "-50%", width: "68%", height: 36,
              borderRadius: "50%", background: "rgba(0,0,0,0.5)",
              filter: "blur(20px)", zIndex: -1,
              x: useTransform(sX, [-1, 1], [-16, 16]),
              scaleX: useTransform(sY, [-1, 1], [0.9, 1.1]),
            }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.div
          className="hero-tagline"
          style={{ opacity }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: "clamp(0.6rem,0.95vw,0.72rem)", fontWeight: 400,
            color: "rgba(240,236,227,0.38)", letterSpacing: "0.14em",
            textTransform: "uppercase", lineHeight: 1.85, maxWidth: 260,
          }}>
            {taglineLines.map((line, i) => (
              <span key={i}>{line}{i < taglineLines.length - 1 && <br />}</span>
            ))}
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="hero-cta"
          style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1rem", opacity }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
            <a
              href="#work"
              data-hover="true"
              style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", fontWeight: 500,
                color: "#000", textDecoration: "none", letterSpacing: "0.12em",
                textTransform: "uppercase", padding: "0.72rem 1.6rem",
                background: "#f0ece3", transition: "opacity 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              {t.hero.ctaWork[lang]}
            </a>
            <a
              href="#contact"
              data-hover="true"
              style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", fontWeight: 400,
                color: "#f0ece3", textDecoration: "none", letterSpacing: "0.12em",
                textTransform: "uppercase", padding: "0.72rem 1.6rem",
                border: "1px solid rgba(240,236,227,0.25)", transition: "border-color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(240,236,227,0.7)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(240,236,227,0.25)")}
            >
              {t.hero.ctaContact[lang]}
            </a>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: "#5eff8a", animation: "blink 2s infinite" }} />
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.65rem", color: "rgba(240,236,227,0.32)", letterSpacing: "0.08em" }}>
              {t.hero.available[lang]}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ── Marquee ───────────────────────────────────────────────────
const Marquee = () => {
  const { lang } = useLang();
  const items = t.marquee.items[lang];
  const doubled = [...items, ...items];
  return (
    <div
      aria-hidden="true"
      style={{ borderBottom: "1px solid rgba(240,236,227,0.08)", overflow: "hidden", padding: "1.1rem 0" }}
    >
      <motion.div
        style={{ display: "flex", gap: 0, whiteSpace: "nowrap" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 24, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontFamily: "'Playfair Display',serif", fontStyle: "italic",
            fontSize: "clamp(0.9rem,2.2vw,1.5rem)", fontWeight: 400,
            color: i % 2 === 0 ? "rgba(240,236,227,0.65)" : "rgba(240,236,227,0.15)",
            padding: "0 1.8rem", flexShrink: 0,
          }}>
            {item}{" "}
            <span aria-hidden="true" style={{ color: "rgba(240,236,227,0.1)", fontStyle: "normal", fontFamily: "'DM Sans',sans-serif", fontSize: "0.6em" }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// ── Work ──────────────────────────────────────────────────────
const projectImages = [
  [logopannone, dettagliopannone, demopannone],
  [logofulmine, dettagliofulmine, demofulmine],
  [logomdg, dettagliomdg, demomdg],
];

// ── Case Study Overlay ────────────────────────────────────────
const CaseStudyOverlay = ({
  project,
  images,
  onClose,
}: {
  project: typeof projects[0];
  images: string[];
  onClose: () => void;
}) => {
  const { lang } = useLang();

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const labelStyle: React.CSSProperties = {
    fontFamily: "'DM Sans',sans-serif", fontSize: "0.6rem",
    color: "rgba(240,236,227,0.3)", letterSpacing: "0.18em",
    textTransform: "uppercase", marginBottom: "0.4rem",
  };
  const valueStyle: React.CSSProperties = {
    fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem",
    color: "rgba(240,236,227,0.75)", lineHeight: 1.65,
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      style={{
        position: "fixed", inset: 0, zIndex: 800,
        background: "rgba(0,0,0,0.96)",
        backdropFilter: "blur(6px)",
        overflowY: "auto",
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "clamp(5rem,10vw,7rem) clamp(1.2rem,5vw,3.5rem) clamp(3rem,6vw,5rem)",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          data-hover="true"
          aria-label={lang === "it" ? "Chiudi" : "Close"}
          style={{
            position: "fixed", top: "1.4rem", right: "clamp(1.2rem,5vw,3.5rem)",
            background: "transparent", border: "1px solid rgba(240,236,227,0.22)",
            color: "#f0ece3", fontSize: "0.68rem", letterSpacing: "0.1em",
            textTransform: "uppercase", padding: "0.4rem 1rem",
            cursor: "pointer", zIndex: 801, transition: "border-color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(240,236,227,0.6)")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(240,236,227,0.22)")}
        >
          {lang === "it" ? "Chiudi ✕" : "Close ✕"}
        </button>

        {/* Title area */}
        <div style={{ marginBottom: "2.5rem" }}>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.62rem", color: "rgba(240,236,227,0.3)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.6rem" }}>
            {project.type[lang]}
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "clamp(2rem,6vw,4.5rem)", fontWeight: 800,
            lineHeight: 1.05, letterSpacing: "-0.02em", color: "#f0ece3",
          }}>
            {project.title}
          </h2>
        </div>

        {/* 3-photo grid */}
        <style>{`
          .overlay-photos {
            display: grid;
            grid-template-columns: 1fr 1.85fr;
            grid-template-rows: 1fr 1fr;
            gap: 10px;
            border-radius: 14px;
            overflow: hidden;
            aspect-ratio: 16/8;
            margin-bottom: 3rem;
          }
          .overlay-photos .ph-left-top {
            grid-column: 1; grid-row: 1;
            overflow: hidden;
          }
          .overlay-photos .ph-left-bottom {
            grid-column: 1; grid-row: 2;
            overflow: hidden;
          }
          .overlay-photos .ph-right {
            grid-column: 2; grid-row: 1 / 3;
            overflow: hidden;
          }
          .overlay-photos img {
            width: 100%; height: 100%;
            object-fit: cover; display: block;
            transition: transform 0.5s ease;
          }
          .overlay-photos img:hover { transform: scale(1.04); }
          @media (max-width: 600px) {
            .overlay-photos {
              grid-template-columns: 1fr;
              grid-template-rows: auto;
              aspect-ratio: unset;
            }
            .overlay-photos .ph-left-top,
            .overlay-photos .ph-left-bottom,
            .overlay-photos .ph-right {
              grid-column: 1; grid-row: auto;
              aspect-ratio: 16/9;
            }
          }
        `}</style>
        <div className="overlay-photos">
          <div className="ph-left-top">
            <img src={images[0]} alt={`${project.title} — screenshot 1`} loading="lazy" />
          </div>
          <div className="ph-left-bottom">
            <img src={images[1] ?? images[0]} alt={`${project.title} — screenshot 2`} loading="lazy" />
          </div>
          <div className="ph-right">
            <img src={images[2] ?? images[0]} alt={`${project.title} — screenshot 3`} loading="lazy" />
          </div>
        </div>

        {/* Details grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(240px,100%), 1fr))",
          gap: "2rem",
          borderTop: "1px solid rgba(240,236,227,0.08)",
          paddingTop: "2rem",
          marginBottom: "2.5rem",
        }}>
          {/* Role */}
          <div>
            <p style={labelStyle}>{lang === "it" ? "Ruolo" : "Role"}</p>
            <p style={valueStyle}>{project.role[lang]}</p>
            <p style={{ ...labelStyle, marginTop: "1.2rem" }}>Stack</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
              {project.stack.map(s => (
                <span key={s} style={{
                  fontFamily: "'DM Sans',sans-serif", fontSize: "0.62rem",
                  padding: "0.2rem 0.55rem",
                  border: "1px solid rgba(240,236,227,0.14)",
                  color: "rgba(240,236,227,0.5)", letterSpacing: "0.04em",
                }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Context */}
          <div>
            <p style={labelStyle}>{lang === "it" ? "Contesto" : "Context"}</p>
            <p style={valueStyle}>{project.context[lang]}</p>
          </div>

          {/* Solution */}
          <div>
            <p style={labelStyle}>{lang === "it" ? "Soluzione" : "Solution"}</p>
            <p style={valueStyle}>{project.solution[lang]}</p>
          </div>

          {/* Contribution */}
          <div>
            <p style={labelStyle}>{lang === "it" ? "Il mio contributo" : "My contribution"}</p>
            <p style={valueStyle}>{project.contribution[lang]}</p>
          </div>

          {/* Key decisions */}
          <div style={{ gridColumn: "1 / -1" }}>
            <p style={labelStyle}>{lang === "it" ? "Decisioni tecniche chiave" : "Key technical decisions"}</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.45rem" }}>
              {project.decisions[lang].map((d, di) => (
                <li key={di} style={{
                  fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem",
                  color: "rgba(240,236,227,0.6)", lineHeight: 1.65,
                  paddingLeft: "1.1rem", position: "relative",
                }}>
                  <span aria-hidden="true" style={{ position: "absolute", left: 0, color: "rgba(240,236,227,0.25)" }}>—</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Live link CTA */}
        {project.link && project.link !== "#" && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            data-hover="true"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.6rem",
              fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem",
              fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase",
              color: "#000", textDecoration: "none",
              background: "#f0ece3",
              padding: "0.85rem 2.2rem",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            {lang === "it" ? "Vai al sito live" : "Visit live site"} ↗
          </a>
        )}
      </motion.div>
    </motion.div>
  );
};

const ProjectCard = ({
  project,
  images,
  index,
}: {
  project: typeof projects[0];
  images: string[];
  index: number;
}) => {
  const { lang } = useLang();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const stickyTop = 80 + index * 20;

  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.95]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0, 1, 1, 0.55]);

  return (
    <>
      <div ref={cardRef} style={{ position: "sticky", top: stickyTop, zIndex: index + 1, marginBottom: "0.75rem" }}>
        <motion.article
          aria-label={project.title}
          style={{
            scale, opacity: cardOpacity,
            background: `hsl(0,0%,${5 + index * 1.5}%)`,
            border: "1px solid rgba(240,236,227,0.09)",
            borderRadius: 18,
            padding: "clamp(1rem,3vw,2rem)",
            display: "flex", flexDirection: "column", gap: "1.2rem",
            transformOrigin: "top center", willChange: "transform",
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "clamp(0.7rem,2.5vw,1.8rem)" }}>
              <span aria-hidden="true" style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "clamp(2.2rem,6vw,6rem)", fontWeight: 900,
                lineHeight: 0.88, color: "#f0ece3", letterSpacing: "-0.04em", flexShrink: 0,
              }}>{project.num}</span>
              <div style={{ paddingTop: "0.25rem" }}>
                <p style={{
                  fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(0.52rem,0.9vw,0.68rem)",
                  fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "rgba(240,236,227,0.35)", marginBottom: "0.3rem",
                }}>{project.type[lang]}</p>
                <h3 style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "clamp(0.88rem,1.8vw,1.3rem)",
                  fontWeight: 500, color: "#f0ece3", letterSpacing: "-0.01em", lineHeight: 1.2,
                }}>{project.title}</h3>
              </div>
            </div>

            {/* Buttons: case study (opens overlay) + live link */}
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexShrink: 0 }}>
              <button
                onClick={() => setOverlayOpen(true)}
                data-hover="true"
                aria-haspopup="dialog"
                style={{
                  fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(0.58rem,0.85vw,0.68rem)",
                  fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "rgba(240,236,227,0.7)", background: "transparent",
                  border: "1px solid rgba(240,236,227,0.2)", borderRadius: 999,
                  padding: "0.45rem 1rem", cursor: "pointer", whiteSpace: "nowrap",
                  transition: "background 0.2s, border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(240,236,227,0.08)";
                  e.currentTarget.style.borderColor = "rgba(240,236,227,0.45)";
                  e.currentTarget.style.color = "#f0ece3";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(240,236,227,0.2)";
                  e.currentTarget.style.color = "rgba(240,236,227,0.7)";
                }}
              >
                {lang === "it" ? "Scopri il progetto ↗" : "View project ↗"}
              </button>


            </div>
          </div>

          {/* 3-photo grid */}
          <style>{`
            .proj-photos-${index} {
              display: grid;
              grid-template-columns: 1fr 1.85fr;
              grid-template-rows: 1fr 1fr;
              gap: 8px;
              border-radius: 12px;
              overflow: hidden;
              aspect-ratio: 16/8;
            }
            .proj-photos-${index} .p-tl {
              grid-column: 1; grid-row: 1; overflow: hidden; border-radius: 12px;
            }
            .proj-photos-${index} .p-bl {
              grid-column: 1; grid-row: 2; overflow: hidden; border-radius: 12px;
            }
            .proj-photos-${index} .p-r {
              grid-column: 2; grid-row: 1 / 3; overflow: hidden; border-radius: 12px;
            }
            .proj-photos-${index} img {
              width: 100%; height: 100%; object-fit: cover; display: block;
              transition: transform 0.5s ease;
            }
            .proj-photos-${index} img:hover { transform: scale(1.04); }
            @media (max-width: 580px) {
              .proj-photos-${index} {
                grid-template-columns: 1fr;
                grid-template-rows: auto;
                aspect-ratio: unset;
              }
              .proj-photos-${index} .p-tl,
              .proj-photos-${index} .p-bl,
              .proj-photos-${index} .p-r {
                display: block;
                grid-column: 1;
                grid-row: auto;
                aspect-ratio: 16 / 9;
              }
            }
          `}</style>
          <div className={`proj-photos-${index}`}>
            <div className="p-tl">
              <img src={images[0]} alt="" loading={index === 0 ? "eager" : "lazy"} />
            </div>
            <div className="p-bl">
              <img src={images[1]} alt="" loading="lazy" />
            </div>
            <div className="p-r">
              <img src={images[2]} alt={project.title} loading={index === 0 ? "eager" : "lazy"} />
            </div>
          </div>
        </motion.article>
      </div>

      {/* Overlay */}
      <AnimatePresence>
        {overlayOpen && (
          <CaseStudyOverlay
            project={project}
            images={images}
            onClose={() => setOverlayOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const Work = () => {
  const { lang } = useLang();
  return (
    <section id="work" style={{ padding: "clamp(3rem,10vw,8rem) clamp(1.2rem,5vw,3.5rem)" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "clamp(1.5rem,4vw,3rem)", flexWrap: "wrap", gap: "0.5rem" }}>
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.68rem", color: "rgba(240,236,227,0.3)", letterSpacing: "0.2em", textTransform: "uppercase" }}
        >
          {t.work.sectionLabel[lang]}
        </motion.p>
        <motion.span
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "0.85rem", color: "rgba(240,236,227,0.2)" }}
        >
          {projects.length} {lang === "it" ? "progetti" : "projects"}
        </motion.span>
      </div>

      <div style={{ paddingBottom: `${projects.length * 40}px` }}>
        {projects.map((p, i) => (
          <ProjectCard
            key={p.num}
            project={p}
            images={projectImages[i]}
            index={i}
          />
        ))}
      </div>
    </section>
  );
};

// ── About ─────────────────────────────────────────────────────
const About = () => {
  const { lang } = useLang();

  return (
    <section
      id="about"
      aria-label={lang === "it" ? "Chi sono" : "About"}
      style={{
        position: "relative", overflow: "hidden",
        borderTop: "1px solid rgba(240,236,227,0.08)",
        padding: "clamp(4rem,10vw,9rem) clamp(1.2rem,5vw,3.5rem)",
      }}
    >
      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(3rem, 6vw, 7rem);
          align-items: start;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        @media (max-width: 860px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ── Orbital keyframes ── */
        @keyframes ab-spin-cw  { to { rotate:  360deg; } }
        @keyframes ab-spin-ccw { to { rotate: -360deg; } }
        @keyframes ab-flicker  {
          0%,100% { opacity: 1;    }
          48%     { opacity: 0.15; }
        }

        .ab-orb-stage {
          position: relative;
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
        }

        .ab-nuc {
          position: absolute;
          width: 4px; height: 4px;
          border-radius: 50%;
          background: rgba(240,236,227,0.55);
          box-shadow: 0 0 8px 3px rgba(176,111,216,0.15);
          z-index: 2;
        }

        .ab-sr {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(240,236,227,0.04);
        }
        .ab-sr-1 { width: 22%; height: 22%; }
        .ab-sr-2 { width: 44%; height: 44%; }
        .ab-sr-3 { width: 68%; height: 68%; }
        .ab-sr-4 { width: 90%; height: 90%; border-color: rgba(240,236,227,0.025); }

        .ab-tr {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(240,236,227,0.06);
        }
        .ab-tr-a { width: 68%; height: 32%; rotate: 18deg;  animation: ab-spin-cw  18s linear infinite; }
        .ab-tr-b { width: 52%; height: 24%; rotate: -42deg; animation: ab-spin-ccw 13s linear infinite; }
        .ab-tr-c { width: 88%; height: 40%; rotate: 8deg;   animation: ab-spin-cw  28s linear infinite; }
        .ab-tr-d { width: 36%; height: 16%; rotate: 72deg;  animation: ab-spin-ccw  9s linear infinite; }

        .ab-pt {
          position: absolute;
          border-radius: 50%;
          top: -1.5px; left: 50%;
          translate: -50% 0;
        }
        .ab-pt-ivory  { width: 3px;   height: 3px;   background: rgba(240,236,227,0.55); animation: ab-flicker 3.4s ease-in-out infinite; }
        .ab-pt-violet { width: 2.5px; height: 2.5px; background: rgba(176,111,216,0.6);  animation: ab-flicker 2.8s ease-in-out infinite 1.1s; }
        .ab-pt-sm     { width: 2px;   height: 2px;   background: rgba(240,236,227,0.45); animation: ab-flicker 3.9s ease-in-out infinite 2.1s; }
        .ab-pt-dim {
          top: auto; bottom: -1.5px; left: 50%;
          translate: -50% 0;
          width: 2px; height: 2px;
          background: rgba(240,236,227,0.3);
          animation: ab-flicker 4.2s ease-in-out infinite 0.6s;
        }

        .ab-amb {
          position: absolute;
          width: 2px; height: 2px;
          border-radius: 50%;
          background: rgba(240,236,227,0.18);
          animation: ab-flicker var(--f,3.2s) var(--d,0s) ease-in-out infinite;
        }

        /* Mobile: nascondi orbite */
        @media (max-width: 860px) {
          .ab-orb-cell { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ab-tr-a, .ab-tr-b, .ab-tr-c, .ab-tr-d,
          .ab-pt-ivory, .ab-pt-violet, .ab-pt-dim, .ab-pt-sm, .ab-amb {
            animation: none !important;
          }
        }
      `}</style>

      {/* Decorative radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", top: "5%", right: "-10%",
          width: "50vw", maxWidth: 640, aspectRatio: "1/1",
          borderRadius: "50%", pointerEvents: "none", zIndex: 0,
          background: "radial-gradient(circle at 50% 50%, rgba(118,31,150,0.22) 0%, transparent 68%)",
          filter: "blur(72px)",
        }}
      />

      <div className="about-grid">

        {/* ── Left: text column ── */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: "0.68rem",
              color: "rgba(240,236,227,0.28)", letterSpacing: "0.2em",
              textTransform: "uppercase", marginBottom: "1.5rem",
            }}
          >
            {t.about.label[lang]}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(2rem,4.5vw,4rem)",
              fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.02em",
              color: "#f0ece3", marginBottom: "2.5rem",
            }}
          >
            {t.about.heading1[lang]}
            <br />
            <span style={{
              fontStyle: "italic",
              background: "linear-gradient(90deg, #f0ece3 0%, #b06fd8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {t.about.heading2[lang]}
            </span>
            <br />
            {t.about.heading3[lang]}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
          >
            {[t.about.p1, t.about.p2, t.about.p3].map((p, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "clamp(0.92rem,1.4vw,1.04rem)",
                  fontWeight: 300, lineHeight: 1.8,
                  color: i === 0
                    ? "rgba(240,236,227,0.65)"
                    : i === 1
                    ? "rgba(240,236,227,0.42)"
                    : "rgba(240,236,227,0.28)",
                }}
                dangerouslySetInnerHTML={{ __html: p[lang] }}
              />
            ))}

            <motion.a
              href="#contact"
              data-hover="true"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.7rem",
                marginTop: "1.5rem",
                fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", fontWeight: 400,
                color: "#f0ece3", letterSpacing: "0.1em", textTransform: "uppercase",
                textDecoration: "none",
                borderBottom: "1px solid rgba(240,236,227,0.22)", paddingBottom: "0.28rem",
                transition: "border-color 0.2s, gap 0.2s", width: "fit-content",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#f0ece3"; e.currentTarget.style.gap = "1.1rem"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(240,236,227,0.22)"; e.currentTarget.style.gap = "0.7rem"; }}
            >
              {t.about.cta[lang]} →
            </motion.a>
          </motion.div>
        </div>

        {/* ── Right: orbital animation cell ── */}
        <div
          className="ab-orb-cell"
          aria-hidden="true"
          style={{ position: "relative", width: "100%", aspectRatio: "1/1", pointerEvents: "none" }}
        >
          <div className="ab-orb-stage">

            <div className="ab-sr ab-sr-1" />
            <div className="ab-sr ab-sr-2" />
            <div className="ab-sr ab-sr-3" />
            <div className="ab-sr ab-sr-4" />

            <div className="ab-tr ab-tr-a">
              <div className="ab-pt ab-pt-ivory" />
              <div className="ab-pt ab-pt-dim" />
            </div>
            <div className="ab-tr ab-tr-b">
              <div className="ab-pt ab-pt-violet" />
              <div className="ab-pt ab-pt-dim" />
            </div>
            <div className="ab-tr ab-tr-c">
              <div className="ab-pt ab-pt-sm" />
            </div>
            <div className="ab-tr ab-tr-d">
              <div className="ab-pt ab-pt-violet" />
            </div>

            <div className="ab-nuc" />

            <div className="ab-amb" style={{ top:"12%", left:"58%", "--f":"3.1s","--d":"0s"   } as React.CSSProperties} />
            <div className="ab-amb" style={{ top:"20%", left:"30%", "--f":"2.7s","--d":".8s"  } as React.CSSProperties} />
            <div className="ab-amb" style={{ top:"74%", left:"62%", "--f":"4.0s","--d":"1.3s" } as React.CSSProperties} />
            <div className="ab-amb" style={{ top:"66%", left:"24%", "--f":"3.5s","--d":"0.4s" } as React.CSSProperties} />
            <div className="ab-amb" style={{ top:"44%", left:"88%", "--f":"2.9s","--d":"1.9s" } as React.CSSProperties} />
            <div className="ab-amb" style={{ top:"8%",  left:"44%", "--f":"3.8s","--d":"0.2s" } as React.CSSProperties} />
            <div className="ab-amb" style={{ top:"88%", left:"46%", "--f":"3.3s","--d":"2.4s" } as React.CSSProperties} />
            <div className="ab-amb" style={{ top:"50%", left:"6%",  "--f":"4.4s","--d":"0.7s" } as React.CSSProperties} />

          </div>
        </div>

      </div>
    </section>
  );
};

// ── Skills ────────────────────────────────────────────────────
const skillIcons: React.ReactNode[] = [
  <Globe  size={13} strokeWidth={1.4} />,   // Web Development
  <Database    size={13} strokeWidth={1.4} />,   // Database & Dati
  <ShieldCheck size={13} strokeWidth={1.4} />,   // Qualità & Sicurezza
  <Building2   size={13} strokeWidth={1.4} />,   // Sviluppo Aziendale
  <Wrench      size={13} strokeWidth={1.4} />,   // Strumenti
];

const Skills = () => {
  const { lang } = useLang();
  const cats = t.skills.categories[lang];

  return (
    <section
      id="skills"
      style={{
        padding: "clamp(3rem,10vw,8rem) clamp(1.2rem,5vw,3.5rem)",
        borderTop: "1px solid rgba(240,236,227,0.08)",
      }}
    >
      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          max-width: 1200px;
        }
        @media (max-width: 960px) {
          .skills-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 580px) {
          .skills-grid { grid-template-columns: 1fr; }
        }
        .skill-card {
          padding: clamp(1.4rem, 3vw, 2rem);
          border: 1px solid rgba(240,236,227,0.06);
          position: relative;
          transition: background 0.25s ease, border-color 0.25s ease;
          cursor: default;
          overflow: hidden;
        }
        .skill-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 2px;
          height: 0;
          background: linear-gradient(180deg, rgba(176,111,216,0.7) 0%, transparent 100%);
          transition: height 0.35s ease;
        }
        .skill-card:hover {
          background: rgba(118,31,150,0.05);
          border-color: rgba(240,236,227,0.1);
        }
        .skill-card:hover::before {
          height: 100%;
        }
        @media (prefers-reduced-motion: reduce) {
          .skill-card, .skill-card::before { transition: none; }
        }
      `}</style>

      {/* Section header */}
      <div style={{
        display: "flex", alignItems: "baseline",
        justifyContent: "space-between",
        marginBottom: "clamp(2rem,5vw,4rem)",
        maxWidth: 1200,
        flexWrap: "wrap", gap: "0.5rem",
      }}>
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: "0.68rem",
            color: "rgba(240,236,227,0.28)", letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          {t.skills.label[lang]}
        </motion.p>
        <motion.span
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          style={{
            fontFamily: "'Playfair Display',serif", fontStyle: "italic",
            fontSize: "0.82rem", color: "rgba(240,236,227,0.16)",
          }}
        >
          {cats.length} {lang === "it" ? "categorie" : "categories"}
        </motion.span>
      </div>

      <div className="skills-grid">
        {cats.map((cat, i) => (
          <motion.div
            key={i}
            className="skill-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Number */}
            <p style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: "0.58rem",
              color: "rgba(176,111,216,0.5)", letterSpacing: "0.18em",
              marginBottom: "1rem",
            }}>
              {String(i + 1).padStart(2, "0")}
            </p>

            {/* Title */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", marginBottom: "0.5rem" }}>
              <span style={{
                color: "rgba(176,111,216,0.55)",
                display: "flex", alignItems: "center", flexShrink: 0,
              }}>
                {skillIcons[i] ?? null}
              </span>
              <h3 style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(1.05rem,1.8vw,1.3rem)",
                fontWeight: 700, lineHeight: 1.15,
                color: "#f0ece3",
                letterSpacing: "-0.01em",
              }}>
                {cat.title}
              </h3>
            </div>

            {/* Note */}
            {"note" in cat && (
              <p style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: "0.62rem",
                color: "rgba(176,111,216,0.55)", letterSpacing: "0.02em",
                marginBottom: "1.2rem", fontStyle: "italic", lineHeight: 1.5,
              }}>
                {(cat as { note: string }).note}
              </p>
            )}

            {/* Divider */}
            <div style={{
              width: "1.5rem", height: "1px",
              background: "rgba(240,236,227,0.1)",
              margin: "note" in cat ? "0 0 1.2rem" : "0.9rem 0 1.2rem",
            }} />

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {cat.items.map(tag => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: "0.6rem",
                    padding: "0.2rem 0.6rem",
                    border: "1px solid rgba(240,236,227,0.09)",
                    color: "rgba(240,236,227,0.45)",
                    letterSpacing: "0.03em",
                    lineHeight: 1.6,
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(176,111,216,0.35)";
                    e.currentTarget.style.color = "rgba(240,236,227,0.7)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(240,236,227,0.09)";
                    e.currentTarget.style.color = "rgba(240,236,227,0.45)";
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// ── Experience ────────────────────────────────────────────────
const Experience = () => {
  const { lang } = useLang();
  const exp = t.experience;

  return (
    <section id="experience" style={{
      padding: "clamp(3rem,10vw,8rem) clamp(1.2rem,5vw,3.5rem)",
      borderTop: "1px solid rgba(240,236,227,0.08)",
    }}>
      <style>{`
        .exp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 5vw, 5rem);
          align-items: start;
          max-width: 1200px;
        }
        @media (max-width: 860px) {
          .exp-grid { grid-template-columns: 1fr; }
        }
        .exp-bottom {
          max-width: 1200px;
          margin-top: clamp(2rem, 4vw, 3.5rem);
          padding-top: clamp(2rem, 4vw, 3.5rem);
          border-top: 1px solid rgba(240,236,227,0.06);
        }
        .exp-row {
          padding: 1.1rem 0;
          border-top: 1px solid rgba(240,236,227,0.06);
        }
        .exp-azure-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.22rem 0.65rem;
          border: 1px solid rgba(0,120,212,0.35);
          border-radius: 999px;
          background: rgba(0,120,212,0.07);
          font-family: 'DM Sans',sans-serif;
          font-size: 0.58rem;
          letter-spacing: 0.08em;
          color: rgba(100,180,255,0.75);
          margin-top: 0.45rem;
        }
        .exp-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: 'DM Sans',sans-serif;
          font-size: 0.64rem;
          color: rgba(240,236,227,0.45);
          letter-spacing: 0.03em;
          padding: 0.22rem 0.7rem;
          border: 1px solid rgba(240,236,227,0.09);
          line-height: 1.6;
        }
        @media (prefers-reduced-motion: reduce) {
          .exp-grid * { transition: none !important; }
        }
      `}</style>

      {/* Section label */}
      <motion.p
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        style={{
          fontFamily: "'DM Sans',sans-serif", fontSize: "0.68rem",
          color: "rgba(240,236,227,0.28)", letterSpacing: "0.2em",
          textTransform: "uppercase", marginBottom: "3rem",
        }}
      >
        {exp.label[lang]}
      </motion.p>

      {/* ── Top grid: two columns ── */}
      <div className="exp-grid">

        {/* Left: internship */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "1.2rem" }}>
            <div style={{
              width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
              background: "rgba(176,111,216,0.7)",
              boxShadow: "0 0 8px rgba(176,111,216,0.4)",
            }} />
            <p style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: "0.62rem",
              color: "rgba(240,236,227,0.4)", letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}>
              {exp.internship.period[lang]}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem", marginBottom: "0.3rem" }}>
            <span style={{ color: "rgba(176,111,216,0.55)", display: "flex", alignItems: "center", flexShrink: 0, marginTop: "0.3rem" }}>
              <Briefcase size={14} strokeWidth={1.4} />
            </span>
            <h3 style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(1.4rem,2.8vw,2.2rem)",
              fontWeight: 700, color: "#f0ece3", lineHeight: 1.1,
              letterSpacing: "-0.015em",
            }}>
              {exp.internship.company}
            </h3>
          </div>
          <p style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem",
            color: "rgba(176,111,216,0.65)", marginBottom: "2rem",
            letterSpacing: "0.02em", paddingLeft: "1.55rem",
          }}>
            {exp.internship.role[lang]}
          </p>

          <div style={{ width: "100%", height: "1px", background: "rgba(240,236,227,0.07)", marginBottom: "1.8rem" }} />

          <p style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: "0.6rem",
            color: "rgba(240,236,227,0.32)", letterSpacing: "0.18em",
            textTransform: "uppercase", marginBottom: "0.75rem",
          }}>
            {exp.internship.activitiesLabel[lang]}
          </p>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.55rem", marginBottom: "1.8rem" }}>
            {exp.internship.activities[lang].map((a, i) => (
              <li key={i} style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem",
                color: "rgba(240,236,227,0.62)", lineHeight: 1.65,
                paddingLeft: "1.1rem", position: "relative",
              }}>
                <span aria-hidden="true" style={{ position: "absolute", left: 0, color: "rgba(176,111,216,0.45)" }}>—</span>
                {a}
              </li>
            ))}
          </ul>

          <p style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: "0.6rem",
            color: "rgba(240,236,227,0.32)", letterSpacing: "0.18em",
            textTransform: "uppercase", marginBottom: "0.75rem",
          }}>
            {exp.internship.studiedLabel[lang]}
          </p>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {exp.internship.studied[lang].map((s, i) => (
              <li key={i} style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem",
                color: "rgba(240,236,227,0.42)", lineHeight: 1.6,
                paddingLeft: "1.1rem", position: "relative",
              }}>
                <span aria-hidden="true" style={{ position: "absolute", left: 0, color: "rgba(240,236,227,0.2)" }}>—</span>
                {s}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right: education + certifications */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", marginBottom: "1.4rem" }}>
              <span style={{ color: "rgba(176,111,216,0.55)", display: "flex", alignItems: "center" }}>
                <GraduationCap size={13} strokeWidth={1.4} />
              </span>
              <p style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: "0.6rem",
                color: "rgba(240,236,227,0.28)", letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}>
                {exp.education.heading[lang]}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {exp.education.items[lang].map((edu, i) => (
                <div key={i} className="exp-row">
                  <p style={{
                    fontFamily: "'DM Sans',sans-serif", fontSize: "0.6rem",
                    color: "rgba(176,111,216,0.5)", letterSpacing: "0.12em", marginBottom: "0.3rem",
                  }}>
                    {edu.period}
                  </p>
                  <h4 style={{
                    fontFamily: "'Playfair Display',serif", fontSize: "1.05rem",
                    fontWeight: 700, color: "#f0ece3", lineHeight: 1.2,
                    marginBottom: "0.2rem", letterSpacing: "-0.01em",
                  }}>
                    {edu.title}
                  </h4>
                  <p style={{
                    fontFamily: "'DM Sans',sans-serif", fontSize: "0.76rem",
                    color: "rgba(240,236,227,0.38)", lineHeight: 1.5,
                  }}>
                    {edu.org}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", marginBottom: "1.4rem" }}>
              <span style={{ color: "rgba(176,111,216,0.55)", display: "flex", alignItems: "center" }}>
                <BadgeCheck size={13} strokeWidth={1.4} />
              </span>
              <p style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: "0.6rem",
                color: "rgba(240,236,227,0.28)", letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}>
                {exp.certifications.heading[lang]}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {exp.certifications.items.map((cert, i) => (
                <div key={i} className="exp-row">
                  <div style={{
                    display: "flex", alignItems: "baseline",
                    justifyContent: "space-between", gap: "0.5rem",
                    flexWrap: "wrap", marginBottom: "0.2rem",
                  }}>
                    <h4 style={{
                      fontFamily: "'Playfair Display',serif", fontSize: "1rem",
                      fontWeight: 700, color: "#f0ece3", letterSpacing: "-0.01em",
                    }}>
                      {cert.title}
                    </h4>
                    <span style={{
                      fontFamily: "'DM Sans',sans-serif", fontSize: "0.6rem",
                      color: "rgba(176,111,216,0.55)", letterSpacing: "0.1em", flexShrink: 0,
                    }}>
                      {cert.code}
                    </span>
                  </div>
                  <p style={{
                    fontFamily: "'DM Sans',sans-serif", fontSize: "0.74rem",
                    color: "rgba(240,236,227,0.38)",
                  }}>
                    {cert.score} · {cert.period[lang]}
                  </p>
                  <div className="exp-azure-badge">
                    <Cloud size={10} strokeWidth={1.5} />
                    Microsoft Azure
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Bottom: full-width "Altro" ── */}
      <motion.div
        className="exp-bottom"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", marginBottom: "1.2rem" }}>
          <span style={{ color: "rgba(176,111,216,0.55)", display: "flex", alignItems: "center" }}>
            <Star size={13} strokeWidth={1.4} />
          </span>
          <p style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: "0.6rem",
            color: "rgba(240,236,227,0.28)", letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}>
            {lang === "it" ? "Altro" : "Other"}
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
          {/* EIPASS */}
          <span className="exp-tag">
            <BadgeCheck size={11} strokeWidth={1.4} style={{ color: "rgba(176,111,216,0.55)" }} />
            EIPASS 7 Moduli User
          </span>

          {/* CyberChallenge */}
          <span className="exp-tag">
            <Trophy size={11} strokeWidth={1.4} style={{ color: "rgba(176,111,216,0.55)" }} />
            CyberChallenge.IT
          </span>

          {/* Paidea courses — grouped */}
          <span className="exp-tag">
            <BookOpen size={11} strokeWidth={1.4} style={{ color: "rgba(176,111,216,0.55)" }} />
            {lang === "it"
              ? "Corsi Paidea — Blender, Unity, Videomaking"
              : "Paidea Courses — Blender, Unity, Videomaking"}
          </span>
        </div>
      </motion.div>

    </section>
  );
};

// ── Services ──────────────────────────────────────────────────
const svcIcons: React.ReactNode[] = [
  <Code2           size={13} strokeWidth={1.4} />, // Sviluppo web su misura
  <LayoutPanelLeft size={13} strokeWidth={1.4} />, // CMS proprietari
  <Globe           size={13} strokeWidth={1.4} />, // Frontend & UI responsive
  <Gauge           size={13} strokeWidth={1.4} />, // Performance, SEO & accessibilità
];

const Services = () => {
  const { lang } = useLang();
  const svcs = t.services.items[lang];

  return (
    <section id="services" style={{ padding: "clamp(3rem,10vw,8rem) clamp(1.2rem,5vw,3.5rem)", borderTop: "1px solid rgba(240,236,227,0.08)" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "3rem", flexWrap: "wrap", gap: "0.5rem" }}>
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.68rem", color: "rgba(240,236,227,0.28)", letterSpacing: "0.2em", textTransform: "uppercase" }}
        >
          {t.services.label[lang]}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: "'Playfair Display',serif", fontStyle: "italic",
            fontSize: "clamp(1.6rem,4vw,3rem)", fontWeight: 400,
            color: "rgba(240,236,227,0.45)",
          }}
        >
          {t.services.heading[lang]}
        </motion.h2>
      </div>

      <style>{`
        .svc-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0;
          max-width: 1200px;
        }
        @media (max-width: 700px) {
          .svc-grid { grid-template-columns: 1fr; }
        }
        .svc-card {
          padding: clamp(1.6rem, 3vw, 2.2rem);
          border: 1px solid rgba(240,236,227,0.06);
          position: relative;
          transition: background 0.25s ease, border-color 0.25s ease;
          overflow: hidden;
        }
        .svc-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, rgba(176,111,216,0.5) 0%, transparent 70%);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }
        .svc-card:hover {
          background: rgba(118,31,150,0.05);
          border-color: rgba(240,236,227,0.1);
        }
        .svc-card:hover::after {
          transform: scaleX(1);
        }
        @media (prefers-reduced-motion: reduce) {
          .svc-card, .svc-card::after { transition: none; }
        }
      `}</style>

      <div className="svc-grid">
        {svcs.map((s, i) => (
          <motion.div
            key={i}
            className="svc-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            data-hover="true"
          >
            {/* Numero */}
            <p style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: "0.58rem",
              color: "rgba(176,111,216,0.5)", letterSpacing: "0.18em",
              marginBottom: "1rem",
            }}>
              {s.num}
            </p>

            {/* Titolo */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", marginBottom: "0.75rem" }}>
              <span style={{
                color: "rgba(176,111,216,0.55)",
                display: "flex", alignItems: "center", flexShrink: 0,
              }}>
                {svcIcons[i] ?? null}
              </span>
              <h3 style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(1.05rem,1.8vw,1.3rem)",
                fontWeight: 700, color: "#f0ece3",
                lineHeight: 1.15, letterSpacing: "-0.01em",
              }}>
                {s.title}
              </h3>
            </div>

            {/* Divisore corto */}
            <div style={{
              width: "1.5rem", height: "1px",
              background: "rgba(240,236,227,0.1)",
              marginBottom: "0.9rem",
            }} />

            {/* Descrizione */}
            <p style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: "0.86rem",
              color: "rgba(240,236,227,0.55)", lineHeight: 1.75,
              marginBottom: s.related ? "1rem" : 0,
            }}>
              {s.desc}
            </p>

            {/* Related */}
            {s.related && (
              <p style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: "0.62rem",
                color: "rgba(176,111,216,0.4)", fontStyle: "italic",
                letterSpacing: "0.02em", lineHeight: 1.5,
              }}>
                {s.related}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// ── Contact ───────────────────────────────────────────────────
const Contact = () => {
  const { lang } = useLang();

  const links = [
    { label: t.contact.email[lang], href: "mailto:vincent.navarra0806@gmail.com" },
    { label: t.contact.linkedin[lang], href: "https://www.linkedin.com/in/vincent-navarra-31a397302/" },
  ];

  return (
    <section
      id="contact"
      style={{
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.2rem, 5vw, 3.5rem)",
        borderTop: "1px solid rgba(240,236,227,0.08)",
        textAlign: "center",
      }}
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "0.68rem",
          color: "rgba(240,236,227,0.28)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginBottom: "1.8rem",
        }}
      >
        {t.contact.label[lang]}
      </motion.p>

      <div style={{ overflow: "hidden" }}>
        <motion.h2
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "clamp(2.5rem,10vw,9rem)",
            fontWeight: 900,
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            color: "#f0ece3",
          }}
        >
          {t.contact.heading1[lang]}
          <br />
          <span style={{ fontStyle: "italic", color: "rgba(240,236,227,0.2)" }}>
            {t.contact.heading2[lang]}
          </span>
        </motion.h2>
      </div>

      <motion.nav
        aria-label={lang === "it" ? "Link di contatto" : "Contact links"}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4 }}
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "clamp(1rem,3vw,1.5rem)",
          marginTop: "2.5rem",
          flexWrap: "wrap",
        }}
      >
        {links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            data-hover="true"
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.76rem",
              color: "rgba(240,236,227,0.55)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderBottom: "1px solid rgba(240,236,227,0.14)",
              paddingBottom: "0.22rem",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#f0ece3";
              e.currentTarget.style.borderColor = "#f0ece3";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(240,236,227,0.55)";
              e.currentTarget.style.borderColor = "rgba(240,236,227,0.14)";
            }}
          >
            {label}
          </a>
        ))}
      </motion.nav>
    </section>
  );
};

// ── Footer ────────────────────────────────────────────────────
const Footer = () => {
  const { lang } = useLang();

  const socialLinks = [
    ["LinkedIn", "https://www.linkedin.com/in/vincent-navarra-31a397302/"],
  ];

  return (
    <footer
      style={{
        padding: "1.4rem clamp(1.2rem, 5vw, 3.5rem)",
        borderTop: "1px solid rgba(240,236,227,0.06)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      <span
        style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: "0.95rem",
          fontWeight: 700,
          color: "#f0ece3",
        }}
      >
        Vincent Navarra.
      </span>

      <span
        style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "0.62rem",
          color: "rgba(240,236,227,0.3)",
          letterSpacing: "0.07em",
          textAlign: "center",
        }}
      >
        © {new Date().getFullYear()} Vincent Navarra — {t.contact.copyright[lang]}
      </span>

      <nav
        aria-label="Social links"
        style={{ display: "flex", gap: "1.4rem" }}
      >
        {socialLinks.map(([label, href]) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-hover="true"
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.62rem",
              color: "rgba(240,236,227,0.4)",
              textDecoration: "none",
              letterSpacing: "0.06em",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "rgba(240,236,227,0.8)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(240,236,227,0.4)";
            }}
          >
            {label}
          </a>
        ))}
      </nav>

      <style>{`
        @media (max-width: 600px) {
          footer {
            flex-direction: column;
            text-align: center;
            gap: 0.8rem;
          }
        }
      `}</style>
    </footer>
  );
};

// ── App ───────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState<Lang>("it");

  return (
    <MotionConfig reducedMotion="user">
    <LangCtx.Provider value={{ lang, setLang }}>
      <Cursor />
      <div style={{ background: "#000", minHeight: "100vh", overflowX: "clip" }}>
        <a
          href="#work"
          style={{
            position: "absolute", left: "1rem", top: "-3rem",
            background: "#f0ece3", color: "#000",
            padding: "0.5rem 1rem", fontFamily: "'DM Sans',sans-serif",
            fontSize: "0.8rem", textDecoration: "none", zIndex: 1000,
            transition: "top 0.2s",
          }}
          onFocus={e => (e.currentTarget.style.top = "4.5rem")}
          onBlur={e => (e.currentTarget.style.top = "-3rem")}
        >
          {lang === "it" ? "Salta al contenuto" : "Skip to content"}
        </a>
        <Navbar />
        <main id="main-content">
          <Hero />
          <Marquee />
          <Work />
          <About />
          <Skills />
          <Experience />
          <Services />
          <Contact />
          <Footer />
        </main>
      </div>
    </LangCtx.Provider>
    </MotionConfig>
  );
}
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, animate } from "framer-motion";
import { ArrowUpRight, Menu, X, Code2, Database, Shield, Settings, Globe } from "lucide-react";

/* ─── Google Font ─── */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800;900&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{font-family:'Kanit',sans-serif;background:#0C0C0C;color:#D7E2EA;overflow-x:clip}
    .hero-heading{background:linear-gradient(180deg,#646973 0%,#BBCCD7 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    ::-webkit-scrollbar{width:4px}
    ::-webkit-scrollbar-track{background:#0C0C0C}
    ::-webkit-scrollbar-thumb{background:#2a2a2a;border-radius:2px}
  `}</style>
);

/* ─── Navbar ─── */
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["About", "Skills", "Projects", "Contact"];
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 clamp(1.5rem,5vw,4rem)",
        height: 72,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(12,12,12,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(215,226,234,0.06)" : "none",
        transition: "background 0.4s, border 0.4s",
      }}
    >
      <span style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "0.08em", color: "#D7E2EA" }}>
        VIN<span style={{ color: "#4a9eff" }}>.</span>
      </span>
      <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }} className="desktop-nav">
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`}
            style={{ color: "#9aa5ae", fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.06em", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.target.style.color = "#D7E2EA")}
            onMouseLeave={e => (e.target.style.color = "#9aa5ae")}
          >{l}</a>
        ))}
        <ContactButton small />
      </div>
      <button onClick={() => setOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", color: "#D7E2EA", display: "none" }} className="mobile-menu-btn">
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          style={{
            position: "absolute", top: 72, left: 0, right: 0,
            background: "rgba(12,12,12,0.97)", padding: "1.5rem 2rem",
            borderBottom: "1px solid rgba(215,226,234,0.08)", display: "flex", flexDirection: "column", gap: "1.2rem"
          }}
        >
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
              style={{ color: "#D7E2EA", fontSize: "1rem", fontWeight: 500, textDecoration: "none" }}
            >{l}</a>
          ))}
        </motion.div>
      )}
      <style>{`
        @media(max-width:640px){.desktop-nav{display:none!important}.mobile-menu-btn{display:block!important}}
      `}</style>
    </motion.nav>
  );
};

/* ─── Buttons ─── */
const ContactButton = ({ small = false }) => (
  <a href="#contact" style={{
    display: "inline-flex", alignItems: "center", gap: "0.4rem",
    padding: small ? "0.45rem 1.1rem" : "0.75rem 1.8rem",
    background: "linear-gradient(135deg,#1a6fff 0%,#0d4fd4 100%)",
    borderRadius: 999, color: "#fff", fontFamily: "'Kanit',sans-serif",
    fontWeight: 600, fontSize: small ? "0.78rem" : "0.9rem",
    letterSpacing: "0.04em", textDecoration: "none", border: "none", cursor: "pointer",
    boxShadow: "0 0 24px rgba(26,111,255,0.3)",
    transition: "transform 0.2s, box-shadow 0.2s",
  }}
    onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 0 32px rgba(26,111,255,0.5)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 0 24px rgba(26,111,255,0.3)"; }}
  >
    Contact Me <ArrowUpRight size={small ? 13 : 15} />
  </a>
);

const GhostButton = ({ children, href = "#" }) => (
  <a href={href} target="_blank" rel="noreferrer" style={{
    display: "inline-flex", alignItems: "center", gap: "0.4rem",
    padding: "0.6rem 1.4rem",
    background: "transparent", border: "1px solid rgba(215,226,234,0.25)",
    borderRadius: 999, color: "#D7E2EA", fontFamily: "'Kanit',sans-serif",
    fontWeight: 500, fontSize: "0.85rem", letterSpacing: "0.04em",
    textDecoration: "none", cursor: "pointer",
    transition: "border-color 0.2s, background 0.2s",
  }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = "#4a9eff"; e.currentTarget.style.background = "rgba(74,158,255,0.06)"; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(215,226,234,0.25)"; e.currentTarget.style.background = "transparent"; }}
  >
    {children} <ArrowUpRight size={13} />
  </a>
);

/* ─── FadeIn wrapper ─── */
const FadeIn = ({ children, delay = 0, y = 30, style = {} }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}
    >{children}</motion.div>
  );
};

/* ─── Magnet ─── */
const Magnet = ({ children, strength = 0.35 }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }, [strength, x, y]);

  const handleLeave = useCallback(() => {
    x.set(0); y.set(0);
  }, [x, y]);

  return (
    <motion.div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave}
      style={{ x: sx, y: sy, display: "inline-block" }}
    >{children}</motion.div>
  );
};

/* ─── AnimatedText (char-by-char scroll reveal) ─── */
const AnimatedText = ({ text, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const words = text.split(" ");
  let charIndex = 0;
  return (
    <p ref={ref} className={className} style={{ lineHeight: 1.75 }}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: "inline-block", marginRight: "0.28em", overflow: "hidden" }}>
          {word.split("").map((char) => {
            const idx = charIndex++;
            return (
              <motion.span key={idx} style={{ display: "inline-block" }}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: idx * 0.018, ease: [0.16, 1, 0.3, 1] }}
              >{char}</motion.span>
            );
          })}
        </span>
      ))}
    </p>
  );
};

/* ─── Hero ─── */
const Hero = () => {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, 80]);

  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: "0 clamp(1.5rem,5vw,4rem)",
      paddingTop: 72, position: "relative", overflow: "hidden",
    }}>
      {/* Background grid */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(rgba(215,226,234,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(215,226,234,0.025) 1px,transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />
      {/* Glow */}
      <div style={{
        position: "absolute", top: "20%", left: "50%", transform: "translate(-50%,-50%)",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(26,111,255,0.08) 0%,transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{
        position: "relative", zIndex: 1, width: "100%", maxWidth: 1200, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "center",
      }}>
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.35rem 0.9rem", background: "rgba(74,158,255,0.08)",
              border: "1px solid rgba(74,158,255,0.2)", borderRadius: 999,
              fontSize: "0.75rem", fontWeight: 500, color: "#4a9eff", letterSpacing: "0.08em",
              marginBottom: "1.5rem",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4a9eff", display: "inline-block", animation: "pulse 2s infinite" }} />
            AVAILABLE FOR WORK
          </motion.div>

          <motion.h1
            className="hero-heading"
            style={{ fontSize: "clamp(3rem,8vw,6.5rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Hi, i'm<br />vincent
          </motion.h1>

          <motion.p
            style={{ fontSize: "clamp(1rem,2vw,1.15rem)", fontWeight: 300, color: "#8a97a3", maxWidth: 480, lineHeight: 1.7, marginBottom: "2.5rem" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            computer engineering student &amp; full-stack web developer crafting secure, custom digital solutions
          </motion.p>

          <motion.div
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <ContactButton />
            <GhostButton href="#projects">View Projects</GhostButton>
          </motion.div>
        </div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", justifyContent: "flex-end" }}
          className="portrait-wrap"
        >
          <Magnet strength={0.28}>
            <div style={{
              width: "clamp(180px,22vw,280px)", height: "clamp(180px,22vw,280px)",
              borderRadius: 24,
              border: "1px solid rgba(215,226,234,0.1)",
              background: "linear-gradient(135deg,#111 0%,#1a1a2e 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", overflow: "hidden",
              boxShadow: "0 0 60px rgba(26,111,255,0.12), inset 0 0 40px rgba(26,111,255,0.04)",
            }}>
              <div style={{
                fontSize: "clamp(4rem,8vw,7rem)", fontWeight: 900, color: "rgba(74,158,255,0.15)",
                userSelect: "none", letterSpacing: "-0.04em",
              }}>VB</div>
              <div style={{
                position: "absolute", bottom: 16, left: 0, right: 0, textAlign: "center",
                fontSize: "0.7rem", fontWeight: 500, color: "rgba(215,226,234,0.3)", letterSpacing: "0.15em",
              }}>PHOTO PLACEHOLDER</div>
              <div style={{
                position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%",
                background: "radial-gradient(circle,rgba(26,111,255,0.15) 0%,transparent 70%)",
              }} />
            </div>
          </Magnet>
        </motion.div>
      </div>

      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @media(max-width:640px){
          section#hero > div {grid-template-columns:1fr!important}
          .portrait-wrap{display:none!important}
        }
      `}</style>
    </section>
  );
};

/* ─── Marquee ─── */
const MarqueeRow = ({ items, reverse = false, speed = 25 }) => {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", width: "100%", display: "flex" }}>
      <motion.div
        style={{ display: "flex", gap: "1rem", alignItems: "center", width: "max-content" }}
        animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <div key={i} style={{
            width: 200, height: 120, borderRadius: 12,
            background: `linear-gradient(135deg, ${item.bg1} 0%, ${item.bg2} 100%)`,
            border: "1px solid rgba(215,226,234,0.07)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, overflow: "hidden",
            fontSize: "0.7rem", fontWeight: 500, color: "rgba(215,226,234,0.4)",
            letterSpacing: "0.1em",
          }}>
            {item.label}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const MarqueeSection = () => {
  const row1 = [
    { label: "WEB PORTAL", bg1: "#0f1923", bg2: "#1a2d3d" },
    { label: "CMS BUILD", bg1: "#0d1f0d", bg2: "#1a331a" },
    { label: "API DESIGN", bg1: "#1f0d1f", bg2: "#33152e" },
    { label: "DATABASE", bg1: "#1a1a08", bg2: "#2d2d0f" },
    { label: "REACT APP", bg1: "#0d1a2e", bg2: "#142040" },
    { label: "PHP BACKEND", bg1: "#1a0d0d", bg2: "#2e1515" },
  ];
  const row2 = [
    { label: "SECURITY", bg1: "#0d1a2e", bg2: "#0d2233" },
    { label: "MYSQL", bg1: "#1a1408", bg2: "#2d2311" },
    { label: "NEXT.JS", bg1: "#0f0f0f", bg2: "#1a1a1a" },
    { label: "TAILWIND", bg1: "#0a1a1a", bg2: "#102828" },
    { label: "NODE.JS", bg1: "#0d1a0d", bg2: "#142814" },
    { label: "TYPESCRIPT", bg1: "#0d1529", bg2: "#131e3d" },
  ];
  return (
    <section style={{ padding: "5rem 0", overflow: "hidden", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <MarqueeRow items={row1} speed={30} />
      <MarqueeRow items={row2} reverse speed={28} />
    </section>
  );
};

/* ─── About ─── */
const About = () => (
  <section id="about" style={{ padding: "clamp(4rem,10vw,8rem) clamp(1.5rem,5vw,4rem)" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "4rem", alignItems: "start" }} className="about-grid">
      <div>
        <FadeIn>
          <p style={{ fontSize: "0.72rem", fontWeight: 600, color: "#4a9eff", letterSpacing: "0.2em", marginBottom: "1rem" }}>WHO I AM</p>
          <h2 style={{ fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em" }}>About<br /><span className="hero-heading">me</span></h2>
        </FadeIn>
        <FadeIn delay={0.15} style={{ marginTop: "2rem" }}>
          <div style={{
            display: "flex", gap: "2rem", flexWrap: "wrap",
          }}>
            {[["3+", "Years Coding"], ["12+", "Projects Done"], ["5", "Tech Stacks"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#D7E2EA" }}>{n}</div>
                <div style={{ fontSize: "0.8rem", color: "#5a6570", fontWeight: 500 }}>{l}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
      <div>
        <AnimatedText
          text="As a Computer Engineering student and Full-Stack Web Developer, I bridge the gap between rigorous software architecture and seamless user experiences. I specialize in designing, developing, and securing custom web portals, tailored CMS solutions, and optimized databases. Let's build something scalable together!"
          className=""
        />
        <FadeIn delay={0.3} style={{ marginTop: "2rem" }}>
          <ContactButton />
        </FadeIn>
      </div>
    </div>
    <style>{`@media(max-width:768px){.about-grid{grid-template-columns:1fr!important}}`}</style>
  </section>
);

/* ─── Skills ─── */
const skillsData = [
  { icon: <Code2 size={20} />, title: "Full-Stack Dev", sub: "HTML/CSS/JS/Backend", desc: "End-to-end development from pixel-perfect frontends to robust server architectures." },
  { icon: <Settings size={20} />, title: "Custom CMS", sub: "Tailor-made systems", desc: "Bespoke content management solutions built around your exact workflow, not the other way around." },
  { icon: <Globe size={20} />, title: "Backend & PHP", sub: "Server-side logic", desc: "Scalable APIs, RESTful services, and server-side logic engineered for performance and reliability." },
  { icon: <Database size={20} />, title: "Database Design", sub: "MySQL / Optimization", desc: "Normalized schemas, indexing strategies, and query optimization for data-heavy applications." },
  { icon: <Shield size={20} />, title: "Cyber Security", sub: "Authentication / Encryption", desc: "Hardened auth systems, data encryption, and security audits to keep your platform airtight." },
];

const Skills = () => (
  <section id="skills" style={{ padding: "clamp(4rem,10vw,8rem) clamp(1.5rem,5vw,4rem)", borderTop: "1px solid rgba(215,226,234,0.06)" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <FadeIn>
        <p style={{ fontSize: "0.72rem", fontWeight: 600, color: "#4a9eff", letterSpacing: "0.2em", marginBottom: "1rem" }}>WHAT I DO</p>
        <h2 style={{ fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "3.5rem" }}>
          <span className="hero-heading">Skills</span>
        </h2>
      </FadeIn>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1px", border: "1px solid rgba(215,226,234,0.07)", borderRadius: 16, overflow: "hidden" }}>
        {skillsData.map((s, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <motion.div
              whileHover={{ background: "rgba(74,158,255,0.04)" }}
              style={{
                padding: "2rem", background: "rgba(255,255,255,0.01)",
                borderRight: "1px solid rgba(215,226,234,0.07)",
                borderBottom: "1px solid rgba(215,226,234,0.07)",
                height: "100%", cursor: "default",
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: "rgba(74,158,255,0.1)", border: "1px solid rgba(74,158,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#4a9eff", marginBottom: "1.2rem",
              }}>{s.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.25rem", color: "#D7E2EA" }}>{s.title}</h3>
              <p style={{ fontSize: "0.75rem", color: "#4a9eff", fontWeight: 500, marginBottom: "0.8rem", letterSpacing: "0.05em" }}>{s.sub}</p>
              <p style={{ fontSize: "0.875rem", color: "#6a7880", lineHeight: 1.65, fontWeight: 300 }}>{s.desc}</p>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Projects ─── */
const projectsData = [
  {
    num: "01",
    title: "Custom Web Portals",
    tag: "Full-Stack",
    desc: "High-performance portals engineered with modern stacks. Pixel-precise UI, real-time data flows, and rock-solid authentication baked in from day one.",
    tech: ["React", "Node.js", "MySQL", "REST API"],
    color: "#1a6fff",
    bg: "linear-gradient(135deg,#0a1525 0%,#0d1f40 100%)",
  },
  {
    num: "02",
    title: "Secure CMS Solutions",
    tag: "Backend",
    desc: "Purpose-built content management systems with role-based permissions, audit trails, and encryption layers — no off-the-shelf bloat, just what you need.",
    tech: ["PHP", "MySQL", "JWT Auth", "Encryption"],
    color: "#22c55e",
    bg: "linear-gradient(135deg,#0a1a0f 0%,#0f2a18 100%)",
  },
  {
    num: "03",
    title: "Database Systems",
    tag: "Data",
    desc: "Architected relational schemas and query pipelines optimized for scale. From ER diagrams to indexing strategies, built for the long run.",
    tech: ["MySQL", "Schema Design", "Optimization", "Backups"],
    color: "#f59e0b",
    bg: "linear-gradient(135deg,#1a1408 0%,#2a2010 100%)",
  },
];

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: false, margin: "-10%" });

  const CARD_H = 480;
  const STACK_OFFSET = 40;

  return (
    <div ref={ref} style={{ height: `${CARD_H + STACK_OFFSET * (projectsData.length - index)}px` }}>
      <div ref={cardRef} style={{
        position: "sticky", top: `${80 + index * STACK_OFFSET}px`,
        height: CARD_H, willChange: "transform",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={cardInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4 }}
          style={{
            height: "100%", borderRadius: 20,
            background: project.bg,
            border: "1px solid rgba(215,226,234,0.08)",
            padding: "clamp(1.5rem,4vw,2.5rem)",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            overflow: "hidden", position: "relative",
            boxShadow: `0 0 60px ${project.color}18`,
          }}
        >
          {/* Accent glow */}
          <div style={{
            position: "absolute", top: -80, right: -80, width: 250, height: 250, borderRadius: "50%",
            background: `radial-gradient(circle,${project.color}20 0%,transparent 70%)`,
            pointerEvents: "none",
          }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, color: project.color, letterSpacing: "0.18em" }}>{project.num} — {project.tag}</span>
              <h3 style={{ fontSize: "clamp(1.6rem,4vw,2.5rem)", fontWeight: 800, color: "#D7E2EA", letterSpacing: "-0.02em", marginTop: "0.5rem", lineHeight: 1.1 }}>{project.title}</h3>
            </div>
            <GhostButton>Live Project</GhostButton>
          </div>

          <p style={{ fontSize: "clamp(0.9rem,1.5vw,1rem)", color: "#6a7880", lineHeight: 1.7, fontWeight: 300, maxWidth: 520 }}>{project.desc}</p>

          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            {project.tech.map(t => (
              <span key={t} style={{
                padding: "0.3rem 0.8rem", borderRadius: 999,
                background: `${project.color}14`, border: `1px solid ${project.color}30`,
                fontSize: "0.73rem", fontWeight: 500, color: project.color, letterSpacing: "0.05em",
              }}>{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Projects = () => (
  <section id="projects" style={{ padding: "clamp(4rem,10vw,8rem) clamp(1.5rem,5vw,4rem)", borderTop: "1px solid rgba(215,226,234,0.06)" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <FadeIn>
        <p style={{ fontSize: "0.72rem", fontWeight: 600, color: "#4a9eff", letterSpacing: "0.2em", marginBottom: "1rem" }}>SELECTED WORK</p>
        <h2 style={{ fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "3.5rem" }}>
          <span className="hero-heading">Projects</span>
        </h2>
      </FadeIn>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {projectsData.map((p, i) => <ProjectCard key={i} project={p} index={i} />)}
      </div>
    </div>
  </section>
);

/* ─── Contact / Footer ─── */
const Contact = () => (
  <section id="contact" style={{
    padding: "clamp(5rem,12vw,10rem) clamp(1.5rem,5vw,4rem)",
    borderTop: "1px solid rgba(215,226,234,0.06)",
    textAlign: "center",
  }}>
    <FadeIn>
      <p style={{ fontSize: "0.72rem", fontWeight: 600, color: "#4a9eff", letterSpacing: "0.2em", marginBottom: "1.5rem" }}>GET IN TOUCH</p>
      <h2 style={{ fontSize: "clamp(2.5rem,7vw,5rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "1.5rem" }}>
        Let's build something<br /><span className="hero-heading">great together</span>
      </h2>
      <p style={{ color: "#5a6570", fontSize: "1rem", maxWidth: 400, margin: "0 auto 2.5rem", fontWeight: 300, lineHeight: 1.7 }}>
        Open to freelance projects, internships, and full-time roles. Let's talk.
      </p>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
        <ContactButton />
        <GhostButton href="https://github.com">GitHub</GhostButton>
        <GhostButton href="https://linkedin.com">LinkedIn</GhostButton>
      </div>
    </FadeIn>
    <div style={{ marginTop: "6rem", paddingTop: "2rem", borderTop: "1px solid rgba(215,226,234,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
      <span style={{ fontWeight: 800, fontSize: "1rem", letterSpacing: "0.08em", color: "#D7E2EA" }}>VIN<span style={{ color: "#4a9eff" }}>.</span></span>
      <span style={{ fontSize: "0.78rem", color: "#3a4248", fontWeight: 400 }}>© {new Date().getFullYear()} Vincent — Built with React & Framer Motion</span>
    </div>
  </section>
);

/* ─── App ─── */
export default function App() {
  return (
    <>
      <FontLoader />
      <div style={{ background: "#0C0C0C", minHeight: "100vh", overflowX: "clip" }}>
        <Navbar />
        <Hero />
        <MarqueeSection />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </>
  );
}

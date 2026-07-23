import { useState, useRef, useEffect } from "react";
import Spline from '@splinetool/react-spline';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";

/* ── Google Font: Playfair Display (serif condensed display) + DM Sans ── */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,800;0,900;1,400;1,700;1,800;1,900&family=DM+Sans:wght@300;400;500&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth;cursor:none}
    body{font-family:'DM Sans',sans-serif;background:#000;color:#f0ece3;overflow-x:clip;cursor:none}
    a,button{cursor:none}
    ::selection{background:#f0ece3;color:#000}
    ::-webkit-scrollbar{width:3px}
    ::-webkit-scrollbar-track{background:#000}
    ::-webkit-scrollbar-thumb{background:#333}
  `}</style>
);

/* ── Custom Cursor ── */
const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const followerRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
      }
    };
    const down = () => setClicked(true);
    const up = () => setClicked(false);
    const over = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const el = target?.closest("a,button,[data-hover]");
      setHovered(!!el);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} style={{
        position: "fixed", top: 0, left: 0, zIndex: 9999, pointerEvents: "none",
        width: 8, height: 8, background: "#f0ece3", borderRadius: "50%",
        transition: "transform 0.05s linear",
        mixBlendMode: "difference",
      }} />
      <div ref={followerRef} style={{
        position: "fixed", top: 0, left: 0, zIndex: 9998, pointerEvents: "none",
        width: hovered ? 60 : 40, height: hovered ? 60 : 40,
        borderRadius: "50%",
        border: `1px solid ${hovered ? "#f0ece3" : "rgba(240,236,227,0.4)"}`,
        transition: "width 0.25s ease, height 0.25s ease, border 0.2s ease, transform 0.12s linear",
        transform: clicked ? "scale(0.85)" : "scale(1)",
        mixBlendMode: "difference",
      }} />
    </>
  );
};

/* ── Navbar ── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
          padding: "0 clamp(1.5rem,5vw,3.5rem)",
          height: 68,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderBottom: scrolled ? "1px solid rgba(240,236,227,0.08)" : "1px solid transparent",
          background: scrolled ? "rgba(0,0,0,0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        <a href="#" style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.15rem", fontWeight: 700, color: "#f0ece3", textDecoration: "none", letterSpacing: "0.02em" }}>
          Vincent Navarra.
        </a>
        <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          {["Work", "About", "Skills", "Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ color: "rgba(240,236,227,0.5)", fontSize: "0.78rem", fontWeight: 400, letterSpacing: "0.08em", textDecoration: "none", textTransform: "uppercase", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#f0ece3"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(240,236,227,0.5)"}
              data-hover="true"
            >{l}</a>
          ))}
          <a href="#contact" data-hover="true"
            style={{
              padding: "0.5rem 1.2rem", border: "1px solid rgba(240,236,227,0.3)",
              color: "#f0ece3", fontSize: "0.75rem", fontWeight: 400,
              letterSpacing: "0.1em", textTransform: "uppercase",
              textDecoration: "none", transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#f0ece3"; e.currentTarget.style.color = "#000"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#f0ece3"; }}
          >Hire me</a>
        </div>
      </motion.nav>
    </>
  );
};

/* ── Hero ── */
const Hero = () => {
  const { scrollY } = useScroll();
  const scrollY1 = useTransform(scrollY, [0, 600], [0, -120]);
  const scrollY2 = useTransform(scrollY, [0, 600], [0, -60]);
  const opacity  = useTransform(scrollY, [0, 400], [1, 0]);

  // Mouse tracking — normalised -1…1 relative to viewport centre
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring config for buttery smooth motion
  const springCfg = { stiffness: 80, damping: 20, mass: 0.6 };
  const sMouseX = useSpring(mouseX, springCfg);
  const sMouseY = useSpring(mouseY, springCfg);

  // Avatar 3-D tilt  (max ±18 deg)
  const rotateY  = useTransform(sMouseX, [-1, 1], [-18, 18]);
  const rotateX  = useTransform(sMouseY, [-1, 1], [12, -12]);

  // Ambient shadow shift
  const shadowX = useTransform(sMouseX, [-1, 1], [-30, 30]);
  const shadowY = useTransform(sMouseY, [-1, 1], [-20, 20]);

  // Subtle parallax on the text layers behind avatar
  const textPX  = useTransform(sMouseX, [-1, 1], [-12, 12]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth)  * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  // Composed drop-shadow string
  const dropShadow = useTransform(
    [shadowX, shadowY],
    ([sx, sy]: number[]) =>
      `drop-shadow(${sx * 0.6}px ${sy * 0.6 + 40}px 60px rgba(0,0,0,0.95))
       drop-shadow(${sx * 0.3}px ${sy * 0.3 + 10}px 20px rgba(0,0,0,0.7))`
  );

  return (
    <section style={{
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden",
      background: "#000",
      borderBottom: "1px solid rgba(240,236,227,0.1)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}>
      {/* Grain */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
        backgroundSize: "200px 200px", opacity: 0.4,
      }} />

      {/* ── BIG TITLE — behind avatar, subtle parallax ── */}
      <motion.div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          paddingTop: "clamp(4rem,10vw,7rem)",
          zIndex: 1,
          y: scrollY1,
          x: textPX,
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <motion.h1
            initial={{ y: 120, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "clamp(5rem,16vw,17rem)",
              fontWeight: 900, lineHeight: 0.88,
              letterSpacing: "-0.04em",
              color: "rgba(240,236,227,0.82)",
              textAlign: "center",
              textTransform: "uppercase",
              userSelect: "none",
            }}
          >Hi, I'm</motion.h1>
        </div>
        <div style={{ overflow: "hidden" }}>
          <motion.h1
            initial={{ y: 120, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "clamp(5rem,16vw,17rem)",
              fontWeight: 900, lineHeight: 0.88,
              letterSpacing: "-0.04em",
              color: "rgba(240,236,227,0.82)",
              textAlign: "center",
              textTransform: "uppercase",
              userSelect: "none",
            }}
          >Vincent</motion.h1>
        </div>
      </motion.div>

      {/* ── AVATAR — 3-D tilt + specular ── */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "clamp(3rem,8vw,5rem)",
          left: "50%",
          translateX: "-50%",
          zIndex: 2,
          y: scrollY2,
          // perspective wrapper
          perspective: 900,
        }}
        initial={{ opacity: 0, scale: 0.88, y: 80 }}
        animate={{ opacity: 1, scale: 1,  y: 0 }}
        transition={{ delay: 0.5, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Tilt card */}
        <motion.div
          style={{
            rotateY,
            rotateX,
            transformStyle: "preserve-3d",
            position: "relative",
          }}
        >
          {/* Avatar image */}
          <motion.img
            src="./src/assets/avatar.png"
            alt="Vincent Navarra"
            style={{
              width: "clamp(300px,40vw,580px)",
              height: "auto",
              display: "block",
              objectFit: "contain",
              filter: dropShadow,
              transformStyle: "preserve-3d",
            }}
          />

          {/* Specular highlight overlay */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50% 50% 45% 45%",
              pointerEvents: "none",
            }}
          />

          {/* Edge rim light */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
            }}
          />
        </motion.div>

        {/* Ground shadow ellipse — moves with mouse */}
        <motion.div
          style={{
            position: "absolute",
            bottom: -20,
            left: "50%",
            translateX: "-50%",
            width: "70%",
            height: 40,
            borderRadius: "50%",
            background: "rgba(0,0,0,0.55)",
            filter: "blur(22px)",
            x: useTransform(sMouseX, [-1, 1], [-18, 18]),
            scaleX: useTransform(sMouseY, [-1, 1], [0.9, 1.1]),
            zIndex: -1,
          }}
        />
      </motion.div>

      {/* ── Bottom-left tagline ── */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "clamp(2rem,4vw,3.5rem)",
          left:   "clamp(1.5rem,5vw,3.5rem)",
          zIndex: 3,
          opacity,
        }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <p style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "clamp(0.62rem,1vw,0.75rem)",
          fontWeight: 400,
          color: "rgba(240,236,227,0.4)",
          letterSpacing: "0.13em",
          textTransform: "uppercase",
          lineHeight: 1.8,
          maxWidth: 240,
        }}>
          Studente di Ingegneria Informatica<br />
          e Full-Stack Web Developer<br />
          basato a Napoli
        </p>
      </motion.div>

      {/* ── Bottom-right CTA ── */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "clamp(2rem,4vw,3.5rem)",
          right:  "clamp(1.5rem,5vw,3.5rem)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "1rem",
          opacity,
        }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        <a href="#contact" data-hover="true"
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: "0.74rem", fontWeight: 500,
            color: "#fff", textDecoration: "none",
            letterSpacing: "0.13em", textTransform: "uppercase",
            padding: "0.75rem 2rem", borderRadius: 999,
            background: "linear-gradient(135deg,#7c3aed,#a855f7)",
            transition: "transform 0.2s, box-shadow 0.2s",
            boxShadow: "0 4px 30px rgba(139,92,246,0.4)",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(139,92,246,0.65)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)";    e.currentTarget.style.boxShadow = "0 4px 30px rgba(139,92,246,0.4)"; }}
        >Contact me</a>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#5eff8a", animation: "blink 2s infinite" }} />
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.68rem", color: "rgba(240,236,227,0.38)", letterSpacing: "0.08em" }}>Available for projects</span>
        </div>
      </motion.div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.25} }
      `}</style>
    </section>
  );
};

/* ── Marquee ── */
const Marquee = () => {
  const items = ["Full-Stack Development", "CMS Proprietari", "Database Architecture", "Cyber Security", "PHP Backend", "React & JavaScript", "MySQL & SQL", "IT Testing & Deployment"];
  const doubled = [...items, ...items];
  return (
    <div style={{ borderBottom: "1px solid rgba(240,236,227,0.08)", overflow: "hidden", padding: "1.2rem 0" }}>
      <motion.div
        style={{ display: "flex", gap: 0, whiteSpace: "nowrap" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontFamily: "'Playfair Display',serif", fontStyle: "italic",
            fontSize: "clamp(1.1rem,2.5vw,1.6rem)", fontWeight: 400,
            color: i % 2 === 0 ? "rgba(240,236,227,0.7)" : "rgba(240,236,227,0.18)",
            padding: "0 2rem", flexShrink: 0,
          }}>
            {item} <span style={{ color: "rgba(240,236,227,0.12)", fontStyle: "normal", fontFamily: "'DM Sans',sans-serif", fontSize: "0.6em" }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* ── Work / Projects ── */
const projects = [
  {
    num: "01", type: "CLIENT", title: "Pannone Rent & Assicurazioni", link: "https://www.pannone-rent-assicurazioni.it/",
    images: [
      "./src/assets/projects/pannone-rent-assicurazioni.webp",
      "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=1200&q=80",
    ],
  },
  {
    num: "02", type: "CLIENT", title: "Fulmine Intimo & Biancheria", link: "https://www.fulmineintimoebiancheria.it/",
    images: [
      "./src/assets/projects/fulmine.webp",
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1200&q=80",
    ],
  },
  {
    num: "03", type: "CLIENT", title: "Matteo Di Giovanni Portfolio", link: "https://www.matteodigiov.com/",
    images: [
      "./src/assets/projects/mdg.webp",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
    ],
  },
  {
    num: "04", type: "PERSONAL", title: "CyberChallenge.IT Labs", link: "#",
    images: [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=1200&q=80",
    ],
  },
  {
    num: "05", type: "PERSONAL", title: "Interactive 3D Simulation", link: "#",
    images: [
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&q=80",
      "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=1200&q=80",
    ],
  },
];

interface Project {
  num: string;
  type: string;
  title: string;
  link: string;
  images: string[];
}

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Ogni card si "appiccica" a un top diverso così le card si accumulano visivamente
  const stickyTop = 80 + index * 18; // px — offset crescente

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Le card già "passate" si rimpiccioliscono leggermente mentre la nuova arriva sopra
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.6]);

  return (
    <div
      ref={cardRef}
      style={{
        position: "sticky",
        top: stickyTop,
        zIndex: index + 1,
        // Spazio inferiore per dare respiro prima della prossima card
        marginBottom: "1rem",
      }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          background: `hsl(0,0%,${5 + index * 1.5}%)`, // ogni card leggermente più chiara
          border: "1px solid rgba(240,236,227,0.1)",
          borderRadius: 20,
          padding: "clamp(1.5rem,3vw,2.2rem)",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          transformOrigin: "top center",
          willChange: "transform",
        }}
      >
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "clamp(1rem,2.5vw,2rem)" }}>
            {/* Big number */}
            <span style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "clamp(3.5rem,8vw,7rem)",
              fontWeight: 900,
              lineHeight: 0.85,
              color: "#f0ece3",
              letterSpacing: "-0.04em",
              flexShrink: 0,
            }}>{project.num}</span>

            {/* Type + title */}
            <div style={{ paddingTop: "0.4rem" }}>
              <p style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "clamp(0.6rem,1vw,0.72rem)",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(240,236,227,0.4)",
                marginBottom: "0.4rem",
              }}>{project.type}</p>
              <h3 style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "clamp(1rem,2vw,1.35rem)",
                fontWeight: 500,
                color: "#f0ece3",
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
              }}>{project.title}</h3>
            </div>
          </div>

          {/* Live project button */}
          <a href={project.link} target="_blank" rel="noopener noreferrer" data-hover="true"
            style={{
              flexShrink: 0,
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "clamp(0.62rem,0.9vw,0.72rem)",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#f0ece3",
              textDecoration: "none",
              border: "1px solid rgba(240,236,227,0.25)",
              borderRadius: 999,
              padding: "0.6rem 1.3rem",
              whiteSpace: "nowrap",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(240,236,227,0.08)"; e.currentTarget.style.borderColor = "rgba(240,236,227,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(240,236,227,0.25)"; }}
          >Live Project</a>
        </div>

        {/* Images row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.9fr", gap: "0.75rem" }}>
          <div style={{ borderRadius: 14, overflow: "hidden", aspectRatio: "4/3" }}>
            <img
              src={project.images[0]}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
              onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
            />
          </div>
          <div style={{ borderRadius: 14, overflow: "hidden", aspectRatio: "16/9" }}>
            <img
              src={project.images[1]}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
              onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Work = () => (
  <section id="work" style={{ padding: "clamp(4rem,10vw,8rem) clamp(1.5rem,5vw,3.5rem)" }}>
    {/* Section title */}
    <motion.h2
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      style={{
        fontFamily: "'DM Sans',sans-serif",
        fontSize: "clamp(4rem,12vw,11rem)",
        fontWeight: 900,
        letterSpacing: "-0.04em",
        textTransform: "uppercase",
        color: "rgba(240,236,227,0.08)",
        lineHeight: 1,
        textAlign: "center",
        marginBottom: "clamp(2rem,4vw,3rem)",
        userSelect: "none",
      }}
    >Project</motion.h2>

    {/*
     * Il padding-bottom alto serve a dare spazio di scroll sufficiente
     * affinché l'ultima card arrivi fino in fondo prima che la sezione finisca.
     */}
    <div style={{ paddingBottom: `${projects.length * 60}px` }}>
      {projects.map((p, i) => (
        <ProjectCard key={i} project={p} index={i} />
      ))}
    </div>
  </section>
);

/* ── About ── */
const About = () => {
  const ref = useRef(null);

  return (
    /*
     * overflow: hidden sulla section è il "muro" che taglia il pianeta a metà
     * e nasconde il logo Spline (che vive nell'angolo in basso a destra del canvas).
     * position: relative serve come contesto per il posizionamento assoluto del canvas.
     */
    <section
      id="about"
      style={{
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(240,236,227,0.08)",
        padding: "clamp(5rem,12vw,10rem) clamp(1.5rem,5vw,3.5rem)",
      }}
    >
      {/* ── Left: text content (occupa ~50% della larghezza) ── */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "52%" }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", color: "rgba(240,236,227,0.3)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.5rem" }}
        >About</motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.5rem,5vw,4.5rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.02em", color: "#f0ece3" }}
        >
          Costruendo<br />
          <span style={{ fontStyle: "italic", color: "rgba(240,236,227,0.35)" }}>soluzioni</span><br />
          digitali
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ display: "flex", gap: "3rem", marginTop: "3rem" }}
        >
          {[["3+", "Anni"], ["5+", "Progetti"], ["7+", "Tecnologie"]].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.2rem", fontWeight: 700, color: "#f0ece3", lineHeight: 1 }}>{n}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", color: "rgba(240,236,227,0.3)", letterSpacing: "0.08em", marginTop: "0.3rem" }}>{l}</div>
            </div>
          ))}
        </motion.div>

        <div ref={ref} style={{ marginTop: "2.5rem" }}>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(0.95rem,1.6vw,1.1rem)", fontWeight: 300, lineHeight: 1.8, color: "rgba(240,236,227,0.65)", marginBottom: "1.5rem" }}>
            Studio <strong style={{ color: "#f0ece3", fontWeight: 400 }}>Ingegneria Informatica alla Federico II</strong> e lavoro come Full-Stack Web Developer. Progetto portali aziendali e CMS proprietari gestendo l'architettura completa, dalla modellazione database al sistema di autenticazione sicura.
          </p>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(0.95rem,1.6vw,1.1rem)", fontWeight: 300, lineHeight: 1.8, color: "rgba(240,236,227,0.4)", marginBottom: "1.5rem" }}>
            Attualmente in tirocinio extracurriculare come <strong style={{ color: "rgba(240,236,227,0.6)", fontWeight: 400 }}>Tecnico Programmatore presso Proge-Software S.r.l.</strong> a Roma, occupandomi di system integration, IT testing e software deployment.
          </p>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(0.95rem,1.6vw,1.1rem)", fontWeight: 300, lineHeight: 1.8, color: "rgba(240,236,227,0.25)" }}>
            Fondatore di <em>The Animation's House</em>, dove applico competenze di Project Management e team leadership.
          </p>
          <motion.a href="#contact" data-hover="true"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.75rem",
              marginTop: "2.5rem", fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.78rem", fontWeight: 400, color: "#f0ece3",
              letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none",
              borderBottom: "1px solid rgba(240,236,227,0.25)", paddingBottom: "0.3rem",
              transition: "border-color 0.2s, gap 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#f0ece3"; e.currentTarget.style.gap = "1.2rem"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(240,236,227,0.25)"; e.currentTarget.style.gap = "0.75rem"; }}
          >
            Collaboriamo →
          </motion.a>
        </div>
      </div>

      {/*
       * ── Right: Spline "pianeta a metà" ──
       *
       * Il wrapper è posizionato in modo assoluto sul lato destro della section.
       * width: 55vw  → il canvas è più largo del 50% della viewport
       * right: -15vw → spinge il canvas OLTRE il bordo destro dello schermo;
       *                la section (overflow:hidden) taglia tutto ciò che esce,
       *                mostrando solo la metà sinistra del pianeta e
       *                nascondendo il logo Spline (che è in basso a destra).
       * pointer-events: none → il canvas non blocca i click sul testo a sinistra.
       */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "radial-gradient(circle farthest-corner at 50% 50%, #761F96ff 0%, #00000000 60%)",
          position: "absolute",
          top: "25%",
          right: "-25%",
          transform: "translateY(-50%)",
          width: "55vw",
          aspectRatio: "1 / 1",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <Spline
          scene="https://prod.spline.design/6RS61eUEvPtfFEsy/scene.splinecode"
          style={{ width: "100%", height: "100%" }}
        />
      </motion.div>

    </section>
  );
};

/* ── Skills ── */
const skills = [
  { title: "Frontend", tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap"] },
  { title: "Backend & PHP", tags: ["PHP", "REST APIs", "Server Logic", "Auth"] },
  { title: "Database Design", tags: ["MySQL", "Schema Design", "Foreign Keys", "Query Optimization"] },
  { title: "CMS Proprietari", tags: ["Admin UIs", "Gestione Contenuti", "WebP Engine"] },
  { title: "Cyber Security", tags: ["Crittografia", "CyberChallenge.IT", "Web Exploits", "CTF"] },
  { title: "Tools & 3D", tags: ["Git", "GitHub", "Unity 3D", "Blender", "Videomaking"] },
];

const Skills = () => (
  <section id="skills" style={{ padding: "clamp(4rem,10vw,8rem) clamp(1.5rem,5vw,3.5rem)", borderTop: "1px solid rgba(240,236,227,0.08)" }}>
    <motion.p
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
      style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", color: "rgba(240,236,227,0.3)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "3rem" }}
    >Skills &amp; services</motion.p>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 0 }}>
      {skills.map((s, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.07 }}
          data-hover="true"
          style={{
            padding: "2rem", border: "1px solid rgba(240,236,227,0.06)",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(240,236,227,0.03)"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.65rem", color: "rgba(240,236,227,0.2)", letterSpacing: "0.15em", marginBottom: "0.8rem" }}>0{i + 1}</div>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", fontWeight: 700, color: "#f0ece3", marginBottom: "1rem", lineHeight: 1.2 }}>{s.title}</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {s.tags.map(t => (
              <span key={t} style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: "0.65rem",
                padding: "0.2rem 0.6rem", border: "1px solid rgba(240,236,227,0.12)",
                color: "rgba(240,236,227,0.4)", letterSpacing: "0.05em",
              }}>{t}</span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

/* ── Contact ── */
const Contact = () => (
  <section id="contact" style={{
    padding: "clamp(5rem,14vw,12rem) clamp(1.5rem,5vw,3.5rem)",
    borderTop: "1px solid rgba(240,236,227,0.08)",
    textAlign: "center",
  }}>
    <motion.p
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", color: "rgba(240,236,227,0.3)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "2rem" }}
    >Contatti</motion.p>

    <div style={{ overflow: "hidden" }}>
      <motion.h2
        initial={{ y: 80, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(3rem,10vw,9rem)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.03em", color: "#f0ece3" }}
      >
        Iniziamo a<br /><span style={{ fontStyle: "italic", color: "rgba(240,236,227,0.2)" }}>parlare</span>
      </motion.h2>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.4 }}
      style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginTop: "3.5rem", flexWrap: "wrap" }}
    >
      {[
        ["Email", "mailto:vincent.navarra0806@gmail.com"],
        ["GitHub", "https://github.com/VincentNavarra"],
        ["LinkedIn", "https://www.linkedin.com/in/vincent-navarra-31a397302/"],
        ["Telefono", "tel:+393331316186"],
      ].map(([label, href]) => (
        <a key={label} href={href} data-hover="true" target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
          style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: "rgba(240,236,227,0.6)",
            letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none",
            borderBottom: "1px solid rgba(240,236,227,0.15)", paddingBottom: "0.25rem",
            transition: "color 0.2s, border-color 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "#f0ece3"; e.currentTarget.style.borderColor = "#f0ece3"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "rgba(240,236,227,0.6)"; e.currentTarget.style.borderColor = "rgba(240,236,227,0.15)"; }}
        >{label}</a>
      ))}
    </motion.div>

    <div style={{ marginTop: "clamp(4rem,10vw,8rem)", paddingTop: "2rem", borderTop: "1px solid rgba(240,236,227,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
      <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 700, color: "#f0ece3" }}>Vincent Navarra.</span>
      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.65rem", color: "rgba(240,236,227,0.2)", letterSpacing: "0.08em" }}>© {new Date().getFullYear()} Vincent Navarra — Tutti i diritti riservati</span>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        {[["GitHub", "https://github.com/VincentNavarra"], ["LinkedIn", "https://www.linkedin.com/in/vincent-navarra-31a397302/"]].map(([t, href]) => (
          <a key={t} href={href} target="_blank" rel="noopener noreferrer" data-hover="true" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.65rem", color: "rgba(240,236,227,0.2)", textDecoration: "none", letterSpacing: "0.06em", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "rgba(240,236,227,0.6)"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(240,236,227,0.2)"}
          >{t}</a>
        ))}
      </div>
    </div>
  </section>
);

/* ── App ── */
export default function App() {
  return (
    <>
      <FontLoader />
      <Cursor />
      <div style={{ background: "#000", minHeight: "100vh", overflowX: "clip" }}>
        <Navbar />
        <Hero />
        <Marquee />
        <Work />
        <About />
        <Skills />
        <Contact />
      </div>
    </>
  );
}
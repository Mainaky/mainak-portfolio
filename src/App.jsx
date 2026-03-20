import { useState, useEffect, useRef } from "react";
import SkillBar from "./components/SkillBar";
import ProjectShowcase from "./components/ProjectShowcase";
import { NAV_LINKS, SKILLS, PROJECTS, EXPERIENCE, ABOUT_CARDS, SOCIAL } from "./data";

// ─── tiny helpers ────────────────────────────────────────────────────────────
const ACCENT = "#7c6fff";
const mono   = "'JetBrains Mono', monospace";
const serif  = "'EB Garamond', serif";
const sans   = "'Plus Jakarta Sans', system-ui, sans-serif";

const CAT_COLORS = {
  "Core Languages": "#7c6fff",
  "ML / DS":        "#e63946",
  "ML Libraries":   "#00d4aa",
  "Databases":      "#f4a261",
  "Cloud & Tools":  "#a855f7",
};

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive]               = useState("Home");
  const [showShowcase, setShowShowcase]   = useState(false);
  const [menuOpen, setMenuOpen]           = useState(false);
  const [isMobile, setIsMobile]           = useState(window.innerWidth < 768);
  const [formData, setFormData]           = useState({ name: "", email: "", message: "" });
  const [sent, setSent]                   = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scrollTo = (section) => {
    setActive(section);
    setMenuOpen(false);
    document.getElementById(section.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  };

  // ─── shared styles ─────────────────────────────────────────────────────────
  const sectionLabel = {
    fontSize: 12, letterSpacing: 4, color: ACCENT,
    textTransform: "uppercase", marginBottom: 14,
    fontFamily: mono,
  };
  const sectionTitle = {
    fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700,
    fontFamily: serif, color: "#fff", marginBottom: 48,
  };
  const card = (hoverColor = ACCENT) => ({
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 18, padding: "22px 20px",
    transition: "border-color .25s, background .25s",
    cursor: "default",
  });

  return (
    <div style={{
      minHeight: "100vh", width: "100%",
      background: "#080010", color: "#e2e8f0",
      fontFamily: sans, overflowX: "hidden",
    }}>
      {/* ── Background orbs (fixed) ── */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        {[
          ["10%","15%","rgba(124,111,255,0.08)"],
          ["50%","right 10%","rgba(0,212,170,0.06)"],
          ["bottom 10%","40%","rgba(230,57,70,0.05)"],
        ].map(([top,left,bg],i)=>(
          <div key={i} style={{
            position:"absolute", top, left,
            width:380, height:380, borderRadius:"50%",
            background:`radial-gradient(circle,${bg} 0%,transparent 70%)`,
          }}/>
        ))}
      </div>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: "rgba(8,0,16,0.88)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "0 2.5rem", height: 64, width: "100%",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ fontFamily: serif, fontSize: 20, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
          <span style={{ color: ACCENT }}>&lt;</span>MR<span style={{ color: ACCENT }}>/&gt;</span>
        </div>

        {!isMobile && (
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => scrollTo(l)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase",
                color: active === l ? ACCENT : "rgba(255,255,255,0.5)",
                fontWeight: active === l ? 600 : 400,
                fontFamily: mono, padding: "4px 0", transition: "color .2s",
              }}>{l}</button>
            ))}
          </div>
        )}

        {isMobile && (
          <button onClick={() => setMenuOpen(v => !v)} style={{
            background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer",
          }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        )}
      </nav>

      {/* Mobile drawer */}
      {isMobile && menuOpen && (
        <div style={{
          position: "fixed", top: 64, left: 0, right: 0, zIndex: 49,
          background: "rgba(8,0,16,0.98)", borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "0.5rem 2rem 1rem",
        }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => scrollTo(l)} style={{
              display: "block", width: "100%", textAlign: "left",
              background: "none", border: "none", cursor: "pointer",
              fontSize: 15, color: active === l ? ACCENT : "#e2e8f0",
              padding: "12px 0", fontFamily: mono,
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}>{l}</button>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section id="home" style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        justifyContent: "center", position: "relative", zIndex: 1,
        paddingTop: 64, width: "100%",
      }}>
        <div style={{ textAlign: "center", width: "100%", maxWidth: 860, padding: "0 5%" }}>
          <div style={{ ...sectionLabel, marginBottom: 28 }}>
            Open to Campus Placements · 2027
          </div>

          <h1 style={{
            fontSize: "clamp(2.5rem,7vw,5rem)", fontWeight: 800,
            lineHeight: 1.08, fontFamily: serif, color: "#fff", marginBottom: 24,
          }}>
            Hi, I'm{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              <span style={{ color: ACCENT }}>Mainak Roy</span>
              <span style={{
                position: "absolute", bottom: -4, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg,${ACCENT},transparent)`,
                borderRadius: 2,
              }}/>
            </span>
          </h1>

          <p style={{
            fontSize: "clamp(1rem,2vw,1.25rem)",
            color: "rgba(255,255,255,0.6)", lineHeight: 1.95, marginBottom: 44,
            fontFamily: sans,
          }}>
            Data Science & ML Engineer — building{" "}
            <span style={{ color: "#e2e8f0" }}>intelligent systems</span> grounded in
            mathematics and statistics.{" "}
            <span style={{ color: "#e2e8f0" }}>Published researcher</span> at ICICV 2026 ·{" "}
            <span style={{ color: "#e2e8f0" }}>ISRO Hackathon 2025</span> participant.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => setShowShowcase(true)}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = `0 0 36px ${ACCENT}60`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)";   e.currentTarget.style.boxShadow = "none"; }}
              style={{
                padding: "14px 34px", borderRadius: 50,
                background: ACCENT, color: "#fff", border: "none",
                fontSize: 14, fontWeight: 600, cursor: "pointer",
                letterSpacing: 0.5, transition: "transform .2s, box-shadow .2s",
                display: "flex", alignItems: "center", gap: 10,
              }}
            >
              <span style={{ fontSize: 18 }}>🎬</span> View Projects
            </button>
            <button
              onClick={() => scrollTo("Contact")}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"}
              style={{
                padding: "14px 34px", borderRadius: 50,
                background: "transparent", color: "#e2e8f0",
                border: "1px solid rgba(255,255,255,0.2)",
                fontSize: 14, fontWeight: 500, cursor: "pointer",
                transition: "border-color .2s",
              }}
            >
              Get in Touch
            </button>
          </div>

          {/* Quick stats */}
          <div style={{
            display: "flex", flexWrap: "wrap", justifyContent: "center",
            gap: "2.5rem", marginTop: 64,
            paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.06)",
          }}>
            {[
              ["4+","ML Projects"],["1","Published Paper"],["96.2%","JEE Percentile"],
            ].map(([n,l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <span style={{
                  display: "block", fontSize: 36, fontWeight: 900,
                  fontFamily: serif, lineHeight: 1,
                  background: `linear-gradient(135deg,${ACCENT},#00d4aa)`,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundClip: "text", marginBottom: 6,
                }}>{n}</span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: mono }}>{l}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 72, animation: "bounce 2s infinite", color: "rgba(255,255,255,0.2)", fontSize: 22 }}>↓</div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "100px 5%", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={sectionLabel}>About Me</div>
          <h2 style={sectionTitle}>The story so far.</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 56, alignItems: "start" }}>
            {/* Left — avatar + bio */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div style={{
                width: 180, height: 180, borderRadius: "50%", marginBottom: 26,
                background: `linear-gradient(135deg,${ACCENT},#00d4aa)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 72, boxShadow: `0 0 56px ${ACCENT}40`,
              }}>
  <img src="/Mainak Roy PNG.png" alt="Mainak Roy" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
</div>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: "#fff", fontFamily: serif, marginBottom: 5 }}>Mainak Roy</h3>
              <div style={{ fontSize: 13, color: ACCENT, fontFamily: mono, letterSpacing: 1.5, marginBottom: 24 }}>
                Data Science · ML Engineer · B.Tech CSE
              </div>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 2, fontSize: 15, marginBottom: 14 }}>
                Final-year B.Tech Computer Science (Data Science) student at NIIT University, Neemrana.
                Passionate about the mathematics and statistics behind intelligent systems.
              </p>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 2, fontSize: 15 }}>
                Published researcher at ICICV 2026. Nationally selected participant at the
                ISRO Bharatiya Antariksh Hackathon 2025. Coordinator of the Ramanujan Mathematics Club.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 26, justifyContent: "center" }}>
                {["Python","TensorFlow","Scikit-Learn","NumPy","SQL","AWS"].map(tag => (
                  <span key={tag} style={{
                    fontSize: 12, padding: "5px 14px",
                    background: `${ACCENT}18`, color: ACCENT,
                    borderRadius: 20, border: `1px solid ${ACCENT}40`,
                    fontFamily: mono,
                  }}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Right — info cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {ABOUT_CARDS.map(item => (
                <div
                  key={item.label}
                  style={card(ACCENT)}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=`${ACCENT}50`; e.currentTarget.style.background=`${ACCENT}08`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"; e.currentTarget.style.background="rgba(255,255,255,0.025)"; }}
                >
                  <span style={{ fontSize: 22, display: "block", marginBottom: 10 }}>{item.icon}</span>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: mono, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 7 }}>{item.label}</div>
                  <div style={{ fontSize: 15, color: "#e2e8f0", fontWeight: 500, lineHeight: 1.4 }}>{item.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding: "100px 5%", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={sectionLabel}>Skills</div>
          <h2 style={sectionTitle}>Tech I work with.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 48 }}>
            {Object.keys(CAT_COLORS)
              .filter(cat => SKILLS.some(s => s.cat === cat))
              .map(cat => (
                <div key={cat}>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 18, fontFamily: mono }}>
                    {cat}
                  </div>
                  {SKILLS.filter(s => s.cat === cat).map((s, i) => (
                    <SkillBar key={s.name} {...s} delay={i * 150} />
                  ))}
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: "100px 5%", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={sectionLabel}>Projects</div>
          <h2 style={{ ...sectionTitle, marginBottom: 16 }}>Things I've built.</h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", marginBottom: 52, lineHeight: 1.8, maxWidth: 580, textAlign: "center" }}>
              From clinical AI to published research — hit the button below for a cinematic showcase of all 4 projects with a countdown reveal!
            </p>
          </div>

          {/* Launch button */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, flexWrap: "wrap", marginBottom: 70 }}>
            <button
              onClick={() => setShowShowcase(true)}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = `0 0 60px ${ACCENT}60`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = `0 0 40px ${ACCENT}35`; }}
              style={{
                padding: "18px 48px", borderRadius: 50,
                background: `linear-gradient(135deg,${ACCENT},#5b4de0)`,
                color: "#fff", border: "none", fontSize: 17, fontWeight: 700,
                cursor: "pointer", letterSpacing: 0.5,
                boxShadow: `0 0 40px ${ACCENT}35`,
                transition: "transform .2s, box-shadow .2s",
                display: "flex", alignItems: "center", gap: 12,
              }}
            >
              <span style={{ fontSize: 20 }}>🎬</span>
              Launch Project Showcase
            </button>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.28)", fontFamily: mono, lineHeight: 1.8 }}>
              Countdown · Cinematic reveal<br />4 projects · GitHub links
            </div>
          </div>

          {/* Static mini cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
            {PROJECTS.map(p => (
              <ProjectMiniCard key={p.id} p={p} onLaunch={() => setShowShowcase(true)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ padding: "100px 5%", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={sectionLabel}>Experience & Research</div>
          <h2 style={sectionTitle}>What I've done.</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {EXPERIENCE.map((e, i) => (
              <ExperienceCard key={i} exp={e} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "100px 5%", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={sectionLabel}>Contact</div>
          <h2 style={{ ...sectionTitle, marginBottom: 10 }}>Let's talk.</h2>
          <p style={{ color: "rgba(255,255,255,0.55)", marginBottom: 40, fontSize: 16 }}>
            Open to Data Science &amp; ML Engineering placements. Drop a message!
          </p>

          <form onSubmit={handleSubmit}>
            {[
              { key: "name",  label: "Your Name",      type: "text",  ph: "Recruiter / Collaborator" },
              { key: "email", label: "Email Address",   type: "email", ph: "you@company.com" },
            ].map(({ key, label, type, ph }) => (
              <div key={key} style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 11, color: "rgba(255,255,255,0.45)", fontFamily: mono, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>{label}</label>
                <input
                  type={type} placeholder={ph} required
                  value={formData[key]}
                  onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                  onFocus={e  => e.target.style.borderColor = ACCENT}
                  onBlur={e   => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                  style={{
                    width: "100%", padding: "14px 16px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12, color: "#e2e8f0", fontSize: 15,
                    outline: "none", fontFamily: sans,
                  }}
                />
              </div>
            ))}

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: 11, color: "rgba(255,255,255,0.45)", fontFamily: mono, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>Message</label>
              <textarea
                placeholder="I'd love to collaborate / I have a placement opportunity..." required rows={5}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                onFocus={e  => e.target.style.borderColor = ACCENT}
                onBlur={e   => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                style={{
                  width: "100%", padding: "14px 16px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12, color: "#e2e8f0", fontSize: 15,
                  outline: "none", resize: "vertical", fontFamily: sans,
                }}
              />
            </div>

            <button type="submit" style={{
              width: "100%", padding: 16, borderRadius: 12,
              background: sent ? "#2d6a4f" : ACCENT,
              color: "#fff", border: "none", fontSize: 15,
              fontWeight: 600, cursor: "pointer", transition: "background .3s",
            }}>
              {sent ? "✓ Message Sent!" : "Send Message →"}
            </button>
          </form>

          {/* Social */}
          <div style={{ display: "flex", gap: 14, marginTop: 40, justifyContent: "center" }}>
            {SOCIAL.map(s => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" style={{
                width: 46, height: 46, borderRadius: "50%",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: 600,
                textDecoration: "none", transition: "all .2s", fontFamily: mono,
              }}
                onMouseEnter={e => { e.currentTarget.style.background = `${ACCENT}20`; e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
              >{s.icon}</a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "24px 2rem", textAlign: "center", position: "relative", zIndex: 1 }}>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.22)", fontFamily: mono }}>
          Crafted with ❤️ · Mainak Roy · 2025 · NIIT University
        </p>
      </footer>

      {/* Cinematic Showcase */}
      {showShowcase && <ProjectShowcase onClose={() => setShowShowcase(false)} />}
    </div>
  );
}

// ─── Project Mini Card ────────────────────────────────────────────────────────
function ProjectMiniCard({ p, onLaunch }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onLaunch}
      style={{
        background: hovered ? `${p.color}08` : "rgba(255,255,255,0.025)",
        border: `1px solid ${hovered ? p.color + "60" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 18, padding: "1.4rem",
        cursor: "pointer",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all .28s ease",
        boxShadow: hovered ? `0 20px 50px ${p.color}22` : "none",
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{ fontSize: 30, marginBottom: 10 }}>{p.emoji}</div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", fontFamily: "'EB Garamond',serif", marginBottom: 8, lineHeight: 1.3 }}>{p.title}</h3>
      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: 12 }}>{p.description}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
        {p.tech.map(t => (
          <span key={t} style={{
            fontSize: 10, padding: "3px 9px",
            background: `${p.color}18`, color: p.color,
            borderRadius: 20, border: `1px solid ${p.color}35`,
            fontFamily: "'JetBrains Mono',monospace",
          }}>{t}</span>
        ))}
      </div>
      {p.github && (
        <a href={p.github} target="_blank" rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          style={{ fontSize: 11, color: p.color, textDecoration: "none", fontFamily: "'JetBrains Mono',monospace" }}>
          GitHub →
        </a>
      )}
    </div>
  );
}

// ─── Experience Card ──────────────────────────────────────────────────────────
function ExperienceCard({ exp }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 18, padding: "22px 20px",
        display: "grid", gridTemplateColumns: "48px 1fr auto",
        gap: 16, alignItems: "start",
        transition: "border-color .2s",
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = `${exp.color}50`}
      onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
    >
      <div style={{
        width: 48, height: 48, borderRadius: 12, flexShrink: 0,
        background: `${exp.color}18`, border: `1px solid ${exp.color}40`,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
      }}>{exp.icon}</div>
      <div>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 3, fontFamily: "'EB Garamond',serif" }}>{exp.title}</h3>
        <div style={{ fontSize: 11, color: exp.color, fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>{exp.org}</div>
        <ul style={{ paddingLeft: 16, margin: 0 }}>
          {exp.bullets.map((b, i) => (
            <li key={i} style={{ fontSize: 14, color: "rgba(255,255,255,0.62)", lineHeight: 1.85, marginBottom: 3 }}>{b}</li>
          ))}
        </ul>
        {exp.link && (
          <a href={exp.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 10, fontSize: 12, color: exp.color, textDecoration: "none", fontFamily: "'JetBrains Mono',monospace" }}>
            🐙 View on GitHub →
          </a>
        )}
      </div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.28)", fontFamily: "'JetBrains Mono',monospace", whiteSpace: "nowrap", paddingTop: 2 }}>{exp.year}</div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { PROJECTS } from "../data";

export default function ProjectShowcase({ onClose }) {
  const [phase, setPhase]           = useState("countdown"); // countdown | show | done
  const [count, setCount]           = useState(3);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [cardVisible, setCardVisible]   = useState(false);
  const [propsVisible, setPropsVisible] = useState(false);

  // ── Countdown ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "countdown") return;
    if (count > 0) {
      const t = setTimeout(() => setCount(c => c - 1), 1000);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase("show"), 800);
    return () => clearTimeout(t);
  }, [phase, count]);

  // ── Reveal card then props ─────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "show") return;
    setCardVisible(false);
    setPropsVisible(false);
    const t1 = setTimeout(() => setCardVisible(true),  120);
    const t2 = setTimeout(() => setPropsVisible(true), 750);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [phase, currentIdx]);

  // ── Auto-advance ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "show" || currentIdx >= PROJECTS.length - 1) return;
    const t = setTimeout(goNext, 6000);
    return () => clearTimeout(t);
  }, [phase, currentIdx]);

  const goNext = () => {
    if (currentIdx < PROJECTS.length - 1) {
      setCardVisible(false);
      setPropsVisible(false);
      setTimeout(() => setCurrentIdx(i => i + 1), 400);
    } else {
      setPhase("done");
    }
  };

  const proj    = PROJECTS[currentIdx];
  const isEven  = currentIdx % 2 === 0;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "#04000d",
      display: "flex", flexDirection: "column",
      overflow: "hidden",
    }}>
      {/* Ambient orbs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "5%", left: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,111,255,0.08)0%,transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "5%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,212,170,0.07)0%,transparent 70%)" }} />
      </div>

      {/* Close */}
      <button onClick={onClose} style={{
        position: "absolute", top: 18, right: 22, zIndex: 10,
        background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "50%", width: 42, height: 42, color: "#fff",
        fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
      }}>✕</button>

      {/* ── COUNTDOWN ── */}
      {phase === "countdown" && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
          <div style={{ fontSize: 13, letterSpacing: 6, color: "#7c6fff", textTransform: "uppercase", fontFamily: "'JetBrains Mono',monospace" }}>
            Projects loading in
          </div>
          <div key={count} style={{
            fontSize: "clamp(8rem,20vw,14rem)",
            fontWeight: 900, fontFamily: "'EB Garamond',serif",
            color: count > 0 ? "#fff" : "#7c6fff",
            lineHeight: 1,
            animation: "countPop 0.4s cubic-bezier(0.175,0.885,0.32,1.275)",
            textShadow: "0 0 80px rgba(124,111,255,0.4)",
          }}>
            {count > 0 ? count : "GO!"}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            {PROJECTS.map((_, i) => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
            ))}
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: "rgba(255,255,255,0.2)", fontFamily: "'JetBrains Mono',monospace" }}>
            {PROJECTS.length} projects · Brain Tumor · Maze Research · Air Pollution · Crop Detection
          </div>
        </div>
      )}

      {/* ── SHOW ── */}
      {phase === "show" && proj && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
          {/* Top bar */}
          <div style={{ padding: "18px 5%", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "'JetBrains Mono',monospace", letterSpacing: 2 }}>
              PROJECT {currentIdx + 1} / {PROJECTS.length}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {PROJECTS.map((_, i) => (
                <div key={i} style={{
                  width: i === currentIdx ? 28 : 8, height: 8, borderRadius: 4,
                  background: i === currentIdx ? proj.color : i < currentIdx ? `${proj.color}50` : "rgba(255,255,255,0.12)",
                  transition: "all 0.4s ease",
                }} />
              ))}
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "'JetBrains Mono',monospace" }}>
              Mainak Roy · Portfolio
            </div>
          </div>

          {/* Content */}
          <div style={{
            flex: 1, display: "flex", alignItems: "center",
            padding: "0 5%", gap: "6%",
            flexDirection: isEven ? "row" : "row-reverse",
            flexWrap: "wrap",
          }}>
            {/* Card */}
            <div style={{
              flex: "0 0 42%", minWidth: 280,
              transform: cardVisible ? "translateX(0) scale(1)" : isEven ? "translateX(-120px) scale(0.92)" : "translateX(120px) scale(0.92)",
              opacity: cardVisible ? 1 : 0,
              transition: "all 0.7s cubic-bezier(0.22,1,0.36,1)",
            }}>
              <div style={{
                background: `linear-gradient(135deg,${proj.color}18 0%,rgba(255,255,255,0.02) 100%)`,
                border: `1px solid ${proj.color}50`,
                borderRadius: 28, padding: "2.5rem 2rem",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: -30, left: -30, width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle,${proj.color}20 0%,transparent 70%)` }} />
                <div style={{ fontSize: 72, marginBottom: 20, position: "relative" }}>{proj.emoji}</div>
                <h2 style={{ fontSize: "clamp(1.4rem,2.8vw,2rem)", fontWeight: 800, fontFamily: "'EB Garamond',serif", color: "#fff", marginBottom: 14, lineHeight: 1.2 }}>
                  {proj.title}
                </h2>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.9, marginBottom: 24 }}>{proj.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {proj.tech.map(t => (
                    <span key={t} style={{
                      fontSize: 12, padding: "5px 14px",
                      background: `${proj.color}20`, color: proj.color,
                      borderRadius: 20, border: `1px solid ${proj.color}40`,
                      fontFamily: "'JetBrains Mono',monospace",
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Props */}
            <div style={{
              flex: "0 0 42%", minWidth: 260,
              transform: propsVisible ? "translateX(0)" : isEven ? "translateX(100px)" : "translateX(-100px)",
              opacity: propsVisible ? 1 : 0,
              transition: "all 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s",
              display: "flex", flexDirection: "column", gap: 16,
            }}>
              <div style={{ fontSize: 11, letterSpacing: 4, color: proj.color, textTransform: "uppercase", fontFamily: "'JetBrains Mono',monospace", marginBottom: 4 }}>
                Project Highlights
              </div>
              {[
                { icon: "🔧", label: "Stack",    val: proj.tech.join(" · ") },
                { icon: "📌", label: "Category", val: proj.cat },
                { icon: "🎯", label: "Focus",    val: proj.focus },
                { icon: "📦", label: "Status",   val: proj.status },
              ].map((row, ri) => (
                <div key={ri} style={{
                  display: "flex", alignItems: "flex-start", gap: 16,
                  padding: "16px 20px",
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 16,
                  transform: propsVisible ? "translateY(0)" : "translateY(20px)",
                  opacity: propsVisible ? 1 : 0,
                  transition: `all 0.5s ease ${0.15 + ri * 0.1}s`,
                }}>
                  <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>{row.icon}</span>
                  <div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "'JetBrains Mono',monospace", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 5 }}>{row.label}</div>
                    <div style={{ fontSize: 15, color: "#e2e8f0", fontWeight: 500, lineHeight: 1.5 }}>{row.val}</div>
                  </div>
                </div>
              ))}

              {/* GitHub link */}
              {proj.github && (
                <div style={{ marginTop: 6 }}>
                  <a href={proj.github} target="_blank" rel="noopener noreferrer" style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "12px 28px", borderRadius: 50,
                    background: `${proj.color}20`, color: proj.color,
                    border: `1px solid ${proj.color}50`,
                    fontSize: 14, fontWeight: 600, textDecoration: "none",
                    transition: "all 0.2s",
                  }}>
                    🐙 View on GitHub →
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Bottom nav */}
          <div style={{ padding: "18px 5%", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button onClick={onClose} style={{
              background: "none", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 50,
              padding: "10px 24px", color: "rgba(255,255,255,0.4)",
              fontSize: 13, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
            }}>← Exit</button>
            <button onClick={goNext} style={{
              background: `linear-gradient(135deg,${proj.color},${proj.color}cc)`,
              border: "none", borderRadius: 50, padding: "13px 36px",
              color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer",
              letterSpacing: 0.5, boxShadow: `0 0 24px ${proj.color}50`,
            }}>
              {currentIdx < PROJECTS.length - 1 ? "Next Project →" : "Finish ✓"}
            </button>
          </div>
        </div>
      )}

      {/* ── DONE ── */}
      {phase === "done" && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, textAlign: "center", padding: "0 5%" }}>
          <div style={{ fontSize: 72, marginBottom: 4 }}>🎉</div>
          <h2 style={{ fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 800, fontFamily: "'EB Garamond',serif", color: "#fff", marginBottom: 10 }}>That's a wrap!</h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", maxWidth: 480, lineHeight: 1.8 }}>
            You've seen all {PROJECTS.length} of Mainak's projects. Reach out if any caught your eye!
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 22, flexWrap: "wrap", justifyContent: "center" }}>
            <button onClick={() => { setCurrentIdx(0); setCount(3); setPhase("countdown"); }} style={{
              padding: "13px 30px", borderRadius: 50, background: "transparent",
              color: "#e2e8f0", border: "1px solid rgba(255,255,255,0.2)",
              fontSize: 14, cursor: "pointer",
            }}>↺ Watch Again</button>
            <button onClick={onClose} style={{
              padding: "13px 34px", borderRadius: 50,
              background: "#7c6fff", color: "#fff",
              border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer",
            }}>Close ✓</button>
          </div>
        </div>
      )}
    </div>
  );
}

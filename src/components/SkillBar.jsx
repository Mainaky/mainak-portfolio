import { useState, useRef, useEffect } from "react";

const CAT_COLORS = {
  "Core Languages": "#7c6fff",
  "ML / DS":        "#e63946",
  "ML Libraries":   "#00d4aa",
  "Databases":      "#f4a261",
  "Cloud & Tools":  "#a855f7",
};

export default function SkillBar({ name, level, cat, delay }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setWidth(level), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [level, delay]);

  const color = CAT_COLORS[cat] || "#7c6fff";

  return (
    <div ref={ref} style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: "#e2e8f0" }}>
          <span style={{ color, marginRight: 8 }}>▸</span>{name}
        </span>
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", fontFamily: "'JetBrains Mono', monospace" }}>
          {level}%
        </span>
      </div>
      <div style={{ height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: `${width}%`,
          borderRadius: 4,
          background: `linear-gradient(90deg, ${color}, rgba(255,255,255,0.5))`,
          transition: "width 1.3s cubic-bezier(0.22,1,0.36,1)",
        }} />
      </div>
    </div>
  );
}

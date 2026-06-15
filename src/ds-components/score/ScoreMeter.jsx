import React from "react";

/** Map a 1–100 Latent Value Score to its heat band. */
export function scoreBand(score) {
  const s = Math.max(0, Math.min(100, Number(score) || 0));
  if (s >= 90) return { key: "peak", label: "Exceptional", color: "var(--score-peak)", soft: "var(--score-high-soft)" };
  if (s >= 70) return { key: "high", label: "Strong upside", color: "var(--score-high)", soft: "var(--score-high-soft)" };
  if (s >= 40) return { key: "mid", label: "Moderate", color: "var(--score-mid)", soft: "var(--score-mid-soft)" };
  return { key: "low", label: "Limited", color: "var(--score-low)", soft: "var(--score-low-soft)" };
}

const CSS = `
.pv-score { display: inline-flex; flex-direction: column; align-items: center; gap: var(--space-3); }
.pv-score__dial { position: relative; display: inline-flex; }
.pv-score__dial svg { transform: rotate(-90deg); display: block; }
.pv-score__ring-track { stroke: var(--score-track); }
.pv-score__center {
  position: absolute; inset: 0; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 0;
}
.pv-score__num { font-family: var(--font-mono); font-weight: var(--weight-semibold); color: var(--text-primary); line-height: 1; font-variant-numeric: tabular-nums; }
.pv-score__max { font-family: var(--font-mono); color: var(--text-tertiary); line-height: 1; }
.pv-score__caption { text-align: center; }
.pv-score__eyebrow {
  font: var(--font-eyebrow); letter-spacing: var(--tracking-caps); text-transform: uppercase;
  color: var(--text-tertiary); display: block;
}
.pv-score__band { font-size: var(--text-xs); font-weight: var(--weight-semibold); }
`;
let injected = false;
function ensureCSS() {
  if (injected || typeof document === "undefined") return;
  injected = true;
  const s = document.createElement("style");
  s.setAttribute("data-pv", "scoremeter");
  s.textContent = CSS;
  document.head.appendChild(s);
}

const SIZES = {
  sm: { d: 64,  w: 6,  num: 20, max: 10 },
  md: { d: 96,  w: 8,  num: 30, max: 12 },
  lg: { d: 140, w: 11, num: 44, max: 15 },
};

/**
 * Radial gauge for the proprietary Latent Value Score (1–100).
 * The ring + number colour shift across the heat scale by band.
 */
export function ScoreMeter({ score = 0, size = "md", showCaption = true, label = "Latent Value", className = "", ...rest }) {
  ensureCSS();
  const s = Math.max(0, Math.min(100, Math.round(Number(score) || 0)));
  const band = scoreBand(s);
  const cfg = SIZES[size] || SIZES.md;
  const r = (cfg.d - cfg.w) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - s / 100);
  return (
    <div className={["pv-score", className].filter(Boolean).join(" ")} {...rest}>
      <div className="pv-score__dial" style={{ width: cfg.d, height: cfg.d }}>
        <svg width={cfg.d} height={cfg.d} viewBox={`0 0 ${cfg.d} ${cfg.d}`}>
          <circle className="pv-score__ring-track" cx={cfg.d / 2} cy={cfg.d / 2} r={r} fill="none" strokeWidth={cfg.w} />
          <circle
            cx={cfg.d / 2} cy={cfg.d / 2} r={r} fill="none"
            stroke={band.color} strokeWidth={cfg.w} strokeLinecap="round"
            strokeDasharray={c} strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset var(--dur-slow) var(--ease-out)" }}
          />
        </svg>
        <div className="pv-score__center">
          <span className="pv-score__num" style={{ fontSize: cfg.num, color: band.color }}>{s}</span>
          <span className="pv-score__max" style={{ fontSize: cfg.max }}>/100</span>
        </div>
      </div>
      {showCaption && (
        <div className="pv-score__caption">
          <span className="pv-score__eyebrow">{label}</span>
          <span className="pv-score__band" style={{ color: band.color }}>{band.label}</span>
        </div>
      )}
    </div>
  );
}

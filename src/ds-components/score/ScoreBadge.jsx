import React from "react";
import { scoreBand } from "./ScoreMeter.jsx";

const CSS = `
.pv-scorebadge {
  display: inline-flex; align-items: center; gap: var(--space-3);
  font-family: var(--font-mono); font-variant-numeric: tabular-nums;
}
.pv-scorebadge__chip {
  display: inline-flex; align-items: baseline; gap: 1px;
  padding: 3px var(--space-3); border-radius: var(--radius-xs);
  font-weight: var(--weight-semibold); line-height: 1;
}
.pv-scorebadge--sm .pv-scorebadge__chip { font-size: var(--text-sm); padding: 2px var(--space-2); }
.pv-scorebadge--md .pv-scorebadge__chip { font-size: var(--text-md); }
.pv-scorebadge__max { font-size: 0.72em; opacity: 0.6; font-weight: var(--weight-medium); }
.pv-scorebadge__bar { width: 56px; height: 6px; border-radius: var(--radius-pill); background: var(--score-track); overflow: hidden; }
.pv-scorebadge__fill { height: 100%; border-radius: var(--radius-pill); transition: width var(--dur-slow) var(--ease-out); }
`;
let injected = false;
function ensureCSS() {
  if (injected || typeof document === "undefined") return;
  injected = true;
  const s = document.createElement("style");
  s.setAttribute("data-pv", "scorebadge");
  s.textContent = CSS;
  document.head.appendChild(s);
}

/** Compact Latent Value Score for cards, tables and dense lists. */
export function ScoreBadge({ score = 0, size = "md", showBar = false, className = "", ...rest }) {
  ensureCSS();
  const s = Math.max(0, Math.min(100, Math.round(Number(score) || 0)));
  const band = scoreBand(s);
  return (
    <span className={["pv-scorebadge", `pv-scorebadge--${size}`, className].filter(Boolean).join(" ")} title={`Latent Value Score ${s}/100 · ${band.label}`} {...rest}>
      <span className="pv-scorebadge__chip" style={{ background: band.soft, color: band.color }}>
        {s}<span className="pv-scorebadge__max">/100</span>
      </span>
      {showBar && (
        <span className="pv-scorebadge__bar">
          <span className="pv-scorebadge__fill" style={{ width: `${s}%`, background: band.color }} />
        </span>
      )}
    </span>
  );
}

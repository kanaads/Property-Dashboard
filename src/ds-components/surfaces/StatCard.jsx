import React from "react";

const CSS = `
.pv-stat {
  display: flex; flex-direction: column; gap: var(--space-3);
  background: var(--surface-card);
  border: var(--border-w) solid var(--border-subtle);
  border-radius: var(--radius-card);
  box-shadow: var(--elev-card);
  padding: var(--space-6) var(--space-7);
}
.pv-stat__top { display: flex; align-items: center; justify-content: space-between; gap: var(--space-4); }
.pv-stat__label {
  font: var(--font-eyebrow); letter-spacing: var(--tracking-caps); text-transform: uppercase;
  color: var(--text-tertiary);
}
.pv-stat__icon { display: inline-flex; color: var(--text-tertiary); }
.pv-stat__icon svg { width: 16px; height: 16px; }
.pv-stat__value {
  font-family: var(--font-mono); font-weight: var(--weight-semibold);
  font-size: var(--text-3xl); line-height: 1; color: var(--text-primary);
  font-variant-numeric: tabular-nums; letter-spacing: -0.01em;
}
.pv-stat__value sup, .pv-stat__unit { font-size: 0.5em; color: var(--text-tertiary); font-weight: var(--weight-medium); margin-left: 2px; }
.pv-stat__foot { display: flex; align-items: center; gap: var(--space-3); }
.pv-stat__delta { display: inline-flex; align-items: center; gap: 2px; font-family: var(--font-mono); font-size: var(--text-xs); font-weight: var(--weight-semibold); }
.pv-stat__delta svg { width: 12px; height: 12px; }
.pv-stat__delta--up { color: var(--success); }
.pv-stat__delta--down { color: var(--danger); }
.pv-stat__delta--flat { color: var(--text-tertiary); }
.pv-stat__note { font-size: var(--text-xs); color: var(--text-tertiary); }
`;
let injected = false;
function ensureCSS() {
  if (injected || typeof document === "undefined") return;
  injected = true;
  const s = document.createElement("style");
  s.setAttribute("data-pv", "statcard");
  s.textContent = CSS;
  document.head.appendChild(s);
}

const Arrow = ({ dir }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    {dir === "up" ? <><path d="M7 17 17 7"/><path d="M9 7h8v8"/></>
      : dir === "down" ? <><path d="M7 7l10 10"/><path d="M17 9v8H9"/></>
      : <path d="M5 12h14"/>}
  </svg>
);

/** KPI tile for the analytics row. */
export function StatCard({ label, value, unit, icon, delta, deltaDirection = "flat", note, className = "", ...rest }) {
  ensureCSS();
  return (
    <div className={["pv-stat", className].filter(Boolean).join(" ")} {...rest}>
      <div className="pv-stat__top">
        <span className="pv-stat__label">{label}</span>
        {icon && <span className="pv-stat__icon">{icon}</span>}
      </div>
      <div className="pv-stat__value">{value}{unit && <span className="pv-stat__unit">{unit}</span>}</div>
      {(delta || note) && (
        <div className="pv-stat__foot">
          {delta && (
            <span className={`pv-stat__delta pv-stat__delta--${deltaDirection}`}>
              <Arrow dir={deltaDirection} />{delta}
            </span>
          )}
          {note && <span className="pv-stat__note">{note}</span>}
        </div>
      )}
    </div>
  );
}

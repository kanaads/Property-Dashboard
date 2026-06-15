import React from "react";

const CSS = `
.pv-seg {
  display: inline-flex; align-items: center; gap: 2px; padding: 2px;
  background: var(--surface-sunken); border-radius: var(--radius-sm);
  border: var(--border-w) solid var(--border-subtle);
}
.pv-seg__opt {
  display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2);
  border: none; background: transparent; cursor: pointer;
  font-family: var(--font-sans); font-weight: var(--weight-medium); color: var(--text-secondary);
  border-radius: var(--radius-xs); transition: var(--transition-control);
}
.pv-seg--sm .pv-seg__opt { height: 26px; padding: 0 var(--space-4); font-size: var(--text-sm); }
.pv-seg--md .pv-seg__opt { height: 32px; padding: 0 var(--space-5); font-size: var(--text-base); }
.pv-seg__opt:hover:not(.pv-seg__opt--active) { color: var(--text-primary); }
.pv-seg__opt--active { background: var(--surface-card); color: var(--text-primary); box-shadow: var(--shadow-xs); font-weight: var(--weight-semibold); }
.pv-seg__opt:focus-visible { outline: none; box-shadow: var(--focus-ring); }
.pv-seg__opt svg { width: 16px; height: 16px; }
`;
let injected = false;
function ensureCSS() {
  if (injected || typeof document === "undefined") return;
  injected = true;
  const s = document.createElement("style");
  s.setAttribute("data-pv", "segmented");
  s.textContent = CSS;
  document.head.appendChild(s);
}

/** Segmented control for 2–4 mutually exclusive options (e.g. grid/list view). */
export function SegmentedControl({ options = [], value, onChange, size = "md", className = "", ...rest }) {
  ensureCSS();
  return (
    <div className={["pv-seg", `pv-seg--${size}`, className].filter(Boolean).join(" ")} role="group" {...rest}>
      {options.map((o) => {
        const opt = typeof o === "string" ? { value: o, label: o } : o;
        const active = opt.value === value;
        return (
          <button
            key={opt.value} type="button" aria-pressed={active}
            className={["pv-seg__opt", active ? "pv-seg__opt--active" : ""].filter(Boolean).join(" ")}
            onClick={() => onChange && onChange(opt.value)}
            title={opt.label}
          >
            {opt.icon}{opt.label && <span>{opt.label}</span>}
          </button>
        );
      })}
    </div>
  );
}

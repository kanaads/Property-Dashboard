import React from "react";

const CSS = `
.pv-check { display: inline-flex; align-items: flex-start; gap: var(--space-3); cursor: pointer; user-select: none; }
.pv-check[aria-disabled="true"] { opacity: 0.5; cursor: not-allowed; }
.pv-check__box {
  flex: 0 0 auto; width: 18px; height: 18px; margin-top: 1px;
  border: 1.5px solid var(--border-strong); border-radius: var(--radius-xs);
  background: var(--surface-card); display: inline-flex; align-items: center; justify-content: center;
  color: var(--white); transition: var(--transition-control);
}
.pv-check__box svg { width: 12px; height: 12px; opacity: 0; transform: scale(0.7); transition: all var(--dur-fast) var(--ease-out); }
.pv-check input { position: absolute; opacity: 0; width: 0; height: 0; }
.pv-check input:checked + .pv-check__box { background: var(--brand); border-color: var(--brand); }
.pv-check input:checked + .pv-check__box svg { opacity: 1; transform: scale(1); }
.pv-check input:indeterminate + .pv-check__box { background: var(--brand); border-color: var(--brand); }
.pv-check input:focus-visible + .pv-check__box { box-shadow: var(--focus-ring); }
.pv-check:hover input:not(:checked) + .pv-check__box { border-color: var(--brand); }
.pv-check__text { display: flex; flex-direction: column; gap: 1px; }
.pv-check__label { font-size: var(--text-base); color: var(--text-primary); line-height: 1.3; }
.pv-check__desc { font-size: var(--text-xs); color: var(--text-tertiary); }
`;
let injected = false;
function ensureCSS() {
  if (injected || typeof document === "undefined") return;
  injected = true;
  const s = document.createElement("style");
  s.setAttribute("data-pv", "checkbox");
  s.textContent = CSS;
  document.head.appendChild(s);
}

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
);

/** Checkbox with optional label + description. */
export function Checkbox({ label, description, checked, disabled = false, className = "", ...rest }) {
  ensureCSS();
  return (
    <label className={["pv-check", className].filter(Boolean).join(" ")} aria-disabled={disabled}>
      <input type="checkbox" checked={checked} disabled={disabled} {...rest} />
      <span className="pv-check__box"><Check /></span>
      {(label || description) && (
        <span className="pv-check__text">
          {label && <span className="pv-check__label">{label}</span>}
          {description && <span className="pv-check__desc">{description}</span>}
        </span>
      )}
    </label>
  );
}

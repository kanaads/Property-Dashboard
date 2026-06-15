import React from "react";

const CSS = `
.pv-switch { display: inline-flex; align-items: center; gap: var(--space-4); cursor: pointer; user-select: none; }
.pv-switch[aria-disabled="true"] { opacity: 0.5; cursor: not-allowed; }
.pv-switch input { position: absolute; opacity: 0; width: 0; height: 0; }
.pv-switch__track {
  position: relative; flex: 0 0 auto;
  width: 38px; height: 22px; border-radius: var(--radius-pill);
  background: var(--slate-300); transition: background-color var(--dur-base) var(--ease-standard);
}
.pv-switch__thumb {
  position: absolute; top: 2px; left: 2px; width: 18px; height: 18px;
  border-radius: 50%; background: var(--white); box-shadow: var(--shadow-sm);
  transition: transform var(--dur-base) var(--ease-out);
}
.pv-switch input:checked + .pv-switch__track { background: var(--brand); }
.pv-switch input:checked + .pv-switch__track .pv-switch__thumb { transform: translateX(16px); }
.pv-switch input:focus-visible + .pv-switch__track { box-shadow: var(--focus-ring); }
.pv-switch__label { font-size: var(--text-base); color: var(--text-primary); }
`;
let injected = false;
function ensureCSS() {
  if (injected || typeof document === "undefined") return;
  injected = true;
  const s = document.createElement("style");
  s.setAttribute("data-pv", "switch");
  s.textContent = CSS;
  document.head.appendChild(s);
}

/** Binary on/off toggle. */
export function Switch({ label, checked, disabled = false, className = "", ...rest }) {
  ensureCSS();
  return (
    <label className={["pv-switch", className].filter(Boolean).join(" ")} aria-disabled={disabled}>
      <input type="checkbox" role="switch" checked={checked} disabled={disabled} {...rest} />
      <span className="pv-switch__track"><span className="pv-switch__thumb" /></span>
      {label && <span className="pv-switch__label">{label}</span>}
    </label>
  );
}

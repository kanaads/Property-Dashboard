import React from "react";

const CSS = `
.pv-select { display: flex; flex-direction: column; gap: var(--space-3); }
.pv-select__label { font: var(--font-label); color: var(--text-secondary); }
.pv-select__box {
  position: relative; display: flex; align-items: center;
  background: var(--surface-card);
  border: var(--border-w) solid var(--border-default);
  border-radius: var(--radius-sm);
  transition: var(--transition-control);
}
.pv-select__box:hover { border-color: var(--border-strong); }
.pv-select__box:focus-within { border-color: var(--border-focus); box-shadow: var(--focus-ring); }
.pv-select--sm .pv-select__box { height: var(--control-h-sm); }
.pv-select--md .pv-select__box { height: var(--control-h-md); }
.pv-select--lg .pv-select__box { height: var(--control-h-lg); }
.pv-select__control {
  appearance: none; -webkit-appearance: none;
  flex: 1 1 auto; min-width: 0; height: 100%;
  border: none; background: transparent; outline: none; cursor: pointer;
  font-family: var(--font-sans); font-size: var(--text-base); color: var(--text-primary);
  padding: 0 var(--space-8) 0 var(--space-4);
}
.pv-select__chev {
  position: absolute; right: var(--space-4); pointer-events: none;
  color: var(--text-tertiary); display: inline-flex;
}
.pv-select__chev svg { width: 16px; height: 16px; }
`;
let injected = false;
function ensureCSS() {
  if (injected || typeof document === "undefined") return;
  injected = true;
  const s = document.createElement("style");
  s.setAttribute("data-pv", "select");
  s.textContent = CSS;
  document.head.appendChild(s);
}

const Chevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);

/** Native select styled to match Propvia controls. */
export const Select = React.forwardRef(function Select({
  label, size = "md", options = [], placeholder, value, onChange, id, className = "", error, ...rest
}, ref) {
  ensureCSS();
  const fieldId = id || (label ? `pv-sel-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  return (
    <div className={["pv-select", `pv-select--${size}`, error ? "pv-select--invalid" : "", className].filter(Boolean).join(" ")}>
      {label && <label className="pv-select__label" htmlFor={fieldId}>{label}</label>}
      <div className="pv-select__box">
        <select ref={ref} id={fieldId} className="pv-select__control" value={value} onChange={onChange} {...rest}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => {
            const opt = typeof o === "string" ? { value: o, label: o } : o;
            return <option key={opt.value} value={opt.value}>{opt.label}</option>;
          })}
        </select>
        <span className="pv-select__chev"><Chevron /></span>
      </div>
      {error && <span className="pv-select__error" style={{ fontSize: "12px", color: "var(--danger)" }}>{error}</span>}
    </div>
  );
});

import React from "react";

const CSS = `
.pv-field { display: flex; flex-direction: column; gap: var(--space-3); }
.pv-field__label {
  font: var(--font-label); color: var(--text-secondary);
  display: flex; align-items: center; gap: var(--space-2);
}
.pv-field__req { color: var(--danger); }
.pv-field__hint { font-size: var(--text-xs); color: var(--text-tertiary); }
.pv-field__error { font-size: var(--text-xs); color: var(--danger); }

.pv-input {
  --_bd: var(--border-default);
  display: flex; align-items: center; gap: var(--space-3);
  background: var(--surface-card);
  border: var(--border-w) solid var(--_bd);
  border-radius: var(--radius-sm);
  padding: 0 var(--space-4);
  transition: var(--transition-control);
}
.pv-input--sm { height: var(--control-h-sm); }
.pv-input--md { height: var(--control-h-md); }
.pv-input--lg { height: var(--control-h-lg); }
.pv-input:hover { --_bd: var(--border-strong); }
.pv-input:focus-within { --_bd: var(--border-focus); box-shadow: var(--focus-ring); }
.pv-input--invalid { --_bd: var(--danger); }
.pv-input--invalid:focus-within { box-shadow: 0 0 0 3px var(--red-100); }
.pv-input--disabled { background: var(--surface-sunken); opacity: 0.7; cursor: not-allowed; }

.pv-input__control {
  flex: 1 1 auto; min-width: 0;
  border: none; background: transparent; outline: none;
  font-family: var(--font-sans); font-size: var(--text-base);
  color: var(--text-primary);
}
.pv-input__control::placeholder { color: var(--text-tertiary); }
.pv-input__affix { display: inline-flex; align-items: center; color: var(--text-tertiary); flex: 0 0 auto; }
.pv-input__affix svg { width: 16px; height: 16px; }
.pv-input__prefix { color: var(--text-secondary); font-family: var(--font-mono); font-size: var(--text-sm); }
`;
let injected = false;
function ensureCSS() {
  if (injected || typeof document === "undefined") return;
  injected = true;
  const s = document.createElement("style");
  s.setAttribute("data-pv", "input");
  s.textContent = CSS;
  document.head.appendChild(s);
}

/** Text input with optional label, icons/affixes, hint and error states. */
export const Input = React.forwardRef(function Input({
  label,
  hint,
  error,
  required = false,
  size = "md",
  iconLeft = null,
  iconRight = null,
  prefix = null,
  disabled = false,
  id,
  className = "",
  ...rest
}, ref) {
  ensureCSS();
  const fieldId = id || (label ? `pv-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const boxCls = [
    "pv-input", `pv-input--${size}`,
    error ? "pv-input--invalid" : "",
    disabled ? "pv-input--disabled" : "",
  ].filter(Boolean).join(" ");
  return (
    <div className={["pv-field", className].filter(Boolean).join(" ")}>
      {label && (
        <label className="pv-field__label" htmlFor={fieldId}>
          {label}{required && <span className="pv-field__req">*</span>}
        </label>
      )}
      <div className={boxCls}>
        {iconLeft && <span className="pv-input__affix">{iconLeft}</span>}
        {prefix && <span className="pv-input__prefix">{prefix}</span>}
        <input ref={ref} id={fieldId} className="pv-input__control" disabled={disabled} aria-invalid={!!error} {...rest} />
        {iconRight && <span className="pv-input__affix">{iconRight}</span>}
      </div>
      {error ? <span className="pv-field__error">{error}</span> : hint ? <span className="pv-field__hint">{hint}</span> : null}
    </div>
  );
});

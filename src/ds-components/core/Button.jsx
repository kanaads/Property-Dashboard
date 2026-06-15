import React from "react";

const CSS = `
.pv-btn {
  --_bg: var(--brand);
  --_fg: var(--text-on-brand);
  --_bd: transparent;
  display: inline-flex; align-items: center; justify-content: center;
  gap: var(--space-3);
  font-family: var(--font-sans);
  font-weight: var(--weight-semibold);
  letter-spacing: -0.005em;
  white-space: nowrap;
  border: var(--border-w) solid var(--_bd);
  background: var(--_bg);
  color: var(--_fg);
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: var(--transition-control), transform var(--dur-instant) var(--ease-standard);
  user-select: none;
}
.pv-btn:focus-visible { outline: none; box-shadow: var(--focus-ring); }
.pv-btn:active { transform: translateY(0.5px); }
.pv-btn[disabled] { cursor: not-allowed; opacity: 0.45; }
.pv-btn--full { width: 100%; }

.pv-btn--sm { height: var(--control-h-sm); padding: 0 var(--space-4); font-size: var(--text-sm); }
.pv-btn--md { height: var(--control-h-md); padding: 0 var(--space-5); font-size: var(--text-base); }
.pv-btn--lg { height: var(--control-h-lg); padding: 0 var(--space-7); font-size: var(--text-md); }

.pv-btn--primary { --_bg: var(--brand); --_fg: var(--text-on-brand); }
.pv-btn--primary:hover:not([disabled]) { --_bg: var(--brand-hover); }
.pv-btn--primary:active:not([disabled]) { --_bg: var(--brand-active); }

.pv-btn--secondary { --_bg: var(--surface-card); --_fg: var(--text-primary); --_bd: var(--border-default); box-shadow: var(--shadow-xs); }
.pv-btn--secondary:hover:not([disabled]) { --_bg: var(--surface-hover); --_bd: var(--border-strong); }
.pv-btn--secondary:active:not([disabled]) { --_bg: var(--surface-active); }

.pv-btn--ghost { --_bg: transparent; --_fg: var(--text-secondary); --_bd: transparent; }
.pv-btn--ghost:hover:not([disabled]) { --_bg: var(--surface-active); --_fg: var(--text-primary); }

.pv-btn--danger { --_bg: var(--danger); --_fg: var(--white); }
.pv-btn--danger:hover:not([disabled]) { filter: brightness(0.93); }

.pv-btn__icon { display: inline-flex; flex: 0 0 auto; }
.pv-btn--sm .pv-btn__icon svg { width: 15px; height: 15px; }
.pv-btn--md .pv-btn__icon svg { width: 16px; height: 16px; }
.pv-btn--lg .pv-btn__icon svg { width: 18px; height: 18px; }
`;

let injected = false;
function ensureCSS() {
  if (injected || typeof document === "undefined") return;
  injected = true;
  const s = document.createElement("style");
  s.setAttribute("data-pv", "button");
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Propvia primary action button.
 */
export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  iconLeft = null,
  iconRight = null,
  disabled = false,
  type = "button",
  className = "",
  children,
  ...rest
}) {
  ensureCSS();
  const cls = [
    "pv-btn",
    `pv-btn--${variant}`,
    `pv-btn--${size}`,
    fullWidth ? "pv-btn--full" : "",
    className,
  ].filter(Boolean).join(" ");
  return (
    <button type={type} className={cls} disabled={disabled} {...rest}>
      {iconLeft && <span className="pv-btn__icon">{iconLeft}</span>}
      {children && <span className="pv-btn__label">{children}</span>}
      {iconRight && <span className="pv-btn__icon">{iconRight}</span>}
    </button>
  );
}

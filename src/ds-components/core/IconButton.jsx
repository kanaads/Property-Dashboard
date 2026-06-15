import React from "react";

const CSS = `
.pv-iconbtn {
  display: inline-flex; align-items: center; justify-content: center;
  background: transparent; color: var(--text-secondary);
  border: var(--border-w) solid transparent;
  border-radius: var(--radius-sm); cursor: pointer;
  transition: var(--transition-control);
}
.pv-iconbtn:hover:not([disabled]) { background: var(--surface-active); color: var(--text-primary); }
.pv-iconbtn:focus-visible { outline: none; box-shadow: var(--focus-ring); }
.pv-iconbtn[disabled] { opacity: 0.4; cursor: not-allowed; }
.pv-iconbtn--sm { width: 30px; height: 30px; }
.pv-iconbtn--md { width: 36px; height: 36px; }
.pv-iconbtn--lg { width: 44px; height: 44px; }
.pv-iconbtn--bordered { border-color: var(--border-default); background: var(--surface-card); box-shadow: var(--shadow-xs); }
.pv-iconbtn--bordered:hover:not([disabled]) { border-color: var(--border-strong); }
.pv-iconbtn--sm svg { width: 16px; height: 16px; }
.pv-iconbtn--md svg { width: 18px; height: 18px; }
.pv-iconbtn--lg svg { width: 20px; height: 20px; }
`;
let injected = false;
function ensureCSS() {
  if (injected || typeof document === "undefined") return;
  injected = true;
  const s = document.createElement("style");
  s.setAttribute("data-pv", "iconbutton");
  s.textContent = CSS;
  document.head.appendChild(s);
}

/** Square icon-only button for toolbars and dense controls. */
export function IconButton({
  size = "md",
  bordered = false,
  label,
  disabled = false,
  className = "",
  children,
  ...rest
}) {
  ensureCSS();
  const cls = ["pv-iconbtn", `pv-iconbtn--${size}`, bordered ? "pv-iconbtn--bordered" : "", className]
    .filter(Boolean).join(" ");
  return (
    <button type="button" className={cls} aria-label={label} title={label} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}

import React from "react";

const CSS = `
.pv-badge {
  display: inline-flex; align-items: center; gap: var(--space-2);
  font-family: var(--font-sans); font-weight: var(--weight-medium);
  font-size: var(--text-xs); line-height: 1;
  padding: 3px var(--space-3); border-radius: var(--radius-xs);
  border: var(--border-w) solid transparent; white-space: nowrap;
}
.pv-badge--pill { border-radius: var(--radius-pill); padding-left: var(--space-4); padding-right: var(--space-4); }
.pv-badge__dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; flex: 0 0 auto; }
.pv-badge svg { width: 13px; height: 13px; }

.pv-badge--neutral { background: var(--slate-100); color: var(--slate-600); }
.pv-badge--brand   { background: var(--emerald-50); color: var(--emerald-700); }
.pv-badge--gold    { background: var(--gold-50); color: var(--gold-700); }
.pv-badge--success { background: var(--emerald-50); color: var(--emerald-700); }
.pv-badge--warning { background: var(--gold-50); color: var(--amber-500); }
.pv-badge--danger  { background: var(--red-50); color: var(--red-600); }
.pv-badge--info    { background: var(--blue-50); color: var(--blue-600); }

.pv-badge--solid.pv-badge--neutral { background: var(--slate-700); color: var(--white); }
.pv-badge--solid.pv-badge--brand   { background: var(--brand); color: var(--white); }
.pv-badge--solid.pv-badge--gold    { background: var(--gold-600); color: var(--white); }
.pv-badge--solid.pv-badge--danger  { background: var(--danger); color: var(--white); }

.pv-badge--outline { background: transparent; border-color: currentColor; }
`;
let injected = false;
function ensureCSS() {
  if (injected || typeof document === "undefined") return;
  injected = true;
  const s = document.createElement("style");
  s.setAttribute("data-pv", "badge");
  s.textContent = CSS;
  document.head.appendChild(s);
}

/** Compact status / category label. */
export function Badge({
  tone = "neutral",
  appearance = "soft",
  pill = false,
  dot = false,
  icon = null,
  className = "",
  children,
  ...rest
}) {
  ensureCSS();
  const cls = [
    "pv-badge", `pv-badge--${tone}`,
    appearance === "solid" ? "pv-badge--solid" : "",
    appearance === "outline" ? "pv-badge--outline" : "",
    pill ? "pv-badge--pill" : "",
    className,
  ].filter(Boolean).join(" ");
  return (
    <span className={cls} {...rest}>
      {dot && <span className="pv-badge__dot" />}
      {icon}
      {children}
    </span>
  );
}

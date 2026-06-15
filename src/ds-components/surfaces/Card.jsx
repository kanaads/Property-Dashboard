import React from "react";

const CSS = `
.pv-card {
  background: var(--surface-card);
  border: var(--border-w) solid var(--border-subtle);
  border-radius: var(--radius-card);
  box-shadow: var(--elev-card);
  color: var(--text-primary);
}
.pv-card--flat { box-shadow: none; }
.pv-card--interactive { cursor: pointer; transition: var(--transition-elevate), border-color var(--dur-base) var(--ease-standard); }
.pv-card--interactive:hover { box-shadow: var(--elev-card-hover); border-color: var(--border-default); transform: translateY(-1px); }
.pv-card--pad-none { padding: 0; }
.pv-card--pad-sm { padding: var(--space-5); }
.pv-card--pad-md { padding: var(--space-7); }
.pv-card--pad-lg { padding: var(--space-8); }

.pv-card__header { display: flex; align-items: flex-start; justify-content: space-between; gap: var(--space-4); margin-bottom: var(--space-5); }
.pv-card__titles { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.pv-card__title { font: var(--font-card-title); color: var(--text-primary); }
.pv-card__subtitle { font-size: var(--text-sm); color: var(--text-tertiary); }
`;
let injected = false;
function ensureCSS() {
  if (injected || typeof document === "undefined") return;
  injected = true;
  const s = document.createElement("style");
  s.setAttribute("data-pv", "card");
  s.textContent = CSS;
  document.head.appendChild(s);
}

/** Surface container with optional header. */
export function Card({
  title, subtitle, action, padding = "md", flat = false, interactive = false, className = "", children, ...rest
}) {
  ensureCSS();
  const cls = [
    "pv-card", `pv-card--pad-${padding}`,
    flat ? "pv-card--flat" : "",
    interactive ? "pv-card--interactive" : "",
    className,
  ].filter(Boolean).join(" ");
  const hasHeader = title || subtitle || action;
  return (
    <div className={cls} {...rest}>
      {hasHeader && (
        <div className="pv-card__header">
          <div className="pv-card__titles">
            {title && <span className="pv-card__title">{title}</span>}
            {subtitle && <span className="pv-card__subtitle">{subtitle}</span>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

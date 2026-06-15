import React from "react";

const CSS = `
.pv-tag {
  display: inline-flex; align-items: center; gap: var(--space-2);
  font-family: var(--font-sans); font-size: var(--text-sm); font-weight: var(--weight-medium);
  height: 26px; padding: 0 var(--space-3); border-radius: var(--radius-xs);
  background: var(--surface-card); color: var(--text-secondary);
  border: var(--border-w) solid var(--border-default);
  transition: var(--transition-control); white-space: nowrap;
}
.pv-tag--selectable { cursor: pointer; }
.pv-tag--selectable:hover { border-color: var(--border-strong); color: var(--text-primary); background: var(--surface-hover); }
.pv-tag--selected {
  background: var(--emerald-50); border-color: var(--emerald-300); color: var(--emerald-700);
}
.pv-tag--selected:hover { background: var(--emerald-50); border-color: var(--emerald-400); }
.pv-tag__remove {
  display: inline-flex; align-items: center; justify-content: center;
  width: 16px; height: 16px; margin-right: -2px; border: none; background: transparent;
  color: inherit; cursor: pointer; border-radius: var(--radius-xs); opacity: 0.6;
}
.pv-tag__remove:hover { opacity: 1; background: rgba(14,20,27,0.08); }
.pv-tag__remove svg { width: 12px; height: 12px; }
.pv-tag svg.pv-tag__lead { width: 13px; height: 13px; }
`;
let injected = false;
function ensureCSS() {
  if (injected || typeof document === "undefined") return;
  injected = true;
  const s = document.createElement("style");
  s.setAttribute("data-pv", "tag");
  s.textContent = CSS;
  document.head.appendChild(s);
}

const X = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
);

/** Filter chip — selectable and/or removable. */
export function Tag({ selected = false, selectable = false, onRemove, icon = null, className = "", children, ...rest }) {
  ensureCSS();
  const cls = [
    "pv-tag",
    selectable ? "pv-tag--selectable" : "",
    selected ? "pv-tag--selected" : "",
    className,
  ].filter(Boolean).join(" ");
  return (
    <span className={cls} {...rest}>
      {icon && React.cloneElement(icon, { className: "pv-tag__lead" })}
      {children}
      {onRemove && (
        <button type="button" className="pv-tag__remove" aria-label="Remove" onClick={(e) => { e.stopPropagation(); onRemove(e); }}>
          <X />
        </button>
      )}
    </span>
  );
}

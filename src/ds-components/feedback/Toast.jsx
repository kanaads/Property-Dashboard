import React from "react";

const CSS = `
.pv-toast {
  display: flex; align-items: flex-start; gap: var(--space-4);
  width: 360px; max-width: 90vw; padding: var(--space-5);
  background: var(--surface-inverse); color: var(--text-inverse);
  border-radius: var(--radius-md); box-shadow: var(--elev-popover);
}
.pv-toast__icon { display: inline-flex; flex: 0 0 auto; margin-top: 1px; }
.pv-toast__icon svg { width: 18px; height: 18px; }
.pv-toast--success .pv-toast__icon { color: var(--emerald-300); }
.pv-toast--danger .pv-toast__icon { color: var(--red-500); }
.pv-toast--info .pv-toast__icon { color: var(--blue-500); }
.pv-toast__body { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.pv-toast__title { font-size: var(--text-base); font-weight: var(--weight-semibold); }
.pv-toast__msg { font-size: var(--text-sm); color: var(--slate-300); line-height: 1.4; }
.pv-toast__close { background: none; border: none; color: var(--slate-400); cursor: pointer; padding: 2px; border-radius: var(--radius-xs); flex: 0 0 auto; }
.pv-toast__close:hover { color: var(--white); }
.pv-toast__close svg { width: 15px; height: 15px; }
`;
let injected = false;
function ensureCSS() {
  if (injected || typeof document === "undefined") return;
  injected = true;
  const s = document.createElement("style");
  s.setAttribute("data-pv", "toast");
  s.textContent = CSS;
  document.head.appendChild(s);
}

const ICONS = {
  success: '<path d="M20 6 9 17l-5-5"/>',
  danger: '<circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>',
};

/** Transient notification surface. */
export function Toast({ tone = "success", title, message, onClose, className = "", ...rest }) {
  ensureCSS();
  return (
    <div className={["pv-toast", `pv-toast--${tone}`, className].filter(Boolean).join(" ")} role="status" {...rest}>
      <span className="pv-toast__icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: ICONS[tone] || ICONS.info }} />
      </span>
      <div className="pv-toast__body">
        {title && <span className="pv-toast__title">{title}</span>}
        {message && <span className="pv-toast__msg">{message}</span>}
      </div>
      {onClose && (
        <button type="button" className="pv-toast__close" aria-label="Dismiss" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      )}
    </div>
  );
}

import React from "react";

const CSS = `
.pv-tabs { display: flex; align-items: center; gap: var(--space-6); border-bottom: var(--border-w) solid var(--border-subtle); }
.pv-tab {
  position: relative; display: inline-flex; align-items: center; gap: var(--space-3);
  padding: var(--space-4) 0; background: none; border: none; cursor: pointer;
  font-family: var(--font-sans); font-size: var(--text-base); font-weight: var(--weight-medium);
  color: var(--text-tertiary); transition: color var(--dur-fast) var(--ease-standard);
}
.pv-tab:hover { color: var(--text-secondary); }
.pv-tab--active { color: var(--text-primary); font-weight: var(--weight-semibold); }
.pv-tab--active::after {
  content: ""; position: absolute; left: 0; right: 0; bottom: -1px; height: 2px;
  background: var(--brand); border-radius: 2px 2px 0 0;
}
.pv-tab:focus-visible { outline: none; box-shadow: var(--focus-ring); border-radius: var(--radius-xs); }
.pv-tab__count {
  font-family: var(--font-mono); font-size: var(--text-2xs); font-weight: var(--weight-medium);
  color: var(--text-tertiary); background: var(--slate-100); padding: 1px 6px; border-radius: var(--radius-pill);
}
.pv-tab--active .pv-tab__count { background: var(--emerald-50); color: var(--emerald-700); }
.pv-tab svg { width: 16px; height: 16px; }
`;
let injected = false;
function ensureCSS() {
  if (injected || typeof document === "undefined") return;
  injected = true;
  const s = document.createElement("style");
  s.setAttribute("data-pv", "tabs");
  s.textContent = CSS;
  document.head.appendChild(s);
}

/** Underline tab bar. */
export function Tabs({ tabs = [], value, onChange, className = "", ...rest }) {
  ensureCSS();
  return (
    <div className={["pv-tabs", className].filter(Boolean).join(" ")} role="tablist" {...rest}>
      {tabs.map((t) => {
        const tab = typeof t === "string" ? { value: t, label: t } : t;
        const active = tab.value === value;
        return (
          <button
            key={tab.value} role="tab" aria-selected={active}
            className={["pv-tab", active ? "pv-tab--active" : ""].filter(Boolean).join(" ")}
            onClick={() => onChange && onChange(tab.value)}
          >
            {tab.icon}
            {tab.label}
            {tab.count != null && <span className="pv-tab__count">{tab.count}</span>}
          </button>
        );
      })}
    </div>
  );
}

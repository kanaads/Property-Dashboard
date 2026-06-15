import React from "react";

const CSS = `
.pv-avatar {
  display: inline-flex; align-items: center; justify-content: center;
  flex: 0 0 auto; overflow: hidden; font-family: var(--font-sans);
  font-weight: var(--weight-semibold); color: var(--emerald-700);
  background: var(--emerald-100); border-radius: var(--radius-pill);
  box-shadow: inset 0 0 0 1px var(--hairline);
}
.pv-avatar img { width: 100%; height: 100%; object-fit: cover; }
.pv-avatar--sq { border-radius: var(--radius-sm); }
.pv-avatar--xs { width: 22px; height: 22px; font-size: 9px; }
.pv-avatar--sm { width: 28px; height: 28px; font-size: 11px; }
.pv-avatar--md { width: 36px; height: 36px; font-size: 13px; }
.pv-avatar--lg { width: 44px; height: 44px; font-size: 16px; }
`;
let injected = false;
function ensureCSS() {
  if (injected || typeof document === "undefined") return;
  injected = true;
  const s = document.createElement("style");
  s.setAttribute("data-pv", "avatar");
  s.textContent = CSS;
  document.head.appendChild(s);
}

function initials(name = "") {
  return name.trim().split(/\s+/).slice(0, 2).map((p) => p[0] || "").join("").toUpperCase();
}

/** User/agent avatar with image or initials fallback. */
export function Avatar({ name = "", src, size = "md", square = false, className = "", ...rest }) {
  ensureCSS();
  const cls = ["pv-avatar", `pv-avatar--${size}`, square ? "pv-avatar--sq" : "", className].filter(Boolean).join(" ");
  return (
    <span className={cls} title={name} {...rest}>
      {src ? <img src={src} alt={name} /> : initials(name)}
    </span>
  );
}

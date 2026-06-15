import React from "react";
import { ScoreBadge } from "../score/ScoreBadge.jsx";
import { Badge } from "../core/Badge.jsx";

const CSS = `
.pv-prop {
  display: flex; flex-direction: column; overflow: hidden;
  background: var(--surface-card);
  border: var(--border-w) solid var(--border-subtle);
  border-radius: var(--radius-card);
  box-shadow: var(--elev-card);
  transition: var(--transition-elevate), border-color var(--dur-base) var(--ease-standard);
}
.pv-prop--interactive { cursor: pointer; }
.pv-prop--interactive:hover { box-shadow: var(--elev-card-hover); border-color: var(--border-default); transform: translateY(-2px); }
.pv-prop__media { position: relative; aspect-ratio: 16 / 10; background: linear-gradient(135deg, var(--slate-200), var(--slate-300)); overflow: hidden; }
.pv-prop__media img { width: 100%; height: 100%; object-fit: cover; display: block; }
.pv-prop__media-top { position: absolute; top: var(--space-4); left: var(--space-4); right: var(--space-4); display: flex; align-items: flex-start; justify-content: space-between; gap: var(--space-3); }
.pv-prop__fav {
  display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px;
  border-radius: var(--radius-pill); border: none; cursor: pointer;
  background: rgba(255,255,255,0.92); color: var(--text-secondary); box-shadow: var(--shadow-sm);
  backdrop-filter: blur(4px); transition: var(--transition-control);
}
.pv-prop__fav:hover { color: var(--text-primary); }
.pv-prop__fav--on { color: var(--danger); }
.pv-prop__fav svg { width: 16px; height: 16px; }
.pv-prop__score-float {
  position: absolute; bottom: var(--space-4); right: var(--space-4);
  background: rgba(255,255,255,0.94); border-radius: var(--radius-sm);
  padding: var(--space-2) var(--space-3); box-shadow: var(--shadow-sm); backdrop-filter: blur(4px);
  display: flex; flex-direction: column; align-items: flex-end; gap: 1px;
}
.pv-prop__score-float .pv-prop__score-cap { font: var(--font-eyebrow); letter-spacing: var(--tracking-caps); text-transform: uppercase; color: var(--text-tertiary); }

.pv-prop__body { display: flex; flex-direction: column; gap: var(--space-4); padding: var(--space-5); }
.pv-prop__head { display: flex; flex-direction: column; gap: var(--space-2); }
.pv-prop__price { font-family: var(--font-mono); font-weight: var(--weight-semibold); font-size: var(--text-xl); color: var(--text-primary); letter-spacing: -0.01em; font-variant-numeric: tabular-nums; }
.pv-prop__title { font-size: var(--text-base); font-weight: var(--weight-semibold); color: var(--text-primary); line-height: 1.3; }
.pv-prop__loc { display: inline-flex; align-items: center; gap: var(--space-2); font-size: var(--text-sm); color: var(--text-tertiary); }
.pv-prop__loc svg { width: 13px; height: 13px; flex: 0 0 auto; }
.pv-prop__meta { display: flex; align-items: center; gap: var(--space-4); padding-top: var(--space-4); border-top: var(--border-w) solid var(--border-subtle); }
.pv-prop__stat { display: inline-flex; align-items: center; gap: var(--space-2); font-size: var(--text-sm); color: var(--text-secondary); font-variant-numeric: tabular-nums; }
.pv-prop__stat svg { width: 15px; height: 15px; color: var(--text-tertiary); }
.pv-prop__stat b { font-weight: var(--weight-semibold); color: var(--text-primary); font-family: var(--font-mono); font-size: var(--text-sm); }
`;
let injected = false;
function ensureCSS() {
  if (injected || typeof document === "undefined") return;
  injected = true;
  const s = document.createElement("style");
  s.setAttribute("data-pv", "propertycard");
  s.textContent = CSS;
  document.head.appendChild(s);
}

const Icon = ({ d }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: d }} />
);
const PIN = '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>';
const BED = '<path d="M2 9V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v0"/><path d="M2 11h20v6"/><path d="M2 17v2M22 17v2"/><path d="M6 8h12a2 2 0 0 1 2 2v1H4v-1a2 2 0 0 1 2-2Z"/>';
const BATH = '<path d="M4 12V6a2 2 0 0 1 4 0"/><path d="M2 12h20v2a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4v-2Z"/><path d="M6 18v2M18 18v2"/>';
const AREA = '<path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/>';
const HEART = '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 12 5 5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>';

function fmtPrice(p) {
  if (typeof p !== "number") return p;
  if (p >= 1e6) return `$${(p / 1e6).toFixed(p % 1e6 === 0 ? 0 : 1)}M`;
  if (p >= 1e3) return `$${Math.round(p / 1e3)}K`;
  return `$${p}`;
}

/** The core repeating property listing unit. */
export function PropertyCard({
  image, title, location, type, price, beds, baths, sqft, score,
  favorite = false, onFavorite, interactive = true, className = "", ...rest
}) {
  ensureCSS();
  return (
    <div className={["pv-prop", interactive ? "pv-prop--interactive" : "", className].filter(Boolean).join(" ")} {...rest}>
      <div className="pv-prop__media">
        {image && <img src={image} alt={title} loading="lazy" />}
        <div className="pv-prop__media-top">
          {type ? <Badge tone="neutral" appearance="solid" pill>{type}</Badge> : <span />}
          {onFavorite && (
            <button type="button" className={["pv-prop__fav", favorite ? "pv-prop__fav--on" : ""].filter(Boolean).join(" ")}
              aria-label={favorite ? "Remove from watchlist" : "Add to watchlist"}
              onClick={(e) => { e.stopPropagation(); onFavorite(e); }}>
              <svg viewBox="0 0 24 24" fill={favorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: HEART }} />
            </button>
          )}
        </div>
        {score != null && (
          <div className="pv-prop__score-float">
            <span className="pv-prop__score-cap">Latent Value</span>
            <ScoreBadge score={score} size="sm" />
          </div>
        )}
      </div>
      <div className="pv-prop__body">
        <div className="pv-prop__head">
          <span className="pv-prop__price">{fmtPrice(price)}</span>
          <span className="pv-prop__title">{title}</span>
          {location && <span className="pv-prop__loc"><Icon d={PIN} />{location}</span>}
        </div>
        <div className="pv-prop__meta">
          {beds != null && <span className="pv-prop__stat"><Icon d={BED} /><b>{beds}</b> bd</span>}
          {baths != null && <span className="pv-prop__stat"><Icon d={BATH} /><b>{baths}</b> ba</span>}
          {sqft != null && <span className="pv-prop__stat"><Icon d={AREA} /><b>{sqft.toLocaleString()}</b> sqft</span>}
        </div>
      </div>
    </div>
  );
}

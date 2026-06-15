import { SearchX, TriangleAlert } from 'lucide-react';
import type { Property } from '@/lib/database.types';
import { PropertyCard } from '@/ds-components/property/PropertyCard.jsx';

import { Badge } from '@/ds-components/core/Badge.jsx';
import { ScoreBadge } from '@/ds-components/score/ScoreBadge.jsx';
import { MapPin } from 'lucide-react';

interface PropertyGridProps {
  view: string;
  properties: (Property & { favorite?: boolean })[];
  isLoading: boolean;
  isError: boolean;
  toggleWatchlist: (id: string, current: boolean) => void;
}

/** Skeleton card — mirrors the exact shape of a real PropertyCard. */
function SkeletonCard() {
  return (
    <div
      className="flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm"
      aria-hidden="true"
    >
      {/* Image placeholder */}
      <div className="skeleton-shimmer h-44 w-full" />

      <div className="flex flex-1 flex-col gap-3 p-4 pt-6">
        {/* Price */}
        <div className="skeleton-shimmer h-7 w-2/5 rounded-full" />
        {/* Title */}
        <div className="skeleton-shimmer h-4 w-3/4 rounded-full" />
        {/* Description lines */}
        <div className="space-y-1.5">
          <div className="skeleton-shimmer h-3 w-full rounded-full" />
          <div className="skeleton-shimmer h-3 w-5/6 rounded-full" />
        </div>
        {/* Stats row */}
        <div className="mt-auto flex items-center gap-4 border-t border-slate-50 pt-3">
          <div className="skeleton-shimmer h-3 w-10 rounded-full" />
          <div className="skeleton-shimmer h-3 w-10 rounded-full" />
          <div className="skeleton-shimmer h-3 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function PropertyGrid({ view, properties, isLoading, isError, toggleWatchlist }: PropertyGridProps) {
  if (isLoading) {
    return (
      <div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        aria-busy="true"
        aria-label="Loading properties…"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div
        role="alert"
        className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700"
      >
        <TriangleAlert size={18} aria-hidden="true" className="mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold">Couldn't load properties</p>
          <p className="mt-0.5 text-red-700/80">Something went wrong. Please try again.</p>
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-xl border border-dashed border-slate-100 bg-white p-10 text-center">
        {/* Faint oversized gauge-arc watermark — echoes the signature gauge
            even when there's nothing to show. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 200 200"
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 text-slate-50"
        >
          <circle cx="100" cy="100" r="84" fill="none" stroke="currentColor" strokeWidth="20" />
          <circle
            cx="100"
            cy="100"
            r="84"
            fill="none"
            stroke="currentColor"
            strokeWidth="20"
            strokeDasharray="180 800"
            strokeLinecap="round"
          />
        </svg>
        <div className="relative">
          <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-500">
            <SearchX size={22} aria-hidden="true" />
          </span>
          <p className="font-semibold text-slate-900">No properties match your filters.</p>
          <p className="mt-1 text-sm text-slate-500">Try widening your search criteria.</p>
        </div>
      </div>
    );
  }

  if (view === "list") {
    const fmt = (p: number) => (p >= 1e6 ? "$" + (p / 1e6).toFixed(2) + "M" : "$" + Math.round(p / 1e3) + "K");
    return (
      <div className="pv-list">
        <div className="pv-list__head">
          <span>Property</span><span>Type</span><span className="text-right">Price</span>
          <span className="text-right">$/sqft</span><span className="text-right">Beds</span><span className="text-right">Latent Value</span>
        </div>
        {properties.map((p) => (
          <button className="pv-list__row" key={p.id}>
            <span className="pv-list__prop">
              <span className="pv-list__thumb" style={{ backgroundImage: `url(${p.image_url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100&q=80'})` }} />
              <span className="pv-list__titles">
                <span className="pv-list__title">{p.title}</span>
                <span className="pv-list__loc"><MapPin size={12} className="inline mr-1 text-slate-400" />{p.location}</span>
              </span>
            </span>
            <span><Badge tone="neutral">{p.property_type}</Badge></span>
            <span className="text-right font-mono text-sm">{fmt(p.price)}</span>
            <span className="text-right font-mono text-sm">${Math.round(p.price / p.square_feet)}</span>
            <span className="text-right font-mono text-sm">{p.bedrooms || "—"}</span>
            <span className="text-right"><ScoreBadge score={p.latent_value_score} showBar={true} /></span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <ul className="grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {properties.map((property) => (
        <li key={property.id}>
          <PropertyCard
            title={property.title}
            location={property.location}
            price={property.price}
            beds={property.bedrooms}
            baths={property.bathrooms}
            sqft={property.square_feet}
            type={property.property_type}
            score={property.latent_value_score}
            image={property.image_url || undefined}
            favorite={property.favorite ?? property.watchlist}
            onFavorite={(e) => {
              e.preventDefault();
              toggleWatchlist(property.id, property.favorite ?? false);
            }}
          />
        </li>
      ))}
    </ul>
  );
}

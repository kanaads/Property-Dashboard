import { useState } from 'react';
import { Bath, BedDouble, Building2, MapPin, Ruler } from 'lucide-react';
import type { Property } from '@/lib/database.types';
import { ValueGauge } from '@/shared/components/ui/ValueGauge';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export function PropertyCard({ property }: { property: Property }) {
  const pricePerSqft = Math.round(property.price / property.square_feet);
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="card-lift flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 group">
      <div className="card-media relative h-[220px] w-full overflow-hidden bg-slate-100">
        {imageFailed ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 bg-slate-800 text-white/80">
            <Building2 size={28} aria-hidden="true" />
            <p className="text-[11px] font-medium uppercase tracking-wide">Image unavailable</p>
          </div>
        ) : (
          <img
            src={property.image_url}
            alt={`${property.title} in ${property.location}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageFailed(true)}
          />
        )}
        
        <span className="absolute left-3 top-3 rounded-md bg-white/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-900 shadow-sm backdrop-blur-sm">
          {property.property_type}
        </span>
        
        <button 
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-slate-400 shadow-sm transition-colors hover:text-red-500 hover:bg-white"
          aria-label="Add to watchlist"
          type="button"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3 flex items-start justify-between gap-2">
          <div>
            <p className="font-mono text-2xl font-bold leading-none tracking-tight text-slate-900 tabular-nums">
              {currency.format(property.price)}
            </p>
            <p className="mt-1 font-mono text-xs font-medium text-slate-500 tabular-nums">
              ${pricePerSqft.toLocaleString()}/sqft
            </p>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Latent Value
            </span>
            <span className="font-mono text-lg font-bold text-brand tabular-nums">
              {property.latent_value_score}
              <span className="text-xs font-semibold text-slate-400">/100</span>
            </span>
          </div>
        </div>

        <h3 className="line-clamp-1 font-display text-base font-semibold leading-tight text-slate-900">
          {property.title}
        </h3>
        
        <p className="mt-1 flex items-center gap-1 text-sm font-medium text-slate-500">
          <MapPin size={14} aria-hidden="true" className="shrink-0" />
          <span className="truncate">{property.location}</span>
        </p>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
          {property.description}
        </p>

        <dl className="mt-auto flex items-center gap-4 border-t border-slate-100 pt-4 text-[13px] font-medium text-slate-600">
          <div className="flex items-center gap-1.5">
            <BedDouble size={14} aria-hidden="true" className="text-slate-400" />
            <dt className="sr-only">Bedrooms</dt>
            <dd><span className="font-mono tabular-nums">{property.bedrooms}</span> bd</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath size={14} aria-hidden="true" className="text-slate-400" />
            <dt className="sr-only">Bathrooms</dt>
            <dd><span className="font-mono tabular-nums">{property.bathrooms}</span> ba</dd>
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <Ruler size={14} aria-hidden="true" className="text-slate-400" />
            <dt className="sr-only">Square feet</dt>
            <dd><span className="font-mono tabular-nums">{property.square_feet.toLocaleString()}</span> sqft</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}


import { Bath, BedDouble, MapPin, Ruler, TrendingUp } from 'lucide-react';
import type { Property } from '@/lib/database.types';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

function scoreColor(score: number): string {
  if (score >= 80) return 'bg-navy-900 text-white';
  if (score >= 65) return 'bg-sky-accent text-navy-900';
  return 'bg-navy-50 text-navy-700';
}

export function PropertyCard({ property }: { property: Property }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-44 w-full overflow-hidden bg-navy-50">
        <img
          src={property.image_url}
          alt={`${property.title} in ${property.location}`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <span
          className={`absolute right-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${scoreColor(
            property.latent_value_score
          )}`}
          aria-label={`Latent value score: ${property.latent_value_score} out of 100`}
        >
          <TrendingUp size={12} aria-hidden="true" />
          {property.latent_value_score}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-bold leading-snug text-navy-900">{property.title}</h3>
        </div>
        <p className="flex items-center gap-1 text-xs text-navy-500">
          <MapPin size={13} aria-hidden="true" />
          {property.location}
          <span className="ml-1 rounded bg-navy-50 px-1.5 py-0.5 font-medium text-navy-700">
            {property.property_type}
          </span>
        </p>
        <p className="line-clamp-2 text-xs text-navy-700/80">{property.description}</p>

        <p className="mt-1 text-lg font-extrabold text-navy-900">
          {currency.format(property.price)}
        </p>

        <dl className="mt-auto flex items-center gap-4 border-t border-navy-50 pt-3 text-xs text-navy-700">
          <div className="flex items-center gap-1">
            <BedDouble size={14} aria-hidden="true" />
            <dt className="sr-only">Bedrooms</dt>
            <dd>{property.bedrooms} bd</dd>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={14} aria-hidden="true" />
            <dt className="sr-only">Bathrooms</dt>
            <dd>{property.bathrooms} ba</dd>
          </div>
          <div className="flex items-center gap-1">
            <Ruler size={14} aria-hidden="true" />
            <dt className="sr-only">Square feet</dt>
            <dd>{property.square_feet.toLocaleString()} sqft</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

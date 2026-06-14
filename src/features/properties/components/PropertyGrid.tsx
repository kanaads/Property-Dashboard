import type { Property } from '@/lib/database.types';
import { PropertyCard } from './PropertyCard';

interface PropertyGridProps {
  properties: Property[];
  isLoading: boolean;
  isError: boolean;
}

/** Skeleton card — mirrors the exact shape of a real PropertyCard. */
function SkeletonCard() {
  return (
    <div
      className="flex flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm"
      aria-hidden="true"
    >
      {/* Image placeholder */}
      <div className="h-44 w-full animate-pulse bg-navy-50" />

      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Title */}
        <div className="h-4 w-3/4 animate-pulse rounded-full bg-navy-100" />
        {/* Location + badge row */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-1/2 animate-pulse rounded-full bg-navy-50" />
          <div className="h-5 w-16 animate-pulse rounded bg-navy-50" />
        </div>
        {/* Description lines */}
        <div className="space-y-1.5">
          <div className="h-3 w-full animate-pulse rounded-full bg-navy-50" />
          <div className="h-3 w-5/6 animate-pulse rounded-full bg-navy-50" />
        </div>
        {/* Price */}
        <div className="h-6 w-1/3 animate-pulse rounded-full bg-navy-100" />
        {/* Stats row */}
        <div className="mt-auto flex items-center gap-4 border-t border-navy-50 pt-3">
          <div className="h-3 w-10 animate-pulse rounded-full bg-navy-50" />
          <div className="h-3 w-10 animate-pulse rounded-full bg-navy-50" />
          <div className="h-3 w-16 animate-pulse rounded-full bg-navy-50" />
        </div>
      </div>
    </div>
  );
}

export function PropertyGrid({ properties, isLoading, isError }: PropertyGridProps) {
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
      <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
        Something went wrong loading properties. Please try again.
      </p>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-navy-100 bg-white p-10 text-center">
        <p className="font-semibold text-navy-900">No properties match your filters.</p>
        <p className="mt-1 text-sm text-navy-500">Try widening your search criteria.</p>
      </div>
    );
  }

  return (
    <ul className="grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {properties.map((property) => (
        <li key={property.id}>
          <PropertyCard property={property} />
        </li>
      ))}
    </ul>
  );
}

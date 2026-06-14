import type { Property } from '@/lib/database.types';
import { PropertyCard } from './PropertyCard';

interface PropertyGridProps {
  properties: Property[];
  isLoading: boolean;
  isError: boolean;
}

export function PropertyGrid({ properties, isLoading, isError }: PropertyGridProps) {
  if (isLoading) {
    return (
      <div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        aria-busy="true"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-72 animate-pulse rounded-2xl border border-navy-100 bg-white"
          />
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

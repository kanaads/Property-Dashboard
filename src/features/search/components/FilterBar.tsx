import { Search, X } from 'lucide-react';
import { Input, Select } from '@/shared/components/ui/Field';
import { Button } from '@/shared/components/ui/Button';
import { PROPERTY_TYPES } from '@/lib/database.types';
import { emptyFilters, type PropertyFilters } from '../filterProperties';

interface FilterBarProps {
  filters: PropertyFilters;
  onChange: (filters: PropertyFilters) => void;
  resultCount: number;
}

export function FilterBar({ filters, onChange, resultCount }: FilterBarProps) {
  function set<K extends keyof PropertyFilters>(key: K, value: PropertyFilters[K]) {
    onChange({ ...filters, [key]: value });
  }

  function numeric(value: string): number | '' {
    return value === '' ? '' : Number(value);
  }

  const hasActive =
    filters.search !== '' ||
    filters.propertyType !== '' ||
    filters.minPrice !== '' ||
    filters.maxPrice !== '' ||
    filters.minBedrooms !== '';

  return (
    <section
      aria-label="Search and filter properties"
      className="rounded-2xl border border-navy-100 bg-white p-4 shadow-sm"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
        <div className="flex-1">
          <label htmlFor="search" className="text-xs font-semibold text-navy-700">
            Search
          </label>
          <div className="relative">
            <Search
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy-500"
            />
            <Input
              id="search"
              type="search"
              placeholder="Title, location, or keyword…"
              value={filters.search}
              onChange={(e) => set('search', e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="w-full lg:w-44">
          <label htmlFor="type" className="text-xs font-semibold text-navy-700">
            Type
          </label>
          <Select
            id="type"
            value={filters.propertyType}
            onChange={(e) => set('propertyType', e.target.value)}
          >
            <option value="">Any type</option>
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </div>

        <div className="w-full lg:w-32">
          <label htmlFor="minPrice" className="text-xs font-semibold text-navy-700">
            Min Price
          </label>
          <Input
            id="minPrice"
            type="number"
            inputMode="numeric"
            placeholder="0"
            value={filters.minPrice}
            onChange={(e) => set('minPrice', numeric(e.target.value))}
          />
        </div>

        <div className="w-full lg:w-32">
          <label htmlFor="maxPrice" className="text-xs font-semibold text-navy-700">
            Max Price
          </label>
          <Input
            id="maxPrice"
            type="number"
            inputMode="numeric"
            placeholder="Any"
            value={filters.maxPrice}
            onChange={(e) => set('maxPrice', numeric(e.target.value))}
          />
        </div>

        <div className="w-full lg:w-28">
          <label htmlFor="minBeds" className="text-xs font-semibold text-navy-700">
            Min Beds
          </label>
          <Select
            id="minBeds"
            value={filters.minBedrooms}
            onChange={(e) => set('minBedrooms', numeric(e.target.value))}
          >
            <option value="">Any</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}+
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs text-navy-500" aria-live="polite">
          {resultCount} {resultCount === 1 ? 'property' : 'properties'} found
        </p>
        {hasActive && (
          <Button variant="ghost" onClick={() => onChange(emptyFilters)} className="text-xs">
            <X size={14} aria-hidden="true" />
            Clear filters
          </Button>
        )}
      </div>
    </section>
  );
}

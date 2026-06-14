import type { Property } from '@/lib/database.types';

export interface PropertyFilters {
  search: string;
  propertyType: string; // '' = any
  minPrice: number | '';
  maxPrice: number | '';
  minBedrooms: number | '';
}

export const emptyFilters: PropertyFilters = {
  search: '',
  propertyType: '',
  minPrice: '',
  maxPrice: '',
  minBedrooms: '',
};

/**
 * Single-pass, short-circuiting multi-criteria filter (Phase 5).
 * One iteration evaluates every active constraint with logical AND.
 */
export function filterProperties(
  properties: Property[],
  filters: PropertyFilters
): Property[] {
  const term = filters.search.trim().toLowerCase();

  return properties.filter((p) => {
    if (term) {
      const haystack = `${p.title} ${p.location} ${p.description} ${p.property_type}`.toLowerCase();
      if (!haystack.includes(term)) return false;
    }
    if (filters.propertyType && p.property_type !== filters.propertyType) return false;
    if (filters.minPrice !== '' && p.price < filters.minPrice) return false;
    if (filters.maxPrice !== '' && p.price > filters.maxPrice) return false;
    if (filters.minBedrooms !== '' && p.bedrooms < filters.minBedrooms) return false;
    return true;
  });
}

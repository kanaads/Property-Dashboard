import { Grid, List } from 'lucide-react';
import { Input } from '@/ds-components/core/Input.jsx';
import { Select } from '@/ds-components/core/Select.jsx';
import { PROPERTY_TYPES } from '@/lib/database.types';
import { emptyFilters, type PropertyFilters } from '../filterProperties';

interface FilterBarProps {
  filters: PropertyFilters;
  onChange: (filters: PropertyFilters) => void;
  resultCount: number;
  sort: string;
  onSort: (sort: string) => void;
  view: string;
  onView: (view: string) => void;
}

export function FilterBar({ filters, onChange, resultCount, sort, onSort, view, onView }: FilterBarProps) {
  function set<K extends keyof PropertyFilters>(key: K, value: PropertyFilters[K]) {
    onChange({ ...filters, [key]: value });
  }

  function numeric(value: string): number | '' {
    return value === '' ? '' : Number(value);
  }

  const hasActive =
    filters.propertyType !== '' ||
    filters.minPrice !== '' ||
    filters.maxPrice !== '' ||
    filters.minBedrooms !== '';

  return (
    <div className="pv-filterbar">
      <div className="pv-filterbar__controls">
        <Select
          value={filters.propertyType}
          onChange={(e) => set('propertyType', e.target.value)}
          options={PROPERTY_TYPES}
          placeholder="Any type"
        />
        <Input
          placeholder="Min price"
          inputMode="numeric"
          value={filters.minPrice}
          onChange={(e) => set('minPrice', numeric(e.target.value))}
        />
        <Input
          placeholder="Max price"
          inputMode="numeric"
          value={filters.maxPrice}
          onChange={(e) => set('maxPrice', numeric(e.target.value))}
        />
        <Select
          value={filters.minBedrooms}
          onChange={(e) => set('minBedrooms', numeric(e.target.value))}
          options={["1", "2", "3", "4", "5"].map(n => ({ value: n, label: `${n}+` }))}
          placeholder="Beds"
        />
        {hasActive && (
          <button className="pv-filters__clear text-xs font-semibold text-slate-500 hover:text-slate-900 px-2" onClick={() => onChange(emptyFilters)}>
            Clear
          </button>
        )}
      </div>
      <div className="pv-filterbar__view">
        <Select 
          value={sort} 
          onChange={(e) => onSort(e.target.value)} 
          options={[
            { value: "score", label: "Value score (High to Low)" },
            { value: "price-desc", label: "Price (High to Low)" },
            { value: "price-asc", label: "Price (Low to High)" },
            { value: "psf", label: "Price per sqft" },
          ]} 
        />
        <div className="pv-view-toggles flex items-center bg-slate-100 rounded-md p-0.5">
          <button 
            className={`flex h-8 w-8 items-center justify-center rounded ${view === 'grid' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
            onClick={() => onView('grid')}
          >
            <Grid size={16} />
          </button>
          <button 
            className={`flex h-8 w-8 items-center justify-center rounded ${view === 'list' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
            onClick={() => onView('list')}
          >
            <List size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}


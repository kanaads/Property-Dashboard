import { useMemo, useState } from 'react';
import { Layout } from './Layout';
import { Tabs } from '@/ds-components/navigation/Tabs.jsx';
import { Modal } from '@/shared/components/ui/Modal';
import { useProperties } from '@/features/properties/hooks/useProperties';
import { PropertyGrid } from '@/features/properties/components/PropertyGrid';
import { AddPropertyForm } from '@/features/properties/components/AddPropertyForm';
import { FilterBar } from '@/features/search/components/FilterBar';
import {
  emptyFilters,
  filterProperties,
  type PropertyFilters,
} from '@/features/search/filterProperties';
import { AnalyticsPanel } from '@/features/analytics/components/AnalyticsPanel';

export function DashboardPage() {
  const { data: properties = [], isLoading, isError } = useProperties();
  const [filters, setFilters] = useState<PropertyFilters>(emptyFilters);
  const [isFormOpen, setFormOpen] = useState(false);
  const [sort, setSort] = useState("score");
  const [tab, setTab] = useState("all");
  const [view, setView] = useState("grid");
  const [watchState, setWatchState] = useState<Record<string, boolean>>({});

  const toggleWatchlist = (id: string, current: boolean) => {
    setWatchState(prev => ({ ...prev, [id]: !(prev[id] ?? current) }));
  };

  const propertiesWithFavs = useMemo(() => {
    return properties.map(p => ({
      ...p,
      favorite: watchState[p.id] ?? p.watchlist
    }));
  }, [properties, watchState]);

  const filtered = useMemo(() => {
    let list = propertiesWithFavs.filter(p => tab === "all" || p.favorite);
    list = filterProperties(list, filters);
    list.sort((a, b) => {
      if (sort === "score") return b.latent_value_score - a.latent_value_score;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "psf") return (a.price / a.square_feet) - (b.price / b.square_feet);
      return 0;
    });
    return list;
  }, [propertiesWithFavs, filters, sort, tab]);

  return (
    <Layout 
      onAddProperty={() => setFormOpen(true)}
      query={filters.search}
      onQuery={(q) => setFilters(prev => ({ ...prev, search: q }))}
    >
      <div className="pv-scroll">
        <div className="pv-page-head">
          <div>
            <h1 className="pv-page-title">Portfolio</h1>
            <p className="pv-page-sub">
              {properties.length} active listings · Meridian Capital · Chicago metro
            </p>
          </div>
        </div>

        <AnalyticsPanel properties={filtered} />

        <section className="pv-results">
          <div className="pv-results__head">
            <Tabs 
              value={tab} 
              onChange={setTab} 
              tabs={[
                { value: "all", label: "All listings", count: propertiesWithFavs.length },
                { value: "watchlist", label: "Watchlist", count: propertiesWithFavs.filter(p => p.favorite).length }
              ]} 
            />
            <span className="pv-results__count font-mono tabular-nums">
              {filtered.length} {filtered.length === 1 ? 'property' : 'properties'}
            </span>
          </div>

          <FilterBar 
            filters={filters} 
            onChange={setFilters} 
            resultCount={filtered.length} 
            sort={sort}
            onSort={setSort}
            view={view}
            onView={setView}
          />

          <PropertyGrid view={view} properties={filtered} isLoading={isLoading} isError={isError} toggleWatchlist={(id, current) => toggleWatchlist(id, current)} />
        </section>
      </div>

      <Modal 
        open={isFormOpen} 
        title="Add property" 
        subtitle="Propvia scores the listing automatically once ingested."
        onClose={() => setFormOpen(false)}
      >
        <AddPropertyForm onSuccess={() => setFormOpen(false)} onCancel={() => setFormOpen(false)} />
      </Modal>
    </Layout>
  );
}

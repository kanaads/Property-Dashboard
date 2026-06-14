import { useMemo, useState } from 'react';
import { Layout } from './Layout';
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

  const filtered = useMemo(
    () => filterProperties(properties, filters),
    [properties, filters]
  );

  return (
    <Layout onAddProperty={() => setFormOpen(true)}>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-extrabold text-navy-900">Property Portfolio</h1>
          <p className="text-sm text-navy-500">
            Surface hidden value across your listings with live filtering and analytics.
          </p>
        </div>

        <AnalyticsPanel properties={filtered} />

        <FilterBar filters={filters} onChange={setFilters} resultCount={filtered.length} />

        <PropertyGrid properties={filtered} isLoading={isLoading} isError={isError} />
      </div>

      <Modal open={isFormOpen} title="Add a new property" onClose={() => setFormOpen(false)}>
        <AddPropertyForm onSuccess={() => setFormOpen(false)} />
      </Modal>
    </Layout>
  );
}

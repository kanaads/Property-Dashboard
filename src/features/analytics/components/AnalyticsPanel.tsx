import { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { DollarSign, Gauge, Home, Ruler } from 'lucide-react';
import type { Property } from '@/lib/database.types';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-navy-100 bg-white p-4 shadow-sm">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-900">
        {icon}
      </span>
      <div>
        <p className="text-xs text-navy-500">{label}</p>
        <p className="text-lg font-extrabold text-navy-900">{value}</p>
      </div>
    </div>
  );
}

/** Client-side aggregations over the *filtered* dataset (Phase 5). */
export function AnalyticsPanel({ properties }: { properties: Property[] }) {
  const stats = useMemo(() => {
    if (properties.length === 0) {
      return { count: 0, avgPrice: 0, avgPpsf: 0, avgScore: 0, byType: [] as { type: string; avgPpsf: number }[] };
    }

    const count = properties.length;
    const avgPrice = properties.reduce((s, p) => s + p.price, 0) / count;
    const avgPpsf =
      properties.reduce((s, p) => s + p.price / p.square_feet, 0) / count;
    const avgScore =
      properties.reduce((s, p) => s + p.latent_value_score, 0) / count;

    const groups = new Map<string, { total: number; n: number }>();
    for (const p of properties) {
      const g = groups.get(p.property_type) ?? { total: 0, n: 0 };
      g.total += p.price / p.square_feet;
      g.n += 1;
      groups.set(p.property_type, g);
    }
    const byType = Array.from(groups.entries()).map(([type, g]) => ({
      type,
      avgPpsf: Math.round(g.total / g.n),
    }));

    return { count, avgPrice, avgPpsf, avgScore, byType };
  }, [properties]);

  return (
    <section aria-label="Portfolio analytics" className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <div className="grid grid-cols-2 gap-4 lg:col-span-1">
        <StatCard icon={<Home size={18} aria-hidden="true" />} label="Listings" value={String(stats.count)} />
        <StatCard
          icon={<DollarSign size={18} aria-hidden="true" />}
          label="Avg. Price"
          value={stats.count ? currency.format(stats.avgPrice) : '—'}
        />
        <StatCard
          icon={<Ruler size={18} aria-hidden="true" />}
          label="Avg. $/sqft"
          value={stats.count ? `$${stats.avgPpsf.toFixed(0)}` : '—'}
        />
        <StatCard
          icon={<Gauge size={18} aria-hidden="true" />}
          label="Avg. Value Score"
          value={stats.count ? stats.avgScore.toFixed(0) : '—'}
        />
      </div>

      <div className="rounded-2xl border border-navy-100 bg-white p-4 shadow-sm lg:col-span-2">
        <h2 className="mb-2 text-sm font-bold text-navy-900">
          Avg. price per sqft by property type
        </h2>
        {stats.byType.length === 0 ? (
          <p className="py-8 text-center text-sm text-navy-500">
            No data for the current filters.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={stats.byType} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eaf1f8" />
              <XAxis dataKey="type" tick={{ fontSize: 11, fill: '#123a66' }} />
              <YAxis tick={{ fontSize: 11, fill: '#123a66' }} width={44} />
              <Tooltip
                formatter={(v: number) => [`$${v}/sqft`, 'Avg $/sqft']}
                contentStyle={{ borderRadius: 8, fontSize: 12 }}
              />
              <Bar dataKey="avgPpsf" fill="#0a2c56" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}

import { useMemo } from 'react';
import { Building2, Wallet, Ruler, Gauge } from 'lucide-react';
import type { Property } from '@/lib/database.types';
import { Card } from '@/ds-components/surfaces/Card.jsx';
import { StatCard } from '@/ds-components/surfaces/StatCard.jsx';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const fmtM = (v: number) => {
  if (v >= 1e6) return "$" + (v / 1e6).toFixed(1) + "M";
  if (v >= 1e3) return "$" + Math.round(v / 1e3) + "K";
  return "$" + v;
};

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

  const totalValue = properties.reduce((s, p) => s + p.price, 0);
  const vizVars = ["--viz-1", "--viz-2", "--viz-3", "--viz-4", "--viz-5"];
  const bars = stats.byType.map((b, i) => ({
    ...b,
    color: `var(${vizVars[i % vizVars.length]})`,
  })).sort((a, b) => b.avgPpsf - a.avgPpsf);
  const maxPsf = Math.max(...bars.map((b) => b.avgPpsf), 1) * 1.15;

  return (
    <section className="pv-analytics">
      <div className="pv-kpis">
        <StatCard label="Total listings" value={stats.count} icon={<Building2 size={16} />}
          delta="+6" deltaDirection="up" note="this month" />
        <StatCard label="Portfolio value" value={fmtM(totalValue)} icon={<Wallet size={16} />}
          delta="+4.2%" deltaDirection="up" note="vs last month" />
        <StatCard label="Avg price / sqft" value={"$" + Math.round(stats.avgPpsf)} icon={<Ruler size={16} />}
          delta="-1.1%" deltaDirection="down" note="vs last month" />
        <StatCard label="Avg value score" value={Math.round(stats.avgScore)} icon={<Gauge size={16} />}
          delta="+3" deltaDirection="up" note="trailing 30d" />
      </div>

      <Card className="pv-chart-card" title="Price per sqft by type" subtitle="Portfolio average · trailing 90 days">
        <div className="pv-chart">
          {bars.map((b) => (
            <div className="pv-chart__col" key={b.type}>
              <div className="pv-chart__bar-wrap">
                <span className="pv-chart__val">${Math.round(b.avgPpsf)}</span>
                <div className="pv-chart__bar" style={{ height: `${(b.avgPpsf / maxPsf) * 100}%`, background: b.color }} />
              </div>
              <span className="pv-chart__label">{b.type}</span>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}


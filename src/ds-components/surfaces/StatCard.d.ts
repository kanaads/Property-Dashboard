import * as React from "react";

/**
 * KPI tile for portfolio analytics rows (total listings, portfolio value,
 * avg $/sqft, avg score). Large mono figure with an optional trend delta and
 * note. Pair four across the top of a dashboard.
 *
 * @startingPoint section="Surfaces" subtitle="Analytics KPI tile" viewport="700x150"
 */
export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Overline label, e.g. "Portfolio value". */
  label: string;
  /** Primary figure (string or number). */
  value: React.ReactNode;
  /** Small trailing unit, e.g. "/sqft". */
  unit?: string;
  /** Corner icon node. */
  icon?: React.ReactNode;
  /** Trend value text, e.g. "+4.2%". */
  delta?: string;
  /** @default "flat" */
  deltaDirection?: "up" | "down" | "flat";
  /** Caption beside the delta, e.g. "vs last month". */
  note?: string;
}

export function StatCard(props: StatCardProps): JSX.Element;

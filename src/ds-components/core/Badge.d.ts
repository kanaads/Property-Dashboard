import * as React from "react";

export type BadgeTone = "neutral" | "brand" | "gold" | "success" | "warning" | "danger" | "info";
export type BadgeAppearance = "soft" | "solid" | "outline";

/**
 * Compact status or category label. Use `soft` for most cases, `solid` for
 * high-emphasis flags, `outline` for quiet categorisation. Add `dot` for a
 * status indicator (e.g. listing state).
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default "neutral" */
  tone?: BadgeTone;
  /** @default "soft" */
  appearance?: BadgeAppearance;
  /** Fully rounded. @default false */
  pill?: boolean;
  /** Leading status dot. @default false */
  dot?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export function Badge(props: BadgeProps): JSX.Element;

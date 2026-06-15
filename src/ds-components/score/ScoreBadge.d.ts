import * as React from "react";

/**
 * Compact, inline representation of the Latent Value Score for property cards,
 * tables and dense lists. Colour follows the same heat scale as ScoreMeter.
 * Optionally renders a mini progress bar alongside the number.
 */
export interface ScoreBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Score 1–100 (clamped). */
  score: number;
  /** @default "md" */
  size?: "sm" | "md";
  /** Show a mini linear meter next to the chip. @default false */
  showBar?: boolean;
}

export function ScoreBadge(props: ScoreBadgeProps): JSX.Element;

import * as React from "react";

/**
 * Radial gauge for Propvia's proprietary Latent Value Score (1–100) — the
 * single most important data point in the product. Ring and number colour
 * shift across the heat scale: slate (limited) → gold (moderate) →
 * emerald (strong) → bright emerald (exceptional, 90+). Use the large size on
 * property detail / hero contexts and `sm` in compact panels.
 *
 * @startingPoint section="Score" subtitle="Latent Value Score radial gauge" viewport="700x220"
 */
export interface ScoreMeterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Score 1–100 (clamped). */
  score: number;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Show the eyebrow label + band name under the dial. @default true */
  showCaption?: boolean;
  /** Eyebrow text. @default "Latent Value" */
  label?: string;
}

export function ScoreMeter(props: ScoreMeterProps): JSX.Element;

/** Resolve a score to its heat band metadata (key,label,color,soft). */
export function scoreBand(score: number): { key: string; label: string; color: string; soft: string };

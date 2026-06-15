import * as React from "react";

export interface SegmentOption {
  value: string;
  label?: string;
  icon?: React.ReactNode;
}

/**
 * Segmented control for 2–4 mutually exclusive choices — view toggles
 * (grid/list), sort modes, density. Icon-only options are allowed (omit label).
 */
export interface SegmentedControlProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: Array<string | SegmentOption>;
  value: string;
  onChange?: (value: string) => void;
  /** @default "md" */
  size?: "sm" | "md";
}

export function SegmentedControl(props: SegmentedControlProps): JSX.Element;

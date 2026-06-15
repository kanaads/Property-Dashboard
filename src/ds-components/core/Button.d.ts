import * as React from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Primary action button for the Propvia platform. Use `primary` for the single
 * most important action in a view, `secondary` for adjacent actions, `ghost`
 * for low-emphasis/toolbar actions, and `danger` for destructive confirmations.
 *
 * @startingPoint section="Core" subtitle="Action button — 4 variants, 3 sizes" viewport="700x120"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis. @default "primary" */
  variant?: ButtonVariant;
  /** Control height. @default "md" */
  size?: ButtonSize;
  /** Stretch to fill the container width. @default false */
  fullWidth?: boolean;
  /** Icon node rendered before the label. */
  iconLeft?: React.ReactNode;
  /** Icon node rendered after the label. */
  iconRight?: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function Button(props: ButtonProps): JSX.Element;

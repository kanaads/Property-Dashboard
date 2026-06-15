import * as React from "react";

/**
 * Icon-only button for toolbars, table rows, and dense controls. Always pass a
 * `label` for accessibility (it also becomes the tooltip).
 */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible label + native title tooltip. */
  label: string;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Draw a hairline border + card surface (use on light/empty backgrounds). @default false */
  bordered?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function IconButton(props: IconButtonProps): JSX.Element;

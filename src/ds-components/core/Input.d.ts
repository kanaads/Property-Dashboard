import * as React from "react";

/**
 * Labelled text input with optional leading/trailing icons, a mono prefix
 * (e.g. "$"), hint text and an error state. Wraps a native input — all native
 * input props pass through.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Field label rendered above the control. */
  label?: string;
  /** Helper text shown below when there is no error. */
  hint?: string;
  /** Error message; switches the field to its invalid styling. */
  error?: string;
  required?: boolean;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Icon node inside the field, leading edge. */
  iconLeft?: React.ReactNode;
  /** Icon node inside the field, trailing edge. */
  iconRight?: React.ReactNode;
  /** Static mono prefix such as a currency symbol. */
  prefix?: React.ReactNode;
}

export function Input(props: InputProps): JSX.Element;

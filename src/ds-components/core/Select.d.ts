import * as React from "react";

export interface SelectOption {
  value: string;
  label: string;
}

/**
 * Styled native dropdown. Pass `options` as strings or `{value,label}` objects.
 * Use for filters (property type, sort order) and short form choices.
 */
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  options: Array<string | SelectOption>;
  /** Leading empty option label. */
  placeholder?: string;
  error?: string;
}

export function Select(props: SelectProps): JSX.Element;

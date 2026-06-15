import * as React from "react";

/** Checkbox with optional label and description text. Native checkbox props pass through. */
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

export function Checkbox(props: CheckboxProps): JSX.Element;

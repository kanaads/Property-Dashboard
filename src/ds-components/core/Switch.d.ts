import * as React from "react";

/** Binary on/off toggle with optional trailing label. Native checkbox props pass through. */
export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Switch(props: SwitchProps): JSX.Element;

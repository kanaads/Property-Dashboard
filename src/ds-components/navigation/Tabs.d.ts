import * as React from "react";

export interface TabItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
  /** Optional count pill, e.g. result count. */
  count?: number;
}

/** Underline tab bar for switching primary views (controlled). */
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  tabs: Array<string | TabItem>;
  /** Active tab value. */
  value: string;
  onChange?: (value: string) => void;
}

export function Tabs(props: TabsProps): JSX.Element;

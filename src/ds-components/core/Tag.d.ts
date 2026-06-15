import * as React from "react";

/**
 * Filter chip. Use `selectable`+`selected` for toggleable filter facets, and
 * pass `onRemove` to render an applied/removable filter pill above a result set.
 */
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Active/selected styling. @default false */
  selected?: boolean;
  /** Hover affordance for toggle chips. @default false */
  selectable?: boolean;
  /** When provided, renders a remove (×) button. */
  onRemove?: (e: React.MouseEvent) => void;
  /** Leading icon node. */
  icon?: React.ReactElement;
  children?: React.ReactNode;
}

export function Tag(props: TagProps): JSX.Element;

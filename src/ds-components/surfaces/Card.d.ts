import * as React from "react";

/**
 * Base surface container. Optional header (title/subtitle/action). Choose
 * `interactive` for clickable cards (adds hover lift) and `flat` to drop the
 * resting shadow when nesting inside another surface.
 *
 * @startingPoint section="Surfaces" subtitle="Card surface with header slot" viewport="700x240"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Right-aligned header slot (button, menu, badge). */
  action?: React.ReactNode;
  /** @default "md" */
  padding?: "none" | "sm" | "md" | "lg";
  /** Remove resting shadow. @default false */
  flat?: boolean;
  /** Hover lift + pointer cursor. @default false */
  interactive?: boolean;
  children?: React.ReactNode;
}

export function Card(props: CardProps): JSX.Element;

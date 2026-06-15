import * as React from "react";

/** Agent/user avatar. Shows `src` image, falling back to initials from `name`. */
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  name?: string;
  src?: string;
  /** @default "md" */
  size?: "xs" | "sm" | "md" | "lg";
  /** Rounded-square instead of circle. @default false */
  square?: boolean;
}

export function Avatar(props: AvatarProps): JSX.Element;

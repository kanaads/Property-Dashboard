import * as React from "react";

/**
 * Transient notification on the dark inverse surface. Tone sets the leading
 * icon colour. Render in a top-right stack; auto-dismiss in product code.
 */
export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default "success" */
  tone?: "success" | "danger" | "info";
  title?: string;
  message?: string;
  /** Renders a dismiss (×) button when provided. */
  onClose?: () => void;
}

export function Toast(props: ToastProps): JSX.Element;

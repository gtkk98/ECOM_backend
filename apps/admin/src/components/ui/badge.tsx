import type { HTMLAttributes } from "react";

type BadgeVariant = "default" | "secondary" | "outline" | "destructive";

export function Badge({ className = "", variant = "default", ...props }: HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return <span className={`ui-badge ui-badge-${variant} ${className}`.trim()} {...props} />;
}
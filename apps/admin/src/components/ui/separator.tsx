import type { HTMLAttributes } from "react";

export function Separator({ className = "", orientation = "horizontal", ...props }: HTMLAttributes<HTMLDivElement> & { orientation?: "horizontal" | "vertical" }) {
  return <div role="separator" aria-orientation={orientation} className={`ui-separator ui-separator-${orientation} ${className}`.trim()} {...props} />;
}
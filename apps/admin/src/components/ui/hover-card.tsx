import type { HTMLAttributes, ReactNode } from "react";

export function HoverCard({ children }: { children: ReactNode }) {
  return <span className="ui-hover-card">{children}</span>;
}

export function HoverCardTrigger({ children, className = "", ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span tabIndex={0} className={`ui-hover-card-trigger ${className}`.trim()} {...props}>{children}</span>;
}

export function HoverCardContent({ children, className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <span className={`ui-hover-card-content ${className}`.trim()} {...props}>{children}</span>;
}
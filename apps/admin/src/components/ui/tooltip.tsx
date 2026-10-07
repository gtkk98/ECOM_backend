import type { HTMLAttributes, ReactNode } from "react";

export function TooltipProvider({ children }: { children: ReactNode; delayDuration?: number }) {
  return <>{children}</>;
}

export function Tooltip({ children, content }: { children: ReactNode; content?: string }) {
  return <span className="ui-tooltip" data-tooltip={content}>{children}</span>;
}

export function TooltipTrigger({ children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span tabIndex={0} className="ui-tooltip-trigger" {...props}>{children}</span>;
}

export function TooltipContent({ children, className = "", ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span role="tooltip" className={`ui-tooltip-content ${className}`.trim()} {...props}>{children}</span>;
}
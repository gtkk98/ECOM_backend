"use client";

import type { HTMLAttributes, ReactNode } from "react";

export function Popover({ children }: { children: ReactNode }) {
  return <details className="ui-popover">{children}</details>;
}

export function PopoverTrigger({ children, className = "", ...props }: HTMLAttributes<HTMLElement>) {
  return <summary className={`ui-popover-trigger ${className}`.trim()} {...props}>{children}</summary>;
}

export function PopoverContent({ children, className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`ui-popover-content ${className}`.trim()} {...props}>{children}</div>;
}
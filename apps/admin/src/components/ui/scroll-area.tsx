import type { HTMLAttributes, ReactNode } from "react";

export function ScrollArea({ children, className = "", ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return <div className={`ui-scroll-area ${className}`.trim()} {...props}>{children}</div>;
}
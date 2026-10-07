import type { HTMLAttributes, ReactNode } from "react";

export function ChartContainer({ children, className = "", ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return <div role="img" className={`ui-chart ${className}`.trim()} {...props}>{children}</div>;
}

export function ChartTooltip({ children }: { children: ReactNode }) {
  return <div className="ui-chart-tooltip">{children}</div>;
}

export function ChartLegend({ children }: { children: ReactNode }) {
  return <div className="ui-chart-legend">{children}</div>;
}
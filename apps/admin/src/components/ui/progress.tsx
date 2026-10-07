import type { HTMLAttributes } from "react";

export function Progress({ value = 0, className = "", ...props }: HTMLAttributes<HTMLDivElement> & { value?: number }) {
  const safeValue = Math.min(100, Math.max(0, value));
  return <div role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={safeValue} className={`ui-progress ${className}`.trim()} {...props}>
    <span className="ui-progress-indicator" style={{ transform: `translateX(-${100 - safeValue}%)` }} />
  </div>;
}
import type { InputHTMLAttributes } from "react";

export function Calendar({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input type="date" className={`ui-calendar ${className}`.trim()} {...props} />;
}
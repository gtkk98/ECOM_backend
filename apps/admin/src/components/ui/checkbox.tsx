import { forwardRef, InputHTMLAttributes } from "react";

export const Checkbox = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Checkbox({ className = "", ...props }, ref) {
    return <input ref={ref} {...props} type="checkbox" className={`ui-checkbox ${className}`.trim()} />;
  },
);
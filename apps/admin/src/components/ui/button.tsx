import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "default" | "outline" | "ghost";

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }>(
  function Button({ className = "", variant = "default", ...props }, ref) {
    return <button ref={ref} className={`ui-button ui-button-${variant} ${className}`.trim()} {...props} />;
  },
);
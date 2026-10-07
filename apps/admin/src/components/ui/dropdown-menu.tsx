import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

export function DropdownMenu({ children }: { children: ReactNode }) {
  return <details className="ui-dropdown">{children}</details>;
}

export function DropdownMenuTrigger({ children, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <summary className={`ui-dropdown-trigger ${className}`.trim()} {...props}>{children}</summary>;
}

export function DropdownMenuContent({ children, className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div role="menu" className={`ui-dropdown-content ${className}`.trim()} {...props}>{children}</div>;
}

export function DropdownMenuItem({ children, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" role="menuitem" className={`ui-dropdown-item ${className}`.trim()} {...props}>{children}</button>;
}

export function DropdownMenuSeparator() {
  return <hr className="ui-dropdown-separator" />;
}
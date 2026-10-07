import type { HTMLAttributes, ReactNode } from "react";

export function Breadcrumb({ className = "", ...props }: HTMLAttributes<HTMLElement>) {
  return <nav aria-label="Breadcrumb" className={`ui-breadcrumb ${className}`.trim()} {...props} />;
}

export function BreadcrumbList({ className = "", ...props }: HTMLAttributes<HTMLOListElement>) {
  return <ol className={`ui-breadcrumb-list ${className}`.trim()} {...props} />;
}

export function BreadcrumbItem({ className = "", ...props }: HTMLAttributes<HTMLLIElement>) {
  return <li className={`ui-breadcrumb-item ${className}`.trim()} {...props} />;
}

export function BreadcrumbLink({ className = "", ...props }: HTMLAttributes<HTMLAnchorElement>) {
  return <a className={`ui-breadcrumb-link ${className}`.trim()} {...props} />;
}

export function BreadcrumbPage({ children, className = "", ...props }: HTMLAttributes<HTMLSpanElement> & { children: ReactNode }) {
  return <span aria-current="page" className={`ui-breadcrumb-page ${className}`.trim()} {...props}>{children}</span>;
}

export function BreadcrumbSeparator({ children = "/", className = "", ...props }: HTMLAttributes<HTMLLIElement> & { children?: ReactNode }) {
  return <li role="presentation" aria-hidden="true" className={`ui-breadcrumb-separator ${className}`.trim()} {...props}>{children}</li>;
}
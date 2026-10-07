import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

export function Sidebar({ className = "", ...props }: HTMLAttributes<HTMLElement>) {
  return <aside className={`ui-sidebar ${className}`.trim()} {...props} />;
}

export function SidebarHeader({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`ui-sidebar-header ${className}`.trim()} {...props} />;
}

export function SidebarContent({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`ui-sidebar-content ${className}`.trim()} {...props} />;
}

export function SidebarFooter({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`ui-sidebar-footer ${className}`.trim()} {...props} />;
}

export function SidebarMenu({ children, className = "", ...props }: HTMLAttributes<HTMLUListElement> & { children: ReactNode }) {
  return <ul className={`ui-sidebar-menu ${className}`.trim()} {...props}>{children}</ul>;
}

export function SidebarMenuItem({ className = "", ...props }: HTMLAttributes<HTMLLIElement>) {
  return <li className={`ui-sidebar-menu-item ${className}`.trim()} {...props} />;
}

export function SidebarMenuButton({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className={`ui-sidebar-menu-button ${className}`.trim()} {...props} />;
}
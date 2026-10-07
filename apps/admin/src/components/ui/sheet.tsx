"use client";

import type { HTMLAttributes, ReactNode } from "react";

export function Sheet({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function SheetContent({ open, onClose, children, className = "", ...props }: HTMLAttributes<HTMLDivElement> & {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!open) return null;
  return <div className="ui-sheet-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section role="dialog" aria-modal="true" className={`ui-sheet-content ${className}`.trim()} {...props}>{children}</section>
  </div>;
}

export function SheetHeader({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <header className={`ui-sheet-header ${className}`.trim()} {...props} />;
}

export function SheetTitle({ className = "", ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={`ui-sheet-title ${className}`.trim()} {...props} />;
}

export function SheetDescription({ className = "", ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={`ui-sheet-description ${className}`.trim()} {...props} />;
}
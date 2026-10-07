"use client";

import { createContext, HTMLAttributes, ReactNode, useContext, useState } from "react";

type CollapsibleContextValue = { open: boolean; setOpen: (open: boolean) => void };
const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);

function useCollapsible() {
  const value = useContext(CollapsibleContext);
  if (!value) throw new Error("Collapsible components must be nested inside Collapsible.");
  return value;
}

export function Collapsible({ children, defaultOpen = false, open: controlledOpen, onOpenChange }: {
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = (nextOpen: boolean) => {
    if (controlledOpen === undefined) setUncontrolledOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };
  return <CollapsibleContext.Provider value={{ open, setOpen }}>{children}</CollapsibleContext.Provider>;
}

export function CollapsibleTrigger({ children, className = "", ...props }: HTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = useCollapsible();
  return <button type="button" aria-expanded={open} className={`ui-collapsible-trigger ${className}`.trim()} onClick={() => setOpen(!open)} {...props}>{children}</button>;
}

export function CollapsibleContent({ children, className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  const { open } = useCollapsible();
  if (!open) return null;
  return <div className={`ui-collapsible-content ${className}`.trim()} {...props}>{children}</div>;
}
import type { ReactNode } from "react";
import { Card } from "./ui/card";

export default function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <Card className={`panel ${className}`.trim()}>{children}</Card>;
}

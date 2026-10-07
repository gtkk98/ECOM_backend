import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your cart",
  description: "Review your ChowUp order and continue to checkout.",
  robots: { index: false, follow: false },
};

export default function CartLayout({ children }: LayoutProps<"/cart">) {
  return children;
}
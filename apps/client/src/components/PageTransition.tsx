"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const PageTransition = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={pathname}
        className="page-content"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.22, ease: "easeOut" }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
};

export default PageTransition;
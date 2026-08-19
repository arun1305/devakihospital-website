"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedIconBadgeProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedIconBadge({ children, className, delay = 0 }: AnimatedIconBadgeProps) {
  return (
    <motion.span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-teal-500 to-brand-teal-700 text-white",
        className
      )}
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay }}
      whileHover={{ scale: 1.15, rotate: -6 }}
    >
      {children}
    </motion.span>
  );
}

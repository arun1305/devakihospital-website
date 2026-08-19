"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PortraitMockupProps {
  initials: string;
  className?: string;
  accentIcons?: ReactNode[];
}

export function PortraitMockup({ initials, className, accentIcons = [] }: PortraitMockupProps) {
  return (
    <div className={cn("relative mx-auto aspect-square w-full max-w-xs", className)}>
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-dashed border-brand-teal-300/50 dark:border-brand-teal-600/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        aria-hidden
      />
      <motion.div
        className="absolute inset-5 rounded-full bg-gradient-to-br from-brand-teal-400/40 via-brand-orange-300/20 to-brand-orange-400/30 blur-2xl"
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <div className="absolute inset-7 flex items-center justify-center rounded-full bg-gradient-to-br from-brand-teal-600 to-brand-teal-800 text-5xl font-bold text-white shadow-brand-glow ring-4 ring-white dark:ring-brand-teal-950">
        {initials}
      </div>
      {accentIcons.map((icon, i) => (
        <motion.span
          key={i}
          className={cn(
            "absolute flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-brand-teal-600 shadow-brand-soft ring-1 ring-brand-grey-200/70 dark:bg-brand-teal-900 dark:text-brand-teal-300 dark:ring-white/10",
            i === 0 ? "-right-2 top-6" : "-left-3 bottom-10"
          )}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        >
          {icon}
        </motion.span>
      ))}
    </div>
  );
}

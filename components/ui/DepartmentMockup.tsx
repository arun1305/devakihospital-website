"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface DepartmentMockupProps {
  children: ReactNode;
}

const particlePositions = [
  { top: "12%", left: "-6%" },
  { top: "70%", left: "98%" },
  { top: "85%", left: "8%" },
];

export function DepartmentMockup({ children }: DepartmentMockupProps) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm">
      <motion.div
        className="absolute inset-0 rounded-[2.5rem] border-2 border-dashed border-white/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
        aria-hidden
      />
      <motion.div
        className="absolute inset-8 rounded-[2rem] bg-gradient-to-br from-brand-orange-400/40 via-white/10 to-brand-teal-300/30 blur-2xl"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="absolute inset-12 flex items-center justify-center rounded-[1.75rem] bg-white/10 shadow-brand-glow ring-1 ring-white/25 backdrop-blur-md"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      </motion.div>
      {particlePositions.map((pos, i) => (
        <motion.span
          key={i}
          className="absolute h-3 w-3 rounded-full bg-brand-orange-400 shadow-brand-glow"
          style={pos}
          animate={{ y: [0, -16, 0], opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          aria-hidden
        />
      ))}
    </div>
  );
}

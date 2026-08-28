"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface DepartmentMockupProps {
  children: ReactNode;
  name: string;
  slug: string;
}

export function DepartmentMockup({ children, name, slug }: DepartmentMockupProps) {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <motion.div
        className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-orange-400/30 via-transparent to-brand-teal-300/25 blur-2xl"
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 20, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ perspective: 1000 }}
        className="overflow-hidden rounded-2xl bg-white/95 shadow-brand-glow ring-1 ring-white/40 backdrop-blur-xl"
      >
        {/* window chrome */}
        <div className="flex items-center gap-1.5 border-b border-brand-grey-100 bg-brand-grey-50/80 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <span className="ml-3 truncate text-xs font-medium text-brand-grey-400">
            devakihospital.com/departments/{slug}
          </span>
        </div>

        {/* body */}
        <div className="flex flex-col gap-5 p-6">
          <div className="flex items-center gap-3">
            <motion.span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-teal-500 to-brand-teal-700 text-white shadow-brand-soft"
              animate={{ scale: [1, 1.07, 1] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            >
              {children}
            </motion.span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-brand-teal-900">{name}</p>
              <p className="text-xs text-brand-grey-400">Live department status</p>
            </div>
            <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-semibold text-green-700">
              <span className="relative flex h-1.5 w-1.5">
                <motion.span
                  className="absolute inline-flex h-full w-full rounded-full bg-green-500"
                  animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
              </span>
              Open Now
            </span>
          </div>

          {/* monitor waveform */}
          <div className="overflow-hidden rounded-xl bg-brand-teal-950 px-4 py-5">
            <svg viewBox="0 0 300 60" className="h-12 w-full" fill="none">
              <motion.path
                d="M0 30 L60 30 L72 8 L84 52 L96 30 L140 30 L150 18 L160 42 L170 30 L300 30"
                stroke="#4ade80"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0.4 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-brand-grey-50 px-4 py-3">
              <p className="text-lg font-bold text-brand-teal-900">24×7</p>
              <p className="text-xs text-brand-grey-400">Care Availability</p>
            </div>
            <div className="rounded-xl bg-brand-grey-50 px-4 py-3">
              <p className="text-lg font-bold text-brand-teal-900">Expert</p>
              <p className="text-xs text-brand-grey-400">Consultant Team</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

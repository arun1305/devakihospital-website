"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { getMockupContent, type MockupWidget } from "@/lib/department-mockup-content";

interface DepartmentMockupProps {
  children: ReactNode;
  name: string;
  slug: string;
}

function EcgWidget() {
  return (
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
  );
}

function EegWidget() {
  return (
    <svg viewBox="0 0 300 60" className="h-12 w-full" fill="none">
      <motion.path
        d="M0 30 L20 27 L30 36 L40 18 L50 33 L60 14 L70 30 L80 24 L90 40 L100 20 L120 30 L130 16 L140 36 L150 25 L160 30 L180 19 L190 37 L200 27 L220 13 L230 33 L250 30 L270 24 L300 30"
        stroke="#c084fc"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0.4 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

function ScanWidget() {
  return (
    <div className="relative h-12 w-full overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-8 gap-px opacity-30">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="border-r border-brand-teal-500/40" />
        ))}
      </div>
      <motion.div
        className="absolute top-0 h-full w-1 rounded-full bg-brand-orange-400 shadow-[0_0_12px_2px_rgba(250,139,44,0.7)]"
        animate={{ left: ["0%", "97%", "0%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function BarsWidget() {
  const heights = [0.4, 0.8, 0.5, 1, 0.65, 0.9, 0.45];
  return (
    <div className="flex h-12 w-full items-end justify-between gap-1.5">
      {heights.map((h, i) => (
        <motion.span
          key={i}
          className="flex-1 rounded-full bg-brand-teal-400"
          style={{ height: "100%" }}
          animate={{ scaleY: [h * 0.5, h, h * 0.5] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }}
        />
      ))}
    </div>
  );
}

function GridWidget() {
  return (
    <div className="grid h-12 w-full grid-cols-6 gap-1.5">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.span
          key={i}
          className="rounded-sm bg-brand-orange-400/80"
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: (i % 6) * 0.15 }}
        />
      ))}
    </div>
  );
}

const widgets: Record<MockupWidget, () => ReactNode> = {
  ecg: EcgWidget,
  eeg: EegWidget,
  scan: ScanWidget,
  bars: BarsWidget,
  grid: GridWidget,
};

export function DepartmentMockup({ children, name, slug }: DepartmentMockupProps) {
  const { widget, stat1, stat2 } = getMockupContent(slug);
  const Widget = widgets[widget];

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

          <div className="overflow-hidden rounded-xl bg-brand-teal-950 px-4 py-5">
            <Widget />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-brand-grey-50 px-4 py-3">
              <p className="text-lg font-bold text-brand-teal-900">{stat1.value}</p>
              <p className="text-xs text-brand-grey-400">{stat1.label}</p>
            </div>
            <div className="rounded-xl bg-brand-grey-50 px-4 py-3">
              <p className="text-lg font-bold text-brand-teal-900">{stat2.value}</p>
              <p className="text-xs text-brand-grey-400">{stat2.label}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

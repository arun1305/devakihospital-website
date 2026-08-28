"use client";

import { motion, type TargetAndTransition, type Transition } from "framer-motion";
import type { ReactNode } from "react";
import { getMockupBehavior, type MockupBehavior } from "@/lib/department-mockup-content";

interface DepartmentMockupProps {
  children: ReactNode;
  name: string;
  slug: string;
}

const iconMotion: Record<MockupBehavior, TargetAndTransition> = {
  heartbeat: { scale: [1, 1.16, 0.98, 1.1, 1] },
  breathe: { scale: [1, 1.12, 1] },
  rotate: { rotate: [0, 360] },
  rings: { scale: [1, 1.06, 1] },
  drip: { y: [0, -4, 0] },
  sparkle: { scale: [1, 1.08, 1], rotate: [0, -4, 4, 0] },
  bounce: { y: [0, -10, 0] },
};

const iconTransition: Record<MockupBehavior, Transition> = {
  heartbeat: { duration: 1.1, repeat: Infinity, ease: "easeInOut", times: [0, 0.25, 0.45, 0.65, 1] },
  breathe: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
  rotate: { duration: 6, repeat: Infinity, ease: "linear" },
  rings: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
  drip: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
  sparkle: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
  bounce: { duration: 1.3, repeat: Infinity, ease: "easeInOut" },
};

function RingsDecoration() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute inset-0 rounded-full border-2 border-brand-orange-300/70"
          animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: i * 0.6 }}
          aria-hidden
        />
      ))}
    </>
  );
}

function DripDecoration() {
  return (
    <motion.span
      className="absolute -bottom-2 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-brand-orange-300"
      animate={{ y: [0, 26, 26], opacity: [0, 1, 0] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "easeIn" }}
      aria-hidden
    />
  );
}

function SparkleDecoration() {
  const positions = [
    { top: "5%", left: "88%" },
    { top: "80%", left: "-4%" },
    { top: "-6%", left: "12%" },
  ];
  return (
    <>
      {positions.map((pos, i) => (
        <motion.span
          key={i}
          className="absolute h-2 w-2 rounded-full bg-brand-orange-300"
          style={pos}
          animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          aria-hidden
        />
      ))}
    </>
  );
}

export function DepartmentMockup({ children, name, slug }: DepartmentMockupProps) {
  const behavior = getMockupBehavior(slug);

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <motion.div
        className="absolute -inset-10 -z-10 rounded-full bg-gradient-to-br from-brand-orange-400/35 via-transparent to-brand-teal-300/30 blur-3xl"
        animate={{ opacity: [0.5, 0.95, 0.5] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-6 rounded-[2rem] bg-white/10 p-10 ring-1 ring-white/20 backdrop-blur-md"
      >
        <div className="relative flex h-40 w-40 items-center justify-center">
          {(behavior === "rings" || behavior === "heartbeat") && <RingsDecoration />}
          <motion.div
            className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-white/25 to-white/5 shadow-brand-glow ring-1 ring-white/30"
            animate={iconMotion[behavior]}
            transition={iconTransition[behavior]}
          >
            <span className="text-white">{children}</span>
            {behavior === "drip" && <DripDecoration />}
            {behavior === "sparkle" && <SparkleDecoration />}
          </motion.div>
        </div>

        <div className="text-center">
          <p className="text-lg font-bold text-white">{name}</p>
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/90">
            <span className="relative flex h-1.5 w-1.5">
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full bg-green-400"
                animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
              />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
            </span>
            Open Now
          </span>
        </div>
      </motion.div>
    </div>
  );
}

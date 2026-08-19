"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function AnimatedChecklist({ items, className }: { items: string[]; className?: string }) {
  return (
    <motion.ul
      className={cn("grid gap-3 sm:grid-cols-2", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ visible: { transition: { staggerChildren: 0.035 } } }}
    >
      {items.map((item) => (
        <motion.li
          key={item}
          variants={{
            hidden: { opacity: 0, x: -10 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
          }}
          className="flex items-start gap-2 text-sm text-brand-grey-600"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal-600" />
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}

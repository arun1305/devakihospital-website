"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Milestone {
  year: string;
  text: string;
  image?: string;
}

export function JourneyTimeline({ milestones }: { milestones: Milestone[] }) {
  return (
    <div className="relative mx-auto max-w-5xl">
      <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-brand-orange-500/70 via-brand-teal-400/40 to-transparent lg:left-1/2 lg:-translate-x-1/2" />
      <div className="flex flex-col gap-10 lg:gap-6">
        {milestones.map((item, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div key={item.year} className="relative lg:grid lg:grid-cols-2 lg:items-center lg:gap-10">
              <motion.span
                className="absolute left-4 top-6 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-brand-orange-500 ring-4 ring-white dark:ring-brand-teal-950 lg:left-1/2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, type: "spring", stiffness: 260, damping: 16 }}
              >
                <motion.span
                  className="absolute h-4 w-4 rounded-full bg-brand-orange-400"
                  animate={{ scale: [1, 1.9, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }}
                  aria-hidden
                />
              </motion.span>

              <motion.div
                initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "pl-10 lg:pl-0",
                  isLeft ? "lg:col-start-1 lg:pr-14" : "lg:col-start-2 lg:pl-14"
                )}
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  className={cn(
                    "group max-w-md overflow-hidden rounded-2xl bg-white shadow-brand-soft ring-1 ring-brand-grey-200/60 transition-shadow duration-300 hover:shadow-brand-glow dark:bg-brand-teal-900 dark:ring-white/10",
                    isLeft ? "lg:ml-auto" : "lg:mr-auto"
                  )}
                >
                  {item.image ? (
                    <div className="relative aspect-video w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.text}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <span className="absolute bottom-3 left-4 text-2xl font-bold text-white drop-shadow-md">
                        {item.year}
                      </span>
                    </div>
                  ) : (
                    <div className="flex h-16 items-center bg-gradient-to-br from-brand-teal-500 to-brand-teal-700 px-5">
                      <span className="text-2xl font-bold text-white">{item.year}</span>
                    </div>
                  )}
                  <p className="p-4 text-sm leading-relaxed text-brand-grey-600 dark:text-brand-grey-400">{item.text}</p>
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

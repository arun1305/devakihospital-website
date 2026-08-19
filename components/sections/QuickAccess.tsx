"use client";

import Link from "next/link";
import { LayoutGrid, CalendarCheck, HeartPulse, PhoneCall, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { StaggerGroup, RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { quickAccessLinks } from "@/lib/site-config";
import { motion } from "framer-motion";

const iconMap: Record<string, LucideIcon> = {
  "layout-grid": LayoutGrid,
  "calendar-check": CalendarCheck,
  "heart-pulse": HeartPulse,
  "phone-call": PhoneCall,
};

export function QuickAccess() {
  return (
    <section className="relative -mt-16 z-10">
      <Container>
        <StaggerGroup className="grid grid-cols-2 gap-4 rounded-3xl bg-white p-5 shadow-brand-soft ring-1 ring-brand-grey-200/60 sm:grid-cols-4 lg:p-6 dark:bg-brand-teal-900 dark:ring-white/10">
          {quickAccessLinks.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <RevealOnScroll as="li" key={item.href} direction="up" className="list-none">
                <Link href={item.href}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="flex flex-col items-center gap-3 rounded-2xl border border-transparent p-4 text-center transition-colors hover:border-brand-teal-100 hover:bg-brand-teal-50 dark:hover:border-brand-teal-800 dark:hover:bg-brand-teal-800/40"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-teal-500 to-brand-teal-700 text-white shadow-brand-soft">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-semibold text-brand-teal-900 sm:text-sm dark:text-white">{item.label}</span>
                  </motion.div>
                </Link>
              </RevealOnScroll>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}

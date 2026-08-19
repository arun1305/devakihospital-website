"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Award, CheckCircle2, Sparkles } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { getTierStyle } from "@/lib/package-tiers";
import { cn } from "@/lib/utils";
import type { HealthPackage } from "@/types";

const VISIBLE_TESTS = 6;

export function PackageTierCard({ pkg, index }: { pkg: HealthPackage; index: number }) {
  const style = getTierStyle(pkg.tier);
  const visibleInclusions = pkg.inclusions.slice(0, VISIBLE_TESTS);
  const visibleLocal = pkg.inclusionsLocal?.slice(0, VISIBLE_TESTS);
  const remaining = pkg.inclusions.length - visibleInclusions.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: Math.min(index, 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-brand-soft ring-1 transition-shadow duration-300 hover:shadow-lg",
        pkg.popular ? `${style.ring} ring-2` : "ring-brand-grey-200/70"
      )}
    >
      {pkg.popular && (
        <div className="absolute right-4 top-4 z-10 inline-flex items-center gap-1 rounded-full bg-brand-orange-500 px-3 py-1 text-xs font-bold text-white shadow-brand-soft">
          <Sparkles className="h-3.5 w-3.5" />
          Most Popular
        </div>
      )}

      <div className={cn("relative overflow-hidden bg-gradient-to-br px-6 pb-8 pt-7 text-white", style.gradient)}>
        <div className={cn("pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-2xl", style.glow)} />
        {pkg.tier && (
          <span className="relative mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur">
            <Award className="h-3.5 w-3.5" />
            {pkg.tier}
            {pkg.tierLocal && <span className="font-normal normal-case text-white/75">· {pkg.tierLocal}</span>}
          </span>
        )}
        <div className="relative flex items-baseline gap-1">
          <span className="text-sm font-semibold opacity-80">₹</span>
          <AnimatedCounter value={pkg.discountedPrice ?? pkg.price} className="text-4xl font-bold" />
        </div>
        {pkg.discountedPrice && (
          <p className="relative mt-1 text-sm text-white/70 line-through">₹{pkg.price.toLocaleString("en-IN")}</p>
        )}
        <p className="relative mt-3 text-sm leading-relaxed text-white/85">{pkg.description}</p>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <motion.ul
          className="flex flex-col gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {visibleInclusions.map((item, i) => (
            <motion.li
              key={item}
              variants={{ hidden: { opacity: 0, x: -8 }, visible: { opacity: 1, x: 0 } }}
              transition={{ duration: 0.35 }}
              className="flex items-start gap-2 text-sm text-brand-grey-600"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal-600" />
              <span>
                {item}
                {visibleLocal?.[i] && <span className="block text-xs text-brand-grey-400">{visibleLocal[i]}</span>}
              </span>
            </motion.li>
          ))}
        </motion.ul>
        {remaining > 0 && (
          <p className="text-xs font-semibold text-brand-teal-600">+ {remaining} more tests included</p>
        )}

        <Link
          href={`/health-packages/${pkg.slug}`}
          className={cn(
            "mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r px-5 py-3 text-sm font-semibold text-white shadow-brand-soft transition-transform hover:-translate-y-0.5",
            style.gradient
          )}
        >
          View Details &amp; Book
        </Link>
      </div>
    </motion.div>
  );
}

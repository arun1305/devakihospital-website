import Link from "next/link";
import { Award } from "lucide-react";
import { getTierStyle } from "@/lib/package-tiers";
import { cn } from "@/lib/utils";
import type { HealthPackage } from "@/types";

export function TierSwitcher({ siblings, activeSlug }: { siblings: HealthPackage[]; activeSlug: string }) {
  if (siblings.length < 2) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {siblings.map((sibling) => {
        const active = sibling.slug === activeSlug;
        const style = getTierStyle(sibling.tier);
        return (
          <Link
            key={sibling._id}
            href={`/health-packages/${sibling.slug}`}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all",
              active
                ? `bg-gradient-to-r text-white shadow-brand-soft ${style.gradient}`
                : "bg-white/10 text-white/80 hover:bg-white/20"
            )}
          >
            <Award className="h-3.5 w-3.5" />
            {sibling.tier ?? sibling.name}
            {sibling.tierLocal && ` (${sibling.tierLocal})`} · ₹
            {(sibling.discountedPrice ?? sibling.price).toLocaleString("en-IN")}
          </Link>
        );
      })}
    </div>
  );
}

import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { formatCurrencyINR } from "@/lib/utils";
import type { HealthPackage } from "@/types";

export function PackageCard({ pkg }: { pkg: HealthPackage }) {
  return (
    <Link href={`/health-packages/${pkg.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col gap-4 p-7">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-brand-teal-50 px-3 py-1 text-xs font-semibold text-brand-teal-700">
            {pkg.category}
          </span>
          <ArrowUpRight className="h-4 w-4 text-brand-grey-400 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand-orange-500" />
        </div>
        <h3 className="text-lg font-bold text-brand-teal-900">{pkg.name}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-brand-grey-500">{pkg.description}</p>
        <ul className="flex flex-col gap-1.5 text-xs text-brand-grey-500">
          {pkg.inclusions.slice(0, 3).map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-brand-teal-600" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-end gap-2 pt-2">
          {pkg.discountedPrice ? (
            <>
              <span className="text-2xl font-bold text-brand-teal-900">
                {formatCurrencyINR(pkg.discountedPrice)}
              </span>
              <span className="text-sm text-brand-grey-400 line-through">{formatCurrencyINR(pkg.price)}</span>
            </>
          ) : (
            <span className="text-2xl font-bold text-brand-teal-900">{formatCurrencyINR(pkg.price)}</span>
          )}
        </div>
      </Card>
    </Link>
  );
}

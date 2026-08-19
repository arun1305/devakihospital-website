import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { PackageTierCard } from "./PackageTierCard";
import { slugifyId } from "@/lib/utils";
import type { PackageCategoryGroup } from "@/types";

export function PackageCategorySection({ group }: { group: PackageCategoryGroup }) {
  const gridCols =
    group.packages.length >= 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";

  return (
    <section id={slugifyId(group.category)} className="scroll-mt-28">
      <RevealOnScroll className="mb-8 flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-brand-teal-900 dark:text-white sm:text-3xl">{group.category}</h2>
        {group.localName && <p className="text-sm text-brand-grey-500 dark:text-brand-grey-400">{group.localName}</p>}
      </RevealOnScroll>

      <div className={`grid gap-6 ${gridCols}`}>
        {group.packages.map((pkg, index) => (
          <PackageTierCard key={pkg._id} pkg={pkg} index={index} />
        ))}
      </div>
    </section>
  );
}

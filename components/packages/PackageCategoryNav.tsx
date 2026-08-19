"use client";

import { slugifyId } from "@/lib/utils";

export function PackageCategoryNav({ categories }: { categories: string[] }) {
  return (
    <div className="sticky top-[72px] z-20 -mx-5 overflow-x-auto border-b border-brand-grey-200 bg-white/90 px-5 py-3 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border sm:px-4">
      <div className="flex w-max gap-2">
        {categories.map((category) => (
          <a
            key={category}
            href={`#${slugifyId(category)}`}
            className="whitespace-nowrap rounded-full bg-brand-grey-50 px-4 py-2 text-xs font-semibold text-brand-teal-800 transition-colors hover:bg-brand-teal-50 hover:text-brand-teal-700"
          >
            {category}
          </a>
        ))}
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
import { RevealOnScroll } from "./RevealOnScroll";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  tone?: "light" | "dark";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  tone = "light",
}: SectionHeadingProps) {
  return (
    <RevealOnScroll
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]",
            tone === "dark"
              ? "border-white/25 bg-white/10 text-white"
              : "border-brand-orange-200 bg-brand-orange-50 text-brand-orange-600 dark:border-brand-orange-800/60 dark:bg-brand-orange-900/30 dark:text-brand-orange-300"
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-orange-500" />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.6rem]",
          tone === "dark" ? "text-white" : "text-brand-teal-900 dark:text-white"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("text-base leading-relaxed sm:text-lg", tone === "dark" ? "text-white/75" : "text-brand-grey-500 dark:text-brand-grey-400")}>
          {description}
        </p>
      )}
    </RevealOnScroll>
  );
}

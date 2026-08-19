import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "glass" | "solid" | "outline";
}

export function Card({ children, className, variant = "solid" }: CardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl transition-all duration-300",
        variant === "glass" && "glass-panel shadow-brand-glow",
        variant === "solid" && "bg-white shadow-brand-soft ring-1 ring-brand-grey-200/70 dark:bg-brand-teal-900 dark:ring-white/10",
        variant === "outline" && "border border-brand-grey-200 bg-white/60 dark:border-white/10 dark:bg-brand-teal-950/60",
        className
      )}
    >
      {children}
    </div>
  );
}

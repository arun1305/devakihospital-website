"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

const OPTIONS = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        aria-hidden
        className={cn(
          "h-9 w-9 rounded-full border border-brand-grey-200 bg-white dark:border-white/10 dark:bg-brand-teal-800",
          className
        )}
      />
    );
  }

  const current = OPTIONS.find((o) => o.value === theme) ?? OPTIONS[2];

  function cycleTheme() {
    const currentIndex = OPTIONS.findIndex((o) => o.value === theme);
    const next = OPTIONS[(currentIndex + 1) % OPTIONS.length] ?? OPTIONS[0];
    setTheme(next.value);
  }

  const Icon = current.icon;

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={`Theme: ${current.label}. Click to switch.`}
      title={`Theme: ${current.label}`}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full border border-brand-grey-200 bg-white text-brand-teal-700 transition-colors hover:bg-brand-grey-50 dark:border-white/10 dark:bg-brand-teal-800 dark:text-brand-teal-100 dark:hover:bg-brand-teal-700",
        className
      )}
    >
      <Icon className="h-4 w-4" aria-hidden />
    </button>
  );
}

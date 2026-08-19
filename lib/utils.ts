import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugifyId(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...options,
  }).format(new Date(date));
}

export function formatCurrencyINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function readingTime(text: string, wordsPerMinute = 200) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

import type { HealthPackage, PackageCategoryGroup } from "@/types";

export function groupPackagesByCategory(packages: HealthPackage[]): PackageCategoryGroup[] {
  const groups = new Map<string, PackageCategoryGroup>();

  for (const pkg of packages) {
    const existing = groups.get(pkg.category);
    if (existing) {
      existing.packages.push(pkg);
    } else {
      groups.set(pkg.category, {
        category: pkg.category,
        categoryOrder: pkg.categoryOrder,
        localName: pkg.localName,
        packages: [pkg],
      });
    }
  }

  const result = Array.from(groups.values());
  result.forEach((group) => group.packages.sort((a, b) => a.tierOrder - b.tierOrder));
  result.sort((a, b) => a.categoryOrder - b.categoryOrder);
  return result;
}

const API_ORIGIN = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api").replace(/\/api\/?$/, "");

/**
 * Media uploaded via the backend is returned as a relative `/uploads/...`
 * path. Resolve it against the backend's origin (not the website's) so
 * <img>/<Image> src actually points at the file.
 */
export function resolveMediaUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return `${API_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  markOnly?: boolean;
  tone?: "light" | "dark";
}

/**
 * Vector recreation of the Devaki Speciality Hospital mark: a person
 * reaching upward inside a warm circle, with a medical cross at the base.
 * Replace with the licensed brand SVG/PNG in /public/brand when available.
 */
export function Logo({ className, markOnly = false, tone = "dark" }: LogoProps) {
  const textColor = tone === "dark" ? "text-brand-teal-800" : "text-white";
  const subColor = tone === "dark" ? "text-brand-teal-600" : "text-white/80";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <svg width="44" height="44" viewBox="0 0 100 100" fill="none" aria-hidden="true" className="shrink-0">
        <circle cx="50" cy="38" r="30" fill="var(--color-orange-500)" />
        <path
          d="M50 20c-6 0-9 5-9 10 0 3 1.4 5.6 3.4 7.4L35 50c-3 3-3 8 0 11 3 3 8 3 11 0l4-4v14a6 6 0 0 0 12 0V57l4 4c3 3 8 3 11 0 3-3 3-8 0-11L66.6 37.4C68.6 35.6 70 33 70 30c0-5-3-10-9-10-3.2 0-5.8 1.4-7.5 3.6C51.8 21.4 51.8 20 50 20Z"
          fill="var(--background)"
        />
        <rect x="44.5" y="45" width="11" height="26" rx="2" fill="var(--color-teal-600)" />
        <rect x="37" y="52.5" width="26" height="11" rx="2" fill="var(--color-teal-600)" />
      </svg>
      {!markOnly && (
        <div className="leading-tight">
          <p className={cn("text-lg font-bold tracking-tight", textColor)}>
            DEVAKI <span className="font-light">SPECIALITY</span> HOSPITAL
          </p>
          <p className={cn("text-[11px] font-medium uppercase tracking-[0.18em]", subColor)}>
            Quality Healthcare with Humanity
          </p>
        </div>
      )}
    </div>
  );
}

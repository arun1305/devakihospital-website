import Image from "next/image";
import { cn } from "@/lib/utils";
import devakiMark from "@/public/brand/devaki-mark.png";

interface LogoProps {
  className?: string;
  markOnly?: boolean;
  tone?: "light" | "dark";
  /** Hides the tagline and tightens sizing for constrained spaces like the navbar. */
  compact?: boolean;
}

const MARK_ASPECT_RATIO = devakiMark.width / devakiMark.height;

/**
 * Icon mark cropped from the official Devaki Speciality Hospital logo
 * (public/brand/devaki-logo-full.png), paired with a typeset wordmark so it
 * stays legible at navbar/footer sizes. The full lockup (mark + wordmark +
 * tagline baked into one image) is only usable at larger sizes — see
 * public/brand/devaki-logo-full.png for hero/print contexts.
 */
export function Logo({ className, markOnly = false, tone = "dark", compact = false }: LogoProps) {
  const textColor = tone === "dark" ? "text-brand-teal-800" : "text-white";
  const subColor = tone === "dark" ? "text-brand-teal-600" : "text-white/80";
  const markHeight = compact ? 36 : 44;
  const markWidth = Math.round(markHeight * MARK_ASPECT_RATIO);

  return (
    <div className={cn("flex shrink-0 items-center gap-2.5", className)}>
      <Image
        src={devakiMark}
        alt="Devaki Speciality Hospital"
        width={markWidth}
        height={markHeight}
        className="shrink-0"
        priority
      />
      {!markOnly && (
        <div className="min-w-0 leading-tight">
          <p
            className={cn(
              "whitespace-nowrap font-bold tracking-tight",
              compact ? "text-sm sm:text-base" : "text-lg",
              textColor
            )}
          >
            DEVAKI <span className="font-light">SPECIALITY</span> HOSPITAL
          </p>
          {!compact && (
            <p
              className={cn(
                "whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.18em]",
                subColor
              )}
            >
              Quality Healthcare with Humanity
            </p>
          )}
        </div>
      )}
    </div>
  );
}

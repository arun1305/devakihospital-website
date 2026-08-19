import Image from "next/image";
import { cn } from "@/lib/utils";
import devakiMark from "@/public/brand/devaki-mark.png";
import wordmark from "@/public/brand/devaki-wordmark.png";
import wordmarkDark from "@/public/brand/devaki-wordmark-dark.png";
import wordmarkTagline from "@/public/brand/devaki-wordmark-tagline.png";
import wordmarkTaglineDark from "@/public/brand/devaki-wordmark-tagline-dark.png";

interface LogoProps {
  className?: string;
  markOnly?: boolean;
  tone?: "light" | "dark";
  /** Hides the tagline and tightens sizing for constrained spaces like the navbar. */
  compact?: boolean;
}

const MARK_ASPECT_RATIO = devakiMark.width / devakiMark.height;

/**
 * Exact crops of the official Devaki Speciality Hospital logo
 * (public/brand/devaki-logo-full.png) — the icon mark plus a pixel-exact
 * wordmark crop, rather than a typeset re-creation, so the brand type and
 * colors always match the source file. Each wordmark has a light-background
 * variant (teal lettering) and a dark-background variant (white lettering,
 * same orange "SPECIALITY") swapped purely via the `dark:` variant so it
 * tracks the site theme with no JS/hydration flash. `tone="light"` (used on
 * the always-dark footer) pins to the dark-background variant regardless of
 * site theme.
 */
export function Logo({ className, markOnly = false, tone = "dark", compact = false }: LogoProps) {
  const wordmarkAsset = compact ? wordmark : wordmarkTagline;
  const wordmarkDarkAsset = compact ? wordmarkDark : wordmarkTaglineDark;
  const markHeight = compact ? 40 : 44;
  const markWidth = Math.round(markHeight * MARK_ASPECT_RATIO);
  const wordmarkHeight = compact ? 24 : 34;
  const wordmarkWidth = Math.round(wordmarkHeight * (wordmarkAsset.width / wordmarkAsset.height));

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
      {!markOnly &&
        (tone === "light" ? (
          <Image
            src={wordmarkDarkAsset}
            alt="Devaki Speciality Hospital"
            width={wordmarkWidth}
            height={wordmarkHeight}
            className="shrink-0"
            priority
          />
        ) : (
          <>
            <Image
              src={wordmarkAsset}
              alt="Devaki Speciality Hospital"
              width={wordmarkWidth}
              height={wordmarkHeight}
              className="shrink-0 dark:hidden"
              priority
            />
            <Image
              src={wordmarkDarkAsset}
              alt="Devaki Speciality Hospital"
              width={wordmarkWidth}
              height={wordmarkHeight}
              className="hidden shrink-0 dark:block"
              priority
            />
          </>
        ))}
    </div>
  );
}

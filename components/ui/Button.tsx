import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "glass";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-brand-teal-600 to-brand-teal-700 text-white shadow-brand-soft hover:from-brand-teal-700 hover:to-brand-teal-800 focus-visible:outline-brand-teal-600",
  secondary:
    "bg-gradient-to-r from-brand-orange-500 to-brand-orange-600 text-white shadow-brand-soft hover:from-brand-orange-600 hover:to-brand-orange-700 focus-visible:outline-brand-orange-500",
  outline:
    "border-2 border-brand-teal-600 text-brand-teal-700 hover:bg-brand-teal-50 focus-visible:outline-brand-teal-600 dark:border-brand-teal-200 dark:text-brand-teal-100 dark:hover:bg-brand-teal-800",
  ghost: "text-brand-teal-700 hover:bg-brand-teal-50 focus-visible:outline-brand-teal-600 dark:text-brand-teal-100 dark:hover:bg-brand-teal-800",
  glass:
    "glass-panel text-brand-teal-800 hover:bg-white/80 shadow-brand-glow focus-visible:outline-white dark:text-white dark:hover:bg-white/10",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm sm:text-base",
  lg: "px-8 py-4 text-base sm:text-lg",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = BaseProps & {
  href: string;
  target?: string;
  rel?: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({ variant = "primary", size = "md", className, children, icon, ...props }: ButtonProps) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 ease-out will-change-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if ("href" in props && props.href) {
    const { href, target, rel } = props;
    return (
      <Link href={href} target={target} rel={rel} className={classes}>
        {children}
        {icon}
      </Link>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      {children}
      {icon}
    </button>
  );
}

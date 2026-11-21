import type { CSSProperties, ReactNode } from "react";

export type BadgeVariant =
  | "active"
  | "profit"
  | "loss"
  | "neutral"
  | "warning"
  | "tba"
  | "popular"
  | "long"
  | "short";

export interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  active:
    "border border-teal-200 bg-teal-100 font-semibold text-teal-700 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-300",
  profit:
    "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 font-semibold",
  loss: "bg-red-100 dark:bg-red-500/15 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/30 font-semibold",
  neutral:
    "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 font-semibold",
  warning:
    "bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30 font-semibold",
  tba: "bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30 font-bold",
  popular: "bg-amber-400 font-bold text-gray-950",
  long: "border font-semibold",
  short: "border font-semibold",
};

const directionStyles: Partial<Record<BadgeVariant, CSSProperties>> = {
  long: {
    color: "var(--trading-long-color)",
    borderColor: "var(--trading-long-color)",
    backgroundColor: "color-mix(in srgb, var(--trading-long-color) 15%, transparent)",
  },
  short: {
    color: "var(--trading-short-color)",
    borderColor: "var(--trading-short-color)",
    backgroundColor: "color-mix(in srgb, var(--trading-short-color) 15%, transparent)",
  },
};

export function Badge({ variant = "neutral", children }: BadgeProps) {
  return (
    <span
      className={`px-2.5 py-0.5 text-xs rounded-full ${variantClasses[variant]}`}
      style={directionStyles[variant]}
    >
      {children}
    </span>
  );
}

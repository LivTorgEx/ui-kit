import type { ReactNode } from "react";

export type BadgeVariant = "active" | "profit" | "loss" | "neutral" | "warning" | "tba" | "popular";

export interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  active:
    "bg-teal-100 dark:bg-teal-500/15 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-500/30 font-semibold",
  profit:
    "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 font-semibold",
  loss: "bg-red-100 dark:bg-red-500/15 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/30 font-semibold",
  neutral:
    "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 font-semibold",
  warning:
    "bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30 font-semibold",
  tba: "bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30 font-bold",
  popular: "bg-emerald-400 text-gray-900 font-bold",
};

export function Badge({ variant = "neutral", children }: BadgeProps) {
  return (
    <span className={`px-2.5 py-0.5 text-xs rounded-full ${variantClasses[variant]}`}>
      {children}
    </span>
  );
}

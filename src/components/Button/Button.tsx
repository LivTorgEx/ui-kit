import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "icon";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /**
   * Render as a full-width, left-aligned, vertically-stacked clickable block.
   * Use for list rows, table-like cells, and accordion triggers where a
   * centered inline-flex pill is the wrong shape. Size padding is dropped so
   * the consumer can set their own.
   */
  block?: boolean;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-emerald-400 text-emerald-950 shadow-none hover:bg-emerald-300",
  secondary:
    "border border-gray-300 bg-white text-gray-700 hover:border-emerald-400 hover:text-emerald-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:text-emerald-300",
  ghost:
    "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white",
  danger: "bg-rose-400 text-white hover:bg-rose-300",
  icon: "rounded-md border border-gray-300 bg-white text-gray-700 hover:border-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-500 dark:hover:bg-gray-700",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-1.5 text-xs",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

const iconSizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 w-8 text-xs p-0",
  md: "h-9 w-9 text-sm p-0",
  lg: "h-10 w-10 text-base p-0",
};

const baseLayoutClasses = "inline-flex items-center justify-center font-semibold rounded-md";
const blockLayoutClasses = "flex w-full flex-col items-stretch text-left font-normal rounded-md";

export function Button({
  variant = "primary",
  size = "md",
  block = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  let resolvedSizeClasses: string;
  if (block) {
    // Block layout drops the preset px/py so consumers can pick their own padding.
    resolvedSizeClasses = "";
  } else if (variant === "icon") {
    resolvedSizeClasses = iconSizeClasses[size];
  } else {
    resolvedSizeClasses = sizeClasses[size];
  }

  const layoutClasses = block ? blockLayoutClasses : baseLayoutClasses;

  return (
    <button
      {...props}
      className={cn(
        layoutClasses,
        "cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses[variant],
        resolvedSizeClasses,
        className,
      )}
    >
      {children}
    </button>
  );
}

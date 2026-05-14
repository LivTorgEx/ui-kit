import type { ButtonHTMLAttributes, ReactNode } from "react";

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
  primary: "bg-teal-500 hover:bg-teal-600 text-white shadow-sm shadow-teal-500/20",
  secondary:
    "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-transparent hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400",
  ghost: "text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-500/10",
  danger: "bg-red-500 hover:bg-red-600 text-white",
  icon: "border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-500 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg",
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

const baseLayoutClasses = "inline-flex items-center justify-center font-semibold rounded-xl";
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
      className={`${layoutClasses} cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${resolvedSizeClasses} ${className}`}
    >
      {children}
    </button>
  );
}

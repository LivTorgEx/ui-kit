import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const buttonVariants = cva(
  "cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-emerald-400 text-emerald-950 shadow-none hover:bg-emerald-300",
        secondary:
          "border border-gray-300 bg-white text-gray-700 hover:border-emerald-400 hover:text-emerald-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:text-emerald-300",
        ghost:
          "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white",
        text: "bg-transparent text-gray-400 hover:bg-transparent hover:text-gray-100 focus-visible:ring-1 focus-visible:ring-teal-500",
        danger: "bg-rose-400 text-white hover:bg-rose-300",
        icon: "border border-gray-300 bg-white text-gray-700 hover:border-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-500 dark:hover:bg-gray-700",
        "icon-ghost":
          "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white",
        choice: "bg-black text-gray-400 hover:bg-gray-800 hover:text-gray-100 dark:bg-black",
        "choice-selected":
          "bg-gray-700 text-white hover:bg-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white",
        tab: "border-b-2 border-transparent bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white",
        "tab-selected":
          "border-b-2 border-emerald-400 bg-transparent text-white hover:bg-transparent hover:text-white",
      },
      size: {
        xs: "px-2 py-1 text-xs leading-4",
        inline:
          "h-auto w-full min-w-0 justify-start gap-0 overflow-hidden p-0 font-mono text-[11px] font-normal uppercase leading-none tracking-[0.08em] text-ellipsis whitespace-nowrap",
        sm: "px-4 py-1.5 text-xs",
        md: "px-6 py-2.5 text-sm",
        lg: "px-8 py-3.5 text-base",
      },
      rounded: {
        md: "rounded-md",
        none: "rounded-none",
      },
      block: {
        true: "flex w-full flex-col items-stretch text-left font-normal",
        false: "inline-flex items-center justify-center font-semibold",
      },
    },
    compoundVariants: [
      {
        variant: ["icon", "icon-ghost"],
        size: "xs",
        block: false,
        className: "h-7 w-7 p-0 text-xs",
      },
      {
        variant: ["icon", "icon-ghost"],
        size: "sm",
        block: false,
        className: "h-8 w-8 p-0 text-xs",
      },
      {
        variant: ["icon", "icon-ghost"],
        size: "md",
        block: false,
        className: "h-9 w-9 p-0 text-sm",
      },
      {
        variant: ["icon", "icon-ghost"],
        size: "lg",
        block: false,
        className: "h-10 w-10 p-0 text-base",
      },
      {
        variant: "text",
        size: "xs",
        block: false,
        className: "h-auto w-fit justify-start gap-1 p-0 text-xs font-normal",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      rounded: "md",
      block: false,
    },
  },
);

export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;
export type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>;
export type ButtonRadius = NonNullable<VariantProps<typeof buttonVariants>["rounded"]>;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: ButtonRadius;
  /** Render as a full-width, left-aligned, vertically stacked clickable block. */
  block?: boolean;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  rounded = "md",
  block = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        buttonVariants({ variant, size: block ? null : size, rounded, block }),
        className,
      )}
    >
      {children}
    </button>
  );
}

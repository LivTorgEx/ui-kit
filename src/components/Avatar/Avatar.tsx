import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export type AvatarSize = "sm" | "md" | "lg" | "xl";
export type AvatarShape = "circle" | "square";
export type AvatarVariant = "neutral" | "primary";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  size?: AvatarSize;
  shape?: AvatarShape;
  variant?: AvatarVariant;
}

const sizeClasses: Record<AvatarSize, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-9 w-9 text-xs",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-xl",
};

const shapeClasses: Record<AvatarShape, string> = {
  circle: "rounded-full",
  square: "rounded-md",
};

const variantClasses: Record<AvatarVariant, string> = {
  neutral: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-white",
  primary: "border-2 border-white bg-teal-100 text-teal-700 dark:bg-blue-600 dark:text-white",
};

export function Avatar({
  children,
  size = "md",
  shape = "circle",
  variant = "neutral",
  className,
  ...props
}: AvatarProps) {
  return (
    <span
      {...props}
      className={cn(
        "inline-flex shrink-0 items-center justify-center font-semibold",
        sizeClasses[size],
        shapeClasses[shape],
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

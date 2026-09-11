import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export type TextElement = "p" | "span" | "div" | "label" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type TextVariant =
  | "body"
  | "body-sm"
  | "caption"
  | "label"
  | "title"
  | "heading"
  | "display"
  | "metric";

export type TextTone =
  | "default"
  | "muted"
  | "subtle"
  | "inverse"
  | "positive"
  | "negative"
  | "warning";

export type TextWeight = "normal" | "medium" | "semibold" | "bold";
export type TextAlign = "left" | "center" | "right";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: TextElement;
  variant?: TextVariant;
  tone?: TextTone;
  weight?: TextWeight;
  align?: TextAlign;
  truncate?: boolean;
  children: ReactNode;
}

const variantClasses: Record<TextVariant, string> = {
  body: "text-base",
  "body-sm": "text-sm",
  caption: "text-xs",
  label: "text-xs uppercase tracking-[0.12em]",
  title: "text-lg",
  heading: "text-xl",
  display: "text-4xl tracking-tight",
  metric: "text-base tabular-nums",
};

const toneClasses: Record<TextTone, string> = {
  default: "text-gray-900 dark:text-white",
  muted: "text-gray-500 dark:text-gray-400",
  subtle: "text-gray-500 dark:text-gray-600",
  inverse: "text-white",
  positive: "text-emerald-600 dark:text-emerald-400",
  negative: "text-rose-600 dark:text-rose-300",
  warning: "text-amber-600 dark:text-amber-400",
};

const weightClasses: Record<TextWeight, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const alignClasses: Record<TextAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function Text({
  as: Component = "p",
  variant = "body",
  tone = "default",
  weight = "normal",
  align = "left",
  truncate = false,
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Component
      {...props}
      className={cn(
        variantClasses[variant],
        toneClasses[tone],
        weightClasses[weight],
        alignClasses[align],
        truncate && "truncate",
        className,
      )}
    >
      {children}
    </Component>
  );
}

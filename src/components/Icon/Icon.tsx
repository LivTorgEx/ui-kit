import type { ComponentType, SVGProps } from "react";
import { cn } from "../../utils/cn";

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;
export type IconSize = "sm" | "md" | "lg";
export type IconTone =
  | "default"
  | "muted"
  | "subtle"
  | "inverse"
  | "positive"
  | "negative"
  | "warning";

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "color"> {
  icon: IconComponent;
  size?: IconSize;
  tone?: IconTone;
}

const sizeClasses: Record<IconSize, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const toneClasses: Record<IconTone, string> = {
  default: "text-gray-700 dark:text-gray-200",
  muted: "text-gray-500 dark:text-gray-400",
  subtle: "text-gray-400 dark:text-gray-600",
  inverse: "text-white",
  positive: "text-emerald-600 dark:text-emerald-400",
  negative: "text-rose-600 dark:text-rose-400",
  warning: "text-amber-600 dark:text-amber-400",
};

export function Icon({
  icon: IconComponent,
  size = "md",
  tone = "default",
  className,
  ...props
}: IconProps) {
  return (
    <IconComponent
      {...props}
      aria-hidden={props["aria-label"] ? undefined : true}
      className={cn("inline-block shrink-0", sizeClasses[size], toneClasses[tone], className)}
    />
  );
}

import type { ReactNode } from "react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { Badge } from "../Badge/Badge";
import type { BadgeVariant } from "../Badge/Badge";
import { Card } from "../Card/Card";
import { cn } from "../../utils/cn";

const strategyCardVariants = cva("flex flex-col", {
  variants: {
    /**
     * `default`  — standard card, equal padding from Card base
     * `compact`  — tighter layout, suitable for dense grids
     * `featured` — elevated appearance with teal accent border
     */
    variant: {
      default: "",
      compact: "gap-1",
      featured: "ring-2 ring-teal-500/60 dark:ring-teal-400/50 shadow-lg shadow-teal-500/10",
    },
    /** Controls the size of the title text */
    size: {
      sm: "[&_h3]:text-xs",
      md: "[&_h3]:text-sm",
      lg: "[&_h3]:text-base",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export type StrategyCardVariant = "default" | "compact" | "featured";
export type StrategyCardSize = "sm" | "md" | "lg";

export interface StrategyCardProps extends VariantProps<typeof strategyCardVariants> {
  name: string;
  description?: string;
  meta?: string;
  badgeText?: string;
  badgeVariant?: BadgeVariant;
  action?: ReactNode;
  className?: string;
}

export function StrategyCard({
  name,
  description,
  meta,
  badgeText,
  badgeVariant = "active",
  action,
  variant,
  size,
  className,
}: StrategyCardProps) {
  return (
    <Card className={cn(strategyCardVariants({ variant, size }), className)}>
      <div className="flex items-start justify-between gap-3 mb-1">
        <h3 className="font-semibold text-gray-900 dark:text-white leading-snug">{name}</h3>
        {badgeText && <Badge variant={badgeVariant}>{badgeText}</Badge>}
      </div>
      {meta && <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">{meta}</p>}
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 flex-1">
          {description}
        </p>
      )}
      {action && <div className="mt-auto pt-4">{action}</div>}
    </Card>
  );
}

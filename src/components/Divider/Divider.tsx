import type { ComponentPropsWithoutRef } from "react";

import { cn } from "../../utils/cn";

export type DividerSpacing = "none" | "sm" | "md";

export interface DividerProps extends Omit<ComponentPropsWithoutRef<"hr">, "color"> {
  spacing?: DividerSpacing;
}

const spacingClasses: Record<DividerSpacing, string> = {
  none: "",
  sm: "my-3",
  md: "my-4",
};

export function Divider({ spacing = "none", className, ...props }: DividerProps) {
  return (
    <hr
      {...props}
      className={cn(
        "w-full border-0 border-t",
        "border-gray-200 dark:border-gray-700",
        spacingClasses[spacing],
        className,
      )}
    />
  );
}

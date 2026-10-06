import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  ariaLabel: string;
  fullWidth?: boolean;
}

export function Tabs({ children, ariaLabel, fullWidth = true, className, ...props }: TabsProps) {
  return (
    <div
      {...props}
      role="tablist"
      aria-label={ariaLabel}
      className={cn("flex min-w-0 gap-1 overflow-x-auto", fullWidth && "w-full", className)}
    >
      {children}
    </div>
  );
}

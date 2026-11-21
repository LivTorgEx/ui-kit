import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

import { cn } from "../../utils/cn";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="checkbox"
      className={cn(
        "h-4 w-4 shrink-0 cursor-pointer rounded border-gray-300 accent-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600",
        className,
      )}
      {...props}
    />
  ),
);

Checkbox.displayName = "Checkbox";

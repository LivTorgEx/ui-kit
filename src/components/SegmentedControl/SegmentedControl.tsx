import type { ReactNode } from "react";
import { Button, type ButtonSize } from "../Button/Button";
import { cn } from "../../utils/cn";

export interface SegmentedControlOption<Value extends string = string> {
  value: Value;
  label: ReactNode;
}

export interface SegmentedControlProps<Value extends string = string> {
  options: readonly SegmentedControlOption<Value>[];
  value: Value;
  onChange: (value: Value) => void;
  size?: ButtonSize;
  variant?: "segmented" | "tabs";
  ariaLabel?: string;
  className?: string;
}

export function SegmentedControl<Value extends string = string>({
  options,
  value,
  onChange,
  size = "sm",
  variant = "segmented",
  ariaLabel,
  className,
}: SegmentedControlProps<Value>) {
  return (
    <div
      className={cn(
        variant === "tabs"
          ? "inline-flex max-w-full gap-1 overflow-x-auto rounded-none border-0 bg-transparent p-0 dark:bg-transparent"
          : "inline-flex rounded-md border border-gray-300 bg-gray-50 p-1 dark:border-gray-700 dark:bg-gray-900",
        className,
      )}
      role="tablist"
      aria-label={ariaLabel}
    >
      {options.map((option) => (
        <Button
          key={option.value}
          variant={variant === "tabs" ? "ghost" : value === option.value ? "secondary" : "ghost"}
          size={size}
          type="button"
          role="tab"
          aria-selected={value === option.value}
          className={
            variant === "tabs"
              ? value === option.value
                ? "rounded-none border-b-2 border-emerald-400 bg-transparent text-white hover:bg-transparent hover:text-white"
                : "rounded-none border-b-2 border-transparent bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white"
              : undefined
          }
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}

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
  ariaLabel?: string;
  className?: string;
}

export function SegmentedControl<Value extends string = string>({
  options,
  value,
  onChange,
  size = "sm",
  ariaLabel,
  className,
}: SegmentedControlProps<Value>) {
  return (
    <div
      className={cn(
        "inline-flex rounded-md border border-gray-300 bg-gray-50 p-1 dark:border-gray-700 dark:bg-gray-900",
        className,
      )}
      role="tablist"
      aria-label={ariaLabel}
    >
      {options.map((option) => (
        <Button
          key={option.value}
          variant={value === option.value ? "secondary" : "ghost"}
          size={size}
          type="button"
          role="tab"
          aria-selected={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}

"use client";

import { useState, type ReactElement, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover/Popover";

export type DropdownMenuOption<Value extends string> = {
  value: Value;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
};

export type DropdownMenuProps<Value extends string> = {
  value: Value;
  options: readonly DropdownMenuOption<Value>[];
  onValueChange: (value: Value) => void;
  renderTrigger: (state: { open: boolean }) => ReactElement;
  align?: "start" | "center" | "end";
  size?: "default" | "compact";
  menuLabel?: string;
  contentClassName?: string;
};

const contentSizeClasses = {
  default: "w-56 rounded-xl",
  compact: "w-48 rounded-lg",
} as const;

const optionSizeClasses = {
  default: "gap-2 px-3 py-2 text-sm",
  compact: "gap-2 px-3 py-2 text-xs",
} as const;

export function DropdownMenu<Value extends string>({
  value,
  options,
  onValueChange,
  renderTrigger,
  align = "start",
  size = "default",
  menuLabel,
  contentClassName,
}: DropdownMenuProps<Value>) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{renderTrigger({ open })}</PopoverTrigger>
      <PopoverContent
        align={align}
        className={cn(
          "max-w-[calc(100vw-1rem)] border-gray-200 bg-white p-1 text-gray-900 shadow-xl dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100",
          contentSizeClasses[size],
          contentClassName,
        )}
      >
        <div className="space-y-1" role="menu" aria-label={menuLabel}>
          {options.map((option) => {
            const selected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                disabled={option.disabled}
                className={cn(
                  "flex w-full cursor-pointer items-start rounded-md border-l-2 text-left outline-none transition-colors",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  optionSizeClasses[size],
                  selected
                    ? "border-emerald-500 bg-emerald-50 text-gray-900 dark:border-emerald-400 dark:bg-gray-900 dark:text-gray-100"
                    : "border-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white",
                )}
                onClick={() => {
                  if (option.disabled) return;
                  onValueChange(option.value);
                  setOpen(false);
                }}
              >
                <span className="flex min-w-0 flex-col items-start">
                  <span className="font-semibold leading-4">{option.label}</span>
                  {option.description ? (
                    <span className="mt-0.5 text-[10px] font-normal leading-4 text-gray-500 dark:text-gray-500">
                      {option.description}
                    </span>
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

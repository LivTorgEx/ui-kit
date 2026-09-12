import type { SelectHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: boolean;
  helperText?: string;
  variant?: "default" | "compact";
}

export function Select({
  label,
  options,
  error = false,
  helperText,
  variant = "default",
  className = "",
  id,
  ...props
}: SelectProps) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className={cn(
            "text-sm font-medium",
            error ? "text-rose-400" : "text-gray-700 dark:text-white",
          )}
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        {...props}
        className={cn(
          "w-full rounded-md border bg-white px-3 py-2.5 text-sm text-gray-900 transition-all focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white",
          error
            ? "border-rose-400 focus:border-rose-400 focus:ring-rose-400/20"
            : "border-gray-300 focus:border-emerald-400 focus:ring-emerald-400/20 dark:border-gray-700",
          variant === "compact" &&
            "w-auto min-w-0 border-transparent bg-transparent px-0 py-0 dark:bg-transparent focus:ring-0",
          className,
        )}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
      {helperText && (
        <p className={cn("text-xs", error ? "text-rose-400" : "text-gray-500 dark:text-gray-400")}>
          {helperText}
        </p>
      )}
    </div>
  );
}

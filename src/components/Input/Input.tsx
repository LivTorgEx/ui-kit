import type { InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  helperText?: string;
}

export function Input({
  label,
  error = false,
  helperText,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            "text-sm font-medium",
            error ? "text-rose-400" : "text-gray-700 dark:text-white",
          )}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        {...props}
        className={cn(
          "w-full rounded-md border bg-white px-3 py-2.5 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400",
          error
            ? "border-rose-400 focus:border-rose-400 focus:ring-rose-400/20"
            : "border-gray-300 focus:border-emerald-400 focus:ring-emerald-400/20 dark:border-gray-700",
          className,
        )}
      />
      {helperText && (
        <p className={cn("text-xs", error ? "text-rose-400" : "text-gray-500 dark:text-gray-400")}>
          {helperText}
        </p>
      )}
    </div>
  );
}

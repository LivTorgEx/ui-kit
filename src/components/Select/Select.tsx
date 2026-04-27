import type { SelectHTMLAttributes } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: boolean;
  helperText?: string;
}

export function Select({
  label,
  options,
  error = false,
  helperText,
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
          className={`text-xs font-medium uppercase tracking-wider ${
            error ? "text-red-500" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        {...props}
        className={`w-full rounded-xl border px-3 py-2.5 text-sm bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
          error
            ? "border-red-400 focus:ring-red-500/30 focus:border-red-500"
            : "border-gray-300 dark:border-gray-700 focus:ring-teal-500/50 focus:border-teal-500"
        } ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {helperText && (
        <p className={`text-xs ${error ? "text-red-500" : "text-gray-500 dark:text-gray-400"}`}>
          {helperText}
        </p>
      )}
    </div>
  );
}

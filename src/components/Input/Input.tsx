import type { InputHTMLAttributes } from "react";

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
          className={`text-xs font-medium uppercase tracking-wider ${
            error ? "text-red-500" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        {...props}
        className={`w-full rounded-xl border px-3 py-2.5 text-sm bg-white dark:bg-gray-950 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 transition-all ${
          error
            ? "border-red-400 focus:ring-red-500/30 focus:border-red-500"
            : "border-gray-300 dark:border-gray-700 focus:ring-teal-500/50 focus:border-teal-500"
        } ${className}`}
      />
      {helperText && (
        <p className={`text-xs ${error ? "text-red-500" : "text-gray-500 dark:text-gray-400"}`}>
          {helperText}
        </p>
      )}
    </div>
  );
}

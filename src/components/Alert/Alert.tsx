import type { ReactNode } from "react";

export type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
}

const variantConfig: Record<AlertVariant, { wrapperClass: string; iconPath: string }> = {
  info: {
    wrapperClass:
      "border-teal-200 dark:border-teal-500/20 bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300",
    iconPath:
      "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",
  },
  success: {
    wrapperClass:
      "border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    iconPath:
      "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
  },
  warning: {
    wrapperClass:
      "border-amber-200 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300",
    iconPath:
      "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",
  },
  error: {
    wrapperClass:
      "border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-300",
    iconPath:
      "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
  },
};

export function Alert({ variant = "info", title, children }: AlertProps) {
  const { wrapperClass, iconPath } = variantConfig[variant];
  return (
    <div className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${wrapperClass}`}>
      <svg className="w-4 h-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d={iconPath} clipRule="evenodd" />
      </svg>
      <span>
        {title && <strong>{title}: </strong>}
        {children}
      </span>
    </div>
  );
}

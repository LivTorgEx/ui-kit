import { cn } from "../../utils/cn";
import type { ReactNode } from "react";

export type FieldSize = "md" | "sm";
export type FieldVariant = "default" | "trading";

export const inputBase =
  "w-full rounded-md border border-gray-700 bg-gray-800 text-white placeholder:text-gray-400 transition-colors focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 disabled:cursor-not-allowed disabled:opacity-50";

export const inputSize: Record<FieldSize, string> = {
  md: "px-4 py-3",
  sm: "px-3 py-2.5 text-sm",
};

const tradingInputSize: Record<FieldSize, string> = {
  md: "px-3 py-2",
  sm: "px-2 py-1.5 text-sm",
};

export const labelSize: Record<FieldSize, string> = {
  md: "block text-sm font-medium text-white mb-2",
  sm: "block text-xs font-medium text-gray-200 mb-1.5",
};

const fieldVariantClasses: Record<FieldVariant, string> = {
  default: inputBase,
  trading:
    "w-full rounded-none border border-gray-700 bg-black text-gray-100 placeholder:text-gray-500 transition-colors focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-black",
};

const tradingLabelSize: Record<FieldSize, string> = {
  md: "block text-sm font-medium text-gray-400 mb-2",
  sm: "block text-xs font-medium text-gray-400 mb-1.5",
};

export interface FieldWrapperProps {
  label?: ReactNode;
  labelId?: string;
  error?: string;
  hint?: string;
  fieldSize?: FieldSize;
  variant?: FieldVariant;
  children: ReactNode;
  className?: string;
}

export function FieldWrapper({
  label,
  labelId,
  error,
  hint,
  fieldSize = "md",
  variant = "default",
  children,
  className,
}: FieldWrapperProps) {
  return (
    <div className={className}>
      {label && (
        <label
          id={labelId}
          className={variant === "trading" ? tradingLabelSize[fieldSize] : labelSize[fieldSize]}
        >
          {label}
        </label>
      )}
      {children}
      {error && <p className="mt-1.5 text-xs text-rose-300">{error}</p>}
      {!error && hint && <p className="mt-1.5 text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

export function inputCn(
  fieldSize: FieldSize,
  error: string | undefined,
  extra?: string,
  className?: string,
  variant: FieldVariant = "default",
  grouped = false,
) {
  const groupedClasses =
    grouped && variant === "trading"
      ? "border-transparent bg-transparent focus:border-transparent focus:ring-0"
      : undefined;
  return cn(
    fieldVariantClasses[variant],
    variant === "trading" ? tradingInputSize[fieldSize] : inputSize[fieldSize],
    error && "border-rose-400 focus:border-rose-400 focus:ring-rose-400/20",
    extra,
    groupedClasses,
    className,
  );
}

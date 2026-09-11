import { cn } from "../../utils/cn";
import type { ReactNode } from "react";

export type FieldSize = "md" | "sm";

export const inputBase =
  "w-full rounded-md border border-gray-700 bg-gray-800 text-white placeholder:text-gray-400 transition-colors focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 disabled:cursor-not-allowed disabled:opacity-50";

export const inputSize: Record<FieldSize, string> = {
  md: "px-4 py-3 rounded-md",
  sm: "px-3 py-2.5 rounded-md text-sm",
};

export const labelSize: Record<FieldSize, string> = {
  md: "block text-sm font-medium text-white mb-2",
  sm: "block text-xs font-medium text-gray-200 mb-1.5",
};

export interface FieldWrapperProps {
  label?: ReactNode;
  error?: string;
  hint?: string;
  fieldSize?: FieldSize;
  children: ReactNode;
  className?: string;
}

export function FieldWrapper({
  label,
  error,
  hint,
  fieldSize = "md",
  children,
  className,
}: FieldWrapperProps) {
  return (
    <div className={className}>
      {label && <label className={labelSize[fieldSize]}>{label}</label>}
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
) {
  return cn(
    inputBase,
    inputSize[fieldSize],
    error && "border-rose-400 focus:border-rose-400 focus:ring-rose-400/20",
    extra,
    className,
  );
}

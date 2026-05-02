import { cn } from "../../utils/cn";
import type { ReactNode } from "react";

export type FieldSize = "md" | "sm";

export const inputBase =
  "w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

export const inputSize: Record<FieldSize, string> = {
  md: "px-4 py-3 rounded-lg",
  sm: "px-3 py-2.5 rounded-lg text-sm",
};

export const labelSize: Record<FieldSize, string> = {
  md: "block text-sm text-gray-400 mb-1",
  sm: "block text-xs text-gray-400 mb-1",
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
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      {!error && hint && <p className="text-gray-500 text-xs mt-1">{hint}</p>}
    </div>
  );
}

export function inputCn(
  fieldSize: FieldSize,
  error: string | undefined,
  extra?: string,
  className?: string,
) {
  return cn(inputBase, inputSize[fieldSize], error && "border-red-500", extra, className);
}

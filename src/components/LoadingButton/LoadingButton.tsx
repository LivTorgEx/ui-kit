import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Spinner } from "../Spinner/Spinner";
import { cn } from "../../utils/cn";

export type LoadingButtonVariant = "primary" | "secondary" | "danger" | "success" | "ghost";

export interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: LoadingButtonVariant;
  children: ReactNode;
}

const variantClasses: Record<LoadingButtonVariant, string> = {
  primary: "bg-teal-500 hover:bg-teal-600 text-white",
  secondary: "border border-gray-600 text-gray-300 hover:border-teal-400 hover:text-teal-400",
  danger: "bg-red-600 hover:bg-red-500 text-white",
  success: "bg-green-600 hover:bg-green-500 text-white",
  ghost: "text-gray-400 hover:text-white hover:bg-gray-800",
};

export function LoadingButton({
  loading,
  variant = "primary",
  disabled,
  children,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses[variant],
        className,
      )}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  );
}

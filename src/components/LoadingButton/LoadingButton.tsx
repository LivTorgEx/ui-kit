import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Spinner } from "../Spinner/Spinner";
import { Button } from "../Button/Button";
import { cn } from "../../utils/cn";

export type LoadingButtonVariant = "primary" | "secondary" | "danger" | "success" | "ghost";

export interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: LoadingButtonVariant;
  children: ReactNode;
}

const variantToButtonVariant: Record<
  LoadingButtonVariant,
  "primary" | "secondary" | "danger" | "ghost"
> = {
  primary: "primary",
  secondary: "secondary",
  danger: "danger",
  success: "primary",
  ghost: "ghost",
};

const extraClasses: Record<LoadingButtonVariant, string> = {
  primary: "",
  secondary: "",
  danger: "",
  success: "bg-green-600 hover:bg-green-500 shadow-sm shadow-green-500/20",
  ghost: "",
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
    <Button
      {...props}
      variant={variantToButtonVariant[variant]}
      disabled={disabled || loading}
      className={cn("gap-2", extraClasses[variant], className)}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </Button>
  );
}

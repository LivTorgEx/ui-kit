"use client";

import { useEffect, useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Button, type ButtonRadius, type ButtonSize } from "../Button/Button";
import { cn } from "../../utils/cn";

export type LoadingButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "ghost"
  | "icon";

export interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: LoadingButtonVariant;
  size?: ButtonSize;
  rounded?: ButtonRadius;
  children: ReactNode;
}

const variantToButtonVariant: Record<
  LoadingButtonVariant,
  "primary" | "secondary" | "danger" | "ghost" | "icon"
> = {
  primary: "primary",
  secondary: "secondary",
  danger: "danger",
  success: "primary",
  ghost: "ghost",
  icon: "icon",
};

const extraClasses: Record<LoadingButtonVariant, string> = {
  primary: "",
  secondary: "",
  danger: "",
  success: "bg-emerald-400 text-emerald-950 shadow-none hover:bg-emerald-300",
  ghost: "",
  icon: "",
};

export function LoadingButton({
  loading,
  variant = "primary",
  size = "md",
  rounded = "md",
  disabled,
  children,
  className,
  ...props
}: LoadingButtonProps) {
  const sweepRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!loading || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const sweep = sweepRef.current;
    if (!sweep) return;

    const animation = sweep.animate(
      [{ backgroundPosition: "100% 0%" }, { backgroundPosition: "0% 0%" }],
      { duration: 1200, easing: "linear", iterations: Infinity },
    );
    return () => animation.cancel();
  }, [loading]);

  return (
    <Button
      {...props}
      variant={variantToButtonVariant[variant]}
      size={size}
      rounded={rounded}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        "gap-2",
        loading && "relative disabled:opacity-100",
        extraClasses[variant],
        className,
      )}
    >
      {loading ? (
        <span
          ref={sweepRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-r from-transparent via-white/45 to-transparent"
          style={{ backgroundSize: "200% 100%" }}
        />
      ) : null}
      <span className="relative z-10">{children}</span>
    </Button>
  );
}

import { cva } from "class-variance-authority";
import type { ReactNode } from "react";

import type { FieldSize, FieldVariant } from "./_base";

const fieldLabelVariants = cva("block font-medium", {
  variants: {
    fieldSize: {
      md: "mb-2 text-sm",
      sm: "mb-1.5 text-xs",
      xs: "mb-1 text-[10px]",
    },
    variant: {
      default: "text-white",
      trading: "text-gray-600 dark:text-gray-400",
    },
  },
  defaultVariants: {
    fieldSize: "md",
    variant: "default",
  },
});

const fieldMessageVariants = cva("mt-1.5 text-xs", {
  variants: {
    tone: {
      error: "text-rose-300",
      hint: "text-gray-400",
    },
  },
});

const fieldWrapperVariants = cva("", {
  variants: {
    inputGroup: {
      true: "h-full min-w-0",
      false: "",
    },
    control: {
      input: "",
      select: "",
    },
  },
  compoundVariants: [
    {
      inputGroup: true,
      control: "input",
      className: "flex-1",
    },
    {
      inputGroup: true,
      control: "select",
      className: "w-max shrink-0 flex-none",
    },
  ],
  defaultVariants: {
    inputGroup: false,
    control: "input",
  },
});

type FieldWrapperControl = "input" | "select";

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
        <label id={labelId} className={fieldLabelVariants({ fieldSize, variant })}>
          {label}
        </label>
      )}
      {children}
      {error && <p className={fieldMessageVariants({ tone: "error" })}>{error}</p>}
      {!error && hint && <p className={fieldMessageVariants({ tone: "hint" })}>{hint}</p>}
    </div>
  );
}

export function fieldWrapperClassName(inputGroup: boolean, control: FieldWrapperControl = "input") {
  return fieldWrapperVariants({ inputGroup, control });
}

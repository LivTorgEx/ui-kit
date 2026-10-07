import { forwardRef } from "react";
import type { TextareaHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";
import { FieldWrapper, inputCn } from "./_base";
import type { FieldSize, FieldVariant } from "./_base";

export interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  error?: string;
  hint?: string;
  fieldSize?: FieldSize;
  variant?: FieldVariant;
  grouped?: boolean;
  resize?: "none" | "vertical";
  monospace?: boolean;
  wrapperClassName?: string;
}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  (
    {
      label,
      error,
      hint,
      fieldSize = "md",
      variant = "default",
      grouped = false,
      resize = "none",
      monospace = false,
      wrapperClassName,
      className,
      ...props
    },
    ref,
  ) => (
    <FieldWrapper
      label={label}
      error={error}
      hint={hint}
      fieldSize={fieldSize}
      variant={variant}
      className={wrapperClassName}
    >
      <textarea
        ref={ref}
        className={inputCn(
          fieldSize,
          error,
          cn(resize === "vertical" ? "resize-y" : "resize-none", monospace && "font-mono"),
          className,
          variant,
          grouped,
        )}
        {...props}
      />
    </FieldWrapper>
  ),
);
TextareaField.displayName = "TextareaField";

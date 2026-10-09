import { forwardRef } from "react";
import type { TextareaHTMLAttributes, ReactNode } from "react";
import { FieldWrapper } from "./FieldWrapper";
import { inputControlClassName } from "./_base";
import type { FieldSize, FieldVariant } from "./_base";

export interface TextareaFieldProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "className"
> {
  label?: ReactNode;
  error?: string;
  hint?: string;
  fieldSize?: FieldSize;
  variant?: FieldVariant;
  resize?: "none" | "vertical";
  monospace?: boolean;
}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  (
    {
      label,
      error,
      hint,
      fieldSize = "md",
      variant = "default",
      resize = "none",
      monospace = false,
      ...props
    },
    ref,
  ) => (
    <FieldWrapper label={label} error={error} hint={hint} fieldSize={fieldSize} variant={variant}>
      <textarea
        ref={ref}
        className={inputControlClassName({
          fieldSize,
          error,
          variant,
          control: "textarea",
          resize,
          monospace,
        })}
        {...props}
      />
    </FieldWrapper>
  ),
);
TextareaField.displayName = "TextareaField";

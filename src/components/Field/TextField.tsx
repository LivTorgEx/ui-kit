import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { FieldWrapper, inputCn } from "./_base";
import type { FieldSize, FieldVariant } from "./_base";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  error?: string;
  hint?: string;
  fieldSize?: FieldSize;
  variant?: FieldVariant;
  grouped?: boolean;
  wrapperClassName?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      error,
      hint,
      fieldSize = "md",
      variant = "default",
      grouped = false,
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
      <input
        ref={ref}
        className={inputCn(fieldSize, error, undefined, className, variant, grouped)}
        {...props}
      />
    </FieldWrapper>
  ),
);
TextField.displayName = "TextField";

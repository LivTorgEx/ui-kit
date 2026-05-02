import { forwardRef } from "react";
import type { TextareaHTMLAttributes, ReactNode } from "react";
import { FieldWrapper, inputCn } from "./_base";
import type { FieldSize } from "./_base";

export interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  error?: string;
  hint?: string;
  fieldSize?: FieldSize;
  wrapperClassName?: string;
}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, error, hint, fieldSize = "md", wrapperClassName, className, ...props }, ref) => (
    <FieldWrapper
      label={label}
      error={error}
      hint={hint}
      fieldSize={fieldSize}
      className={wrapperClassName}
    >
      <textarea
        ref={ref}
        className={inputCn(fieldSize, error, "resize-none", className)}
        {...props}
      />
    </FieldWrapper>
  ),
);
TextareaField.displayName = "TextareaField";

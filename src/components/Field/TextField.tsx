import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { FieldWrapper, inputCn } from "./_base";
import type { FieldSize } from "./_base";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  error?: string;
  hint?: string;
  fieldSize?: FieldSize;
  wrapperClassName?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, hint, fieldSize = "md", wrapperClassName, className, ...props }, ref) => (
    <FieldWrapper
      label={label}
      error={error}
      hint={hint}
      fieldSize={fieldSize}
      className={wrapperClassName}
    >
      <input ref={ref} className={inputCn(fieldSize, error, undefined, className)} {...props} />
    </FieldWrapper>
  ),
);
TextField.displayName = "TextField";

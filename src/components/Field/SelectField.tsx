import { forwardRef } from "react";
import type { SelectHTMLAttributes, ReactNode } from "react";
import { FieldWrapper, inputCn } from "./_base";
import type { FieldSize, FieldVariant } from "./_base";

export interface SelectFieldOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: ReactNode;
  error?: string;
  hint?: string;
  fieldSize?: FieldSize;
  variant?: FieldVariant;
  grouped?: boolean;
  wrapperClassName?: string;
  options?: SelectFieldOption[];
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
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
      options,
      children,
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
      <select
        ref={ref}
        className={inputCn(fieldSize, error, undefined, className, variant, grouped)}
        {...props}
      >
        {options
          ? options.map((o) => (
              <option key={o.value} value={o.value} disabled={o.disabled}>
                {o.label}
              </option>
            ))
          : children}
      </select>
    </FieldWrapper>
  ),
);
SelectField.displayName = "SelectField";

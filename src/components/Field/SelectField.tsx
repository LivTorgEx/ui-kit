import { forwardRef } from "react";
import type { SelectHTMLAttributes, ReactNode } from "react";
import { FieldWrapper, inputCn } from "./_base";
import type { FieldSize } from "./_base";

export interface SelectFieldOption {
  value: string | number;
  label: string;
}

export interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: ReactNode;
  error?: string;
  hint?: string;
  fieldSize?: FieldSize;
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
      className={wrapperClassName}
    >
      <select ref={ref} className={inputCn(fieldSize, error, undefined, className)} {...props}>
        {options
          ? options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))
          : children}
      </select>
    </FieldWrapper>
  ),
);
SelectField.displayName = "SelectField";

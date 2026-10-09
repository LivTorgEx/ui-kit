"use client";

import { forwardRef } from "react";
import type { ReactNode, SelectHTMLAttributes } from "react";
import { FieldWrapper, fieldWrapperClassName } from "./FieldWrapper";
import { inputControlClassName } from "./_base";
import type { FieldSize, FieldVariant } from "./_base";
import { useInputGroupContext } from "./input-group-context";

export interface SelectFieldOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectFieldProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "className"
> {
  label?: ReactNode;
  error?: string;
  hint?: string;
  fieldSize?: FieldSize;
  variant?: FieldVariant;
  options?: SelectFieldOption[];
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, error, hint, fieldSize, variant, options, children, ...props }, ref) => {
    const inputGroup = useInputGroupContext();
    const resolvedSize = fieldSize ?? inputGroup?.size ?? "md";
    const resolvedVariant = variant ?? inputGroup?.variant ?? "default";
    const inInputGroup = inputGroup !== null;

    return (
      <FieldWrapper
        label={label}
        error={error}
        hint={hint}
        fieldSize={resolvedSize}
        variant={resolvedVariant}
        className={fieldWrapperClassName(inInputGroup, "select")}
      >
        <select
          ref={ref}
          className={inputControlClassName({
            fieldSize: resolvedSize,
            error,
            variant: resolvedVariant,
            inputGroup: inInputGroup,
            control: "select",
          })}
          {...props}
        >
          {options
            ? options.map((option) => (
                <option key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </option>
              ))
            : children}
        </select>
      </FieldWrapper>
    );
  },
);
SelectField.displayName = "SelectField";

"use client";

import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { FieldWrapper, fieldWrapperClassName } from "./FieldWrapper";
import { inputControlClassName } from "./_base";
import type { FieldSize, FieldVariant } from "./_base";
import { useInputGroupContext } from "./input-group-context";

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label?: ReactNode;
  error?: string;
  hint?: string;
  fieldSize?: FieldSize;
  variant?: FieldVariant;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, hint, fieldSize, variant, ...props }, ref) => {
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
        className={fieldWrapperClassName(inInputGroup)}
      >
        <input
          ref={ref}
          className={inputControlClassName({
            fieldSize: resolvedSize,
            error,
            variant: resolvedVariant,
            inputGroup: inInputGroup,
            numeric: inInputGroup && props.type === "number",
            verificationCode:
              props.autoComplete === "one-time-code" && props.inputMode === "numeric",
          })}
          {...props}
        />
      </FieldWrapper>
    );
  },
);
TextField.displayName = "TextField";

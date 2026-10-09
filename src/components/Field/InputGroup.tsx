import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "../../utils/cn";
import type { FieldVariant } from "./_base";
import { InputGroupContext } from "./input-group-context";

const inputGroupVariants = cva(
  "flex w-full min-w-0 items-center border transition-colors focus-within:border-emerald-400",
  {
    variants: {
      size: {
        xs: "h-9",
        sm: "h-10",
        md: "h-12",
      },
      variant: {
        default: "rounded-md border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900",
        trading:
          "rounded border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950 dark:focus-within:border-gray-500",
      },
      invalid: {
        true: "border-rose-400 focus-within:border-rose-400",
        false: "",
      },
    },
    defaultVariants: {
      size: "sm",
      variant: "default",
      invalid: false,
    },
  },
);

export type InputGroupSize = NonNullable<VariantProps<typeof inputGroupVariants>["size"]>;

export interface InputGroupProps extends ComponentPropsWithoutRef<"div"> {
  size?: InputGroupSize;
  variant?: FieldVariant;
  invalid?: boolean;
}

export function InputGroup({
  size = "sm",
  variant = "default",
  invalid = false,
  className,
  children,
  ...props
}: InputGroupProps) {
  return (
    <InputGroupContext.Provider value={{ size, variant }}>
      <div {...props} className={cn(inputGroupVariants({ size, variant, invalid }), className)}>
        {children}
      </div>
    </InputGroupContext.Provider>
  );
}

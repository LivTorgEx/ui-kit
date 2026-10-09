import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export const fieldControlVariants = cva(
  "w-full rounded-md border border-gray-700 bg-gray-800 text-white placeholder:text-gray-400 transition-colors focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      fieldSize: {
        md: "px-4 py-3",
        sm: "px-3 py-2.5 text-sm",
        xs: "px-2 py-1 text-xs",
      },
      variant: {
        default: "",
        trading:
          "rounded-none border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:placeholder:text-gray-500",
      },
      invalid: {
        true: "border-rose-400 focus:border-rose-400 focus:ring-rose-400/20",
        false: "",
      },
      inputGroup: {
        true: "h-full min-w-0 rounded-none border-transparent bg-transparent focus:border-transparent focus:ring-0",
        false: "",
      },
      control: {
        input: "",
        select: "",
        textarea: "",
      },
      numeric: {
        true: "text-right font-mono placeholder:text-right",
        false: "",
      },
      monospace: {
        true: "font-mono",
        false: "",
      },
      resize: {
        none: "resize-none",
        vertical: "resize-y",
      },
      verificationCode: {
        true: "text-center font-mono text-lg tracking-widest",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "trading",
        fieldSize: "md",
        className: "px-3 py-2",
      },
      {
        variant: "trading",
        fieldSize: "sm",
        className: "px-2 py-1.5 text-sm",
      },
      {
        variant: "trading",
        fieldSize: "xs",
        className: "px-1.5 py-1 text-xs",
      },
      {
        inputGroup: true,
        control: "select",
        className: "w-auto border-l border-l-gray-700 focus:border-l-gray-700",
      },
    ],
    defaultVariants: {
      fieldSize: "md",
      variant: "default",
      invalid: false,
      inputGroup: false,
      control: "input",
      numeric: false,
      monospace: false,
      resize: "none",
      verificationCode: false,
    },
  },
);

export type FieldSize = NonNullable<VariantProps<typeof fieldControlVariants>["fieldSize"]>;
export type FieldVariant = NonNullable<VariantProps<typeof fieldControlVariants>["variant"]>;
export type FieldControlKind = NonNullable<VariantProps<typeof fieldControlVariants>["control"]>;

export interface InputControlClassOptions {
  fieldSize: FieldSize;
  error?: string;
  variant?: FieldVariant;
  inputGroup?: boolean;
  control?: FieldControlKind;
  numeric?: boolean;
  monospace?: boolean;
  resize?: "none" | "vertical";
  verificationCode?: boolean;
}

export function inputControlClassName({
  fieldSize,
  error,
  variant = "default",
  inputGroup = false,
  control = "input",
  numeric = false,
  monospace = false,
  resize = "none",
  verificationCode = false,
}: InputControlClassOptions) {
  return cn(
    fieldControlVariants({
      fieldSize,
      variant,
      invalid: Boolean(error),
      inputGroup,
      control,
      numeric,
      monospace,
      resize,
      verificationCode,
    }),
  );
}

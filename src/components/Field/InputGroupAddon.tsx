import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

const inputGroupAddonVariants = cva("flex h-full shrink-0 items-center gap-1", {
  variants: {
    size: {
      xs: "px-1.5 text-[11px]",
      sm: "px-2.5 text-xs",
      md: "px-2.5 text-sm",
    },
    tone: {
      default: "text-gray-900 dark:text-gray-100",
      muted: "text-gray-600 dark:text-gray-400",
      subtle: "text-gray-500 dark:text-gray-500",
    },
    position: {
      start: "",
      end: "",
    },
    divider: {
      true: "",
      false: "",
    },
    interactive: {
      true: "cursor-pointer border-0 bg-transparent text-current transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-400 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-800 dark:hover:text-white",
      false: "",
    },
  },
  compoundVariants: [
    {
      position: "start",
      className: "rounded-l-[inherit]",
    },
    {
      position: "end",
      className: "rounded-r-[inherit]",
    },
    {
      divider: true,
      position: "start",
      className: "border-r border-gray-200 dark:border-gray-700",
    },
    {
      divider: true,
      position: "end",
      className: "border-l border-gray-200 dark:border-gray-700",
    },
  ],
  defaultVariants: {
    size: "sm",
    tone: "muted",
    position: "start",
    divider: false,
    interactive: false,
  },
});

export type InputGroupAddonSize = NonNullable<VariantProps<typeof inputGroupAddonVariants>["size"]>;
export type InputGroupAddonPosition = NonNullable<
  VariantProps<typeof inputGroupAddonVariants>["position"]
>;
export type InputGroupAddonTone = NonNullable<VariantProps<typeof inputGroupAddonVariants>["tone"]>;

interface InputGroupAddonBaseProps {
  children: ReactNode;
  position?: InputGroupAddonPosition;
  tone?: InputGroupAddonTone;
  size?: InputGroupAddonSize;
  divider?: boolean;
}

type InputGroupAddonSpanProps = InputGroupAddonBaseProps & {
  onClick?: never;
} & Omit<
    ComponentPropsWithoutRef<"span">,
    keyof InputGroupAddonBaseProps | "className" | "onClick"
  >;

type InputGroupAddonButtonProps = InputGroupAddonBaseProps & {
  onClick: NonNullable<ComponentPropsWithoutRef<"button">["onClick"]>;
} & Omit<
    ComponentPropsWithoutRef<"button">,
    keyof InputGroupAddonBaseProps | "className" | "onClick"
  >;

export type InputGroupAddonProps = InputGroupAddonSpanProps | InputGroupAddonButtonProps;

export function InputGroupAddon(props: InputGroupAddonProps) {
  if ("onClick" in props && typeof props.onClick === "function") {
    const {
      children,
      position = "start",
      tone = "muted",
      size = "sm",
      divider = false,
      type = "button",
      onClick,
      ...buttonProps
    } = props;
    return (
      <button
        {...buttonProps}
        type={type}
        onClick={onClick}
        className={inputGroupAddonVariants({
          size,
          tone,
          position,
          divider,
          interactive: true,
        })}
      >
        {children}
      </button>
    );
  }

  const {
    children,
    position = "start",
    tone = "muted",
    size = "sm",
    divider = false,
    ...spanProps
  } = props;
  return (
    <span {...spanProps} className={inputGroupAddonVariants({ size, tone, position, divider })}>
      {children}
    </span>
  );
}

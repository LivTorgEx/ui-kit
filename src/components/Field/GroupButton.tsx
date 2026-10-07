import { useId, type KeyboardEvent, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Button, type ButtonSize, type ButtonVariant } from "../Button/Button";
import { cn } from "../../utils/cn";
import { FieldWrapper, type FieldSize, type FieldVariant } from "./_base";

const groupButtonVariants = cva("inline-flex", {
  variants: {
    appearance: {
      segmented:
        "rounded-md border border-gray-300 bg-gray-50 p-1 dark:border-gray-700 dark:bg-gray-900",
      tabs: "max-w-full gap-1 overflow-x-auto rounded-none border-0 bg-transparent p-0 dark:bg-transparent",
      compact:
        "max-w-full overflow-hidden [&>button:not(:last-child)]:border-r [&>button:not(:last-child)]:border-gray-700 [&>button:first-child]:pl-1 [&>button:focus-visible]:relative [&>button:focus-visible]:z-10 [&>button:focus-visible]:outline-none [&>button:focus-visible]:ring-2 [&>button:focus-visible]:ring-inset [&>button:focus-visible]:ring-emerald-400",
    },
    bordered: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    {
      appearance: "compact",
      bordered: true,
      className: "border border-gray-700 bg-black",
    },
  ],
  defaultVariants: {
    appearance: "segmented",
    bordered: true,
  },
});

export type GroupButtonAppearance = NonNullable<
  VariantProps<typeof groupButtonVariants>["appearance"]
>;

type SelectionState = "selected" | "unselected";

const optionButtonVariants: Record<GroupButtonAppearance, Record<SelectionState, ButtonVariant>> = {
  segmented: { selected: "secondary", unselected: "ghost" },
  tabs: { selected: "tab-selected", unselected: "tab" },
  compact: { selected: "choice-selected", unselected: "choice" },
};

export interface GroupButtonOption<Value extends string = string> {
  value: Value;
  label: ReactNode;
}

export interface GroupButtonProps<Value extends string = string> extends Omit<
  VariantProps<typeof groupButtonVariants>,
  "appearance"
> {
  options: readonly GroupButtonOption<Value>[];
  value: Value;
  onChange: (value: Value) => void;
  label?: ReactNode;
  hint?: string;
  error?: string;
  fieldSize?: FieldSize;
  fieldVariant?: FieldVariant;
  appearance?: GroupButtonAppearance;
  size?: ButtonSize;
  ariaLabel?: string;
  name?: string;
  disabled?: boolean;
  className?: string;
  controlClassName?: string;
}

export function GroupButton<Value extends string = string>({
  options,
  value,
  onChange,
  label,
  hint,
  error,
  fieldSize = "sm",
  fieldVariant = "default",
  appearance = "segmented",
  size = "sm",
  bordered = true,
  ariaLabel,
  name,
  disabled = false,
  className,
  controlClassName,
}: GroupButtonProps<Value>) {
  const generatedId = useId();
  const groupId = `${generatedId}-group`;
  const labelId = `${generatedId}-label`;
  const isTabGroup = appearance === "tabs";
  const selectedIndex = options.findIndex((option) => option.value === value);

  const handleOptionKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (options.length === 0) return;

    let nextIndex: number;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (index + 1) % options.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = (index - 1 + options.length) % options.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = options.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    onChange(options[nextIndex].value);
    event.currentTarget.parentElement
      ?.querySelectorAll<HTMLButtonElement>(`button[role="${isTabGroup ? "tab" : "radio"}"]`)
      .item(nextIndex)
      ?.focus();
  };

  return (
    <FieldWrapper
      label={label}
      labelId={label ? labelId : undefined}
      hint={hint}
      error={error}
      fieldSize={fieldSize}
      variant={fieldVariant}
      className={className}
    >
      <div
        id={groupId}
        className={cn(groupButtonVariants({ appearance, bordered }), controlClassName)}
        role={isTabGroup ? "tablist" : "radiogroup"}
        aria-label={ariaLabel}
        aria-labelledby={label ? labelId : undefined}
        aria-orientation="horizontal"
      >
        {options.map((option, index) => {
          const selected = value === option.value;
          const selectionState: SelectionState = selected ? "selected" : "unselected";

          return (
            <Button
              key={option.value}
              variant={optionButtonVariants[appearance][selectionState]}
              size={appearance === "compact" ? "xs" : size}
              rounded={appearance === "compact" || appearance === "tabs" ? "none" : "md"}
              type="button"
              role={isTabGroup ? "tab" : "radio"}
              aria-checked={isTabGroup ? undefined : selected}
              aria-selected={isTabGroup ? selected : undefined}
              tabIndex={index === (selectedIndex < 0 ? 0 : selectedIndex) ? 0 : -1}
              disabled={disabled}
              onKeyDown={(event) => handleOptionKeyDown(event, index)}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </Button>
          );
        })}
      </div>
      {name ? <input type="hidden" name={name} value={value} disabled={disabled} /> : null}
    </FieldWrapper>
  );
}

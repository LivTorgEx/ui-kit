import type { ReactNode } from "react";
import { Button, type ButtonProps, type ButtonSize } from "../Button/Button";
import { getTabClassName } from "./tabClasses";

export interface TabProps extends Omit<
  ButtonProps,
  "children" | "className" | "rounded" | "size" | "variant"
> {
  children: ReactNode;
  selected: boolean;
  size?: ButtonSize;
}

export function Tab({ children, selected, size = "sm", ...props }: TabProps) {
  return (
    <Button
      {...props}
      type="button"
      role="tab"
      aria-selected={selected}
      variant="ghost"
      size={size}
      rounded="none"
      className={getTabClassName(selected)}
    >
      {children}
    </Button>
  );
}

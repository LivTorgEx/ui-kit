"use client";

import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import type { ButtonSize } from "../Button/Button";
import { DropdownMenu, type DropdownMenuOption } from "../DropdownMenu/DropdownMenu";
import { Tab } from "./Tab";

export interface TabDropdownProps<Value extends string> {
  value: Value;
  children: ReactNode;
  selected: boolean;
  options: readonly DropdownMenuOption<Value>[];
  onValueChange: (value: Value) => void;
  ariaLabel: string;
  size?: ButtonSize;
  disabled?: boolean;
}

export function TabDropdown<Value extends string>({
  value,
  children,
  selected,
  options,
  onValueChange,
  ariaLabel,
  size = "sm",
  disabled,
}: TabDropdownProps<Value>) {
  return (
    <DropdownMenu<Value>
      value={value}
      options={options}
      onValueChange={onValueChange}
      size="compact"
      menuLabel={ariaLabel}
      align="end"
      renderTrigger={({ open }) => (
        <Tab
          selected={selected}
          aria-haspopup="menu"
          aria-expanded={open}
          disabled={disabled}
          size={size}
        >
          <span className="flex items-center gap-1">
            {children}
            <ChevronDown className="h-3 w-3" />
          </span>
        </Tab>
      )}
    />
  );
}

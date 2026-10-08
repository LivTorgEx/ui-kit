import type { ReactNode } from "react";
import { Button } from "./Button";
import { cn } from "../../utils/cn";

export type ActionButtonGroupOption = {
  key: string;
  label: ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

const groupClassName = cn(
  "grid w-full min-w-0 grid-cols-2 gap-px border border-gray-700 bg-gray-700",
);

export function ActionButtonGroup({
  options,
  ariaLabel,
}: {
  options: readonly ActionButtonGroupOption[];
  ariaLabel: string;
}) {
  if (options.length === 0) return null;

  return (
    <div className={groupClassName} role="group" aria-label={ariaLabel}>
      {options.map((option) => (
        <Button
          key={option.key}
          type="button"
          size="xs"
          rounded="none"
          variant="choice"
          className="w-full min-w-0 whitespace-nowrap px-1 !text-[11px] !leading-4"
          disabled={option.disabled}
          onClick={option.onClick}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}

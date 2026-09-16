"use client";

import { useId, useMemo, useState } from "react";
import { Badge, type BadgeVariant } from "../Badge/Badge";
import { Button } from "../Button/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../Command/Command";
import { Icon, type IconComponent } from "../Icon/Icon";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover/Popover";
import { Text } from "../Text/Text";
import { cn } from "../../utils/cn";

export type AutocompleteSelectOption<V extends string | number> = {
  value: V;
  label: string;
  hint?: string;
  group?: string;
  badge?: {
    label: string;
    variant?: BadgeVariant;
  };
  metric?: {
    label: string;
    value: string;
  };
  disabled?: boolean;
};

export interface AutocompleteProps<V extends string | number> {
  label?: string;
  options: AutocompleteSelectOption<V>[];
  value: V | null;
  onChange: (next: V | null) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  variant?: "default" | "compact";
  contentWidth?: "trigger" | "wide";
  endIcon?: IconComponent;
  className?: string;
  disabled?: boolean;
}

export function Autocomplete<V extends string | number>({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  emptyText = "No matches",
  variant = "default",
  contentWidth = "trigger",
  endIcon,
  className,
  disabled = false,
}: AutocompleteProps<V>) {
  const triggerId = useId();
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);
  const groupedOptions = useMemo(() => {
    const groups = new Map<string | undefined, AutocompleteSelectOption<V>[]>();

    options.forEach((option) => {
      const group = groups.get(option.group) ?? [];
      group.push(option);
      groups.set(option.group, group);
    });

    return [...groups.entries()];
  }, [options]);

  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={triggerId}>
          <Text as="span" variant="label" tone="subtle">
            {label}
          </Text>
        </label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={triggerId}
            type="button"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            variant={variant === "compact" ? "ghost" : "secondary"}
            size="sm"
            className="w-full justify-between gap-3 text-left"
          >
            <div className="min-w-0 flex-1">
              <div className="flex min-w-0 items-center gap-2">
                <Text
                  as="span"
                  variant="body-sm"
                  tone={selectedOption ? (variant === "compact" ? "inverse" : "default") : "muted"}
                  weight={selectedOption ? "medium" : "normal"}
                  truncate
                >
                  {selectedOption?.label ?? placeholder}
                </Text>
                {selectedOption?.badge && (
                  <Badge variant={selectedOption.badge.variant}>{selectedOption.badge.label}</Badge>
                )}
              </div>
              {selectedOption?.hint && (
                <Text as="span" variant="caption" tone="muted" truncate>
                  {selectedOption.hint}
                </Text>
              )}
            </div>
            {selectedOption?.metric && (
              <div className="flex shrink-0 items-baseline justify-end gap-1 text-right">
                <Text as="span" variant="label" tone="subtle">
                  {selectedOption.metric.label}
                </Text>
                <Text as="span" variant="metric" tone="inverse" weight="semibold">
                  {selectedOption.metric.value}
                </Text>
              </div>
            )}
            {endIcon && <Icon icon={endIcon} size="sm" tone="muted" />}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            contentWidth === "wide"
              ? "w-96 max-w-[calc(100vw-2rem)]"
              : "w-[var(--radix-popover-trigger-width)]",
            "p-0",
          )}
          align="start"
        >
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              {groupedOptions.map(([group, groupOptions]) => {
                const items = groupOptions.map((option) => (
                  <CommandItem
                    key={String(option.value)}
                    value={`${option.label} ${option.hint ?? ""} ${group ?? ""} ${String(option.value)}`}
                    disabled={option.disabled}
                    onSelect={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex min-w-0 items-center gap-2">
                        <Text as="span" variant="body-sm" tone="inverse" weight="medium" truncate>
                          {option.label}
                        </Text>
                        {option.badge && (
                          <Badge variant={option.badge.variant}>{option.badge.label}</Badge>
                        )}
                      </div>
                      {option.hint && (
                        <Text as="span" variant="caption" tone="muted" truncate>
                          {option.hint}
                        </Text>
                      )}
                    </div>
                    {option.metric && (
                      <div className="flex shrink-0 items-baseline justify-end gap-1 text-right">
                        <Text as="span" variant="label" tone="subtle">
                          {option.metric.label}
                        </Text>
                        <Text as="span" variant="metric" tone="inverse" weight="semibold">
                          {option.metric.value}
                        </Text>
                      </div>
                    )}
                  </CommandItem>
                ));

                return group ? (
                  <CommandGroup key={group} heading={`${group} (${groupOptions.length})`}>
                    {items}
                  </CommandGroup>
                ) : (
                  items
                );
              })}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

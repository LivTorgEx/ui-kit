import { useId, useMemo, useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../Command/Command";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover/Popover";
import { cn } from "../../utils/cn";

export type AutocompleteOption<V extends string | number> = {
  value: V;
  label: string;
  hint?: string;
};

export interface AutocompleteMultiselectProps<V extends string | number> {
  label?: string;
  options: AutocompleteOption<V>[];
  selected: V[];
  onChange: (next: V[]) => void;
  placeholder?: string;
  emptyText?: string;
  error?: boolean;
  helperText?: string;
  /** Max chips visible inline before collapsing to a "+N more" indicator. Defaults to 3. */
  maxChips?: number;
  className?: string;
  disabled?: boolean;
}

export function AutocompleteMultiselect<V extends string | number>({
  label,
  options,
  selected,
  onChange,
  placeholder = "Search...",
  emptyText = "No matches",
  error = false,
  helperText,
  maxChips = 3,
  className,
  disabled = false,
}: AutocompleteMultiselectProps<V>) {
  const triggerId = useId();
  const [open, setOpen] = useState(false);

  const optionMap = useMemo(() => {
    const map = new Map<V, AutocompleteOption<V>>();
    for (const o of options) map.set(o.value, o);
    return map;
  }, [options]);
  const selectedSet = useMemo(() => new Set<V>(selected), [selected]);

  const toggle = (value: V) => {
    if (selectedSet.has(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const removeOne = (value: V) => {
    onChange(selected.filter((v) => v !== value));
  };

  const clearAll = () => {
    if (selected.length > 0) onChange([]);
  };

  const chips = selected.slice(0, maxChips);
  const overflow = selected.length - chips.length;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label
          htmlFor={triggerId}
          className={cn(
            "text-xs font-medium uppercase tracking-wider",
            error ? "text-red-500" : "text-gray-500 dark:text-gray-400",
          )}
        >
          {label}
        </label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            id={triggerId}
            type="button"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              "flex w-full flex-wrap items-center gap-1.5 rounded-xl border bg-white px-2.5 py-2 text-left transition-all dark:bg-gray-950",
              error
                ? "border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500"
                : "border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500",
              disabled && "opacity-60 cursor-not-allowed",
            )}
          >
            {selected.length === 0 ? (
              <span className="text-sm text-gray-400 dark:text-gray-500">{placeholder}</span>
            ) : (
              <>
                {chips.map((v) => {
                  const opt = optionMap.get(v);
                  const text = opt?.label ?? String(v);
                  return (
                    <span
                      key={String(v)}
                      className="inline-flex max-w-[40%] items-center gap-1 rounded-full bg-teal-500/15 px-2 py-0.5 text-xs font-medium text-teal-700 dark:text-teal-200"
                    >
                      <span className="truncate">{text}</span>
                      <span
                        role="button"
                        tabIndex={0}
                        aria-label={`Remove ${text}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          removeOne(v);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.stopPropagation();
                            e.preventDefault();
                            removeOne(v);
                          }
                        }}
                        className="cursor-pointer rounded-full px-0.5 text-teal-500 hover:text-teal-300 dark:text-teal-300 dark:hover:text-teal-100"
                      >
                        ×
                      </span>
                    </span>
                  );
                })}
                {overflow > 0 && (
                  <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    +{overflow}
                  </span>
                )}
                <span
                  role="button"
                  tabIndex={0}
                  aria-label="Clear all"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearAll();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.stopPropagation();
                      e.preventDefault();
                      clearAll();
                    }
                  }}
                  className="ml-auto cursor-pointer rounded-full px-1.5 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  Clear
                </span>
              </>
            )}
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <Command>
            <CommandInput placeholder={placeholder} />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                {options.map((opt) => {
                  const active = selectedSet.has(opt.value);
                  return (
                    <CommandItem
                      key={String(opt.value)}
                      value={`${opt.label} ${opt.hint ?? ""} ${String(opt.value)}`}
                      onSelect={() => toggle(opt.value)}
                    >
                      <span
                        className={cn(
                          "inline-flex h-4 w-4 items-center justify-center rounded border text-[10px]",
                          active ? "border-teal-500 bg-teal-500 text-white" : "border-gray-400/60",
                        )}
                        aria-hidden="true"
                      >
                        {active ? "✓" : ""}
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate">{opt.label}</span>
                        {opt.hint && (
                          <span className="truncate text-[10px] uppercase tracking-wider text-gray-500">
                            {opt.hint}
                          </span>
                        )}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {helperText && (
        <p className={cn("text-xs", error ? "text-red-500" : "text-gray-500 dark:text-gray-400")}>
          {helperText}
        </p>
      )}
    </div>
  );
}

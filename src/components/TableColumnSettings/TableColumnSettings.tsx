"use client";

import { Settings2 } from "lucide-react";

import { Button } from "../Button/Button";
import { Checkbox } from "../Checkbox/Checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover/Popover";
import { SortableList } from "../SortableList/SortableList";

export type TableColumnSetting = {
  id: string;
  label: string;
  visible: boolean;
};

export function TableColumnSettings({
  columns,
  onToggle,
  onReorder,
}: {
  columns: TableColumnSetting[];
  onToggle: (id: string) => void;
  onReorder: (ids: string[]) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="secondary"
          size="xs"
          className="gap-1.5"
          aria-label="Column settings"
          aria-haspopup="dialog"
        >
          <Settings2 size={14} />
          Columns
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="max-h-96 w-72 overflow-y-auto p-3">
        <p className="px-1 pb-1 text-xs font-semibold text-gray-700 dark:text-gray-200">
          Table columns
        </p>
        <p className="px-1 pb-2 text-xs text-gray-500 dark:text-gray-400">
          Drag to reorder · uncheck to hide
        </p>
        <SortableList
          items={columns}
          getItemId={(column) => column.id}
          getItemLabel={(column) => column.label}
          onReorder={(reordered) => onReorder(reordered.map((column) => column.id))}
          renderItem={(column) => (
            <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 py-1 text-sm text-gray-700 dark:text-gray-200">
              <Checkbox
                checked={column.visible}
                onChange={() => onToggle(column.id)}
              />
              <span className="min-w-0 truncate">{column.label}</span>
            </label>
          )}
        />
      </PopoverContent>
    </Popover>
  );
}

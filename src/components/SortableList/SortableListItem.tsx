"use client";

import { GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/react/sortable";
import type { ReactNode } from "react";

import { Button } from "../Button/Button";
import { cn } from "../../utils/cn";

export function SortableListItem({
  id,
  index,
  label,
  children,
  className,
}: {
  id: string | number;
  index: number;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  const { ref, handleRef, isDragging, isDropTarget } = useSortable({ id, index });

  return (
    <li
      ref={ref}
      className={cn(
        "flex items-center gap-2 rounded-md border border-gray-200 bg-white px-2 py-1.5 dark:border-gray-700 dark:bg-gray-950",
        isDragging && "opacity-50",
        isDropTarget && "border-emerald-400",
        className,
      )}
    >
      <span ref={handleRef} className="inline-flex touch-none">
        <Button
          type="button"
          variant="icon-ghost"
          size="xs"
          aria-label={`Reorder ${label}`}
          className="cursor-grab active:cursor-grabbing"
        >
          <GripVertical size={16} aria-hidden="true" />
        </Button>
      </span>
      {children}
    </li>
  );
}

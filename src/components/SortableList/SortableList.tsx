"use client";

import { DragDropProvider } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import type { ReactNode } from "react";

import { cn } from "../../utils/cn";
import { SortableListItem } from "./SortableListItem";

export function SortableList<Item>({
  items,
  getItemId,
  getItemLabel,
  renderItem,
  onReorder,
  className,
  itemClassName,
}: {
  items: readonly Item[];
  getItemId: (item: Item) => string | number;
  getItemLabel: (item: Item) => string;
  renderItem: (item: Item, index: number) => ReactNode;
  onReorder: (items: Item[]) => void;
  className?: string;
  itemClassName?: string;
}) {
  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;
        const source = event.operation.source;
        if (!isSortable(source) || source.initialIndex === source.index) return;

        const reorderedItems = [...items];
        const [movedItem] = reorderedItems.splice(source.initialIndex, 1);
        if (movedItem == null) return;
        reorderedItems.splice(source.index, 0, movedItem);
        onReorder(reorderedItems);
      }}
    >
      <ul className={cn("space-y-1", className)}>
        {items.map((item, index) => (
          <SortableListItem
            key={getItemId(item)}
            id={getItemId(item)}
            index={index}
            label={getItemLabel(item)}
            className={itemClassName}
          >
            {renderItem(item, index)}
          </SortableListItem>
        ))}
      </ul>
    </DragDropProvider>
  );
}

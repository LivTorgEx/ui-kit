import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { SortableList } from "./SortableList";

const INITIAL_ITEMS = [
  { id: "market", label: "Market" },
  { id: "opened", label: "Opened" },
  { id: "context", label: "Context" },
  { id: "pnl", label: "Total PnL" },
];

const meta: Meta = {
  title: "Components/SortableList",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

function ReorderableListDemo() {
  const [items, setItems] = useState(INITIAL_ITEMS);

  return (
    <div className="max-w-sm rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
        Drag an item by its handle to change the order.
      </p>
      <SortableList
        items={items}
        getItemId={(item) => item.id}
        getItemLabel={(item) => item.label}
        onReorder={setItems}
        renderItem={(item) => (
          <span className="min-w-0 truncate text-sm text-gray-700 dark:text-gray-200">
            {item.label}
          </span>
        )}
      />
    </div>
  );
}

export const ReorderItems: Story = {
  render: () => <ReorderableListDemo />,
};

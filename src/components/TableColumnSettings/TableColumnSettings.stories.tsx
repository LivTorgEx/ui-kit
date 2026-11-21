import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { TableColumnSettings, type TableColumnSetting } from "./TableColumnSettings";

const INITIAL_COLUMNS: TableColumnSetting[] = [
  { id: "market", label: "Market", visible: true },
  { id: "opened", label: "Opened", visible: true },
  { id: "updated", label: "Updated", visible: false },
  { id: "context", label: "Context", visible: true },
  { id: "pnl", label: "Total PnL", visible: true },
];

const meta: Meta<typeof TableColumnSettings> = {
  title: "Components/TableColumnSettings",
  component: TableColumnSettings,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TableColumnSettings>;

function InteractiveTableColumnSettings() {
  const [columns, setColumns] = useState(INITIAL_COLUMNS);

  function toggleColumn(id: string) {
    setColumns((current) =>
      current.map((column) =>
        column.id === id ? { ...column, visible: !column.visible } : column,
      ),
    );
  }

  function reorderColumns(ids: string[]) {
    setColumns((current) => {
      const columnsById = new Map(current.map((column) => [column.id, column]));
      return ids.flatMap((id) => {
        const column = columnsById.get(id);
        return column ? [column] : [];
      });
    });
  }

  return (
    <div className="flex min-h-48 items-start justify-end rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
      <TableColumnSettings columns={columns} onToggle={toggleColumn} onReorder={reorderColumns} />
    </div>
  );
}

export const Interactive: Story = {
  render: () => <InteractiveTableColumnSettings />,
};

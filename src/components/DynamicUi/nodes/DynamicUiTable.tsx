import { Card } from "../../Card/Card";
import { EmptyState } from "../../Panel/EmptyState";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "../../Table/Table";
import { Text } from "../../Text/Text";
import { formatDynamicUiValue, isDynamicUiRecord } from "../utils";
import type { DynamicUiNode, DynamicUiNodeRendererProps } from "../types";

type DynamicUiTableColumn = {
  key: string;
  label: string;
};

export function DynamicUiTable<TNode extends DynamicUiNode>({
  node,
  title,
  value,
}: Pick<DynamicUiNodeRendererProps<TNode>, "node" | "title" | "value">) {
  const rows = getRows(value);
  const columns = getColumns(node.definition.columns, rows);

  return (
    <Card className="space-y-3 p-3">
      <Text as="h3" variant="body-sm" weight="semibold">
        {title}
      </Text>
      {rows.length === 0 || columns.length === 0 ? (
        <EmptyState message="No data" className="py-4" />
      ) : (
        <Table containerClassName="-mx-3">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableHeaderCell key={column.key}>{column.label}</TableHeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                  <TableCell key={column.key}>{formatDynamicUiValue(row[column.key])}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}

function getRows(value: unknown) {
  const rowsValue = isDynamicUiRecord(value) && Array.isArray(value.rows) ? value.rows : value;
  return Array.isArray(rowsValue) ? rowsValue.filter(isDynamicUiRecord) : [];
}

function getColumns(value: unknown, rows: Record<string, unknown>[]): DynamicUiTableColumn[] {
  if (Array.isArray(value)) {
    const configuredColumns = value.flatMap((column) => {
      if (!isDynamicUiRecord(column)) return [];

      const key = typeof column.key === "string" ? column.key : undefined;
      const label = typeof column.label === "string" ? column.label : key;
      return key && label ? [{ key, label }] : [];
    });

    if (configuredColumns.length > 0) return configuredColumns;
  }

  return Object.keys(rows[0] ?? {}).map((key) => ({ key, label: key }));
}

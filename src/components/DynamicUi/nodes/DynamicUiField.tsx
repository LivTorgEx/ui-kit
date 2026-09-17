import { Card } from "../../Card/Card";
import { Text } from "../../Text/Text";
import { formatDynamicUiValue } from "../utils";
import type { DynamicUiNode, DynamicUiNodeRendererProps } from "../types";

export function DynamicUiField<TNode extends DynamicUiNode>({
  title,
  value,
}: Pick<DynamicUiNodeRendererProps<TNode>, "title" | "value">) {
  return (
    <Card className="space-y-1 p-3">
      <Text as="span" variant="caption" tone="muted">
        {title}
      </Text>
      <Text variant="body-sm">{formatDynamicUiValue(value)}</Text>
    </Card>
  );
}

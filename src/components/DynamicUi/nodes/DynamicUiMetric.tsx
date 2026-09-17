import { StatTile } from "../../StatTile/StatTile";
import { formatDynamicUiValue } from "../utils";
import type { DynamicUiNode, DynamicUiNodeRendererProps } from "../types";

export function DynamicUiMetric<TNode extends DynamicUiNode>({
  title,
  value,
}: Pick<DynamicUiNodeRendererProps<TNode>, "title" | "value">) {
  return <StatTile label={title} value={formatDynamicUiValue(value)} />;
}

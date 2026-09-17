import { Card } from "../../Card/Card";
import { Text } from "../../Text/Text";
import type { DynamicUiNode, DynamicUiNodeRendererProps } from "../types";

export function DynamicUiForm<TNode extends DynamicUiNode>({
  title,
  children,
}: Pick<DynamicUiNodeRendererProps<TNode>, "title" | "children">) {
  return (
    <Card className="space-y-3 border-emerald-400/30">
      <Text as="h3" variant="body-sm" weight="semibold">
        {title}
      </Text>
      {children}
    </Card>
  );
}

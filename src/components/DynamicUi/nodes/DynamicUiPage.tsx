import { Card } from "../../Card/Card";
import { Text } from "../../Text/Text";
import type { DynamicUiNode, DynamicUiNodeRendererProps } from "../types";

export function DynamicUiPage<TNode extends DynamicUiNode>({
  title,
  children,
}: Pick<DynamicUiNodeRendererProps<TNode>, "title" | "children">) {
  return (
    <Card className="space-y-4">
      <Text as="h2" variant="title" weight="semibold">
        {title}
      </Text>
      {children}
    </Card>
  );
}

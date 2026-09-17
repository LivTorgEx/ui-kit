import { Button } from "../../Button/Button";
import type { DynamicUiNode, DynamicUiNodeRendererProps } from "../types";

export function DynamicUiButton<TNode extends DynamicUiNode>({
  node,
  title,
  onOpenPage,
}: Pick<DynamicUiNodeRendererProps<TNode>, "node" | "title" | "onOpenPage">) {
  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      block
      className="px-3 py-2"
      onClick={() => onOpenPage?.(node)}
    >
      {title}
    </Button>
  );
}

import { Button } from "../../Button/Button";
import type { DynamicUiNode, DynamicUiNodeRendererProps } from "../types";

export function DynamicUiButtonLink<TNode extends DynamicUiNode>({
  node,
  title,
  onOpenPage,
}: Pick<DynamicUiNodeRendererProps<TNode>, "node" | "title" | "onOpenPage">) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="justify-start px-0"
      onClick={() => onOpenPage?.(node)}
    >
      {title}
    </Button>
  );
}

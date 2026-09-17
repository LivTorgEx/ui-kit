import type { ReactNode } from "react";

export type DynamicUiNode = {
  id: string;
  parent_id: string | null;
  ui_key: string;
  node_kind: string;
  definition: Record<string, unknown>;
  display_order: number;
};

export type DynamicUiMetadata<TNode extends DynamicUiNode = DynamicUiNode> = {
  nodes: TNode[];
};

export type DynamicUiNodeRendererProps<TNode extends DynamicUiNode> = {
  node: TNode;
  title: string;
  value: unknown;
  childNodes: readonly TNode[];
  children: ReactNode;
  renderNode: (node: TNode) => ReactNode;
  onOpenPage?: (node: TNode) => void;
};

export type DynamicUiTreeProps<TNode extends DynamicUiNode = DynamicUiNode> = {
  metadata: DynamicUiMetadata<TNode>;
  dataByNodeId?: Record<string, unknown>;
  onOpenPage?: (node: TNode) => void;
};

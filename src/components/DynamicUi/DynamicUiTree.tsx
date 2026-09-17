import type { ReactNode } from "react";
import { Card } from "../Card/Card";
import { DynamicUiButton } from "./nodes/DynamicUiButton";
import { DynamicUiButtonLink } from "./nodes/DynamicUiButtonLink";
import { DynamicUiDetail } from "./nodes/DynamicUiDetail";
import { DynamicUiField } from "./nodes/DynamicUiField";
import { DynamicUiForm } from "./nodes/DynamicUiForm";
import { DynamicUiMetric } from "./nodes/DynamicUiMetric";
import { DynamicUiPage } from "./nodes/DynamicUiPage";
import { DynamicUiSection } from "./nodes/DynamicUiSection";
import { DynamicUiTable } from "./nodes/DynamicUiTable";
import { DynamicUiTabs } from "./nodes/DynamicUiTabs";
import { DynamicUiTimeline } from "./nodes/DynamicUiTimeline";
import { getDynamicUiTitle } from "./utils";
import type {
  DynamicUiMetadata,
  DynamicUiNode,
  DynamicUiNodeRendererProps,
  DynamicUiTreeProps,
} from "./types";

export function DynamicUiTree<TNode extends DynamicUiNode>({
  metadata,
  dataByNodeId = {},
  onOpenPage,
}: DynamicUiTreeProps<TNode>) {
  const childrenByParent = groupChildren(metadata);

  const renderNode = (node: TNode): ReactNode => {
    const childNodes = childrenByParent.get(node.id) ?? [];
    const props: DynamicUiNodeRendererProps<TNode> = {
      node,
      title: getDynamicUiTitle(node),
      value: dataByNodeId[node.id],
      childNodes,
      children: childNodes.map(renderNode),
      renderNode,
      onOpenPage,
    };

    switch (node.node_kind) {
      case "button":
        return <DynamicUiButton {...props} />;
      case "field":
        return <DynamicUiField {...props} />;
      case "metric":
        return <DynamicUiMetric {...props} />;
      case "table":
        return <DynamicUiTable {...props} />;
      case "form":
        return <DynamicUiForm {...props} />;
      case "link":
        return <DynamicUiButtonLink {...props} />;
      case "tabs":
        return <DynamicUiTabs {...props} />;
      case "detail":
        return <DynamicUiDetail {...props} />;
      case "timeline":
        return <DynamicUiTimeline {...props} />;
      case "page":
        return <DynamicUiPage {...props} />;
      case "section":
      default:
        return <DynamicUiSection {...props} />;
    }
  };

  return (
    <Card className="space-y-4 border-0 bg-transparent p-0 shadow-none hover:border-transparent dark:bg-transparent">
      {(childrenByParent.get(null) ?? []).map(renderNode)}
    </Card>
  );
}

function groupChildren<TNode extends DynamicUiNode>(metadata: DynamicUiMetadata<TNode>) {
  const childrenByParent = new Map<string | null, TNode[]>();

  for (const node of metadata.nodes) {
    const children = childrenByParent.get(node.parent_id) ?? [];
    children.push(node);
    childrenByParent.set(node.parent_id, children);
  }

  for (const children of childrenByParent.values()) {
    children.sort((left, right) => left.display_order - right.display_order);
  }

  return childrenByParent;
}

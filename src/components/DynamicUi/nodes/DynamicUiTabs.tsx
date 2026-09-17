"use client";

import { useState } from "react";
import { Card } from "../../Card/Card";
import { SegmentedControl } from "../../SegmentedControl/SegmentedControl";
import { Text } from "../../Text/Text";
import { getDynamicUiTitle } from "../utils";
import type { DynamicUiNode, DynamicUiNodeRendererProps } from "../types";

export function DynamicUiTabs<TNode extends DynamicUiNode>({
  title,
  childNodes,
  renderNode,
}: Pick<DynamicUiNodeRendererProps<TNode>, "title" | "childNodes" | "renderNode">) {
  const [selectedNodeId, setSelectedNodeId] = useState(childNodes[0]?.id ?? "");
  const selectedNode = childNodes.find((node) => node.id === selectedNodeId) ?? childNodes[0];

  if (childNodes.length === 0) {
    return (
      <Card className="space-y-3">
        <Text as="h3" variant="body-sm" weight="semibold">
          {title}
        </Text>
      </Card>
    );
  }

  return (
    <Card className="space-y-3">
      <Text as="h3" variant="body-sm" weight="semibold">
        {title}
      </Text>
      <SegmentedControl
        variant="tabs"
        ariaLabel={title}
        options={childNodes.map((node) => ({
          value: node.id,
          label: getDynamicUiTitle(node),
        }))}
        value={selectedNode?.id ?? childNodes[0].id}
        onChange={setSelectedNodeId}
      />
      {selectedNode ? renderNode(selectedNode) : null}
    </Card>
  );
}

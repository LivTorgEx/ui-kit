"use client";

import { useState } from "react";
import { GroupButton } from "../../Field/GroupButton";
import { getDynamicUiTitle } from "../utils";
import type { DynamicUiNode, DynamicUiNodeRendererProps } from "../types";

export function DynamicUiTabs<TNode extends DynamicUiNode>({
  title,
  childNodes,
  renderNode,
}: Pick<DynamicUiNodeRendererProps<TNode>, "title" | "childNodes" | "renderNode">) {
  const [selectedNodeId, setSelectedNodeId] = useState(childNodes[0]?.id ?? "");
  const selectedNode = childNodes.find((node) => node.id === selectedNodeId) ?? childNodes[0];

  if (childNodes.length === 0) return null;

  return (
    <div className="space-y-3">
      <GroupButton
        appearance="pills"
        ariaLabel={title}
        options={childNodes.map((node) => ({
          value: node.id,
          label: getDynamicUiTitle(node),
        }))}
        value={selectedNode?.id ?? childNodes[0].id}
        onChange={setSelectedNodeId}
        size="md"
        controlClassName={
          childNodes.length === 1 ? "w-full [&>button]:w-1/3 [&>button]:flex-none" : "w-full"
        }
      />
      {selectedNode ? renderNode(selectedNode) : null}
    </div>
  );
}

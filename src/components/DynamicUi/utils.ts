import type { DynamicUiNode } from "./types";

export function getDynamicUiTitle(node: DynamicUiNode) {
  return stringValue(node.definition.title) ?? stringValue(node.definition.label) ?? node.ui_key;
}

export function formatDynamicUiValue(value: unknown) {
  if (value == null) return "—";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  try {
    return JSON.stringify(value) ?? "—";
  } catch {
    return String(value);
  }
}

export function isDynamicUiRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringValue(value: unknown) {
  return typeof value === "string" && value.trim() ? value : undefined;
}

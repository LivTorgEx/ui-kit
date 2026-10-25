"use client";

import { useState } from "react";
import { StatTile } from "../../StatTile/StatTile";
import { formatDynamicUiValue, isDynamicUiRecord } from "../utils";
import type { DynamicUiNode, DynamicUiNodeRendererProps } from "../types";

type ProgressMode = "target" | "loss" | "count";
type ProgressTone = "success" | "warning" | "danger" | "info";

type ProgressItem = {
  key: string;
  label: string;
  mode: ProgressMode;
  value_path: string;
  limit_path: string;
  unit?: string;
  tone?: ProgressTone;
};

const toneClasses: Record<ProgressTone, { value: string; bar: string }> = {
  success: { value: "text-emerald-400", bar: "bg-emerald-500" },
  warning: { value: "text-amber-400", bar: "bg-amber-500" },
  danger: { value: "text-rose-400", bar: "bg-rose-500" },
  info: { value: "text-blue-400", bar: "bg-blue-500" },
};

export function DynamicUiMetric<TNode extends DynamicUiNode>({
  node,
  title,
  value,
}: Pick<DynamicUiNodeRendererProps<TNode>, "node" | "title" | "value">) {
  const [selectedRecordKey, setSelectedRecordKey] = useState("");

  if (node.definition.presentation !== "progress_group") {
    return <StatTile label={title} value={formatDynamicUiValue(value)} />;
  }

  const selector = isDynamicUiRecord(node.definition.selector) ? node.definition.selector : {};
  const records = selectRecords(value, selector);
  const selectedRecord = records.find((record) => record.key === selectedRecordKey) ?? records[0];
  const items = Array.isArray(node.definition.progress_items)
    ? node.definition.progress_items.filter(isProgressItem)
    : [];

  if (!selectedRecord) {
    return (
      <section
        aria-label={title}
        className="bg-[#171717] p-5 text-sm text-gray-400 sm:p-6"
      >
        No active challenge found for this account.
      </section>
    );
  }

  return (
    <section aria-label={title} className="bg-[#171717] p-5 sm:p-6">
      {records.length > 1 ? (
        <div className="mb-5 flex justify-end">
          <label className="flex items-center gap-2 text-xs text-gray-500">
            <span>Challenge</span>
            <select
              className="max-w-52 bg-gray-900 px-2 py-1 text-gray-100"
              value={selectedRecord?.key ?? ""}
              onChange={(event) => setSelectedRecordKey(event.target.value)}
            >
              {records.map((record) => (
                <option key={record.key} value={record.key}>
                  {getRecordLabel(record.value)}
                </option>
              ))}
            </select>
          </label>
        </div>
      ) : null}

      <div className="space-y-6">
        {items.map((item) => {
          const current = numericValue(readJsonPointer(selectedRecord.value, item.value_path));
          const limit = numericValue(readJsonPointer(selectedRecord.value, item.limit_path));
          const isUnlimited = item.mode === "target" && (limit == null || limit <= 0);
          const progressValue = getProgressValue(item.mode, current);
          const percent = isUnlimited
            ? 100
            : limit == null || limit <= 0
              ? 0
              : clampPercent((progressValue / limit) * 100);
          const remaining =
            limit == null || limit <= 0
              ? isUnlimited
                ? "∞"
                : "—"
              : formatRemaining(Math.max(limit - progressValue, 0), item.mode);
          const currentDisplay =
            current == null ? "—" : formatAmount(getDisplayValue(item.mode, current), item.mode);
          const limitDisplay = isUnlimited
            ? "∞"
            : limit == null
              ? "—"
              : formatAmount(limit, item.mode);
          const tone = toneClasses[item.tone ?? "info"];
          const unit = item.unit ?? "";
          const remainingLabel =
            item.mode === "count" && Number(remaining) === 1 ? unit.replace(/s$/, "") : unit;

          return (
            <div key={item.key} className="space-y-2">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-sm sm:text-base">
                <span className="text-gray-500 dark:text-gray-400">{item.label}</span>
                <span className={`font-medium ${tone.value}`}>
                  {currentDisplay} / {limitDisplay}
                  {item.mode === "loss" ? ` (${Math.round(percent)}%)` : ""}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-3 text-sm sm:text-base">
                <span className="text-gray-500 dark:text-gray-400">Remaining</span>
                <span className="text-gray-700 dark:text-gray-200">
                  {remaining}
                  {remaining !== "∞" && remaining !== "—" && unit ? ` ${remainingLabel}` : ""}
                </span>
              </div>
              <div
                role="progressbar"
                aria-label={item.label}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percent}
                className="h-2.5 overflow-hidden bg-gray-200 dark:bg-gray-800"
              >
                <div
                  className={`h-full transition-[width] ${tone.bar}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function isProgressItem(value: unknown): value is ProgressItem {
  if (!isDynamicUiRecord(value)) return false;
  return (
    typeof value.key === "string" &&
    typeof value.label === "string" &&
    typeof value.value_path === "string" &&
    typeof value.limit_path === "string" &&
    (value.mode === "target" || value.mode === "loss" || value.mode === "count") &&
    (value.unit === undefined || typeof value.unit === "string") &&
    (value.tone === undefined || isProgressTone(value.tone))
  );
}

function isProgressTone(value: unknown): value is ProgressTone {
  return value === "success" || value === "warning" || value === "danger" || value === "info";
}

function selectRecords(value: unknown, selector: Record<string, unknown>) {
  const collectionPath =
    typeof selector.collection_path === "string" ? selector.collection_path : "";
  const filterPath = typeof selector.filter_path === "string" ? selector.filter_path : undefined;
  const filterValue = selector.filter_value;

  return readJsonPointerMany(value, collectionPath)
    .filter(isDynamicUiRecord)
    .filter((record) => filterPath == null || readJsonPointer(record, filterPath) === filterValue)
    .map((record, index) => ({
      key: getRecordKey(record, index),
      value: record,
    }))
    .sort((left, right) =>
      compareTimestamp(
        readJsonPointer(right.value, "/activeAt"),
        readJsonPointer(left.value, "/activeAt"),
      ),
    );
}

function getRecordKey(record: Record<string, unknown>, index: number) {
  const id = record._id ?? record.id;
  return id == null ? `challenge-${index}` : String(id);
}

function getRecordLabel(record: Record<string, unknown>) {
  const packageName = typeof record.packageName === "string" ? record.packageName : "Challenge";
  const stage = typeof record.activeStage === "number" ? ` · Stage ${record.activeStage}` : "";
  const id = record._id ?? record.id;
  const suffix = typeof id === "string" ? ` · ${id.slice(-6)}` : "";
  return `${packageName}${stage}${suffix}`;
}

function getProgressValue(mode: ProgressMode, current: number | null) {
  if (current == null) return 0;
  if (mode === "target") return Math.max(current, 0);
  if (mode === "loss") return Math.max(-current, 0);
  return Math.max(current, 0);
}

function getDisplayValue(mode: ProgressMode, current: number) {
  if (mode === "target") return Math.max(current, 0);
  if (mode === "loss") return Math.min(current, 0);
  return Math.max(current, 0);
}

function formatAmount(value: number, mode: ProgressMode) {
  if (mode === "count")
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
  if (value === 0) return "0.00";
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value);
}

function formatRemaining(value: number, mode: ProgressMode) {
  const displayValue =
    mode === "count" ? Math.ceil(value) : value >= 100 ? Math.floor(value) : value;
  return formatAmount(displayValue, mode);
}

function numericValue(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string" || value.trim() === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function readJsonPointer(value: unknown, pointer: string) {
  if (pointer === "" || pointer === "/") return value;
  if (!pointer.startsWith("/")) return undefined;

  return pointer
    .slice(1)
    .split("/")
    .map((part) => part.replaceAll("~1", "/").replaceAll("~0", "~"))
    .reduce<unknown>((current, part) => {
      if (Array.isArray(current)) {
        const index = Number(part);
        return Number.isInteger(index) ? current[index] : undefined;
      }
      return isDynamicUiRecord(current) ? current[part] : undefined;
    }, value);
}

function readJsonPointerMany(value: unknown, pointer: string): unknown[] {
  if (pointer === "" || pointer === "/") return [value];
  if (!pointer.startsWith("/")) return [];

  return pointer
    .slice(1)
    .split("/")
    .reduce<unknown[]>(
      (currentValues, rawPart) => {
        const part = rawPart.replaceAll("~1", "/").replaceAll("~0", "~");
        return currentValues.flatMap((current) => {
          if (part === "*") return Array.isArray(current) ? current : [];
          if (Array.isArray(current)) {
            const index = Number(part);
            return Number.isInteger(index) && current[index] !== undefined ? [current[index]] : [];
          }
          return isDynamicUiRecord(current) && current[part] !== undefined ? [current[part]] : [];
        });
      },
      [value],
    );
}

function compareTimestamp(left: unknown, right: unknown) {
  const leftTime = typeof left === "string" ? Date.parse(left) : 0;
  const rightTime = typeof right === "string" ? Date.parse(right) : 0;
  return (Number.isFinite(leftTime) ? leftTime : 0) - (Number.isFinite(rightTime) ? rightTime : 0);
}

function clampPercent(value: number) {
  return Math.min(100, Math.max(0, Number.isFinite(value) ? value : 0));
}

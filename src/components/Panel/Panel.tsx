import { cn } from "../../utils/cn";
import { EmptyState } from "./EmptyState";
import type { ReactNode } from "react";

export type PanelPadding = "none" | "sm" | "md" | "lg";

export interface PanelProps {
  children?: ReactNode;
  title?: ReactNode;
  className?: string;
  padding?: PanelPadding;

  loading?: boolean;
  skeleton?: ReactNode;
  skeletonCount?: number;
  skeletonClassName?: string;

  empty?: boolean;
  emptyIcon?: ReactNode;
  emptyMessage?: ReactNode;
  emptyAction?: ReactNode;
}

const paddingMap: Record<PanelPadding, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

function DefaultSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-4 w-1/3 animate-pulse bg-gray-800 rounded" />
      <div className="h-3 w-2/3 animate-pulse bg-gray-800 rounded" />
      <div className="h-3 w-1/2 animate-pulse bg-gray-800 rounded" />
    </div>
  );
}

export function Panel({
  children,
  title,
  className,
  padding = "md",
  loading = false,
  skeleton,
  skeletonCount = 3,
  skeletonClassName = "space-y-3",
  empty = false,
  emptyIcon,
  emptyMessage,
  emptyAction,
}: PanelProps) {
  const skeletonEl = skeleton ?? <DefaultSkeleton />;

  let body: ReactNode;

  if (loading) {
    body = (
      <div className={skeletonClassName}>
        {Array.from({ length: skeletonCount }, (_, i) => (
          <div key={i}>{skeletonEl}</div>
        ))}
      </div>
    );
  } else if (empty) {
    body = <EmptyState icon={emptyIcon} message={emptyMessage} action={emptyAction} />;
  } else {
    body = children;
  }

  return (
    <div
      className={cn(
        "flex flex-col bg-gray-900 rounded-2xl border border-gray-800",
        paddingMap[padding],
        className,
      )}
    >
      {title && <p className="mb-4 shrink-0 text-sm font-medium text-gray-400">{title}</p>}
      <div className="min-h-0 flex-1">{body}</div>
    </div>
  );
}

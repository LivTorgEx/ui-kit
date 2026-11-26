import { cn } from "../../utils/cn";
import { EmptyState } from "./EmptyState";
import type { ReactNode } from "react";

type PanelPadding = "none" | "sm" | "md" | "lg";
type PanelRadius = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

export interface PanelProps {
  children?: ReactNode;
  title?: ReactNode;
  /** Render the panel as a fieldset with its label on the top border. */
  legend?: ReactNode;
  className?: string;
  padding?: PanelPadding;
  /** Corner radius. Defaults to square. */
  rounded?: PanelRadius;

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

const roundedMap: Record<PanelRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
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
  legend,
  className,
  padding = "md",
  rounded = "none",
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

  const panelClassName = cn(
    "flex flex-col border border-gray-700 bg-gray-900",
    legend !== undefined && legend !== null && "min-w-0",
    paddingMap[padding],
    roundedMap[rounded],
    className,
  );
  const content = (
    <>
      {title ? <p className="mb-4 shrink-0 text-sm font-medium text-gray-400">{title}</p> : null}
      <div className="min-h-0 flex-1">{body}</div>
    </>
  );

  return legend !== undefined && legend !== null ? (
    <fieldset className={panelClassName}>
      <legend className="self-start px-1 text-left">{legend}</legend>
      {content}
    </fieldset>
  ) : (
    <div className={panelClassName}>{content}</div>
  );
}

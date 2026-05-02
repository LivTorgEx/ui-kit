export type SkeletonVariant = "text" | "heading" | "card" | "stat-tile";

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string;
  count?: number;
  className?: string;
}

export function Skeleton({
  variant = "text",
  width = "w-full",
  count = 1,
  className,
}: SkeletonProps) {
  if (variant === "card") {
    return (
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 space-y-3">
        <div className={`h-4 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse w-3/4`} />
        <div className="h-3 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse w-full" />
        <div className="h-3 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse w-5/6" />
        <div className="h-3 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse w-2/3" />
      </div>
    );
  }

  if (variant === "stat-tile") {
    return (
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-3 space-y-1.5">
        <div className="h-3 rounded bg-gray-200 dark:bg-gray-800 animate-pulse w-1/3" />
        <div className="h-7 rounded bg-gray-200 dark:bg-gray-800 animate-pulse w-2/3" />
      </div>
    );
  }

  const heightClass = variant === "heading" ? "h-6" : "h-4";
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`${heightClass} rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse ${className ?? width}`}
        />
      ))}
    </div>
  );
}

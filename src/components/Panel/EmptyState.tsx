import { cn } from "../../utils/cn";
import type { ReactNode } from "react";

export interface EmptyStateProps {
  icon?: ReactNode;
  message?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  message = "Nothing here yet",
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 py-10 text-gray-500 text-sm",
        className,
      )}
    >
      {icon && <div className="text-4xl mb-1">{icon}</div>}
      <p>{message}</p>
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}

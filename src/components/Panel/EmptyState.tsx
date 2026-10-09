import { cn } from "../../utils/cn";
import type { ReactNode } from "react";
import { Text } from "../Text/Text";

export type EmptyStateTone = "muted" | "warning" | "negative";
export type EmptyStateSize = "default" | "compact";

export interface EmptyStateProps {
  icon?: ReactNode;
  message?: ReactNode;
  action?: ReactNode;
  tone?: EmptyStateTone;
  size?: EmptyStateSize;
  bordered?: boolean;
  className?: string;
}

export function EmptyState({
  icon,
  message = "Nothing here yet",
  action,
  tone = "muted",
  size = "default",
  bordered = false,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 text-center",
        size === "compact" ? "py-8" : "py-10",
        bordered && "border-y border-gray-300 px-3 dark:border-gray-700",
        className,
      )}
    >
      {icon && <div className="text-4xl mb-1">{icon}</div>}
      <Text as="p" variant="body-sm" tone={tone}>
        {message}
      </Text>
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}

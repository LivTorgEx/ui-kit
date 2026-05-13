import type { HTMLAttributes } from "react";
import { Button } from "../Button/Button";

export interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
  /** Zero-indexed current page */
  page: number;
  /** Total number of pages (>= 1) */
  totalPages: number;
  /** Called with the new zero-indexed page when the user clicks Previous/Next */
  onPageChange: (page: number) => void;
  /** Label for the Previous button. Defaults to "← Previous". */
  previousLabel?: string;
  /** Label for the Next button. Defaults to "Next →". */
  nextLabel?: string;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  previousLabel = "← Previous",
  nextLabel = "Next →",
  className = "",
  ...rest
}: PaginationProps) {
  const safeTotal = Math.max(1, totalPages);
  const clamped = Math.min(Math.max(0, page), safeTotal - 1);
  const isFirst = clamped === 0;
  const isLast = clamped >= safeTotal - 1;

  return (
    <div
      {...rest}
      className={`flex items-center justify-between gap-3 border-t border-gray-200 dark:border-gray-800 pt-3 ${className}`}
    >
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onPageChange(Math.max(0, clamped - 1))}
        disabled={isFirst}
      >
        {previousLabel}
      </Button>
      <span className="text-xs text-gray-500 dark:text-gray-400">
        Page {clamped + 1} of {safeTotal}
      </span>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onPageChange(Math.min(safeTotal - 1, clamped + 1))}
        disabled={isLast}
      >
        {nextLabel}
      </Button>
    </div>
  );
}

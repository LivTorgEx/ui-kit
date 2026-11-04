import type { HTMLAttributes } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "../Button/Button";

export interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
  /** Zero-indexed current page */
  page: number;
  /** Total number of pages (>= 1) */
  totalPages: number;
  /** Called with the new zero-indexed page when the user clicks Previous/Next */
  onPageChange: (page: number) => void;
  /** Accessible label for the Previous button. */
  previousLabel?: string;
  /** Accessible label for the Next button. */
  nextLabel?: string;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  previousLabel = "Previous page",
  nextLabel = "Next page",
  className = "",
  ...rest
}: PaginationProps) {
  const safeTotal = Math.max(1, totalPages);
  const clamped = Math.min(Math.max(0, page), safeTotal - 1);
  const isFirst = clamped === 0;
  const isLast = clamped >= safeTotal - 1;
  const pageWindowSize = 3;
  const pageWindowStart = Math.max(1, Math.min(clamped - 1, safeTotal - pageWindowSize - 1));
  const pageWindowEnd = Math.min(safeTotal - 1, pageWindowStart + pageWindowSize);
  const pageNumbers =
    safeTotal <= pageWindowSize + 2
      ? Array.from({ length: safeTotal }, (_, index) => index)
      : [
          0,
          ...Array.from(
            { length: pageWindowEnd - pageWindowStart },
            (_, index) => pageWindowStart + index,
          ),
          safeTotal - 1,
        ];
  const hasLeadingGap = pageNumbers[1] > 1;
  const hasTrailingGap = pageNumbers[pageNumbers.length - 2] < safeTotal - 2;

  return (
    <div
      {...rest}
      role="navigation"
      aria-label="Pagination"
      className={`flex items-center justify-center gap-1 ${className}`}
    >
      <Button
        variant="icon-ghost"
        size="xs"
        onClick={() => onPageChange(0)}
        disabled={isFirst}
        aria-label="First page"
        title="First page"
      >
        <ChevronsLeft aria-hidden="true" size={15} />
      </Button>
      <Button
        variant="icon-ghost"
        size="xs"
        onClick={() => onPageChange(Math.max(0, clamped - 1))}
        disabled={isFirst}
        aria-label={previousLabel}
        title={previousLabel}
      >
        <ChevronLeft aria-hidden="true" size={15} />
      </Button>
      {pageNumbers.map((pageNumber, index) => (
        <span key={pageNumber} className="contents">
          {index === 1 && hasLeadingGap ? (
            <span aria-hidden="true" className="px-0.5 text-xs text-gray-500">
              …
            </span>
          ) : null}
          {index === pageNumbers.length - 1 && hasTrailingGap ? (
            <span aria-hidden="true" className="px-0.5 text-xs text-gray-500">
              …
            </span>
          ) : null}
          <Button
            variant={pageNumber === clamped ? "choice-selected" : "icon-ghost"}
            size="xs"
            onClick={() => onPageChange(pageNumber)}
            aria-label={`Page ${pageNumber + 1}`}
            aria-current={pageNumber === clamped ? "page" : undefined}
            className="h-7 min-w-7 px-1.5 tabular-nums"
          >
            {pageNumber + 1}
          </Button>
        </span>
      ))}
      <Button
        variant="icon-ghost"
        size="xs"
        onClick={() => onPageChange(Math.min(safeTotal - 1, clamped + 1))}
        disabled={isLast}
        aria-label={nextLabel}
        title={nextLabel}
      >
        <ChevronRight aria-hidden="true" size={15} />
      </Button>
      <Button
        variant="icon-ghost"
        size="xs"
        onClick={() => onPageChange(safeTotal - 1)}
        disabled={isLast}
        aria-label="Last page"
        title="Last page"
      >
        <ChevronsRight aria-hidden="true" size={15} />
      </Button>
    </div>
  );
}

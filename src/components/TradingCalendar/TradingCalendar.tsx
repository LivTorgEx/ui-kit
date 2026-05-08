import type { CSSProperties, ReactNode } from "react";
import { addMonths, format, isSameMonth, isToday, subMonths } from "date-fns";
import { cn } from "../../utils/cn";

const WEEK_DAYS = [
  { short: "S", full: "Sun" },
  { short: "M", full: "Mon" },
  { short: "T", full: "Tue" },
  { short: "W", full: "Wed" },
  { short: "T", full: "Thu" },
  { short: "F", full: "Fri" },
  { short: "S", full: "Sat" },
] as const;

export type TradingCalendarDayRenderResult = {
  bgClassName?: string;
  bgStyle?: CSSProperties;
  content?: ReactNode;
};

export interface TradingCalendarProps {
  month: Date;
  onMonthChange: (month: Date) => void;
  days: Date[];
  renderDay: (day: Date, dateKey: string, inMonth: boolean) => TradingCalendarDayRenderResult;
  isLoading?: boolean;
  className?: string;
  dayCellClassName?: string;
  /** Tailwind class(es) for day cell min-height. Defaults to responsive `min-h-[70px] sm:min-h-[130px]`. */
  dayCellMinHeightClassName?: string;
}

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M12.5 4.5L7 10l5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M7.5 4.5L13 10l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarSkeleton({ minHeightClassName }: { minHeightClassName: string }) {
  return (
    <div className="grid grid-cols-7 gap-px rounded-xl border border-gray-800 bg-gray-800/80 p-px">
      {Array.from({ length: 35 }, (_, index) => (
        <div
          key={index}
          className={cn("animate-pulse rounded-[10px] bg-gray-900/90", minHeightClassName)}
        />
      ))}
    </div>
  );
}

export function TradingCalendar({
  month,
  onMonthChange,
  days,
  renderDay,
  isLoading = false,
  className,
  dayCellClassName,
  dayCellMinHeightClassName = "min-h-[70px] sm:min-h-[130px]",
}: TradingCalendarProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onMonthChange(subMonths(month, 1))}
          aria-label="Previous month"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-700 bg-gray-900 text-gray-300 transition-colors hover:border-gray-600 hover:text-gray-100"
        >
          <ChevronLeftIcon />
        </button>

        <p className="min-w-[120px] text-center text-sm font-semibold text-gray-100">
          {format(month, "MMMM yyyy")}
        </p>

        <button
          type="button"
          onClick={() => onMonthChange(addMonths(month, 1))}
          aria-label="Next month"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-700 bg-gray-900 text-gray-300 transition-colors hover:border-gray-600 hover:text-gray-100"
        >
          <ChevronRightIcon />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-px rounded-xl border border-gray-800 bg-gray-800/80 p-px">
        {WEEK_DAYS.map((day, i) => (
          <div
            key={i}
            className="rounded-[10px] bg-gray-900/90 py-1 text-center text-[11px] font-semibold uppercase tracking-wide text-gray-500"
          >
            <span className="sm:hidden">{day.short}</span>
            <span className="hidden sm:inline">{day.full}</span>
          </div>
        ))}
      </div>

      {isLoading ? (
        <CalendarSkeleton minHeightClassName={dayCellMinHeightClassName} />
      ) : (
        <div className="grid grid-cols-7 gap-px rounded-xl border border-gray-800 bg-gray-800/80 p-px">
          {days.map((day) => {
            const dateKey = format(day, "yyyy-MM-dd");
            const inMonth = isSameMonth(day, month);
            const today = isToday(day);
            const rendered = renderDay(day, dateKey, inMonth);

            return (
              <div
                key={dateKey}
                className={cn(
                  "rounded-[10px] bg-gray-900/90 p-1 sm:p-2",
                  inMonth ? "opacity-100" : "opacity-35",
                  rendered.bgClassName,
                  dayCellMinHeightClassName,
                  dayCellClassName,
                )}
                style={rendered.bgStyle}
              >
                <div
                  className={cn(
                    "mb-1 inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] leading-none sm:mb-1.5 sm:text-[11px]",
                    today ? "bg-blue-500 text-white font-semibold" : "text-gray-300 font-medium",
                  )}
                >
                  {format(day, "d")}
                </div>

                {rendered.content}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

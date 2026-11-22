"use client";

import { format } from "date-fns";
import { useId, useMemo } from "react";
import { Info } from "lucide-react";
import { cn } from "../../utils/cn";
import { Panel } from "../Panel/Panel";

export interface CalendarDayStats {
  pnl: number;
  fee: number;
  volume: number;
  trades: number;
  rebates?: number;
  funding?: number;
  winCount?: number;
  lossCount?: number;
  grossProfit?: number;
  grossLoss?: number;
}

export interface CalendarStatsPanelProps {
  dayStats: Record<string, CalendarDayStats>;
  month: Date;
  className?: string;
  title?: string;
  currency?: string;
}

function formatSigned(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}`;
}

function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}

function StatSection({
  label,
  value,
  className,
  info,
}: {
  label: string;
  value: string;
  className?: string;
  info?: string;
}) {
  const tooltipId = useId();

  return (
    <Panel padding="sm">
      <div className="flex items-center gap-1">
        <p className="text-[11px] uppercase tracking-[0.08em] text-gray-500">{label}</p>
        {info && (
          <span className="group relative inline-flex">
            <button
              type="button"
              aria-label={`About ${label}`}
              aria-describedby={tooltipId}
              className="inline-flex cursor-help items-center text-gray-500 transition-colors hover:text-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400"
            >
              <Info size={13} aria-hidden="true" />
            </button>
            <span
              id={tooltipId}
              role="tooltip"
              className="pointer-events-none invisible absolute left-0 top-full z-50 mt-2 w-64 rounded-md border border-gray-700 bg-gray-950 px-3 py-2 text-xs font-normal normal-case leading-relaxed tracking-normal text-gray-200 opacity-0 shadow-xl transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
            >
              {info}
            </span>
          </span>
        )}
      </div>
      <p className={cn("mt-1 text-lg font-semibold text-gray-100", className)}>{value}</p>
    </Panel>
  );
}

export function CalendarStatsPanel({
  dayStats,
  month,
  className,
  title = "Performance stats",
  currency = "USDT",
}: CalendarStatsPanelProps) {
  const summary = useMemo(() => {
    const prefix = format(month, "yyyy-MM");
    let totalPnl = 0;
    let totalFee = 0;
    let totalVolume = 0;
    let totalTrades = 0;
    let grossProfit = 0;
    let grossLoss = 0;
    let wins = 0;
    let losses = 0;

    for (const [date, day] of Object.entries(dayStats)) {
      if (!date.startsWith(prefix)) continue;
      totalPnl += day.pnl;
      totalFee += day.fee;
      totalVolume += day.volume;
      totalTrades += day.trades;
      grossProfit += day.grossProfit ?? Math.max(day.pnl, 0);
      grossLoss += day.grossLoss ?? Math.abs(Math.min(day.pnl, 0));
      wins += day.winCount ?? 0;
      losses += day.lossCount ?? 0;
    }

    const totalClosed = wins + losses;
    const winRate = totalClosed > 0 ? (wins / totalClosed) * 100 : null;
    const lossRate = totalClosed > 0 ? (losses / totalClosed) * 100 : null;
    const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : null;

    const avgWin = wins > 0 ? grossProfit / wins : null;
    const avgLoss = losses > 0 ? grossLoss / losses : null;
    const riskReward = avgWin !== null && avgLoss !== null && avgLoss > 0 ? avgWin / avgLoss : null;

    return {
      totalPnl,
      totalFee,
      totalVolume,
      totalTrades,
      winRate,
      lossRate,
      profitFactor,
      riskReward,
    };
  }, [dayStats, month]);

  return (
    <aside className={cn("space-y-3", className)}>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">{title}</p>

      <StatSection
        label="Total PnL"
        value={`${formatSigned(summary.totalPnl)} ${currency}`}
        className={summary.totalPnl >= 0 ? "text-emerald-300" : "text-rose-300"}
        info="Total PnL = realized PnL + funding PnL + net fees. Fees reduce PnL; rebates increase it. Unrealized PnL is excluded."
      />
      <StatSection label="Total fees" value={`${summary.totalFee.toFixed(2)} ${currency}`} />
      <StatSection label="Total volume" value={`${summary.totalVolume.toFixed(2)} ${currency}`} />
      <StatSection label="Trades" value={`${summary.totalTrades}`} />

      <StatSection
        label="Profit factor"
        value={summary.profitFactor !== null ? summary.profitFactor.toFixed(2) : "--"}
      />
      <StatSection
        label="Win rate / Loss rate"
        value={
          summary.winRate !== null && summary.lossRate !== null
            ? `${formatPercent(summary.winRate)} / ${formatPercent(summary.lossRate)}`
            : "--"
        }
      />
      <StatSection
        label="Risk/Reward ratio"
        value={summary.riskReward !== null ? summary.riskReward.toFixed(2) : "--"}
      />
    </aside>
  );
}

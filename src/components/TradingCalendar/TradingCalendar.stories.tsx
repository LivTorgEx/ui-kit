import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { useMemo, useState } from "react";
import { TradingCalendar, type TradingCalendarDayRenderResult } from "./TradingCalendar";

const meta: Meta<typeof TradingCalendar> = {
  title: "Components/TradingCalendar",
  component: TradingCalendar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof TradingCalendar>;

function DemoCalendar() {
  const [month, setMonth] = useState(new Date("2026-05-01"));

  const days = useMemo(
    () =>
      eachDayOfInterval({
        start: startOfWeek(startOfMonth(month), { weekStartsOn: 0 }),
        end: endOfWeek(endOfMonth(month), { weekStartsOn: 0 }),
      }),
    [month],
  );

  const sample = useMemo<Record<string, number>>(
    () => ({
      "2026-05-02": 1.23,
      "2026-05-03": -4.2,
      "2026-05-05": 0.51,
      "2026-05-09": 3.18,
      "2026-05-14": -0.72,
      "2026-05-19": 1.98,
      "2026-05-22": -2.01,
      "2026-05-28": 0.77,
    }),
    [],
  );

  function renderDay(
    _day: Date,
    dateKey: string,
    _inMonth: boolean,
  ): TradingCalendarDayRenderResult {
    const pnl = sample[dateKey];
    if (pnl === undefined) return {};

    return {
      bgClassName: pnl >= 0 ? "bg-emerald-500/10" : "bg-rose-500/10",
      content: (
        <div className="space-y-1">
          <p
            className={`text-[11px] font-semibold ${
              pnl >= 0 ? "text-emerald-300" : "text-rose-300"
            }`}
          >
            {pnl > 0 ? "+" : ""}
            {pnl.toFixed(2)} USDT
          </p>
          <p className="text-[10px] text-gray-500">{format(new Date(dateKey), "EEE")}</p>
        </div>
      ),
    };
  }

  return (
    <div className="max-w-4xl bg-gray-950 p-4 rounded-2xl border border-gray-800">
      <TradingCalendar month={month} onMonthChange={setMonth} days={days} renderDay={renderDay} />
    </div>
  );
}

export const Default: Story = {
  render: () => <DemoCalendar />,
};

export const Loading: Story = {
  render: () => {
    const month = new Date("2026-05-01");
    const days = eachDayOfInterval({
      start: startOfWeek(startOfMonth(month), { weekStartsOn: 0 }),
      end: endOfWeek(endOfMonth(month), { weekStartsOn: 0 }),
    });

    return (
      <div className="max-w-4xl bg-gray-950 p-4 rounded-2xl border border-gray-800">
        <TradingCalendar
          month={month}
          onMonthChange={() => undefined}
          days={days}
          isLoading
          renderDay={() => ({})}
        />
      </div>
    );
  },
};

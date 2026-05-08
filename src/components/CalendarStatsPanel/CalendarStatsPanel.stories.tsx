import type { Meta, StoryObj } from "@storybook/react-vite";
import { CalendarStatsPanel } from "./CalendarStatsPanel";

const meta: Meta<typeof CalendarStatsPanel> = {
  title: "Components/CalendarStatsPanel",
  component: CalendarStatsPanel,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof CalendarStatsPanel>;

const baseStats = {
  "2026-05-01": {
    pnl: 4.2,
    fee: 0.64,
    volume: 1200,
    trades: 9,
    rebates: 0.11,
    funding: -0.08,
    winCount: 6,
    lossCount: 3,
    grossProfit: 5.2,
    grossLoss: 1.0,
  },
  "2026-05-02": {
    pnl: -1.7,
    fee: 0.4,
    volume: 880,
    trades: 7,
    rebates: 0.06,
    funding: -0.02,
    winCount: 2,
    lossCount: 5,
    grossProfit: 1.1,
    grossLoss: 2.8,
  },
  "2026-05-03": {
    pnl: 2.6,
    fee: 0.33,
    volume: 660,
    trades: 5,
    rebates: 0.04,
    funding: 0.03,
    winCount: 4,
    lossCount: 1,
    grossProfit: 2.8,
    grossLoss: 0.2,
  },
};

export const Default: Story = {
  args: {
    month: new Date("2026-05-01"),
    dayStats: baseStats,
  },
  render: (args) => (
    <div className="max-w-xs rounded-2xl border border-gray-800 bg-gray-950 p-4">
      <CalendarStatsPanel {...args} />
    </div>
  ),
};

export const EmptyMonth: Story = {
  args: {
    month: new Date("2026-06-01"),
    dayStats: baseStats,
  },
  render: (args) => (
    <div className="max-w-xs rounded-2xl border border-gray-800 bg-gray-950 p-4">
      <CalendarStatsPanel {...args} />
    </div>
  ),
};

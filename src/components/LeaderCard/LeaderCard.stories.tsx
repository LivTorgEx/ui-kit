import type { Meta, StoryObj } from "@storybook/react-vite";
import { LeaderCard } from "./LeaderCard";

const meta: Meta<typeof LeaderCard> = {
  title: "Components/LeaderCard",
  component: LeaderCard,
  tags: ["autodocs"],
  argTypes: {
    strategyName: { control: "text" },
    name: { control: "text" },
    userName: { control: "text" },
    description: { control: "text" },
    apr: { control: { type: "number", step: 0.1 } },
    pnl: { control: { type: "number", step: 100 } },
    subscriberCount: { control: { type: "number", min: 0 } },
    maxSubscribers: { control: { type: "number", min: 1 } },
    href: { control: "text" },
  },
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof LeaderCard>;

export const Default: Story = {
  args: {
    strategyName: "EMA Trend Follower",
    name: "Alpha Momentum",
    userName: "trader_pro",
    description:
      "Rides sustained trends by entering on EMA crossovers. Designed to stay in winning trades and cut losers early.",
    apr: 42.18,
    pnl: 12450.5,
    subscriberCount: 84,
    maxSubscribers: 100,
    href: "/leaders/1",
  },
};

export const FullCommunity: Story = {
  args: {
    strategyName: "RSI Mean Reversion",
    name: "Dip Hunter",
    userName: "reversal_king",
    description: "Buys oversold dips and sells overbought peaks using RSI signals.",
    apr: 28.4,
    pnl: 8200.0,
    subscriberCount: 50,
    maxSubscribers: 50,
    href: "/leaders/2",
  },
};

export const Negative: Story = {
  args: {
    strategyName: "Breakout Strategy",
    name: "Volatile Edge",
    userName: "vol_trader",
    description: "High-risk breakout entries on volume spikes.",
    apr: -5.2,
    pnl: -1340.0,
    subscriberCount: 12,
    maxSubscribers: 30,
    href: "/leaders/3",
  },
};

export const NoDescription: Story = {
  args: {
    strategyName: "Grid Strategy",
    name: "Steady Grid",
    userName: "grid_master",
    apr: 18.5,
    pnl: 5600.0,
    subscriberCount: 20,
    maxSubscribers: 40,
    href: "/leaders/4",
  },
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-gray-950 rounded-2xl border border-gray-800">
      <LeaderCard
        strategyName="EMA Trend"
        name="Alpha Momentum"
        userName="trader_pro"
        description="Rides sustained trends using EMA crossovers."
        apr={42.18}
        pnl={12450.5}
        subscriberCount={84}
        maxSubscribers={100}
        href="/leaders/1"
      />
      <LeaderCard
        strategyName="RSI Reversion"
        name="Dip Hunter"
        userName="reversal_king"
        apr={28.4}
        pnl={8200}
        subscriberCount={50}
        maxSubscribers={50}
        href="/leaders/2"
      />
      <LeaderCard
        strategyName="Breakout"
        name="Volatile Edge"
        userName="vol_trader"
        description="High-risk breakout entries on volume spikes."
        apr={-5.2}
        pnl={-1340}
        subscriberCount={12}
        maxSubscribers={30}
        href="/leaders/3"
      />
    </div>
  ),
};

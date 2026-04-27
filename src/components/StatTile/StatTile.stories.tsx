import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatTile } from "./StatTile";

const meta: Meta<typeof StatTile> = {
  title: "Components/StatTile",
  component: StatTile,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["highlight", "neutral", "profit", "loss"] },
    label: { control: "text" },
    value: { control: "text" },
    delta: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof StatTile>;

export const Highlight: Story = {
  args: { variant: "highlight", label: "Total Equity", value: "$12,450.00" },
};
export const Neutral: Story = {
  args: { variant: "neutral", label: "Available", value: "$8,200.00" },
};
export const Profit: Story = {
  args: { variant: "profit", label: "PnL Today", value: "+$340.20", delta: "+2.8%" },
};
export const Loss: Story = {
  args: { variant: "loss", label: "Drawdown", value: "−$90.50", delta: "−0.7%" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-3 p-6 max-w-md bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
      <StatTile variant="highlight" label="Total Equity" value="$12,450.00" />
      <StatTile variant="neutral" label="Available" value="$8,200.00" />
      <StatTile variant="profit" label="PnL Today" value="+$340.20" delta="+2.8%" />
      <StatTile variant="loss" label="Drawdown" value="−$90.50" delta="−0.7%" />
    </div>
  ),
};

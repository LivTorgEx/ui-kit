import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatCard } from "./StatCard";

const meta: Meta<typeof StatCard> = {
  title: "Components/StatCard",
  component: StatCard,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    sub: { control: "text" },
  },
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Default: Story = {
  args: { label: "Total PnL", value: "+$12,450.00" },
};

export const WithSub: Story = {
  args: { label: "APR", value: "+42.18%", sub: "Since Jan 2025" },
};

export const Negative: Story = {
  args: { label: "Drawdown", value: "-8.3%", sub: "Max in 30 days" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 p-6 max-w-md bg-gray-950 rounded-2xl border border-gray-800">
      <StatCard label="Total PnL" value="+$12,450.00" sub="All time" />
      <StatCard label="APR" value="+42.18%" />
      <StatCard label="Drawdown" value="-8.3%" sub="Max 30d" />
      <StatCard label="Subscribers" value="84" sub="of 100 slots" />
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react-vite";

import { SymbolView } from "./SymbolView";

const meta: Meta<typeof SymbolView> = {
  title: "Components/SymbolView",
  component: SymbolView,
  tags: ["autodocs"],
  argTypes: {
    name: { control: "text" },
    instrumentType: { control: "text" },
    selected: { control: "boolean" },
    size: { control: "select", options: ["sm", "md"] },
  },
};

export default meta;
type Story = StoryObj<typeof SymbolView>;

export const Default: Story = {
  args: {
    name: "BTC/USDT",
    instrumentType: "SWAP",
  },
};

export const Selected: Story = {
  args: {
    name: "ANTHROPIC/USDT",
    instrumentType: "SWAP",
    selected: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-3 bg-gray-950 p-6">
      <SymbolView name="BTC/USDT" instrumentType="SWAP" size="sm" />
      <SymbolView name="ANTHROPIC/USDT" instrumentType="SWAP" selected />
    </div>
  ),
};

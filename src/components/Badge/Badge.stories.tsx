import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["active", "profit", "loss", "neutral", "warning", "tba", "popular"],
    },
    children: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Active: Story = { args: { variant: "active", children: "Active" } };
export const Profit: Story = { args: { variant: "profit", children: "+12.4%" } };
export const Loss: Story = { args: { variant: "loss", children: "−3.1%" } };
export const Neutral: Story = { args: { variant: "neutral", children: "Stopped" } };
export const Warning: Story = { args: { variant: "warning", children: "Paused" } };
export const Tba: Story = { args: { variant: "tba", children: "TBA" } };
export const Popular: Story = { args: { variant: "popular", children: "Most Popular" } };

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
      <Badge variant="active">Active</Badge>
      <Badge variant="profit">+12.4%</Badge>
      <Badge variant="loss">−3.1%</Badge>
      <Badge variant="neutral">Stopped</Badge>
      <Badge variant="warning">Paused</Badge>
      <Badge variant="tba">TBA</Badge>
      <Badge variant="popular">Most Popular</Badge>
    </div>
  ),
};

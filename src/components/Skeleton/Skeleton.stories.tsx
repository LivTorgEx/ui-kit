import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["text", "heading", "card", "stat-tile"] },
    count: { control: { type: "number", min: 1, max: 10 } },
    width: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = { args: { variant: "text", count: 3 } };
export const Heading: Story = { args: { variant: "heading" } };
export const CardVariant: Story = { args: { variant: "card" } };
export const StatTileVariant: Story = { args: { variant: "stat-tile" } };

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-6 max-w-sm bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
      <Skeleton variant="heading" />
      <Skeleton variant="text" count={3} />
      <Skeleton variant="card" />
      <Skeleton variant="stat-tile" />
    </div>
  ),
};

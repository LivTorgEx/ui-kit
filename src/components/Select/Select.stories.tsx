import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";

const EXAMPLE_OPTIONS = [
  { value: "btc", label: "BTC / USDT" },
  { value: "eth", label: "ETH / USDT" },
  { value: "sol", label: "SOL / USDT" },
];

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    error: { control: "boolean" },
    helperText: { control: "text" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: { label: "Symbol", options: EXAMPLE_OPTIONS },
};

export const ErrorState: Story = {
  args: {
    label: "Exchange",
    options: EXAMPLE_OPTIONS,
    error: true,
    helperText: "Please select an exchange.",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-6 max-w-sm bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
      <Select label="Default" options={EXAMPLE_OPTIONS} />
      <Select label="Error" options={EXAMPLE_OPTIONS} error helperText="Required." />
    </div>
  ),
};

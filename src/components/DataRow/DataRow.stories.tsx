import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataRow } from "./DataRow";

const meta: Meta<typeof DataRow> = {
  title: "Components/DataRow",
  component: DataRow,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    subleft: { control: "text" },
    subright: { control: "text" },
    delta: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof DataRow>;

export const Default: Story = {
  args: { label: "API Key #1", value: "$5,230.00" },
};
export const WithSubs: Story = {
  args: {
    label: "API Key #1",
    value: "$5,230.00",
    subleft: "USDT",
    subright: "Available $4,100.00",
  },
};
export const WithDelta: Story = {
  args: {
    label: "API Key #2",
    value: "$3,120.50",
    subleft: "USDT",
    subright: "Available $2,800.00",
    delta: "+5.2%",
  },
};

export const List: Story = {
  render: () => (
    <div className="flex flex-col gap-2 p-6 max-w-sm bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
      {[
        {
          label: "API Key #1",
          value: "$5,230.00",
          subleft: "USDT",
          subright: "Available $4,100.00",
          delta: "+5.2%",
        },
        {
          label: "API Key #2",
          value: "$3,120.50",
          subleft: "USDT",
          subright: "Available $2,800.00",
          delta: "+1.8%",
        },
        {
          label: "API Key #3",
          value: "$1,200.00",
          subleft: "BTC",
          subright: "Available $900.00",
          delta: "−0.4%",
        },
      ].map((row) => (
        <DataRow key={row.label} {...row} />
      ))}
    </div>
  ),
};

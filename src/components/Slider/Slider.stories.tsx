import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    size: { control: "select", options: ["sm", "md"] },
    direction: { control: "select", options: [undefined, "long", "short"] },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    "aria-label": "Allocation percentage",
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    marks: [0, 25, 50, 75, 100].map((value) => ({
      value,
      label: `${value}%`,
    })),
  },
};

export const Disabled: Story = {
  args: {
    "aria-label": "Allocation percentage",
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 25,
    disabled: true,
    marks: [0, 25, 50, 75, 100].map((value) => ({
      value,
      label: `${value}%`,
    })),
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <div>
        <p className="mb-1 text-sm text-gray-700 dark:text-gray-200">Small</p>
        <Slider aria-label="Small slider" size="sm" defaultValue={35} />
      </div>
      <div>
        <p className="mb-1 text-sm text-gray-700 dark:text-gray-200">Medium</p>
        <Slider aria-label="Medium slider" size="md" defaultValue={65} />
      </div>
    </div>
  ),
};

export const TradingDirections: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <div>
        <p className="mb-1 text-sm text-gray-700 dark:text-gray-200">Long</p>
        <Slider
          aria-label="Long grid progress"
          size="sm"
          min={0}
          max={10}
          value={6}
          direction="long"
          readOnly
          className="pointer-events-none cursor-default"
        />
      </div>
      <div>
        <p className="mb-1 text-sm text-gray-700 dark:text-gray-200">Short</p>
        <Slider
          aria-label="Short grid progress"
          size="sm"
          min={0}
          max={10}
          value={3}
          direction="short"
          readOnly
          className="pointer-events-none cursor-default"
        />
      </div>
    </div>
  ),
};

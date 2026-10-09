import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
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

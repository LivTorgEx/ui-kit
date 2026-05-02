import type { Meta, StoryObj } from "@storybook/react-vite";
import { Logo } from "./Logo";

const meta: Meta<typeof Logo> = {
  title: "Components/Logo",
  component: Logo,
  tags: ["autodocs"],
  argTypes: {
    background: { control: "text" },
    className: { control: "text" },
    width: { control: "number" },
    height: { control: "number" },
  },
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const LightMode: Story = {
  args: { width: 80, height: 80, background: "white" },
  parameters: { backgrounds: { default: "light" } },
};

export const DarkMode: Story = {
  args: { width: 80, height: 80, background: "transparent", className: "text-white" },
  parameters: { backgrounds: { default: "dark" } },
};

export const Branded: Story = {
  args: {
    width: 80,
    height: 80,
    background: "transparent",
    className: "text-[#122647]",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-6 p-6 bg-white rounded-2xl border border-gray-200 flex-wrap">
      <Logo width={32} height={32} />
      <Logo width={48} height={48} />
      <Logo width={64} height={64} />
      <Logo width={96} height={96} />
      <Logo width={128} height={128} />
    </div>
  ),
};

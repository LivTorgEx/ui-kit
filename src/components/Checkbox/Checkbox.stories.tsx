import type { Meta, StoryObj } from "@storybook/react-vite";

import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    defaultChecked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = {
  args: { "aria-label": "Enable notifications" },
};

export const Checked: Story = {
  args: { "aria-label": "Enable notifications", defaultChecked: true },
};

export const Disabled: Story = {
  args: { "aria-label": "Enable notifications", defaultChecked: true, disabled: true },
};

export const WithLabel: Story = {
  render: (args) => (
    <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
      <Checkbox {...args} />
      Enable notifications
    </label>
  ),
};

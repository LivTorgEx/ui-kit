import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "ghost", "danger"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: "primary", children: "Primary Button" } };
export const Secondary: Story = { args: { variant: "secondary", children: "Secondary Button" } };
export const Ghost: Story = { args: { variant: "ghost", children: "Ghost Button" } };
export const Danger: Story = { args: { variant: "danger", children: "Danger Button" } };
export const Disabled: Story = {
  args: { variant: "primary", children: "Disabled", disabled: true },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="primary" disabled>
        Disabled
      </Button>
      <Button variant="primary" size="sm">
        Small
      </Button>
      <Button variant="primary" size="lg">
        Large
      </Button>
    </div>
  ),
};

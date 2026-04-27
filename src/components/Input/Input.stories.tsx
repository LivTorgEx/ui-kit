import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    helperText: { control: "text" },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { label: "API Key", placeholder: "Enter your API key" },
};

export const WithHelperText: Story = {
  args: { label: "Amount", placeholder: "0.00", helperText: "Minimum order: $10" },
};

export const ErrorState: Story = {
  args: {
    label: "Email",
    defaultValue: "invalid-email",
    error: true,
    helperText: "Please enter a valid email address.",
  },
};

export const Disabled: Story = {
  args: { label: "Read only", defaultValue: "Cannot edit", disabled: true },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-6 max-w-sm bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
      <Input label="Default" placeholder="Placeholder text" />
      <Input label="With helper" placeholder="0.00" helperText="Minimum order: $10" />
      <Input label="Error" defaultValue="Bad value" error helperText="This field is required." />
      <Input label="Disabled" defaultValue="Read only" disabled />
    </div>
  ),
};

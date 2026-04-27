import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["info", "success", "warning", "error"] },
    title: { control: "text" },
    children: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: {
    variant: "info",
    title: "Info",
    children: "Your bot is running and monitoring the market.",
  },
};
export const Success: Story = {
  args: { variant: "success", title: "Success", children: "Order executed at $42,300.00." },
};
export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Warning",
    children: "API rate limit approaching — 80% used.",
  },
};
export const Error: Story = {
  args: { variant: "error", title: "Error", children: "Failed to connect to exchange API." },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-6 max-w-lg bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
      <Alert variant="info" title="Info">
        Your bot is running and monitoring the market.
      </Alert>
      <Alert variant="success" title="Success">
        Order executed at $42,300.00.
      </Alert>
      <Alert variant="warning" title="Warning">
        API rate limit approaching — 80% used.
      </Alert>
      <Alert variant="error" title="Error">
        Failed to connect to exchange API. Check your credentials.
      </Alert>
    </div>
  ),
};

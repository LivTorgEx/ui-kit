import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <div className="text-2xl mb-3">📈</div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Strategy Name</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Brief description of the strategy or feature goes here.
        </p>
      </div>
    ),
  },
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 max-w-2xl">
      {["📈 Growth", "🤖 Automation", "📊 Analytics"].map((item) => (
        <Card key={item}>
          <p className="font-semibold text-gray-900 dark:text-white">{item}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Short description</p>
        </Card>
      ))}
    </div>
  ),
};

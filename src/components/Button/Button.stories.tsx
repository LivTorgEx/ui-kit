import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "ghost", "danger", "icon"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    block: { control: "boolean" },
    children: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: "primary", children: "Primary Button" } };
export const Secondary: Story = { args: { variant: "secondary", children: "Secondary Button" } };
export const Ghost: Story = { args: { variant: "ghost", children: "Ghost Button" } };
export const Danger: Story = { args: { variant: "danger", children: "Danger Button" } };
export const Icon: Story = { args: { variant: "icon", children: "I" } };
export const Disabled: Story = {
  args: { variant: "primary", children: "Disabled", disabled: true },
};

export const BlockRow: Story = {
  render: () => (
    <div className="max-w-sm rounded-2xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
      <Button variant="ghost" block className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
        <span className="text-sm font-semibold text-gray-900 dark:text-white">
          Account settings
        </span>
        <span className="text-xs text-gray-500">Manage profile, security and API keys</span>
      </Button>
      <Button variant="ghost" block className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
        <span className="text-sm font-semibold text-gray-900 dark:text-white">Billing</span>
        <span className="text-xs text-gray-500">Plan, invoices and payment methods</span>
      </Button>
    </div>
  ),
};

export const BlockCalendarCell: Story = {
  render: () => (
    <div className="grid w-72 grid-cols-3 gap-px rounded-xl border border-gray-800 bg-gray-800 p-px">
      {[
        { day: 4, pnl: "+12.40" },
        { day: 5, pnl: "−3.15" },
        { day: 6, pnl: "+44.02" },
      ].map(({ day, pnl }) => (
        <div key={day} className="min-h-[100px] rounded-[10px] bg-gray-900/90 p-1">
          <div className="mb-1 inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] text-gray-300">
            {day}
          </div>
          <Button variant="ghost" block className="gap-0.5 p-1 text-current hover:bg-white/5">
            <span
              className={
                pnl.startsWith("+")
                  ? "text-[11px] font-semibold text-emerald-300"
                  : "text-[11px] font-semibold text-rose-300"
              }
            >
              {pnl} USDT
            </span>
            <span className="text-[10px] text-gray-500">vol 320</span>
          </Button>
        </div>
      ))}
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="icon" aria-label="Icon">
        I
      </Button>
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

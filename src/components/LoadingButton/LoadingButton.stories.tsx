import type { Meta, StoryObj } from "@storybook/react-vite";
import { LoadingButton } from "./LoadingButton";

const meta: Meta<typeof LoadingButton> = {
  title: "Components/LoadingButton",
  component: LoadingButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger", "success", "ghost", "icon"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof LoadingButton>;

export const Primary: Story = {
  args: { variant: "primary", children: "Save Changes" },
};

export const Loading: Story = {
  args: { variant: "primary", loading: true, children: "Saving…" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Cancel" },
};

export const Danger: Story = {
  args: { variant: "danger", children: "Delete" },
};

export const Success: Story = {
  args: { variant: "success", children: "Confirmed" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Skip" },
};

export const Icon: Story = {
  args: { variant: "icon", children: "I" },
};

export const Disabled: Story = {
  args: { variant: "primary", disabled: true, children: "Unavailable" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-6 bg-gray-950 rounded-2xl border border-gray-800">
      <LoadingButton variant="primary">Primary</LoadingButton>
      <LoadingButton variant="secondary">Secondary</LoadingButton>
      <LoadingButton variant="danger">Danger</LoadingButton>
      <LoadingButton variant="success">Success</LoadingButton>
      <LoadingButton variant="ghost">Ghost</LoadingButton>
      <LoadingButton variant="icon" aria-label="Icon">
        I
      </LoadingButton>
      <LoadingButton variant="primary" loading>
        Loading…
      </LoadingButton>
      <LoadingButton variant="primary" disabled>
        Disabled
      </LoadingButton>
    </div>
  ),
};

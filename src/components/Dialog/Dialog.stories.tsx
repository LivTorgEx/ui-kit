import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../Button/Button";
import { Dialog } from "./Dialog";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  argTypes: {
    open: { control: "boolean" },
    size: { control: "select", options: ["sm", "md", "lg"] },
    fullScreen: { control: "select", options: [false, "auto", "always"] },
    onOpenChange: { control: false },
    children: { control: "text" },
    actions: { control: false },
  },
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  args: {
    open: true,
    onOpenChange: () => undefined,
    title: "Review changes",
    description: "Confirm the updated settings before applying them.",
    children: "The dialog content appears here.",
    actions: (
      <div className="flex justify-end gap-2 border-t border-gray-800 p-3">
        <Button variant="secondary">Cancel</Button>
        <Button>Confirm</Button>
      </div>
    ),
  },
};

export const FullScreenOnSmallScreens: Story = {
  args: {
    ...Default.args,
    fullScreen: "auto",
    title: "Mobile review",
    children: (
      <div className="space-y-3">
        <p>On small screens this dialog fills the viewport.</p>
        <p>On larger screens it keeps its standard dialog size.</p>
      </div>
    ),
  },
};

export const AlwaysFullScreen: Story = {
  args: {
    ...Default.args,
    fullScreen: "always",
    title: "Full screen review",
  },
};

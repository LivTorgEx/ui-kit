import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Drawer } from "./Drawer";
import { Button } from "../Button/Button";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  argTypes: {
    side: {
      control: "select",
      options: ["right", "left", "bottom", "top"],
    },
    mobileLayout: {
      control: "select",
      options: ["sheet", "side"],
    },
    widthClassName: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

type ControlledArgs = React.ComponentProps<typeof Drawer>;
type StoryArgs = Omit<ControlledArgs, "open" | "onClose" | "children" | "title">;

function ControlledDrawer(args: StoryArgs) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-[60vh]">
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        title={
          <div>
            <p className="text-[10px] uppercase tracking-[0.12em] text-gray-500">Section</p>
            <p className="text-base font-semibold leading-tight">Drawer header</p>
          </div>
        }
      >
        <div className="space-y-3 p-4 text-sm text-gray-600 dark:text-gray-300">
          <p>
            This is the body content of the drawer. It scrolls when long. Press Escape, tap the
            backdrop, or click ✕ to close.
          </p>
          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i}>Sample row {i + 1}</p>
          ))}
        </div>
      </Drawer>
    </div>
  );
}

export const RightSide: Story = {
  render: (args) => <ControlledDrawer {...args} />,
  args: { side: "right", mobileLayout: "sheet" },
};

export const LeftSide: Story = {
  render: (args) => <ControlledDrawer {...args} />,
  args: { side: "left", mobileLayout: "sheet" },
};

export const BottomSheet: Story = {
  render: (args) => <ControlledDrawer {...args} />,
  args: { side: "bottom", mobileLayout: "sheet" },
};

export const SideOnMobile: Story = {
  render: (args) => <ControlledDrawer {...args} />,
  args: { side: "right", mobileLayout: "side" },
};

export const NoTitle: Story = {
  render: () => {
    const Inner = () => {
      const [open, setOpen] = useState(false);
      return (
        <div className="min-h-[60vh]">
          <Button onClick={() => setOpen(true)}>Open</Button>
          <Drawer open={open} onClose={() => setOpen(false)}>
            <div className="space-y-3 p-4 text-sm">
              <p>No header — body fills the panel.</p>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Dismiss
              </Button>
            </div>
          </Drawer>
        </div>
      );
    };
    return <Inner />;
  },
};

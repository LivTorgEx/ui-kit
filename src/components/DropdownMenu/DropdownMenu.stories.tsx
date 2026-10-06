import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button/Button";
import { DropdownMenu } from "./DropdownMenu";

const meta = {
  title: "Components/DropdownMenu",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Compact: Story = {
  render: function CompactDropdownStory() {
    const [value, setValue] = useState<"trigger" | "oco">("trigger");

    return (
      <DropdownMenu<"trigger" | "oco">
        value={value}
        size="compact"
        align="start"
        menuLabel="Conditional order type"
        options={[
          {
            value: "trigger",
            label: "Trigger",
            description: "Place one stop loss or take profit",
          },
          {
            value: "oco",
            label: "SL/TP (OCO)",
            description: "Place linked stop loss and take profit",
          },
        ]}
        onValueChange={setValue}
        renderTrigger={({ open }) => (
          <Button
            variant="secondary"
            size="sm"
            aria-haspopup="menu"
            aria-expanded={open}
            className="min-w-32 justify-between"
          >
            {value === "oco" ? "SL/TP" : "Trigger"}
            <ChevronDown className="h-3 w-3" />
          </Button>
        )}
      />
    );
  },
};

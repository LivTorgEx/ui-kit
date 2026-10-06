import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tab } from "./Tab";
import { TabDropdown } from "./TabDropdown";
import { Tabs } from "./Tabs";

const meta = {
  title: "Components/Tabs",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithDropdown: Story = {
  render: function TabsWithDropdownStory() {
    const [orderType, setOrderType] = useState<"limit" | "market">("market");
    const [conditionalType, setConditionalType] = useState<"trigger" | "oco">("trigger");
    const [isConditionalSelected, setIsConditionalSelected] = useState(false);

    return (
      <Tabs ariaLabel="Order type">
        <Tab
          selected={orderType === "limit"}
          onClick={() => {
            setOrderType("limit");
            setIsConditionalSelected(false);
          }}
        >
          Limit
        </Tab>
        <Tab
          selected={orderType === "market"}
          onClick={() => {
            setOrderType("market");
            setIsConditionalSelected(false);
          }}
        >
          Market
        </Tab>
        <TabDropdown<"trigger" | "oco">
          value={conditionalType}
          selected={isConditionalSelected}
          ariaLabel="Conditional order type"
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
          onValueChange={(value) => {
            setConditionalType(value);
            setIsConditionalSelected(true);
          }}
        >
          {conditionalType === "oco" ? "SL/TP" : "Trigger"}
        </TabDropdown>
      </Tabs>
    );
  },
};

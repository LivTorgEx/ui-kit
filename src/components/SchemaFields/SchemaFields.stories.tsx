import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SchemaFields } from "./SchemaFields";
import type { SchemaFieldValue } from "./SchemaFields";

const meta: Meta<typeof SchemaFields> = {
  title: "Components/SchemaFields",
  component: SchemaFields,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="max-w-md border border-gray-800 bg-black p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SchemaFields>;

function WorkflowInputsExample() {
  const [values, setValues] = useState<Record<string, SchemaFieldValue>>({
    risk: "1.5",
    mode: "isolated",
    reduce_only: false,
    filters: '{\n  "volume": 100\n}',
  });

  return (
    <SchemaFields
      schema={{
        required: ["risk", "mode"],
        properties: {
          risk: {
            type: "number",
            title: "Risk percent",
            description: "Percent of available balance.",
          },
          mode: {
            type: "string",
            title: "Margin mode",
            enum: [
              { value: "cross", label: "Cross margin" },
              { value: "isolated", label: "Isolated margin" },
            ],
          },
          reduce_only: { type: "boolean", title: "Reduce only" },
          filters: { type: "object", title: "Filters" },
          sizing: {
            title: "Sizing method",
            any_of: [
              { type: "number", title: "Fixed amount" },
              { type: "string", title: "Percent of balance" },
            ],
          },
        },
      }}
      values={values}
      onChange={(name, value) => setValues((current) => ({ ...current, [name]: value }))}
    />
  );
}

export const WorkflowInputs: Story = {
  render: () => <WorkflowInputsExample />,
};

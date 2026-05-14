import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AutocompleteMultiselect } from "./AutocompleteMultiselect";

const TOKEN_OPTIONS = [
  { value: "BTCUSDT", label: "BTC / USDT", hint: "Binance · perp" },
  { value: "ETHUSDT", label: "ETH / USDT", hint: "Binance · perp" },
  { value: "SOLUSDT", label: "SOL / USDT", hint: "Binance · perp" },
  { value: "ARBUSDT", label: "ARB / USDT", hint: "Binance · perp" },
  { value: "DOGEUSDT", label: "DOGE / USDT", hint: "Binance · perp" },
  { value: "AVAXUSDT", label: "AVAX / USDT", hint: "Binance · perp" },
  { value: "LINKUSDT", label: "LINK / USDT", hint: "Binance · perp" },
  { value: "OPUSDT", label: "OP / USDT", hint: "Binance · perp" },
];

const API_KEY_OPTIONS = [
  { value: 1, label: "Main account", hint: "Binance" },
  { value: 2, label: "Hedge book", hint: "OKX" },
  { value: 3, label: "Sandbox", hint: "Bybit" },
];

type StringStoryProps = Omit<
  React.ComponentProps<typeof AutocompleteMultiselect<string>>,
  "selected" | "onChange"
> & {
  initial?: string[];
};

function StringStory({ initial = [], ...args }: StringStoryProps) {
  const [selected, setSelected] = useState<string[]>(initial);
  return (
    <div className="max-w-sm">
      <AutocompleteMultiselect<string> {...args} selected={selected} onChange={setSelected} />
    </div>
  );
}

type NumberStoryProps = Omit<
  React.ComponentProps<typeof AutocompleteMultiselect<number>>,
  "selected" | "onChange"
> & {
  initial?: number[];
};

function NumberStory({ initial = [], ...args }: NumberStoryProps) {
  const [selected, setSelected] = useState<number[]>(initial);
  return (
    <div className="max-w-sm">
      <AutocompleteMultiselect<number> {...args} selected={selected} onChange={setSelected} />
    </div>
  );
}

const meta: Meta<typeof AutocompleteMultiselect<string>> = {
  title: "Components/AutocompleteMultiselect",
  component: AutocompleteMultiselect,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    emptyText: { control: "text" },
    helperText: { control: "text" },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    maxChips: { control: { type: "number", min: 1, max: 10 } },
  },
};

export default meta;
type Story = StoryObj<typeof AutocompleteMultiselect<string>>;

export const Default: Story = {
  render: (args) => <StringStory {...args} options={TOKEN_OPTIONS} initial={[]} />,
  args: { label: "Tokens", placeholder: "Search tokens..." },
};

export const Preselected: Story = {
  render: (args) => (
    <StringStory {...args} options={TOKEN_OPTIONS} initial={["BTCUSDT", "ETHUSDT", "SOLUSDT"]} />
  ),
  args: { label: "Tokens", placeholder: "Search tokens...", maxChips: 3 },
};

export const ManyChipsOverflow: Story = {
  render: (args) => (
    <StringStory
      {...args}
      options={TOKEN_OPTIONS}
      initial={["BTCUSDT", "ETHUSDT", "SOLUSDT", "ARBUSDT", "DOGEUSDT", "AVAXUSDT"]}
    />
  ),
  args: { label: "Tokens", maxChips: 2, placeholder: "Search..." },
};

export const NumericValues: StoryObj<typeof AutocompleteMultiselect<number>> = {
  render: (args) => <NumberStory {...args} options={API_KEY_OPTIONS} />,
  args: { label: "API keys", placeholder: "Search API keys..." },
};

export const ErrorState: Story = {
  render: (args) => <StringStory {...args} options={TOKEN_OPTIONS} />,
  args: {
    label: "Tokens",
    error: true,
    helperText: "Pick at least one token.",
  },
};

export const Disabled: Story = {
  render: (args) => <StringStory {...args} options={TOKEN_OPTIONS} initial={["BTCUSDT"]} />,
  args: { label: "Tokens (frozen)", disabled: true },
};

export const EmptyOptions: Story = {
  render: (args) => <StringStory {...args} options={[]} />,
  args: { label: "Tokens", emptyText: "No tokens available." },
};

function AllVariantsStory() {
  const [tokens, setTokens] = useState<string[]>([]);
  const [apiKeys, setApiKeys] = useState<number[]>([1]);
  return (
    <div className="flex max-w-sm flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <AutocompleteMultiselect<string>
        label="Tokens"
        options={TOKEN_OPTIONS}
        selected={tokens}
        onChange={setTokens}
        placeholder="Search tokens..."
      />
      <AutocompleteMultiselect<number>
        label="API keys"
        options={API_KEY_OPTIONS}
        selected={apiKeys}
        onChange={setApiKeys}
        placeholder="Search API keys..."
      />
      <AutocompleteMultiselect<string>
        label="With error"
        options={TOKEN_OPTIONS}
        selected={[]}
        onChange={() => undefined}
        error
        helperText="Please pick a token."
      />
    </div>
  );
}

export const AllVariants: Story = {
  render: () => <AllVariantsStory />,
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextField } from "./TextField";
import { TextareaField } from "./TextareaField";
import { PasswordField } from "./PasswordField";
import { SelectField } from "./SelectField";
import { ToggleField } from "./ToggleField";

// ─── TextField ────────────────────────────────────────────────────────────────

const textMeta: Meta<typeof TextField> = {
  title: "Components/Field/TextField",
  component: TextField,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    hint: { control: "text" },
    error: { control: "text" },
    disabled: { control: "boolean" },
    fieldSize: { control: "select", options: ["md", "sm"] },
  },
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="max-w-sm bg-gray-950 p-6 rounded-2xl border border-gray-800">
        <Story />
      </div>
    ),
  ],
};

export default textMeta;
type TextStory = StoryObj<typeof TextField>;

export const Default: TextStory = {
  args: { label: "API Key", placeholder: "Enter your API key" },
};

export const WithHint: TextStory = {
  args: { label: "Amount", placeholder: "0.00", hint: "Minimum order: $10" },
};

export const WithError: TextStory = {
  args: {
    label: "Email",
    defaultValue: "invalid-email",
    error: "Please enter a valid email address.",
  },
};

export const Disabled: TextStory = {
  args: { label: "Read only", defaultValue: "Cannot edit", disabled: true },
};

export const Small: TextStory = {
  args: { label: "Symbol", placeholder: "BTC-USDT", fieldSize: "sm" },
};

// ─── TextareaField ─────────────────────────────────────────────────────────────

export const Textarea: StoryObj<typeof TextareaField> = {
  name: "TextareaField",
  render: () => (
    <div className="max-w-sm bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-4">
      <TextareaField label="Description" placeholder="Describe your strategy…" rows={4} />
      <TextareaField label="Notes" defaultValue="Some notes here" hint="Plain text only" rows={3} />
      <TextareaField
        label="Error state"
        defaultValue="bad value"
        error="This field is required."
        rows={2}
      />
    </div>
  ),
};

// ─── PasswordField ─────────────────────────────────────────────────────────────

export const Password: StoryObj<typeof PasswordField> = {
  name: "PasswordField",
  render: () => (
    <div className="max-w-sm bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-4">
      <PasswordField label="Password" placeholder="Enter password" />
      <PasswordField
        label="Confirm password"
        defaultValue="secret"
        error="Passwords do not match."
      />
    </div>
  ),
};

// ─── SelectField ───────────────────────────────────────────────────────────────

export const Select: StoryObj<typeof SelectField> = {
  name: "SelectField",
  render: () => (
    <div className="max-w-sm bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-4">
      <SelectField
        label="Exchange"
        options={[
          { value: "OKX", label: "OKX" },
          { value: "Binance", label: "Binance" },
          { value: "BingX", label: "BingX" },
        ]}
      />
      <SelectField
        label="Direction"
        hint="Long enters on bullish signal"
        options={[
          { value: "long", label: "Long" },
          { value: "short", label: "Short" },
        ]}
      />
      <SelectField
        label="Error"
        error="Selection required."
        options={[{ value: "", label: "Choose…" }]}
      />
    </div>
  ),
};

// ─── ToggleField ───────────────────────────────────────────────────────────────

export const Toggle: StoryObj<typeof ToggleField> = {
  name: "ToggleField",
  render: () => (
    <div className="max-w-sm bg-gray-950 p-6 rounded-2xl border border-gray-800">
      <ToggleField label="Enable notifications" description="Receive alerts for fills and errors" />
      <ToggleField label="Auto-compound" defaultChecked />
      <ToggleField label="Disabled toggle" disabled />
    </div>
  ),
};

// ─── All Fields ────────────────────────────────────────────────────────────────

export const AllFields: StoryObj = {
  name: "All Fields",
  render: () => (
    <div className="max-w-sm bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-5">
      <TextField label="Strategy name" placeholder="My EMA strategy" />
      <TextareaField label="Description" placeholder="Strategy notes…" rows={3} />
      <PasswordField label="API secret" placeholder="••••••••" />
      <SelectField
        label="Exchange"
        options={[
          { value: "OKX", label: "OKX" },
          { value: "Binance", label: "Binance" },
        ]}
      />
      <ToggleField label="Live trading" description="Enable real order execution" />
    </div>
  ),
};

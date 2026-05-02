import type { Meta, StoryObj } from "@storybook/react-vite";
import { Panel } from "./Panel";
import { EmptyState } from "./EmptyState";
import { FullPageLoader } from "./FullPageLoader";

// ─── Panel ────────────────────────────────────────────────────────────────────

const panelMeta: Meta<typeof Panel> = {
  title: "Components/Panel",
  component: Panel,
  tags: ["autodocs"],
  argTypes: {
    padding: { control: "select", options: ["none", "sm", "md", "lg"] },
    loading: { control: "boolean" },
    empty: { control: "boolean" },
    title: { control: "text" },
  },
  parameters: {
    layout: "padded",
  },
};

export default panelMeta;
type PanelStory = StoryObj<typeof Panel>;

export const Default: PanelStory = {
  args: {
    title: "My Panel",
    padding: "md",
    children: (
      <p className="text-gray-300 text-sm">
        Panel content goes here. Use <code>loading</code> or <code>empty</code> props to switch
        states.
      </p>
    ),
  },
};

export const Loading: PanelStory = {
  args: { padding: "md", loading: true },
};

export const Empty: PanelStory = {
  args: {
    padding: "md",
    empty: true,
    emptyIcon: "📭",
    emptyMessage: "No strategies found",
  },
};

export const WithTitle: PanelStory = {
  args: {
    title: "Open Positions",
    padding: "md",
    children: <p className="text-gray-400 text-sm">Three active positions.</p>,
  },
};

export const Paddings: PanelStory = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md p-6 bg-gray-950 rounded-2xl">
      {(["none", "sm", "md", "lg"] as const).map((p) => (
        <Panel key={p} padding={p} title={`padding="${p}"`}>
          <p className="text-gray-500 text-xs">Content</p>
        </Panel>
      ))}
    </div>
  ),
};

// ─── EmptyState ───────────────────────────────────────────────────────────────

export const EmptyStateDefault: StoryObj<typeof EmptyState> = {
  name: "EmptyState / Default",
  render: () => (
    <div className="p-6 bg-gray-900 rounded-2xl border border-gray-800">
      <EmptyState icon="🤖" message="No bots running" />
    </div>
  ),
};

export const EmptyStateWithAction: StoryObj<typeof EmptyState> = {
  name: "EmptyState / With Action",
  render: () => (
    <div className="p-6 bg-gray-900 rounded-2xl border border-gray-800">
      <EmptyState
        icon="📈"
        message="No strategies yet"
        action={
          <button className="text-xs px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold transition-colors">
            Create Strategy
          </button>
        }
      />
    </div>
  ),
};

// ─── FullPageLoader ────────────────────────────────────────────────────────────

export const FullPageLoaderStory: StoryObj<typeof FullPageLoader> = {
  name: "FullPageLoader",
  render: () => (
    <div className="relative h-64 bg-gray-950 rounded-2xl border border-gray-800 overflow-hidden">
      <FullPageLoader />
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { StrategyCard } from "./StrategyCard";

const meta: Meta<typeof StrategyCard> = {
  title: "Components/StrategyCard",
  component: StrategyCard,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "compact", "featured"],
      description: "Visual style variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Title text size",
    },
    badgeVariant: {
      control: "select",
      options: ["active", "profit", "loss", "neutral", "warning", "tba", "popular"],
    },
  },
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof StrategyCard>;

const SubscribeButton = () => (
  <button className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-semibold text-sm transition-colors">
    Subscribe
  </button>
);

export const Default: Story = {
  args: {
    name: "EMA Trend Follower",
    description:
      "Rides sustained trends by entering on exponential moving average crossovers. Designed to stay in winning trades and cut losers early.",
    meta: "Community · Long / Short",
    badgeText: "Published",
    badgeVariant: "active",
    variant: "default",
    size: "md",
    action: <SubscribeButton />,
  },
};

export const Compact: Story = {
  args: {
    name: "RSI Mean Reversion",
    description: "Buys oversold dips and sells overbought peaks using RSI signals.",
    meta: "Community · Long / Short",
    badgeText: "Published",
    badgeVariant: "active",
    variant: "compact",
    size: "sm",
    action: <SubscribeButton />,
  },
};

export const Featured: Story = {
  args: {
    name: "Volume Breakout",
    description:
      "Detects sudden volume spikes that precede strong directional moves and enters immediately to capture breakout momentum.",
    meta: "Community · Long / Short",
    badgeText: "Popular",
    badgeVariant: "popular",
    variant: "featured",
    size: "lg",
    action: <SubscribeButton />,
  },
};

export const NoAction: Story = {
  args: {
    name: "SAR Long",
    description:
      "Uses the Parabolic SAR indicator to trail stops and ride long-side momentum. Exits automatically when the trend reverses.",
    meta: "Community · Long",
    badgeText: "Published",
    badgeVariant: "active",
  },
};

export const NoBadge: Story = {
  args: {
    name: "Grid Arithmetic",
    description:
      "Places grid orders with fixed arithmetic spacing. Profits from price oscillations without predicting direction.",
    meta: "Community · Long",
    action: <SubscribeButton />,
  },
};

export const Minimal: Story = {
  args: {
    name: "Limit Revert",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl">
      <StrategyCard
        name="Default variant"
        description="Standard card with normal padding and default border styling."
        meta="Community · Long / Short"
        badgeText="Published"
        badgeVariant="active"
        variant="default"
        action={<SubscribeButton />}
      />
      <StrategyCard
        name="Compact variant"
        description="Tighter layout suited for dense grids or sidebars."
        meta="Community · Long / Short"
        badgeText="Published"
        badgeVariant="active"
        variant="compact"
        size="sm"
        action={<SubscribeButton />}
      />
      <StrategyCard
        name="Featured variant"
        description="Elevated appearance with teal accent ring. Use for highlighted or top-ranked strategies."
        meta="Community · Long / Short"
        badgeText="Popular"
        badgeVariant="popular"
        variant="featured"
        size="lg"
        action={<SubscribeButton />}
      />
    </div>
  ),
};

export const MarketplaceGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl">
      {(
        [
          {
            name: "EMA Trend Follower",
            description:
              "Rides sustained trends by entering on exponential moving average crossovers.",
            meta: "Community · Long / Short",
            badgeText: "Published",
            variant: "default",
          },
          {
            name: "RSI Mean Reversion",
            description: "Buys oversold dips and sells overbought peaks using RSI signals.",
            meta: "Community · Long / Short",
            badgeText: "Published",
            variant: "default",
          },
          {
            name: "Grid Arithmetic",
            description: "Places a grid of limit orders with fixed arithmetic spacing.",
            meta: "Community · Long",
            badgeText: "Popular",
            badgeVariant: "popular",
            variant: "featured",
          },
          {
            name: "Volume Breakout",
            description: "Detects sudden volume spikes that precede strong directional moves.",
            meta: "Community · Long / Short",
            badgeText: "Published",
            variant: "default",
          },
          {
            name: "SAR Long",
            description: "Uses the Parabolic SAR indicator to trail stops and ride long momentum.",
            meta: "Community · Long",
            badgeText: "Published",
            variant: "default",
          },
          {
            name: "Limit Revert",
            description:
              "Opens limit orders at statistically likely reversion points after sharp moves.",
            meta: "Community · Long / Short",
            badgeText: "Published",
            variant: "default",
          },
        ] as const
      ).map((s) => (
        <StrategyCard
          key={s.name}
          name={s.name}
          description={s.description}
          meta={s.meta}
          badgeText={s.badgeText}
          badgeVariant={"badgeVariant" in s ? s.badgeVariant : "active"}
          variant={s.variant}
          action={<SubscribeButton />}
        />
      ))}
    </div>
  ),
};

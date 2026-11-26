import { cva, type VariantProps } from "class-variance-authority";

import { Avatar } from "../Avatar/Avatar";
import { Badge } from "../Badge/Badge";
import { Text } from "../Text/Text";
import { cn } from "../../utils/cn";

const symbolViewVariants = cva(
  "relative flex min-w-0 w-full items-center overflow-hidden border shadow-sm",
  {
    variants: {
      size: {
        sm: "gap-2.5 px-2.5 py-2",
        md: "gap-3 px-3.5 py-3",
      },
      selected: {
        true: "border-emerald-200 bg-gradient-to-r from-emerald-50 via-white to-gray-50 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-1 motion-safe:duration-200 motion-reduce:animate-none dark:border-emerald-400/35 dark:from-emerald-950/80 dark:via-emerald-950/40 dark:to-gray-950 dark:shadow-[0_0_24px_rgba(16,185,129,0.1)]",
        false: "border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950/60",
      },
    },
    defaultVariants: {
      size: "md",
      selected: false,
    },
  },
);

const symbolViewAvatarVariants = cva("", {
  variants: {
    selected: {
      true: "relative overflow-hidden border border-emerald-200 bg-emerald-100 text-emerald-700 dark:border-emerald-300/30 dark:bg-emerald-400/10 dark:text-emerald-200",
      false: "",
    },
  },
  defaultVariants: {
    selected: false,
  },
});

export type SymbolViewSize = NonNullable<VariantProps<typeof symbolViewVariants>["size"]>;

export interface SymbolViewProps {
  name: string;
  instrumentType?: string | null;
  selected?: boolean;
  size?: SymbolViewSize;
}

export function SymbolView({
  name,
  instrumentType,
  selected = false,
  size = "md",
}: SymbolViewProps) {
  const displayName = name.trim().toUpperCase();
  const baseCurrency = displayName.split("/")[0] ?? displayName;
  const instrumentLabel = instrumentType?.trim().toUpperCase();

  return (
    <div className={cn(symbolViewVariants({ size, selected }))}>
      {selected ? (
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-1 bg-emerald-500 dark:bg-emerald-400"
        />
      ) : null}
      <Avatar
        size={size === "sm" ? "sm" : "md"}
        shape="circle"
        variant="neutral"
        aria-hidden="true"
        className={cn(symbolViewAvatarVariants({ selected }))}
      >
        {selected ? (
          <span
            aria-hidden="true"
            className="absolute inset-0 motion-safe:animate-ping rounded-full bg-emerald-400/10"
          />
        ) : null}
        <span className="relative">{baseCurrency.slice(0, 3) || "MKT"}</span>
      </Avatar>
      <span className="flex min-w-0 flex-1 flex-col">
        <Text
          as="span"
          variant="caption"
          tone={selected ? "positive" : "muted"}
          weight="bold"
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em]"
        >
          {selected ? (
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 motion-safe:animate-pulse"
            />
          ) : null}
          {selected ? "Selected market" : "Market"}
        </Text>
        <Text
          as="span"
          variant={size === "sm" ? "body-sm" : "body"}
          tone="default"
          weight="semibold"
          truncate
        >
          {displayName || "Unknown market"}
        </Text>
      </span>
      {instrumentLabel ? (
        <span className="shrink-0">
          <Badge variant="neutral">{instrumentLabel}</Badge>
        </span>
      ) : null}
    </div>
  );
}

export type StatTileVariant = "highlight" | "neutral" | "profit" | "loss";

export interface StatTileProps {
  label: string;
  value: string;
  delta?: string;
  variant?: StatTileVariant;
}

const variantConfig: Record<
  StatTileVariant,
  { containerClass: string; labelClass: string; valueClass: string }
> = {
  highlight: {
    containerClass: "border border-teal-400/30 bg-teal-400/5",
    labelClass: "text-teal-600 dark:text-teal-300",
    valueClass: "text-gray-900 dark:text-white",
  },
  neutral: {
    containerClass: "border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/60",
    labelClass: "text-gray-500",
    valueClass: "text-gray-900 dark:text-white",
  },
  profit: {
    containerClass: "border border-emerald-400/30 bg-emerald-400/5",
    labelClass: "text-emerald-600 dark:text-emerald-400",
    valueClass: "text-emerald-500",
  },
  loss: {
    containerClass: "border border-red-400/30 bg-red-400/5",
    labelClass: "text-red-500",
    valueClass: "text-red-400",
  },
};

export function StatTile({ label, value, delta, variant = "neutral" }: StatTileProps) {
  const { containerClass, labelClass, valueClass } = variantConfig[variant];
  return (
    <div className={`rounded-xl p-3 ${containerClass}`}>
      <p className={`text-xs uppercase tracking-widest mb-1 ${labelClass}`}>{label}</p>
      <div className="flex items-baseline gap-2">
        <p className={`text-2xl font-semibold ${valueClass}`}>{value}</p>
        {delta !== undefined && (
          <span
            className={`text-xs font-semibold ${
              delta.startsWith("+") ? "text-emerald-500" : "text-red-400"
            }`}
          >
            {delta}
          </span>
        )}
      </div>
    </div>
  );
}

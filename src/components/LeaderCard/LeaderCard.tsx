export interface LeaderCardProps {
  strategyName: string;
  name: string;
  userName: string;
  description?: string | null;
  apr: number;
  pnl: number;
  subscriberCount: number;
  maxSubscribers: number;
  /** href for the "View Strategy" link button */
  href: string;
}

function formatPct(value: number) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

function formatPnl(value: number) {
  const sign = value >= 0 ? "+" : "-";
  return `${sign}$${Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function pnlColor(pnl: number) {
  if (pnl > 0) return "text-emerald-400";
  if (pnl < 0) return "text-red-400";
  return "text-gray-400";
}

export function LeaderCard({
  strategyName,
  name,
  userName,
  description,
  apr,
  pnl,
  subscriberCount,
  maxSubscribers,
  href,
}: LeaderCardProps) {
  const slots = Math.max(0, maxSubscribers - subscriberCount);
  const isFull = slots === 0;

  return (
    <div className="group relative flex flex-col bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-teal-500/60 transition-all duration-200 hover:shadow-lg hover:shadow-teal-900/20">
      {/* Gradient accent strip */}
      <div className="h-1 w-full bg-gradient-to-r from-teal-500 via-cyan-400 to-blue-500" />

      <div className="flex flex-col gap-3 p-5 flex-1">
        {/* Header */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-0.5">
            {strategyName}
          </p>
          <h3 className="text-lg font-bold text-white leading-tight">{name}</h3>
          <p className="text-xs text-teal-400 mt-0.5">by @{userName}</p>
        </div>

        {/* Description */}
        {description && <p className="text-xs text-gray-400 line-clamp-2">{description}</p>}

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <div className="bg-gray-800/60 rounded-xl p-3">
            <p className="text-[10px] uppercase tracking-wide text-gray-500 mb-1">APR</p>
            <p className={`text-lg font-bold ${apr > 0 ? "text-emerald-400" : "text-gray-400"}`}>
              {formatPct(apr)}
            </p>
          </div>
          <div className="bg-gray-800/60 rounded-xl p-3">
            <p className="text-[10px] uppercase tracking-wide text-gray-500 mb-1">Total PnL</p>
            <p className={`text-lg font-bold ${pnlColor(pnl)}`}>{formatPnl(pnl)}</p>
          </div>
        </div>

        {/* Slots pill */}
        <div className="flex items-center justify-between">
          <span
            className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${
              isFull
                ? "bg-red-900/40 text-red-400 border border-red-800/60"
                : "bg-teal-900/40 text-teal-400 border border-teal-800/60"
            }`}
          >
            <span
              className={`inline-block w-1.5 h-1.5 rounded-full ${isFull ? "bg-red-400" : "bg-teal-400"}`}
            />
            {isFull ? "Community Full" : `${slots} slots available`}
          </span>
          <span className="text-xs text-gray-600">{subscriberCount} members</span>
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-5">
        <a
          href={href}
          className="block w-full text-center py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold transition-colors"
        >
          View Strategy →
        </a>
      </div>
    </div>
  );
}

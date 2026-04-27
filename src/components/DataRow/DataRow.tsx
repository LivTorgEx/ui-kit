export interface DataRowProps {
  label: string;
  value: string;
  subleft?: string;
  subright?: string;
  delta?: string;
}

export function DataRow({ label, value, subleft, subright, delta }: DataRowProps) {
  const hasSub = subleft !== undefined || subright !== undefined;
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/60 p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
        <div className="flex items-center gap-2">
          {delta !== undefined && (
            <span
              className={`text-xs font-semibold ${
                delta.startsWith("+") ? "text-emerald-500" : "text-red-400"
              }`}
            >
              {delta}
            </span>
          )}
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{value}</p>
        </div>
      </div>
      {hasSub && (
        <div className="mt-1 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>{subleft}</span>
          <span>{subright}</span>
        </div>
      )}
    </div>
  );
}

export interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
}

export function StatCard({ label, value, sub }: StatCardProps) {
  return (
    <div className="bg-gray-800/60 border border-gray-700/60 rounded-2xl p-5 flex flex-col gap-1">
      <p className="text-xs uppercase tracking-widest text-gray-500 font-medium">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
      {sub && <p className="text-xs text-gray-500">{sub}</p>}
    </div>
  );
}

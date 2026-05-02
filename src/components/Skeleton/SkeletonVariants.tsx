import { cn } from "../../utils/cn";

export function SkeletonBase({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-lg bg-gray-800", className)} />;
}

export function SkeletonCard({ lines = 2 }: { lines?: number }) {
  return (
    <div className="bg-gray-900 rounded-xl p-5 border border-gray-800 space-y-3">
      <SkeletonBase className="h-4 w-1/3" />
      <SkeletonBase className="h-7 w-2/3" />
      {Array.from({ length: lines - 1 }).map((_, i) => (
        <SkeletonBase key={i} className="h-3 w-1/2" />
      ))}
    </div>
  );
}

export function SkeletonRow({ cols = 4 }: { cols?: number }) {
  return (
    <tr className="border-b border-gray-800/50">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <SkeletonBase className="h-3 w-full" />
        </td>
      ))}
    </tr>
  );
}

export function SkeletonStrategyCard() {
  return (
    <div className="bg-gray-900 rounded-xl p-5 border border-gray-800 space-y-3">
      <div className="flex justify-between">
        <SkeletonBase className="h-4 w-1/2" />
        <SkeletonBase className="h-5 w-16 rounded-full" />
      </div>
      <SkeletonBase className="h-3 w-full" />
      <SkeletonBase className="h-3 w-3/4" />
      <SkeletonBase className="h-9 w-full mt-2" />
    </div>
  );
}

export function SkeletonWorkerItem() {
  return (
    <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 flex items-center justify-between">
      <div className="space-y-2 flex-1 mr-4">
        <SkeletonBase className="h-4 w-1/3" />
        <SkeletonBase className="h-3 w-2/3" />
      </div>
      <div className="flex items-center gap-3">
        <SkeletonBase className="h-5 w-14 rounded-full" />
        <SkeletonBase className="h-7 w-14 rounded-lg" />
      </div>
    </div>
  );
}

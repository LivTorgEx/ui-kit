import { Spinner } from "../Spinner/Spinner";

export function FullPageLoader() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" />
        <p className="text-gray-400 text-sm animate-pulse">Loading…</p>
      </div>
    </div>
  );
}

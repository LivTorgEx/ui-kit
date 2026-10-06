import { cn } from "../../utils/cn";

export function getTabClassName(selected: boolean) {
  return cn(
    "flex-1 whitespace-nowrap",
    selected
      ? "border-b-2 border-emerald-400 bg-transparent text-white hover:bg-transparent hover:text-white"
      : "border-b-2 border-transparent bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white",
  );
}

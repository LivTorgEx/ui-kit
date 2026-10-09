import type { ComponentPropsWithoutRef } from "react";
import { cva } from "class-variance-authority";

import { cn } from "../../utils/cn";

const dialogActionsVariants = cva(
  "flex shrink-0 items-center justify-end gap-2 border-t border-gray-800 px-4 py-3",
);

export type DialogActionsProps = ComponentPropsWithoutRef<"footer">;

export function DialogActions({ className, ...props }: DialogActionsProps) {
  return <footer {...props} className={cn(dialogActionsVariants(), className)} />;
}

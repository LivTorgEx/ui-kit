import { useEffect, type ReactNode } from "react";

import { Button } from "../Button/Button";
import { cn } from "../../utils/cn";

export type DrawerSide = "right" | "left" | "bottom" | "top";

export interface DrawerProps {
  /** Whether the drawer is currently visible. */
  open: boolean;
  /** Called when the user dismisses via backdrop, Esc, or close button. */
  onClose: () => void;
  /** Optional sticky header content. */
  title?: ReactNode;
  /** Body content (scrollable). */
  children: ReactNode;
  /** Anchor side on `>= sm` screens. Defaults to `right`. */
  side?: DrawerSide;
  /** Tailwind width/max-width class applied on `>= sm`. Defaults to `sm:max-w-md`. */
  widthClassName?: string;
  /**
   * Mobile (`<sm`) behavior. Defaults to `"sheet"` — bottom-sheet with top rounded corners.
   * Use `"side"` to keep the desktop side anchor on mobile too.
   */
  mobileLayout?: "sheet" | "side";
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M5 5l10 10M15 5L5 15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

const sideAlignment: Record<DrawerSide, string> = {
  right: "sm:items-stretch sm:justify-end",
  left: "sm:items-stretch sm:justify-start",
  bottom: "sm:items-end sm:justify-stretch",
  top: "sm:items-start sm:justify-stretch",
};

const sidePanelShape: Record<DrawerSide, string> = {
  right: "sm:h-full sm:rounded-l-2xl sm:border-l",
  left: "sm:h-full sm:rounded-r-2xl sm:border-r",
  bottom: "sm:w-full sm:rounded-t-2xl sm:border-t",
  top: "sm:w-full sm:rounded-b-2xl sm:border-b",
};

export function Drawer({
  open,
  onClose,
  title,
  children,
  side = "right",
  widthClassName = "sm:max-w-md",
  mobileLayout = "sheet",
}: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const mobileContainer =
    mobileLayout === "sheet" ? "items-end justify-end" : sideAlignment[side].replace(/sm:/g, "");
  const mobilePanelShape =
    mobileLayout === "sheet"
      ? "max-h-[88vh] rounded-t-2xl"
      : sidePanelShape[side].replace(/sm:/g, "");

  return (
    <div
      className={cn("fixed inset-0 z-50 flex", mobileContainer, sideAlignment[side])}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={cn(
          "relative z-10 flex w-full flex-col border border-gray-200 bg-white text-gray-900 shadow-2xl dark:border-gray-800 dark:bg-gray-950 dark:text-gray-100",
          mobilePanelShape,
          "sm:max-h-none",
          sidePanelShape[side],
          widthClassName,
        )}
      >
        {title !== undefined && (
          <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-950">
            <div className="min-w-0 flex-1">{title}</div>
            <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close drawer">
              <CloseIcon />
            </Button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

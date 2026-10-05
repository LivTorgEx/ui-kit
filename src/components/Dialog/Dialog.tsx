"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

import { Button } from "../Button/Button";
import { cn } from "../../utils/cn";

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={(event) => {
        event.preventDefault();
        onOpenChange(false);
      }}
      onClose={() => onOpenChange(false)}
      onClick={(event) => {
        if (event.target === event.currentTarget) onOpenChange(false);
      }}
      className={cn(
        "m-auto max-h-[calc(100dvh-2rem)] w-[min(92vw,460px)] overflow-y-auto border border-gray-700 bg-gray-950 p-0 text-gray-100 shadow-2xl backdrop:bg-black/70",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4 border-b border-gray-800 px-4 py-3">
        <div className="min-w-0">
          <h2 id={titleId} className="text-sm font-semibold">
            {title}
          </h2>
          {description ? (
            <p id={descriptionId} className="mt-1 text-xs text-gray-400">
              {description}
            </p>
          ) : null}
        </div>
        <Button
          type="button"
          size="sm"
          variant="icon-ghost"
          aria-label="Close dialog"
          onClick={() => onOpenChange(false)}
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
      <div className="p-4">{children}</div>
    </dialog>
  );
}

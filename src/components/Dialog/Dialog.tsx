"use client";

import { useEffect, useId, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { Button } from "../Button/Button";
import { cn } from "../../utils/cn";

const dialogVariants = cva(
  "m-auto flex max-h-[calc(100dvh-1.5rem)] flex-col overflow-hidden rounded-lg border border-gray-700 bg-gray-950 p-0 text-gray-100 shadow-2xl backdrop:bg-black/70 sm:max-h-[calc(100dvh-3rem)]",
  {
    variants: {
      size: {
        sm: "w-[min(92vw,460px)]",
        md: "w-[min(94vw,520px)]",
        lg: "w-[min(94vw,760px)]",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

const dialogHeaderVariants = cva(
  "flex shrink-0 items-start justify-between gap-4 border-b border-gray-800 px-4 py-3",
  {
    variants: {
      draggable: {
        true: "touch-none cursor-move",
        false: "",
      },
    },
    defaultVariants: {
      draggable: false,
    },
  },
);

export type DialogSize = NonNullable<VariantProps<typeof dialogVariants>["size"]>;

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
  contentClassName?: string;
  headerLeading?: ReactNode;
  draggable?: boolean;
  size?: DialogSize;
  /** Mount the dialog while closed instead of waiting until it opens. */
  mountOnInit?: boolean;
}

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  actions,
  className,
  contentClassName,
  headerLeading,
  draggable = false,
  size = "sm",
  mountOnInit = false,
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    clientX: number;
    clientY: number;
    originX: number;
    originY: number;
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  } | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!draggable) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const clampToViewport = () => {
      const bounds = dialog.getBoundingClientRect();
      const correctionX =
        bounds.left < 0
          ? -bounds.left
          : bounds.right > window.innerWidth
            ? window.innerWidth - bounds.right
            : 0;
      const correctionY =
        bounds.top < 0
          ? -bounds.top
          : bounds.bottom > window.innerHeight
            ? window.innerHeight - bounds.bottom
            : 0;
      if (correctionX === 0 && correctionY === 0) return;
      setOffset((current) => ({
        x: current.x + correctionX,
        y: current.y + correctionY,
      }));
    };

    const observer = new ResizeObserver(clampToViewport);
    observer.observe(dialog);
    window.addEventListener("resize", clampToViewport);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", clampToViewport);
    };
  }, [draggable, open]);

  const onDragStart = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggable || event.button !== 0 || (event.target as HTMLElement).closest("button")) {
      return;
    }
    const bounds = dialogRef.current?.getBoundingClientRect();
    if (!bounds) return;
    dragRef.current = {
      pointerId: event.pointerId,
      clientX: event.clientX,
      clientY: event.clientY,
      originX: offset.x,
      originY: offset.y,
      minX: offset.x - bounds.left,
      maxX: offset.x + window.innerWidth - bounds.right,
      minY: offset.y - bounds.top,
      maxY: offset.y + window.innerHeight - bounds.bottom,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onDragMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!draggable || !drag || drag.pointerId !== event.pointerId) return;
    const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
    setOffset({
      x: clamp(drag.originX + event.clientX - drag.clientX, drag.minX, drag.maxX),
      y: clamp(drag.originY + event.clientY - drag.clientY, drag.minY, drag.maxY),
    });
  };

  const onDragEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  if (!open && !mountOnInit) return null;

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
      style={{
        display: open ? "flex" : "none",
        transform: draggable ? `translate3d(${offset.x}px, ${offset.y}px, 0)` : undefined,
      }}
      className={cn(dialogVariants({ size }), className)}
    >
      <div
        className={dialogHeaderVariants({ draggable })}
        onPointerDown={onDragStart}
        onPointerMove={onDragMove}
        onPointerUp={onDragEnd}
        onPointerCancel={onDragEnd}
      >
        <div className="flex min-w-0 items-start gap-2">
          {headerLeading}
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
      <div className={cn("min-h-0 flex-1 overflow-y-auto p-4", contentClassName)}>{children}</div>
      {actions}
    </dialog>
  );
}

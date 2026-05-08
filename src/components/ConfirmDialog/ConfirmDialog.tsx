import { useEffect } from "react";
import { Button } from "../Button/Button";
import { LoadingButton } from "../LoadingButton/LoadingButton";
import { cn } from "../../utils/cn";

export type ConfirmDialogIntent = "default" | "danger";

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  intent?: ConfirmDialogIntent;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  intent = "default",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !loading) {
        onCancel();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [loading, onCancel, open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close confirmation dialog"
        className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"
        onClick={() => {
          if (!loading) {
            onCancel();
          }
        }}
      />

      <div className="relative w-full max-w-sm rounded-2xl border border-gray-700 bg-gray-900 p-4 shadow-xl sm:p-5">
        <h3 className="text-sm font-semibold text-white sm:text-base">{title}</h3>
        {description ? <p className="mt-2 text-sm text-gray-300">{description}</p> : null}

        <div className="mt-4 flex items-center justify-end gap-2 sm:mt-5">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
            className="px-3 py-2 text-sm"
          >
            {cancelText}
          </Button>
          <LoadingButton
            type="button"
            variant={intent === "danger" ? "danger" : "primary"}
            onClick={onConfirm}
            loading={loading}
            className={cn("px-3 py-2 text-sm", intent === "danger" ? "text-white" : "")}
          >
            {confirmText}
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}

import React, { createContext, useCallback, useState } from "react";
import type { ConfirmationFn } from "../hooks/useConfirmation";
import { ConfirmDialog } from "../components/ConfirmDialog/ConfirmDialog";

export type ConfirmationState = {
  open: boolean;
  title: string;
  description?: string;
  intent: "default" | "danger";
  confirmText: string;
  cancelText: string;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const ConfirmationContext = createContext<ConfirmationFn | null>(null);

export function ConfirmationProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ConfirmationState>({
    open: false,
    title: "",
    description: undefined,
    intent: "default",
    confirmText: "Confirm",
    cancelText: "Cancel",
    loading: false,
    onClose: () => {},
    onConfirm: () => {},
  });

  const confirm = useCallback<ConfirmationFn>((title, description, options) => {
    return new Promise((resolve) => {
      setState({
        open: true,
        title,
        description,
        intent: options?.intent ?? "default",
        confirmText: options?.confirmText ?? "Confirm",
        cancelText: options?.cancelText ?? "Cancel",
        loading: false,
        onClose: () => {
          setState((prev) => ({ ...prev, open: false }));
          resolve(false);
        },
        onConfirm: () => {
          setState((prev) => ({ ...prev, open: false }));
          resolve(true);
        },
      });
    });
  }, []);

  return (
    <ConfirmationContext.Provider value={confirm}>
      {children}
      <ConfirmDialog
        open={state.open}
        title={state.title}
        description={state.description}
        intent={state.intent}
        confirmText={state.confirmText}
        cancelText={state.cancelText}
        loading={state.loading}
        onCancel={state.onClose}
        onConfirm={state.onConfirm}
      />
    </ConfirmationContext.Provider>
  );
}

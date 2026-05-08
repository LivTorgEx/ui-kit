import { useContext } from "react";
import { ConfirmationContext } from "../context/ConfirmationContext";

export type ConfirmationFn = (
  title: string,
  description?: string,
  options?: {
    intent?: "default" | "danger";
    confirmText?: string;
    cancelText?: string;
  },
) => Promise<boolean>;

export function useConfirmation(): ConfirmationFn {
  const confirm = useContext(ConfirmationContext);
  if (!confirm) {
    throw new Error("useConfirmation must be used within a ConfirmationProvider");
  }
  return confirm;
}

import { createContext, useContext } from "react";
import type { FieldSize, FieldVariant } from "./_base";

export interface InputGroupContextValue {
  size: FieldSize;
  variant: FieldVariant;
}

export const InputGroupContext = createContext<InputGroupContextValue | null>(null);

export function useInputGroupContext() {
  return useContext(InputGroupContext);
}

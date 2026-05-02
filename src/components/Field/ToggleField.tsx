import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type { InputHTMLAttributes, ReactNode } from "react";

export interface ToggleFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  description?: string;
}

export const ToggleField = forwardRef<HTMLInputElement, ToggleFieldProps>(
  ({ label, description, className, ...props }, ref) => (
    <div
      className={cn("flex items-center justify-between py-3 border-t border-gray-800", className)}
    >
      <div>
        <p className="text-white text-sm">{label}</p>
        {description && <p className="text-gray-500 text-xs">{description}</p>}
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input ref={ref} type="checkbox" className="sr-only peer" {...props} />
        <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-teal-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
      </label>
    </div>
  ),
);
ToggleField.displayName = "ToggleField";

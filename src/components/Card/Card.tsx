import type { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-gray-50 p-5 transition-colors hover:border-teal-400 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-emerald-400/60 ${className}`}
    >
      {children}
    </div>
  );
}

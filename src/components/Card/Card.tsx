import type { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-5 hover:border-teal-400 dark:hover:border-teal-500/60 transition-all ${className}`}
    >
      {children}
    </div>
  );
}

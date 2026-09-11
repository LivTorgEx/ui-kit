import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../utils/cn";

export type TableAlign = "left" | "center" | "right";
export type TableEdge = "none" | "start" | "end";

const alignClasses: Record<TableAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const edgeClasses: Record<TableEdge, string> = {
  none: "px-3",
  start: "pl-5 pr-3",
  end: "pl-3 pr-5",
};

export interface TableProps extends ComponentPropsWithoutRef<"table"> {
  containerClassName?: string;
}

export function Table({ className, containerClassName, ...props }: TableProps) {
  return (
    <div className={cn("overflow-x-auto", containerClassName)}>
      <table {...props} className={cn("w-full min-w-[760px] text-left text-sm", className)} />
    </div>
  );
}

export function TableHead({ className, ...props }: ComponentPropsWithoutRef<"thead">) {
  return <thead {...props} className={cn("border-b border-gray-800", className)} />;
}

export function TableBody({ className, ...props }: ComponentPropsWithoutRef<"tbody">) {
  return <tbody {...props} className={cn("divide-y divide-gray-800/70", className)} />;
}

export interface TableRowProps extends ComponentPropsWithoutRef<"tr"> {
  interactive?: boolean;
}

export function TableRow({ className, interactive = false, ...props }: TableRowProps) {
  return (
    <tr
      {...props}
      className={cn(interactive && "transition-colors hover:bg-gray-900/70", className)}
    />
  );
}

export interface TableHeaderCellProps extends ComponentPropsWithoutRef<"th"> {
  align?: TableAlign;
  edge?: TableEdge;
}

export function TableHeaderCell({
  align = "left",
  edge = "none",
  className,
  ...props
}: TableHeaderCellProps) {
  return (
    <th
      {...props}
      className={cn(
        edgeClasses[edge],
        alignClasses[align],
        "py-3 text-xs font-medium uppercase tracking-[0.1em] text-gray-600",
        className,
      )}
    />
  );
}

export interface TableCellProps extends ComponentPropsWithoutRef<"td"> {
  align?: TableAlign;
  edge?: TableEdge;
}

export function TableCell({ align = "left", edge = "none", className, ...props }: TableCellProps) {
  return (
    <td {...props} className={cn(edgeClasses[edge], alignClasses[align], "py-3", className)} />
  );
}

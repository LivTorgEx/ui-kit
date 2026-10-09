import { createContext, useContext, type ComponentPropsWithoutRef } from "react";
import { cn } from "../../utils/cn";

export type TableAlign = "left" | "center" | "right";
export type TableEdge = "none" | "start" | "end" | "flush";
export type TableDensity = "default" | "compact";

const TableDensityContext = createContext<TableDensity>("default");

const alignClasses: Record<TableAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const edgeClasses: Record<TableEdge, string> = {
  none: "px-3",
  start: "pl-5 pr-3",
  end: "pl-3 pr-5",
  flush: "px-0",
};

const compactEdgeClasses: Record<TableEdge, string> = {
  none: "px-0 pr-3",
  start: "pl-0 pr-3",
  end: "pl-3 pr-0",
  flush: "px-0",
};

export interface TableProps extends ComponentPropsWithoutRef<"table"> {
  containerClassName?: string;
  density?: TableDensity;
}

export function Table({
  className,
  containerClassName,
  density = "default",
  ...props
}: TableProps) {
  return (
    <TableDensityContext.Provider value={density}>
      <div
        className={cn(
          "overflow-x-auto",
          density === "compact" && "border-y border-gray-300 dark:border-gray-700",
          containerClassName,
        )}
      >
        <table
          {...props}
          className={cn(
            density === "compact"
              ? "w-full min-w-[680px] border-collapse text-left text-xs"
              : "w-full min-w-[760px] text-left text-sm",
            className,
          )}
        />
      </div>
    </TableDensityContext.Provider>
  );
}

export function TableHead({ className, ...props }: ComponentPropsWithoutRef<"thead">) {
  const density = useContext(TableDensityContext);
  return (
    <thead
      {...props}
      className={cn(
        "border-b",
        density === "compact" ? "border-gray-300 dark:border-gray-700" : "border-gray-800",
        className,
      )}
    />
  );
}

export function TableBody({ className, ...props }: ComponentPropsWithoutRef<"tbody">) {
  const density = useContext(TableDensityContext);
  return (
    <tbody
      {...props}
      className={cn(
        density === "compact"
          ? "divide-y divide-gray-300 text-gray-800 dark:divide-gray-700 dark:text-gray-200"
          : "divide-y divide-gray-800/70",
        className,
      )}
    />
  );
}

export interface TableRowProps extends ComponentPropsWithoutRef<"tr"> {
  interactive?: boolean;
}

export function TableRow({ className, interactive = false, ...props }: TableRowProps) {
  const density = useContext(TableDensityContext);
  return (
    <tr
      {...props}
      className={cn(
        density === "compact" && "text-gray-800 dark:text-gray-200",
        interactive && "transition-colors hover:bg-gray-900/70",
        className,
      )}
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
  const density = useContext(TableDensityContext);
  return (
    <th
      {...props}
      className={cn(
        (density === "compact" ? compactEdgeClasses : edgeClasses)[edge],
        alignClasses[align],
        density === "compact"
          ? "py-3 text-xs font-normal normal-case tracking-normal text-gray-500 dark:text-gray-400"
          : "py-3 text-xs font-medium uppercase tracking-[0.1em] text-gray-600",
        className,
      )}
    />
  );
}

export interface TableCellProps extends ComponentPropsWithoutRef<"td"> {
  align?: TableAlign;
  edge?: TableEdge;
  numeric?: boolean;
}

export function TableCell({
  align = "left",
  edge = "none",
  numeric = false,
  className,
  ...props
}: TableCellProps) {
  const density = useContext(TableDensityContext);
  return (
    <td
      {...props}
      className={cn(
        (density === "compact" ? compactEdgeClasses : edgeClasses)[edge],
        alignClasses[align],
        density === "compact" ? "py-4" : "py-3",
        numeric && "font-mono",
        className,
      )}
    />
  );
}

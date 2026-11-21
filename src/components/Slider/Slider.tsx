import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export interface SliderMark {
  value: number;
  label?: ReactNode;
}

const sliderVariants = cva(
  "block h-4 w-full cursor-pointer accent-gray-100 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-3",
        md: "h-4",
      },
      direction: {
        long: "accent-[var(--trading-long-color)]",
        short: "accent-[var(--trading-short-color)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type SliderSize = NonNullable<VariantProps<typeof sliderVariants>["size"]>;
export type SliderDirection = NonNullable<VariantProps<typeof sliderVariants>["direction"]>;

export interface SliderProps
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    VariantProps<typeof sliderVariants> {
  marks?: readonly SliderMark[];
  marksClassName?: string;
  containerClassName?: string;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      size,
      direction,
      style,
      marks,
      marksClassName,
      containerClassName,
      min = 0,
      max = 100,
      step = 1,
      ...props
    },
    ref,
  ) => {
    const minValue = Number(min);
    const maxValue = Number(max);
    const range = maxValue - minValue;

    return (
      <div className={cn("w-full", containerClassName)}>
        <input
          {...props}
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          style={style}
          className={cn(sliderVariants({ size, direction }), className)}
        />
        {marks?.length ? (
          <div
            aria-hidden="true"
            className={cn(
              "relative mt-0.5 h-5 select-none text-[10px] text-gray-300",
              marksClassName,
            )}
          >
            {marks.map((mark, index) => {
              const position =
                Number.isFinite(mark.value) && Number.isFinite(range) && range !== 0
                  ? Math.min(100, Math.max(0, ((mark.value - minValue) / range) * 100))
                  : 0;

              return (
                <span
                  key={`${mark.value}-${index}`}
                  className="absolute top-0 flex -translate-x-1/2 flex-col items-center whitespace-nowrap"
                  style={{ left: `${position}%` }}
                >
                  <span className="mb-0.5 h-1.5 w-1.5 rounded-full border border-gray-500 bg-gray-900" />
                  {mark.label != null ? <span>{mark.label}</span> : null}
                </span>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  },
);

Slider.displayName = "Slider";

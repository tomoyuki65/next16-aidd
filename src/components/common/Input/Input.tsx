"use client";

import { forwardRef } from "react";
import type { FieldError } from "react-hook-form";

export type InputTextSize = "sm" | "base" | "lg";
export type InputErrorTextSize = "xs" | "sm";

export type InputProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "size"
> & {
  textSize?: InputTextSize;
  textColorHex?: string;
  error?: FieldError;
  errorTextSize?: InputErrorTextSize;
};

const inputTextSizeClasses: Record<InputTextSize, string> = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
};

const errorTextSizeClasses: Record<InputErrorTextSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
};

const errorMinHeightClasses: Record<InputErrorTextSize, string> = {
  xs: "min-h-4",
  sm: "min-h-5",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      error,
      errorTextSize,
      style,
      textColorHex,
      textSize,
      ...props
    },
    ref,
  ) => {
    const resolvedTextSizeClass = inputTextSizeClasses[textSize ?? "base"];
    const resolvedErrorTextSizeClass =
      errorTextSizeClasses[errorTextSize ?? "sm"];
    const resolvedErrorMinHeightClass =
      errorMinHeightClasses[errorTextSize ?? "sm"];

    const inputClassName = [
      "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400",
      "disabled:cursor-not-allowed disabled:opacity-50",
      resolvedTextSizeClass,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const resolvedStyle = textColorHex
      ? { ...style, color: textColorHex }
      : style;

    return (
      <div className="w-full">
        <input
          ref={ref}
          className={inputClassName}
          style={resolvedStyle}
          {...props}
        />
        <p
          className={[
            "mt-1",
            resolvedErrorTextSizeClass,
            resolvedErrorMinHeightClass,
            "text-red-600",
            error?.message ? "visible" : "invisible",
          ].join(" ")}
        >
          {error?.message ?? "\u00A0"}
        </p>
      </div>
    );
  },
);

Input.displayName = "Input";

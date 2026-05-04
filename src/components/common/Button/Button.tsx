"use client";

import { forwardRef } from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  bgClass?: string;
  hoverBgClass?: string;
  textColorClass?: string;
  textSizeClass?: string;
  paddingClass?: string;
  bgColorHex?: string;
  hoverBgColorHex?: string;
  textColorHex?: string;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      bgClass = "bg-gray-700",
      hoverBgClass = "hover:bg-gray-600",
      textColorClass = "text-white",
      textSizeClass = "text-base",
      paddingClass = "px-6 py-2",
      bgColorHex,
      hoverBgColorHex,
      textColorHex,
      className,
      type = "button",
      style,
      ...props
    },
    ref,
  ) => {
    const resolvedStyle =
      bgColorHex || hoverBgColorHex || textColorHex
        ? ({
            ...style,
            ...(bgColorHex ? { "--btn-bg": bgColorHex } : null),
            ...(hoverBgColorHex ? { "--btn-bg-hover": hoverBgColorHex } : null),
            ...(textColorHex ? { "--btn-text": textColorHex } : null),
          } as React.CSSProperties)
        : style;

    const buttonClassName = [
      "inline-flex w-fit items-center justify-center rounded-md",
      bgColorHex ? "bg-[var(--btn-bg)]" : bgClass,
      hoverBgColorHex ? "hover:bg-[var(--btn-bg-hover)]" : hoverBgClass,
      textColorHex ? "text-[var(--btn-text)]" : textColorClass,
      textSizeClass,
      paddingClass,
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClassName}
        style={resolvedStyle}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

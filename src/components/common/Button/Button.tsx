"use client";

import { forwardRef } from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  bgClass?: string;
  hoverBgClass?: string;
  textColorClass?: string;
  textSizeClass?: string;
  paddingClass?: string;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      bgClass = "bg-gray-700",
      hoverBgClass = "hover:bg-gray-800",
      textColorClass = "text-white",
      textSizeClass = "text-base",
      paddingClass = "px-6 py-2",
      className,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const buttonClassName = [
      "inline-flex w-fit items-center justify-center rounded-md",
      bgClass,
      hoverBgClass,
      textColorClass,
      textSizeClass,
      paddingClass,
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} type={type} className={buttonClassName} {...props} />
    );
  },
);

Button.displayName = "Button";

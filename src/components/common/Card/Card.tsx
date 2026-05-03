"use client";

import { useState } from "react";

export type CardProps = {
  repoName: string;
  ownerImageUrl?: string;
  onClick?: () => void;
  className?: string;
  borderClassName?: string;
  shadowClassName?: string;
  bgClassName?: string;
  hoverBgClassName?: string;
  bgColorHex?: string;
  hoverBgColorHex?: string;
  paddingXClassName?: string;
  repoNameTextSizeClassName?: string;
  repoNameTextColorClassName?: string;
  repoNameTextColorHex?: string;
  repoNameMaxLines?: 1 | 2;
  minHeightClassName?: string;
};

export const Card = ({
  repoName,
  ownerImageUrl,
  onClick,
  className,
  borderClassName = "border border-gray-200",
  shadowClassName = "shadow-sm",
  bgClassName = "bg-white",
  hoverBgClassName = "hover:bg-gray-50",
  bgColorHex,
  hoverBgColorHex,
  paddingXClassName = "px-6",
  repoNameTextSizeClassName = "text-lg",
  repoNameTextColorClassName = "text-slate-900",
  repoNameTextColorHex,
  repoNameMaxLines,
  minHeightClassName,
}: CardProps) => {
  const [isOwnerImageFailed, setIsOwnerImageFailed] = useState(false);

  const shouldShowOwnerImage = Boolean(ownerImageUrl) && !isOwnerImageFailed;

  const resolvedStyle =
    bgColorHex || hoverBgColorHex || repoNameTextColorHex
      ? ({
          ...(bgColorHex ? { "--card-bg": bgColorHex } : null),
          ...(hoverBgColorHex ? { "--card-bg-hover": hoverBgColorHex } : null),
          ...(repoNameTextColorHex
            ? { "--card-repo-name-color": repoNameTextColorHex }
            : null),
        } as React.CSSProperties)
      : undefined;

  const rootClassName = [
    "flex w-fit items-center gap-4 rounded-2xl",
    borderClassName,
    shadowClassName,
    "py-4",
    paddingXClassName,
    bgColorHex ? "bg-[var(--card-bg)]" : bgClassName,
    hoverBgColorHex ? "hover:bg-[var(--card-bg-hover)]" : hoverBgClassName,
    "transition-colors",
    "text-left",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300",
    minHeightClassName,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const lineClampClassName =
    repoNameMaxLines === 1
      ? "line-clamp-1"
      : repoNameMaxLines === 2
        ? "line-clamp-2"
        : undefined;

  const repoNameClassName = [
    repoNameTextSizeClassName,
    repoNameTextColorHex
      ? "text-[var(--card-repo-name-color)]"
      : repoNameTextColorClassName,
    lineClampClassName,
    lineClampClassName ? "break-words" : "whitespace-normal break-words",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={rootClassName}
      onClick={onClick}
      aria-label={repoName}
      style={resolvedStyle}
    >
      <div className="h-10 w-10 shrink-0">
        {shouldShowOwnerImage ? (
          // biome-ignore lint/performance/noImgElement: next/image のremote設定に依存しないため、まずは img で扱う
          <img
            src={ownerImageUrl}
            alt="Owner avatar"
            className="h-10 w-10 rounded-full object-cover"
            onError={() => {
              setIsOwnerImageFailed(true);
            }}
          />
        ) : (
          <div
            role="img"
            aria-label="Owner image fallback"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-500"
          >
            icon
          </div>
        )}
      </div>

      <span className={repoNameClassName}>{repoName}</span>
    </button>
  );
};

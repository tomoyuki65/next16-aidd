"use client";

import { buildPaginationItems } from "../../../lib/pagination/buildPaginationItems";

import { Button } from "../Button/Button";

type ButtonClassNames = {
  bgClass?: string;
  hoverBgClass?: string;
  textColorClass?: string;
  textSizeClass?: string;
  paddingClass?: string;
  bgColorHex?: string;
  hoverBgColorHex?: string;
  textColorHex?: string;
  activeBgClass?: string;
  activeHoverBgClass?: string;
  activeTextColorClass?: string;
  activeTextSizeClass?: string;
  activePaddingClass?: string;
  activeBgColorHex?: string;
  activeHoverBgColorHex?: string;
  activeTextColorHex?: string;
  disabledClass?: string;
};

export type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (nextPage: number) => void;
  className?: string;
  buttonClassNames?: ButtonClassNames;
};

export const Pagination = ({
  page,
  totalPages,
  onPageChange,
  className,
  buttonClassNames,
}: PaginationProps) => {
  const currentPage = Math.min(Math.max(1, page), totalPages);

  const baseItems = buildPaginationItems({ page: currentPage, totalPages });
  const items =
    totalPages <= 7
      ? baseItems
      : baseItems.filter((item) => {
          if (item === 1) return currentPage === 1;
          if (item === totalPages) return currentPage === totalPages;
          return true;
        });

  const normalButtonStyles = {
    bgClass: buttonClassNames?.bgClass ?? "bg-gray-200",
    hoverBgClass: buttonClassNames?.hoverBgClass ?? "hover:bg-gray-300",
    textColorClass: buttonClassNames?.textColorClass ?? "text-slate-900",
    textSizeClass: buttonClassNames?.textSizeClass ?? "text-sm",
    paddingClass: buttonClassNames?.paddingClass ?? "px-3 py-1",
    bgColorHex: buttonClassNames?.bgColorHex,
    hoverBgColorHex: buttonClassNames?.hoverBgColorHex,
    textColorHex: buttonClassNames?.textColorHex,
  };

  const activeButtonStyles = {
    bgClass: buttonClassNames?.activeBgClass ?? "bg-gray-700",
    hoverBgClass: buttonClassNames?.activeHoverBgClass ?? "hover:bg-gray-800",
    textColorClass: buttonClassNames?.activeTextColorClass ?? "text-white",
    textSizeClass:
      buttonClassNames?.activeTextSizeClass ?? normalButtonStyles.textSizeClass,
    paddingClass:
      buttonClassNames?.activePaddingClass ?? normalButtonStyles.paddingClass,
    bgColorHex:
      buttonClassNames?.activeBgColorHex ?? normalButtonStyles.bgColorHex,
    hoverBgColorHex:
      buttonClassNames?.activeHoverBgColorHex ??
      normalButtonStyles.hoverBgColorHex,
    textColorHex:
      buttonClassNames?.activeTextColorHex ?? normalButtonStyles.textColorHex,
  };

  const extraButtonClassName = buttonClassNames?.disabledClass;

  const handleFirst = () => {
    if (currentPage <= 1) return;
    onPageChange(1);
  };

  const handleLast = () => {
    if (currentPage >= totalPages) return;
    onPageChange(totalPages);
  };

  return (
    <nav aria-label="Pagination" className={className}>
      <ul className="flex items-center gap-1">
        <li>
          <Button
            {...normalButtonStyles}
            className={extraButtonClassName}
            onClick={handleFirst}
            disabled={currentPage <= 1}
          >
            {"<<"}
          </Button>
        </li>

        {items.map((item, index) => {
          if (item === "…") {
            const prev = items[index - 1];
            const next = items[index + 1];
            const ellipsisKey = `ellipsis-${String(prev)}-${String(next)}`;

            return (
              <li key={ellipsisKey}>
                <span
                  className="px-2 text-sm text-slate-500"
                  aria-hidden="true"
                >
                  …
                </span>
              </li>
            );
          }

          const isCurrent = item === currentPage;
          return (
            <li key={item}>
              <Button
                {...(isCurrent ? activeButtonStyles : normalButtonStyles)}
                className={extraButtonClassName}
                onClick={() => {
                  if (isCurrent) return;
                  onPageChange(item);
                }}
                aria-current={isCurrent ? "page" : undefined}
                disabled={isCurrent}
              >
                {item}
              </Button>
            </li>
          );
        })}

        <li>
          <Button
            {...normalButtonStyles}
            className={extraButtonClassName}
            onClick={handleLast}
            disabled={currentPage >= totalPages}
          >
            {">>"}
          </Button>
        </li>
      </ul>
    </nav>
  );
};

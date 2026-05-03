export type PaginationItem = number | "…";

type BuildPaginationItemsArgs = {
  page: number;
  totalPages: number;
};

export const buildPaginationItems = ({
  page,
  totalPages,
}: BuildPaginationItemsArgs): PaginationItem[] => {
  if (totalPages <= 0) return [];

  const currentPage = Math.min(Math.max(1, page), totalPages);

  // Small counts: show all pages.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  // Near the start: show first 5 pages, ellipsis, last.
  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "…", totalPages];
  }

  // Near the end: show first, ellipsis, last 5 pages.
  if (currentPage >= totalPages - 3) {
    return [
      1,
      "…",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  // Middle: show first, ellipsis, window around current, ellipsis, last.
  return [
    1,
    "…",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "…",
    totalPages,
  ];
};

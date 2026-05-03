import { describe, expect, it } from "vitest";

import { buildPaginationItems } from "./buildPaginationItems";

describe("buildPaginationItems", () => {
  it("totalPages<=0 のとき空配列を返す", () => {
    expect(buildPaginationItems({ page: 1, totalPages: 0 })).toEqual([]);
  });

  it("totalPages<=7 のとき全ページを返す", () => {
    expect(buildPaginationItems({ page: 3, totalPages: 5 })).toEqual([
      1, 2, 3, 4, 5,
    ]);
  });

  it("先頭付近（page<=4）は 1..5 + '…' + last を返す", () => {
    expect(buildPaginationItems({ page: 1, totalPages: 12 })).toEqual([
      1,
      2,
      3,
      4,
      5,
      "…",
      12,
    ]);
    expect(buildPaginationItems({ page: 4, totalPages: 12 })).toEqual([
      1,
      2,
      3,
      4,
      5,
      "…",
      12,
    ]);
  });

  it("中央は 1 + '…' + (page-1,page,page+1) + '…' + last を返す", () => {
    expect(buildPaginationItems({ page: 6, totalPages: 12 })).toEqual([
      1,
      "…",
      5,
      6,
      7,
      "…",
      12,
    ]);
  });

  it("末尾付近（page>=totalPages-3）は 1 + '…' + last-4..last を返す", () => {
    expect(buildPaginationItems({ page: 12, totalPages: 12 })).toEqual([
      1,
      "…",
      8,
      9,
      10,
      11,
      12,
    ]);
    expect(buildPaginationItems({ page: 9, totalPages: 12 })).toEqual([
      1,
      "…",
      8,
      9,
      10,
      11,
      12,
    ]);
  });

  it("page が範囲外でも 1..totalPages にクランプされる", () => {
    expect(buildPaginationItems({ page: -1, totalPages: 12 })).toEqual([
      1,
      2,
      3,
      4,
      5,
      "…",
      12,
    ]);
    expect(buildPaginationItems({ page: 999, totalPages: 12 })).toEqual([
      1,
      "…",
      8,
      9,
      10,
      11,
      12,
    ]);
  });
});

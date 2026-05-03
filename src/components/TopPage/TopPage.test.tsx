import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { TopPage } from "./TopPage";

let mockedSearchParams = new URLSearchParams();
const pushMock = vi.fn();

vi.mock("next/navigation", () => {
  return {
    useRouter: () => ({
      push: pushMock,
      replace: vi.fn(),
      refresh: vi.fn(),
      back: vi.fn(),
      prefetch: vi.fn(),
    }),
    useSearchParams: () => mockedSearchParams,
  };
});

describe("TopPage", () => {
  it("URLに search/page がある場合、初期表示で検索結果（5件）とページネーションが表示される", async () => {
    mockedSearchParams = new URLSearchParams({ search: "react", page: "1" });

    render(<TopPage />);

    const list = await screen.findByRole("list", { name: "検索結果" });
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(5);

    expect(
      within(items[0] ?? document.body).getByRole("button", {
        name: "test/react-repo-1",
      }),
    ).toBeVisible();

    expect(
      screen.getByRole("navigation", { name: "Pagination" }),
    ).toBeVisible();
  });

  it("ページ切り替えでURLが更新され、表示（5件）が切り替わる", async () => {
    mockedSearchParams = new URLSearchParams({ search: "react", page: "1" });
    pushMock.mockClear();

    const user = userEvent.setup();
    render(<TopPage />);

    await screen.findByRole("button", { name: "test/react-repo-1" });
    await user.click(screen.getByRole("button", { name: "2" }));

    expect(pushMock).toHaveBeenCalledWith("/?search=react&page=2");
    await screen.findByRole("button", { name: "test/react-repo-6" });
  });

  it("APIエラー時にエラー表示が出る", async () => {
    mockedSearchParams = new URLSearchParams({ search: "error", page: "1" });

    render(<TopPage />);

    expect(await screen.findByText("検索に失敗しました")).toBeInTheDocument();
  });
});

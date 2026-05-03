import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Search } from "./Search";

describe("Search", () => {
  it("初期表示で input と button（name=検索）が表示される", () => {
    render(<Search onSearch={() => {}} />);

    expect(screen.getByRole("textbox", { name: "検索クエリ" })).toBeVisible();
    expect(screen.getByRole("button", { name: "検索" })).toBeVisible();
  });

  it("初期状態（空）で button が disabled である", () => {
    render(<Search onSearch={() => {}} />);
    expect(screen.getByRole("button", { name: "検索" })).toBeDisabled();
  });

  it("regex NG の入力で button が disabled である", async () => {
    const user = userEvent.setup();
    render(<Search onSearch={() => {}} />);

    await user.type(screen.getByRole("textbox", { name: "検索クエリ" }), "a b");
    expect(screen.getByRole("button", { name: "検索" })).toBeDisabled();
  });

  it("regex OK の入力で button が enabled である", async () => {
    const user = userEvent.setup();
    render(<Search onSearch={() => {}} />);

    await user.type(
      screen.getByRole("textbox", { name: "検索クエリ" }),
      "react-hook-form",
    );
    expect(screen.getByRole("button", { name: "検索" })).toBeEnabled();
  });

  it("button click で onSearch が query 文字列で1回呼ばれる", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<Search onSearch={onSearch} />);

    await user.type(
      screen.getByRole("textbox", { name: "検索クエリ" }),
      "react-hook-form",
    );
    await user.click(screen.getByRole("button", { name: "検索" }));

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith("react-hook-form");
  });

  it("Enter submit で onSearch が query 文字列で1回呼ばれる", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<Search onSearch={onSearch} />);

    const input = screen.getByRole("textbox", { name: "検索クエリ" });
    await user.type(input, "react-hook-form{enter}");

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith("react-hook-form");
  });

  it("バリデーションNGの状態で submit しても onSearch が呼ばれない", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<Search onSearch={onSearch} />);

    const input = screen.getByRole("textbox", { name: "検索クエリ" });
    await user.type(input, "a b{enter}");

    expect(onSearch).toHaveBeenCalledTimes(0);
  });
});

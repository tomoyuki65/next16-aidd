import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Card } from "./Card";

describe("Card", () => {
  it("カードが button として取得できる", () => {
    render(
      <Card repoName="owner/repo" ownerImageUrl="https://example.com/a" />,
    );
    expect(screen.getByRole("button", { name: "owner/repo" })).toBeVisible();
  });

  it("クリックで onClick が1回呼ばれる", () => {
    const onClick = vi.fn();
    render(
      <Card
        repoName="owner/repo"
        ownerImageUrl="https://example.com/a"
        onClick={onClick}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "owner/repo" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("ownerImageUrl 未指定時にフォールバックが表示される", () => {
    render(<Card repoName="owner/repo" ownerImageUrl={undefined} />);
    expect(
      screen.getByRole("img", { name: "Owner image fallback" }),
    ).toBeVisible();
  });

  it("画像読み込み失敗（error）時にフォールバックへ切り替わる", () => {
    render(
      <Card repoName="owner/repo" ownerImageUrl="https://example.com/a" />,
    );

    fireEvent.error(screen.getByRole("img", { name: "Owner avatar" }));
    expect(
      screen.getByRole("img", { name: "Owner image fallback" }),
    ).toBeVisible();
  });

  it("repoNameMaxLines=2 のとき line-clamp-2 が付与される", () => {
    render(
      <Card
        repoName="owner/repo"
        ownerImageUrl="https://example.com/a"
        repoNameMaxLines={2}
      />,
    );

    expect(screen.getByText("owner/repo")).toHaveClass("line-clamp-2");
  });
});

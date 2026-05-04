import { render, screen } from "@testing-library/react";
import { delay, HttpResponse, http } from "msw";
import type { ReactElement } from "react";
import { SWRConfig } from "swr";
import { describe, expect, it } from "vitest";

import { endpoints } from "@/lib/api/endpoints";
import { server } from "@/lib/msw/setup/server";

import { RepositoryDetailPage } from "./RepositoryDetailPage";

const renderWithSWR = (ui: ReactElement) => {
  return render(
    <SWRConfig value={{ provider: () => new Map() }}>{ui}</SWRConfig>,
  );
};

describe("RepositoryDetailPage", () => {
  it("Successでリポジトリ名・言語・各種カウントが表示される", async () => {
    renderWithSWR(<RepositoryDetailPage owner="test" repo="my-repo" />);

    expect(
      await screen.findByRole("heading", { name: "test/my-repo" }),
    ).toBeVisible();
    expect(screen.getByText("Language: TypeScript")).toBeVisible();

    expect(screen.getByText("Star数")).toBeVisible();
    expect(screen.getByText("1,200")).toBeVisible();
    expect(screen.getByText("Watcher数")).toBeVisible();
    expect(screen.getByText("300")).toBeVisible();
    expect(screen.getByText("Fork数")).toBeVisible();
    expect(screen.getByText("150")).toBeVisible();
    expect(screen.getByText("Issue数")).toBeVisible();
    expect(screen.getByText("42")).toBeVisible();
  });

  it("Loading状態でローディング表示が見える", async () => {
    server.use(
      http.get(
        endpoints.github.repositoryDetail("test", "loading"),
        async () => {
          await delay("infinite");
          return HttpResponse.json({});
        },
      ),
    );

    renderWithSWR(<RepositoryDetailPage owner="test" repo="loading" />);
    expect(screen.getByText("Loading...")).toBeVisible();
  });

  it("Error状態でエラー表示が見える", async () => {
    server.use(
      http.get(endpoints.github.repositoryDetail("test", "error"), () => {
        return HttpResponse.json({ message: "Mock error" }, { status: 500 });
      }),
    );

    renderWithSWR(<RepositoryDetailPage owner="test" repo="error" />);

    expect(await screen.findByRole("alert")).toBeVisible();
    expect(
      screen.getByText("リポジトリ詳細の取得に失敗しました"),
    ).toBeVisible();
  });
});

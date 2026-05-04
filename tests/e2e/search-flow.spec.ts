import { expect, test } from "@playwright/test";

import {
  buildRepoDetailResponse,
  buildSearchRepositoriesResponse,
} from "./mocks/github";

test("GitHub検索のhappy-path（検索→詳細→戻る→キャッシュ）", async ({
  page,
}) => {
  let searchCallCount = 0;
  let repoDetailCallCount = 0;

  await page.route("https://api.github.com/**", async (route) => {
    const url = new URL(route.request().url());

    if (url.pathname === "/search/repositories") {
      searchCallCount += 1;
      await route.fulfill({
        status: 200,
        json: buildSearchRepositoriesResponse(),
      });
      return;
    }

    const repoDetailMatch = url.pathname.match(/^\/repos\/([^/]+)\/([^/]+)$/);
    if (repoDetailMatch) {
      repoDetailCallCount += 1;
      await route.fulfill({ status: 200, json: buildRepoDetailResponse() });
      return;
    }

    await route.abort();
  });

  await page.goto("/");

  await page.getByLabel("検索クエリ").fill("next16-ai");
  await page.getByRole("button", { name: "検索" }).click();

  await expect(page.getByRole("list", { name: "検索結果" })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "next16-ai/next16-aidd" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "next16-ai/next16-aidd" }).click();

  await expect(page).toHaveURL(/\/repository-detail\/next16-ai\/next16-aidd/);
  await expect(
    page.getByRole("heading", { level: 1, name: "next16-ai/next16-aidd" }),
  ).toBeVisible();

  await expect(page.getByText("Language:")).toBeVisible();
  await expect(page.getByText("Star数")).toBeVisible();
  await expect(page.getByText("Watcher数")).toBeVisible();
  await expect(page.getByText("Fork数")).toBeVisible();
  await expect(page.getByText("Issue数")).toBeVisible();

  await page.getByRole("link", { name: "Next16-AIDD" }).click();

  await expect(page).toHaveURL("/?search=next16-ai&page=1");
  await expect(
    page.getByRole("button", { name: "next16-ai/next16-aidd" }),
  ).toBeVisible();

  await page.waitForTimeout(200);
  expect(searchCallCount).toBe(1);
  expect(repoDetailCallCount).toBe(1);
});

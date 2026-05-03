import { expect, test } from "@playwright/test";

test("トップページが表示される", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page).toHaveTitle(/Next/);
});


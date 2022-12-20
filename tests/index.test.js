import { expect, test } from '@playwright/test';

test("page title is 'Memory Game'", async ({ page }) => {
  await page.goto("/memory-game/")
  await expect(page).toHaveTitle("Memory Game")
})

test("initial content for game start", async ({ page }) => {
  await page.goto("/memory-game/")
  await expect(page.getByText("0 moves", { exact: true })).toBeVisible()
  await expect(page.getByRole("button", { name: "Records" })).toBeVisible()
})

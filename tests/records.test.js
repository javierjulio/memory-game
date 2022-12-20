import { expect, test } from '@playwright/test';

test("opens records modal using button", async ({ page }) => {
  await page.goto("/memory-game/")
  await page.getByRole("button", { name: "Records" }).click()
  await expect(page.getByText("Your objective is to solve puzzles in the fewest moves possible.")).toBeVisible()
  await expect(page.getByText("No games played")).toBeVisible()
  await expect(page.getByRole("button", { name: "Close" })).toBeVisible()
})

test("closes records modal using button", async ({ page }) => {
  await page.goto("/memory-game/")
  await page.getByRole("button", { name: "Records" }).click()
  await page.getByRole("button", { name: "Close" }).click()
  await expect(page.getByText("Your objective is to solve puzzles in the fewest moves possible.")).not.toBeVisible()
  await expect(page.getByText("No games played")).not.toBeVisible()
  await expect(page.getByRole("button", { name: "Close" })).not.toBeVisible()
})

test("clicking outside area closes records modal", async ({ page }) => {
  await page.goto("/memory-game/")
  await page.getByRole("button", { name: "Records" }).click()
  await expect(page.getByText("No games played")).toBeVisible()

  await page.mouse.click(10, 10)
  await expect(page.getByText("No games played")).not.toBeVisible()
})

test("pressing esc key closes records modal", async ({ page }) => {
  await page.goto("/memory-game/")
  await page.getByRole("button", { name: "Records" }).click()
  await expect(page.getByText("No games played")).toBeVisible()

  await page.keyboard.press("Escape")
  await expect(page.getByText("No games played")).not.toBeVisible()
})

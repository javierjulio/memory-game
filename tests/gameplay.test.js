import { expect, test } from '@playwright/test';

test("interacting with card pair increments move count", async ({ page }) => {
  await page.goto("/memory-game/")
  await expect(page.getByText("0 moves", { exact: true })).toBeVisible()

  await page.getByTestId("card-6").first().click()
  await page.getByTestId("card-6").last().click()
  await expect(page.getByText("1 move", { exact: true })).toBeVisible()

  await page.getByTestId("card-8").first().click()
  await page.getByTestId("card-8").last().click()
  await expect(page.getByText("2 moves", { exact: true })).toBeVisible()
})

test("playing the game to completion records play history", async ({ page }) => {
  await page.goto("/memory-game/")

  let dialogAccepted = false
  page.on("dialog", async dialog => {
    expect(dialog.type()).toEqual("alert")
    expect(dialog.message()).toEqual("You won in 8 moves!")
    dialog.accept()
    dialogAccepted = true
  });

  await page.getByTestId("card-1").first().click()
  await expect(page.getByTestId("card-1").first()).toHaveText("1")
  await page.getByTestId("card-1").last().click()
  await expect(page.getByTestId("card-1").last()).toHaveText("1")
  await expect(page.getByText("1 move", { exact: true })).toBeVisible()

  await page.getByTestId("card-2").first().click()
  await expect(page.getByTestId("card-2").first()).toHaveText("2")
  await page.getByTestId("card-2").last().click()
  await expect(page.getByTestId("card-2").last()).toHaveText("2")
  await expect(page.getByText("2 moves", { exact: true })).toBeVisible()

  await page.getByTestId("card-3").first().click()
  await page.getByTestId("card-3").last().click()
  await expect(page.getByText("3 moves", { exact: true })).toBeVisible()

  await page.getByTestId("card-4").first().click()
  await page.getByTestId("card-4").last().click()
  await expect(page.getByText("4 moves", { exact: true })).toBeVisible()

  await page.getByTestId("card-5").first().click()
  await page.getByTestId("card-5").last().click()
  await expect(page.getByText("5 moves", { exact: true })).toBeVisible()

  await page.getByTestId("card-6").first().click()
  await page.getByTestId("card-6").last().click()
  await expect(page.getByText("6 moves", { exact: true })).toBeVisible()

  await page.getByTestId("card-7").first().click()
  await page.getByTestId("card-7").last().click()
  await expect(page.getByText("7 moves", { exact: true })).toBeVisible()

  await page.getByTestId("card-8").first().click()
  await page.getByTestId("card-8").last().click()
  await expect(page.getByText("8 moves", { exact: true })).toBeVisible()

  // wait for animation to complete for on-dialog handler to fire
  await page.waitForTimeout(400);
  expect(dialogAccepted).toEqual(true)

  await expect(page.getByText("0 moves", { exact: true })).toBeVisible()

  await page.getByRole("button", { name: "Records" }).click()

  await expect(page.getByText("No games played")).not.toBeVisible()
  await expect(page.getByTestId("records-row0-col0")).toHaveText("8");
  await expect(page.getByTestId("records-row0-col1")).toHaveText("1");

  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  const dateText = new Date().toLocaleDateString("en-US", options)
  await expect(page.getByTestId("records-row0-col2")).toHaveText(dateText);

  await page.getByRole("button", { name: "Close" }).click()
});

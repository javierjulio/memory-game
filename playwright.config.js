// @ts-check

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  forbidOnly: !!process.env.CI, // Fail CI build if accidentally left test.only in code
  testDir: "tests",
  retries: process.env.CI ? 2 : 0,
  webServer: {
    command: "npm run build && npm run preview",
    port: 4173
  },
  workers: process.env.CI ? 2 : undefined,
}

export default config

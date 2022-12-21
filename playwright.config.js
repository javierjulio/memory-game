// @ts-check

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  webServer: {
    command: "npm run build && npm run preview",
    port: 4173
  },
  workers: process.env.CI ? 2 : undefined,
  testDir: "tests"
}

export default config

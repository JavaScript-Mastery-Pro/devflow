import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env.test") });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  globalSetup: "./tests/e2e/setup/global-setup.ts",
  globalTeardown: "./tests/e2e/setup/global-teardown.ts",
  /* Run tests in files in parallel */
  fullyParallel: true,
  timeout: 60 * 1000, // Maximum time a test can run
  expect: { timeout: 30 * 1000 }, // Maximum time for an assertion
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  outputDir: "test-results",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    trace: "on-first-retry",
    baseURL: process.env.BASE_URL,
    screenshot: "only-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    { name: "setup-chromium", testMatch: /tests\/e2e\/setup\/auth\.chromium\.setup\.ts/ },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], storageState: "storage/user_chrome.json" },
      dependencies: ["setup-chromium"],
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm run start:test",
    url: process.env.BASE_URL,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});

import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 45_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  retries: 0,
  use: {
    baseURL: `http://127.0.0.1:4173${process.env.ARS_TEST_BASE_PATH || "/"}`,
    trace: "retain-on-failure",
    launchOptions: process.env.ARS_TEST_CHROMIUM
      ? {
          executablePath: process.env.ARS_TEST_CHROMIUM,
          args: ["--no-sandbox", "--disable-dev-shm-usage"],
        }
      : {},
  },
  projects: [
    { name: "desktop-chromium", use: { ...devices["Desktop Chrome"] } },
    {
      name: "mobile-chromium",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
  ],
  webServer: {
    env: {
      BASE_URL: process.env.ARS_TEST_BASE_PATH || process.env.BASE_URL || "./",
    },
    command: "npm run preview -- --host 127.0.0.1 --port 4173",
    port: 4173,
    reuseExistingServer: true,
  },
});

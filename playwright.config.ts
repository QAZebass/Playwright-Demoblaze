import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';


dotenv.config();
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
dotenv.config({ path: './.env.Demoblaze' });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({

  testDir: './e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like await page.goto('/'). */
    baseURL: 'https://www.demoblaze.com/',
    //storageState: 'storageState.json',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    //SETUPS
    {
      name: "setup",
      testMatch: 'login.setup.ts',
      testDir: './e2e/setups',
    },
    /* {
      name: "setup2",
      testMatch: 'login.setup2.ts',
      testDir: './e2e/setups',
    },
    {
      name: "setup3",
      testMatch: 'login.setup3.ts',
      testDir: './e2e/setups',
    }, */
    //PROJECTS
    {
      name: 'Demoblaze-E2E-tests-in-Chrome',
      testDir: './e2e',
      use: {
        ...devices['Desktop Chrome'],
        headless: true,
        storageState: './e2e/playwright/.auth/user1.json'
      },
      dependencies: ['setup'],
    },

    /* {
      name: 'Demoblaze E2E tests on Firefox',
      use: {
        ...devices['Desktop Firefox'],
        headless: true,
        storageState: './e2e/playwright/.auth/user2.json'
      },
      dependencies: ['setup2'],
    },

    {
      name: 'Demoblaze E2E tests on Safari',
      use: {
        ...devices['Desktop Safari'],
        headless: true,
        storageState: './e2e/playwright/.auth/user3.json'
      },
      dependencies: ['setup3'],
    }, */

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
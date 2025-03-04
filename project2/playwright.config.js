import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 3,
  // retries: 2,
  timeout: 30000,
  use: {
    headless: false,
    browserName: 'chromium', // Run tests in Chromium
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on',
    // storageState: 'auth.json',
  },
  reporter: [['html', { outputFolder: 'test-results' }]], // Generates an HTML report
});

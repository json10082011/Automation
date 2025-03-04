import { test, expect } from '@playwright/test';

test('Check google home page', async ({ page }) => {
    await page.goto('https://google.com');
    await expect(page).toHaveTitle(/google/);
})
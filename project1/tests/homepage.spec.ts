import { test, expect } from '@playwright/test';

test('Check facebook home page', async ({ page }) => {
    await page.goto('https://facebook.com');
    await expect(page).toHaveTitle(/facebook/);
})
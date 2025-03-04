import { test, expect } from '@playwright/test';

test.describe('OrangeHRM Login Functionality', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  test('Should login successfully with valid credentials', async ({ page }) => {
    await page.fill('input[name="username"]', 'Admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');

    // Verify login is successful by checking URL & Dashboard presence
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator('h6')).toHaveText('Dashboard');
  });

  test('Should show error for invalid credentials', async ({ page }) => {
    await page.fill('input[name="username"]', 'invalidUser');
    await page.fill('input[name="password"]', 'wrongPassword');
    await page.click('button[type="submit"]');

    // Verify error message appears
    await expect(page.locator('.oxd-alert-content')).toContainText('Invalid credentials');
  });

});

test.describe('OrangeHRM Logout Functionality', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to login and perform login steps
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.fill('input[name="username"]', 'Admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/dashboard/);
  });

  test('Should log out successfully', async ({ page }) => {
    // Click on the profile dropdown
    await page.locator('.oxd-userdropdown-name').click();
    
    // Click Logout
    await page.getByRole('menuitem', { name: 'Logout' }).click();

    // Verify redirected to login page
    await expect(page).toHaveURL(/auth\/login/);
    await expect(page.locator('h5')).toHaveText('Login');
  });

});

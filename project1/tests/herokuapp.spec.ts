import { test, expect } from '@playwright/test';

test.describe('Login Functionality', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login'); 
  });

  test('Should login successfully with valid credentials', async ({ page }) => {
    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure'); 
    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
  });

  test('Should show error for invalid credentials', async ({ page }) => {
    await page.fill('#username', 'invaliduser');
    await page.fill('#password', 'wrongpassword');
    await page.click('button[type="submit"]');

    await expect(page.locator('#flash')).toContainText('Your username is invalid!');
  });

});

test.describe('Logout Functionality', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure'); 
  });

  test('Should log out successfully', async ({ page }) => {
    
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/login');
    await expect(page.locator('#flash')).toContainText('You logged out of the secure area!');
  });

});

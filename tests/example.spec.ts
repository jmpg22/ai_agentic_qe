import { test, expect } from '@playwright/test';
import { BasePage } from './page-objects/base.page';

test.describe('Playwright Documentation Sample Suite', () => {
  test('has title', async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.navigateTo('https://playwright.dev/');

    // Expect page title to contain substring
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('get started link navigates to installation page', async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.navigateTo('https://playwright.dev/');

    // Click the get started link
    await page.getByRole('link', { name: 'Get started' }).click();

    // Expect page to have a heading with the name of Installation
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });
});

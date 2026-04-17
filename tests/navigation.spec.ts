import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  async function openNav(page) {
    const hamburger = page.getByRole('button', { name: 'Toggle Navigation' });
    await hamburger.click();
    // Wait for nav to be visible (right-0 class or just wait for a link in it)
    await expect(page.locator('div.fixed.bg-brand-orange')).toBeVisible();
  }

  test('homepage should load and have correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Sakyadhita/);
  });

  test('should navigate to About page', async ({ page }) => {
    await openNav(page);
    await page.locator('div.fixed.bg-brand-orange').getByRole('link', { name: 'About Us' }).click();
    await expect(page).toHaveURL(/\/about/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  });

  test('should navigate to Conferences page', async ({ page }) => {
    await openNav(page);
    await page.locator('div.fixed.bg-brand-orange').getByRole('link', { name: 'Conferences' }).click();
    await expect(page).toHaveURL(/\/conferences/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  });

  test('should navigate to Resources page', async ({ page }) => {
    await openNav(page);
    await page.locator('div.fixed.bg-brand-orange').getByRole('link', { name: 'Resources' }).click();
    await expect(page).toHaveURL(/\/resources/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  });

  test('should navigate to Contact page', async ({ page }) => {
    await openNav(page);
    await page.locator('div.fixed.bg-brand-orange').getByRole('link', { name: 'Contact Us' }).click();
    await expect(page).toHaveURL(/\/contact/);
    // The contact page might not have a traditional H1, but check if any H1 is visible or just use text
    await expect(page.locator('body')).toContainText(/Contact/i);
  });

  test('should navigate to Join Us page via home section', async ({ page }) => {
    // Navigate via the button on the home page instead of the top nav to test both
    await page.locator('#home-be-involved').getByRole('link', { name: 'Join Us', exact: true }).click();
    await expect(page).toHaveURL(/\/join/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  });
});

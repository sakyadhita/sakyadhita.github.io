import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  async function openNav(page: any) {
    const hamburger = page.getByRole('button', { name: 'Toggle Navigation' });
    await hamburger.click();
    const navPanel = page.locator('div.fixed.bg-brand-orange')
    await expect(navPanel).toBeVisible();
    await navPanel.evaluate((element) => {
      element.scrollTop = element.scrollHeight
    })
    await expect(navPanel.getByRole('link', { name: 'Contact Us' })).toBeInViewport();
  }

  test('homepage should load and have correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Sakyadhita/);
  });

  test('should navigate to About page', async ({ page }) => {
    await openNav(page);
    await page.locator('div.fixed.bg-brand-orange').getByRole('link', { name: 'About Us' }).click();
    await expect(page).toHaveURL(/\/about/);
    await expect(page.getByRole('heading', { level: 1 }).filter({ visible: true }).first()).toBeVisible();
  });

  test('should navigate to Conferences page', async ({ page }) => {
    await openNav(page);
    await page.locator('div.fixed.bg-brand-orange').getByRole('link', { name: 'Conferences' }).click();
    await expect(page).toHaveURL(/\/conferences/);
    await expect(page.getByRole('heading', { level: 1 }).filter({ visible: true }).first()).toBeVisible();
  });

  test('should navigate to Resources page', async ({ page }) => {
    await openNav(page);
    await page.locator('div.fixed.bg-brand-orange').getByRole('link', { name: 'Resources' }).click();
    await expect(page).toHaveURL(/\/resources/);
    await expect(page.getByRole('heading', { level: 1 }).filter({ visible: true }).first()).toBeVisible();
  });

  test('should navigate to Contact page', async ({ page }) => {
    await openNav(page);
    const contactLink = page
      .locator('div.fixed.bg-brand-orange')
      .getByRole('link', { name: 'Contact Us' })

    await contactLink.scrollIntoViewIfNeeded()
    await contactLink.click()
    await expect(page).toHaveURL(/\/contact/);
    // The contact page might not have a traditional H1, but check if any H1 is visible or just use text
    await expect(page.locator('body')).toContainText(/Contact/i);
  });

  test('should navigate to Join Us page via home section', async ({ page }) => {
    // Navigate via the button on the home page instead of the top nav to test both
    await page.locator('#home-be-involved').getByRole('link', { name: 'Join Us', exact: true }).click();
    await expect(page).toHaveURL(/\/join/);
    await expect(page.getByRole('heading', { level: 1 }).filter({ visible: true }).first()).toBeVisible();
  });
});

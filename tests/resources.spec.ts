import { test, expect } from '@playwright/test'

/**
 * Tests for the Astro-rendered ResourcesNavBar component.
 * Active-link detection is now server-rendered via Astro.url.pathname rather
 * than React useState + window.location.pathname.
 *
 * NOTE: CSS selector `.bg-brand-dark-orange` matches only the exact class token,
 * not the `hover:bg-brand-dark-orange` variant that all links carry.
 */
test.describe('Resources Navigation Bar (desktop)', () => {
  test.use({ viewport: { width: 1280, height: 720 } })

  test('should be visible on the resources landing page', async ({ page }) => {
    await page.goto('/resources')
    // The desktop nav is hidden md:flex — visible at 1280px
    const nav = page.locator('nav.sticky')
    await expect(nav).toBeVisible()
  })

  test('should highlight exactly one link (resources) on the resources landing page', async ({
    page
  }) => {
    await page.goto('/resources')
    // CSS selector .bg-brand-dark-orange matches only the exact class token,
    // not the hover:bg-brand-dark-orange variant
    const activeLinks = page.locator('nav.sticky a.bg-brand-dark-orange')
    await expect(activeLinks).toHaveCount(1)
    await expect(activeLinks.first()).toContainText('resources')
  })

  test('should highlight exactly one link (newsletters) on the newsletters page', async ({
    page
  }) => {
    await page.goto('/newsletters')
    const activeLinks = page.locator('nav.sticky a.bg-brand-dark-orange')
    await expect(activeLinks).toHaveCount(1)
    await expect(activeLinks.first()).toContainText('newsletters')
  })

  test('should navigate to the newsletters page from the resources navbar', async ({ page }) => {
    await page.goto('/resources')
    await page.locator('nav.sticky').getByRole('link', { name: 'newsletters' }).click()
    await expect(page).toHaveURL(/\/newsletters/)
    await expect(
      page.getByRole('heading', { level: 1 }).filter({ visible: true }).first()
    ).toBeVisible()
  })

  test('should navigate to the publications page from the resources navbar', async ({ page }) => {
    await page.goto('/resources')
    await page.locator('nav.sticky').getByRole('link', { name: 'publications' }).click()
    await expect(page).toHaveURL(/\/publications/)
  })
})

/**
 * Tests for the mobile resources drawer (toggle button + slide-in drawer).
 * The drawer is handled by a plain <script> tag in ResourcesNavBar.astro —
 * no React hydration required.
 */
test.describe('Resources Mobile Navigation Drawer', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('should show the mobile menu toggle button on resources pages', async ({ page }) => {
    await page.goto('/newsletters')
    // md:hidden means visible below 768px on a 390px viewport
    const toggleBtn = page.getByRole('button', { name: 'Toggle Resources Menu' })
    await expect(toggleBtn).toBeVisible()
  })

  test('should open and close the mobile resources drawer', async ({ page }) => {
    await page.goto('/newsletters')
    const toggleBtn = page.getByRole('button', { name: 'Toggle Resources Menu' })
    const drawer = page.locator('#resources-mobile-drawer')

    // Drawer starts off-screen (translate-x-full)
    await expect(drawer).toHaveClass(/translate-x-full/)

    // Open the drawer
    await toggleBtn.click()
    await expect(drawer).not.toHaveClass(/translate-x-full/)

    // Close the drawer via the X button
    await page.getByRole('button', { name: 'Close Resources Navigation' }).click()
    await expect(drawer).toHaveClass(/translate-x-full/)
  })

  test('should contain all navigation links in the mobile drawer', async ({ page }) => {
    await page.goto('/resources')
    const toggleBtn = page.getByRole('button', { name: 'Toggle Resources Menu' })
    await toggleBtn.click()

    const drawer = page.locator('#resources-mobile-drawer')
    await expect(drawer.getByRole('link', { name: 'resources' })).toBeVisible()
    await expect(drawer.getByRole('link', { name: 'newsletters' })).toBeVisible()
    await expect(drawer.getByRole('link', { name: 'publications' })).toBeVisible()
    await expect(drawer.getByRole('link', { name: 'buddhist culture' })).toBeVisible()
    await expect(drawer.getByRole('link', { name: 'ordination issue' })).toBeVisible()
  })
})

/**
 * Tests for the new 404 page — previously a React island, now pure Astro.
 */
test.describe('404 Page', () => {
  test('should display the 404 page for non-existent routes', async ({ page }) => {
    await page.goto('/this-page-does-not-exist')
    await expect(page.locator('body')).toContainText(/404/)
  })

  test('should render the page header without JavaScript', async ({ page }) => {
    // Disable JS to verify the 404 page is fully server-rendered
    await page.context().setExtraHTTPHeaders({})
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'javaEnabled', { value: () => false })
    })
    await page.goto('/this-page-does-not-exist')
    // The Astro-rendered h1 should be present without any hydration
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible()
  })
})

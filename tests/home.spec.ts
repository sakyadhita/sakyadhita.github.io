import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display the slideshow', async ({ page }) => {
    // Check for the presence of the slideshow container
    const slideshow = page.locator('.Slideshow')
    await expect(slideshow).toBeVisible()
  })

  test('should display the introduction section', async ({ page }) => {
    const intro = page.locator('#home-intro')
    await expect(intro).toBeVisible()
  })

  test('should display the interactive map', async ({ page }) => {
    const map = page.locator('#branches-and-chapters')
    await expect(map).toBeVisible()
    // The map uses react-simple-maps which renders SVG
    const svgMap = map.locator('svg')
    await expect(svgMap).toBeVisible()
  })

  test('should display the Be Involved section', async ({ page }) => {
    const beInvolved = page.locator('#home-be-involved')
    await expect(beInvolved).toBeVisible()

    // Check for the three involve-sections, being specific to the container
    const joinUs = beInvolved.getByRole('link', { name: 'Join Us', exact: true })
    const volunteer = beInvolved.getByRole('link', { name: 'Volunteer', exact: true })
    const donate = beInvolved.getByRole('link', { name: 'Donate', exact: true })

    await expect(joinUs).toBeVisible()
    await expect(volunteer).toBeVisible()
    await expect(donate).toBeVisible()
  })
})

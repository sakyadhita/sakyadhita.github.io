import { test, expect } from '@playwright/test'

test.describe('Footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should have correct social media links', async ({ page }) => {
    const facebookLink = page.locator('a[href="https://www.facebook.com/sakyadhita.international"]')
    const youtubeLink = page.locator(
      'a[href="https://www.youtube.com/channel/UCLOIc4vqaqPKcjaRqmn6-yg/playlists"]'
    )
    const pinterestLink = page.locator('a[href="https://www.pinterest.com/sakyadhita/"]')
    const blogLink = page.locator('a[href="http://awakeningbuddhistwomen.blogspot.com/"]')
    const goodreadsLink = page.locator(
      'a[href="https://www.goodreads.com/group/show/94269-women-in-buddhism"]'
    )

    await expect(facebookLink).toBeVisible()
    await expect(youtubeLink).toBeVisible()
    await expect(pinterestLink).toBeVisible()
    await expect(blogLink).toBeVisible()
    await expect(goodreadsLink).toBeVisible()
  })

  test('should have internal page links', async ({ page }) => {
    const homeLink = page.getByRole('link', { name: 'Home', exact: true }).last() // Use last() to get footer one
    const conferencesLink = page.getByRole('link', { name: 'Conferences', exact: true }).last()
    const resourcesLink = page.getByRole('link', { name: 'Resources', exact: true }).last()
    const aboutLink = page.getByRole('link', { name: 'About', exact: true }).last()
    const contactLink = page.getByRole('link', { name: 'Contact', exact: true }).last()

    await expect(homeLink).toBeVisible()
    await expect(conferencesLink).toBeVisible()
    await expect(resourcesLink).toBeVisible()
    await expect(aboutLink).toBeVisible()
    await expect(contactLink).toBeVisible()
  })
})

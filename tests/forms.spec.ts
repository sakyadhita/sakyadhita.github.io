import { test, expect } from '@playwright/test'

test.describe('Form Interactivity', () => {
  test('Join Us form should show address fields when country is selected', async ({ page }) => {
    await page.goto('/join')

    const addressFields = page.locator('#address-fields')
    await expect(addressFields).toBeHidden()

    // Select a country
    await page.selectOption('#country-select', 'United States')
    await expect(addressFields).toBeVisible()
  })

  test('Join Us form should toggle membership sections', async ({ page }) => {
    await page.goto('/join')

    const membershipSections = page.locator('#membership-sections')
    const emailOnlySubmit = page.locator('#email-only-submit')
    const checkbox = page.getByLabel(
      'Not interested in membership, but want to be on the email list.'
    )

    await expect(membershipSections).toBeVisible()
    await expect(emailOnlySubmit).toBeHidden()

    await checkbox.check()

    await expect(membershipSections).toBeHidden()
    await expect(emailOnlySubmit).toBeVisible()
  })

  test('Volunteer form should select committees', async ({ page }) => {
    await page.goto('/volunteer')

    const checkboxes = page.locator('input[name="interests"]')
    await expect(checkboxes).toHaveCount(15) // Based on src/content/volinterest/

    await checkboxes.first().check()
    await expect(checkboxes.first()).toBeChecked()
  })
})

# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: join-us.spec.ts >> Join Us Form >> should toggle address fields when country is selected
- Location: tests/join-us.spec.ts:28:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('#address-fields')
Expected: visible
Received: hidden
Timeout:  5000ms

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('#address-fields')
    9 × locator resolved to <div id="address-fields" data-astro-cid-wf7cagh2="" class="hidden-section space-y-4 pt-2 fade-in slide-in-from-top-4">…</div>
      - unexpected value "hidden"

```

# Page snapshot

```yaml
- generic [ref=e2]:
    - navigation [ref=e3]:
        - generic [ref=e4]:
            - link "Logo sakyadhita international association of buddhist women" [ref=e5] [cursor=pointer]:
                - /url: /
                - img "Logo" [ref=e6]
                - generic [ref=e7]:
                    - heading "sakyadhita" [level=3] [ref=e8]
                    - generic [ref=e9]: international association of buddhist women
            - button "Toggle Navigation" [ref=e10] [cursor=pointer]:
                - img [ref=e11]
        - generic [ref=e14]:
            - link "Home" [ref=e15] [cursor=pointer]:
                - /url: /
                - generic [ref=e16]: Home
            - link "Conferences" [ref=e17] [cursor=pointer]:
                - /url: /conferences
                - generic [ref=e18]: Conferences
            - link "Resources" [ref=e19] [cursor=pointer]:
                - /url: /resources
                - generic [ref=e20]: Resources
            - link "About Us" [ref=e21] [cursor=pointer]:
                - /url: /about
                - generic [ref=e22]: About Us
            - link "Contact Us" [ref=e23] [cursor=pointer]:
                - /url: /contact
                - generic [ref=e24]: Contact Us
        - generic "Close navigation overlay"
    - main [ref=e25]:
        - generic [ref=e27]:
            - heading "Join Us" [level=1] [ref=e28]
            - paragraph [ref=e29]: You join the world's leading international organization committed to transforming the lives of women in Buddhist societies. Sakyadhita seeks to unite Buddhist women of diverse countries and traditions, to promote their welfare, and to facilitate their work for the benefit of humanity. We invite you to join us in developing comprehensive resources to globally assist Buddhist women in creating a better world.
        - generic [ref=e31]:
            - generic [ref=e32]:
                - heading "Thank you for your interest!" [level=1] [ref=e33]
                - paragraph [ref=e34]: By filling out this form, you will be added to the email list. If you wish to also have a membership with Sakyadhita, you will be asked to pay a membership fee through PayPal once all required fields are filled out. If you wish to only be on the email list, please check the “Not interested in membership” box below.
                - generic [ref=e35]:
                    - checkbox "Not interested in membership, but want to be on the email list." [ref=e36]
                    - generic [ref=e37] [cursor=pointer]: Not interested in membership, but want to be on the email list.
            - generic [ref=e38]:
                - generic [ref=e39]:
                    - heading "Sign Me Up!" [level=1] [ref=e40]
                    - generic [ref=e41]:
                        - textbox "First Name" [ref=e43]
                        - generic [ref=e44]: '*'
                    - textbox "Middle Name" [ref=e47]
                    - generic [ref=e48]:
                        - textbox "Last Name" [ref=e50]
                        - generic [ref=e51]: '*'
                - generic [ref=e52]:
                    - heading "Contact Information" [level=1] [ref=e53]
                    - generic [ref=e54]:
                        - textbox "Email Address" [ref=e56]
                        - generic [ref=e57]: '*'
                    - generic [ref=e58]:
                        - combobox [ref=e60]:
                            - option "Select Country" [disabled]
                            - option "Afghanistan"
                            - option "Åland Islands"
                            - option "Albania"
                            - option "Algeria"
                            - option "American Samoa"
                            - option "Andorra"
                            - option "Angola"
                            - option "Anguilla"
                            - option "Antarctica"
                            - option "Antigua and Barbuda"
                            - option "Argentina"
                            - option "Armenia"
                            - option "Aruba"
                            - option "Australia"
                            - option "Austria"
                            - option "Azerbaijan"
                            - option "Bahamas"
                            - option "Bahrain"
                            - option "Bangladesh"
                            - option "Barbados"
                            - option "Belarus"
                            - option "Belgium"
                            - option "Belize"
                            - option "Benin"
                            - option "Bermuda"
                            - option "Bhutan"
                            - option "Bolivia"
                            - option "Bonaire, Sint Eustatius and Saba"
                            - option "Bosnia and Herzegovina"
                            - option "Botswana"
                            - option "Bouvet Island"
                            - option "Brazil"
                            - option "British Indian Ocean Territory"
                            - option "Brunei Darussalam"
                            - option "Bulgaria"
                            - option "Burkina Faso"
                            - option "Burundi"
                            - option "Cambodia"
                            - option "Cameroon"
                            - option "Canada"
                            - option "Cape Verde"
                            - option "Cayman Islands"
                            - option "Central African Republic"
                            - option "Chad"
                            - option "Chile"
                            - option "China"
                            - option "Christmas Island"
                            - option "Cocos (Keeling) Islands"
                            - option "Colombia"
                            - option "Comoros"
                            - option "Congo, Republic of the (Brazzaville)"
                            - option "Congo, the Democratic Republic of the (Kinshasa)"
                            - option "Cook Islands"
                            - option "Costa Rica"
                            - option "Côte d'Ivoire, Republic of"
                            - option "Croatia"
                            - option "Cuba"
                            - option "Curaçao"
                            - option "Cyprus"
                            - option "Czech Republic"
                            - option "Denmark"
                            - option "Djibouti"
                            - option "Dominica"
                            - option "Dominican Republic"
                            - option "Ecuador"
                            - option "Egypt"
                            - option "El Salvador"
                            - option "Equatorial Guinea"
                            - option "Eritrea"
                            - option "Estonia"
                            - option "Ethiopia"
                            - option "Falkland Islands (Islas Malvinas)"
                            - option "Faroe Islands"
                            - option "Fiji"
                            - option "Finland"
                            - option "France"
                            - option "French Guiana"
                            - option "French Polynesia"
                            - option "French Southern and Antarctic Lands"
                            - option "Gabon"
                            - option "Gambia, The"
                            - option "Georgia"
                            - option "Germany"
                            - option "Ghana"
                            - option "Gibraltar"
                            - option "Greece"
                            - option "Greenland"
                            - option "Grenada"
                            - option "Guadeloupe"
                            - option "Guam"
                            - option "Guatemala"
                            - option "Guernsey"
                            - option "Guinea"
                            - option "Guinea-Bissau"
                            - option "Guyana"
                            - option "Haiti"
                            - option "Heard Island and McDonald Islands"
                            - option "Holy See (Vatican City)"
                            - option "Honduras"
                            - option "Hong Kong"
                            - option "Hungary"
                            - option "Iceland"
                            - option "India"
                            - option "Indonesia"
                            - option "Iran, Islamic Republic of"
                            - option "Iraq"
                            - option "Ireland"
                            - option "Isle of Man"
                            - option "Israel"
                            - option "Italy"
                            - option "Jamaica"
                            - option "Japan"
                            - option "Jersey"
                            - option "Jordan"
                            - option "Kazakhstan"
                            - option "Kenya"
                            - option "Kiribati"
                            - option "Korea, Democratic People's Republic of"
                            - option "Korea, Republic of"
                            - option "Kosovo"
                            - option "Kuwait"
                            - option "Kyrgyzstan"
                            - option "Laos"
                            - option "Latvia"
                            - option "Lebanon"
                            - option "Lesotho"
                            - option "Liberia"
                            - option "Libya"
                            - option "Liechtenstein"
                            - option "Lithuania"
                            - option "Luxembourg"
                            - option "Macao"
                            - option "Macedonia, Republic of"
                            - option "Madagascar"
                            - option "Malawi"
                            - option "Malaysia"
                            - option "Maldives"
                            - option "Mali"
                            - option "Malta"
                            - option "Marshall Islands"
                            - option "Martinique"
                            - option "Mauritania"
                            - option "Mauritius"
                            - option "Mayotte"
                            - option "Mexico"
                            - option "Micronesia, Federated States of"
                            - option "Moldova"
                            - option "Monaco"
                            - option "Mongolia"
                            - option "Montenegro"
                            - option "Montserrat"
                            - option "Morocco"
                            - option "Mozambique"
                            - option "Myanmar"
                            - option "Namibia"
                            - option "Nauru"
                            - option "Nepal"
                            - option "Netherlands"
                            - option "New Caledonia"
                            - option "New Zealand"
                            - option "Nicaragua"
                            - option "Niger"
                            - option "Nigeria"
                            - option "Niue"
                            - option "Norfolk Island"
                            - option "Northern Mariana Islands"
                            - option "Norway"
                            - option "Oman"
                            - option "Pakistan"
                            - option "Palau"
                            - option "Palestine"
                            - option "Panama"
                            - option "Papua New Guinea"
                            - option "Paraguay"
                            - option "Peru"
                            - option "Philippines"
                            - option "Pitcairn"
                            - option "Poland"
                            - option "Portugal"
                            - option "Puerto Rico"
                            - option "Qatar"
                            - option "Réunion"
                            - option "Romania"
                            - option "Russian Federation"
                            - option "Rwanda"
                            - option "Saint Barthélemy"
                            - option "Saint Helena, Ascension and Tristan da Cunha"
                            - option "Saint Kitts and Nevis"
                            - option "Saint Lucia"
                            - option "Saint Martin"
                            - option "Saint Pierre and Miquelon"
                            - option "Saint Vincent and the Grenadines"
                            - option "Samoa"
                            - option "San Marino"
                            - option "Sao Tome and Principe"
                            - option "Saudi Arabia"
                            - option "Senegal"
                            - option "Serbia"
                            - option "Seychelles"
                            - option "Sierra Leone"
                            - option "Singapore"
                            - option "Sint Maarten (Dutch part)"
                            - option "Slovakia"
                            - option "Slovenia"
                            - option "Solomon Islands"
                            - option "Somalia"
                            - option "South Africa"
                            - option "South Georgia and South Sandwich Islands"
                            - option "South Sudan"
                            - option "Spain"
                            - option "Sri Lanka"
                            - option "Sudan"
                            - option "Suriname"
                            - option "Eswatini"
                            - option "Sweden"
                            - option "Switzerland"
                            - option "Syrian Arab Republic"
                            - option "Taiwan"
                            - option "Tajikistan"
                            - option "Tanzania, United Republic of"
                            - option "Thailand"
                            - option "Timor-Leste"
                            - option "Togo"
                            - option "Tokelau"
                            - option "Tonga"
                            - option "Trinidad and Tobago"
                            - option "Tunisia"
                            - option "Turkey"
                            - option "Turkmenistan"
                            - option "Turks and Caicos Islands"
                            - option "Tuvalu"
                            - option "Uganda"
                            - option "Ukraine"
                            - option "United Arab Emirates"
                            - option "United Kingdom"
                            - option "United States" [selected]
                            - option "United States Minor Outlying Islands"
                            - option "Uruguay"
                            - option "Uzbekistan"
                            - option "Vanuatu"
                            - option "Venezuela, Bolivarian Republic of"
                            - option "Vietnam"
                            - option "Virgin Islands, British"
                            - option "Virgin Islands, U.S."
                            - option "Wallis and Futuna"
                            - option "Western Sahara"
                            - option "Yemen"
                            - option "Zambia"
                            - option "Zimbabwe"
                        - generic [ref=e61]: '*'
                - generic [ref=e62]:
                    - generic [ref=e63]:
                        - heading "Additional Information" [level=1] [ref=e64]
                        - generic [ref=e65]:
                            - combobox [ref=e67]:
                                - option "New or Renewing Member?" [disabled] [selected]
                                - option "New"
                                - option "Renewing"
                            - generic [ref=e68]: '*'
                        - generic [ref=e69]:
                            - textbox "List any organizations you’re involved with" [ref=e71]
                            - generic [ref=e72]: '*'
                    - generic [ref=e73]:
                        - heading "Payment Options" [level=1] [ref=e74]
                        - generic [ref=e75]:
                            - combobox [ref=e77]:
                                - option "Select Membership" [disabled] [selected]
                                - option "Nun/Student/Unemployed $15 USD"
                                - option "General $30 USD"
                                - option "Lifetime - Nun/Student/Unemployed $150 USD"
                                - option "Lifetime $300 USD"
                            - generic [ref=e78]: '*'
                        - generic [ref=e79]:
                            - checkbox "I would like to donate in addition to membership fees" [ref=e80]
                            - generic [ref=e81] [cursor=pointer]: I would like to donate in addition to membership fees
                    - paragraph [ref=e84]: '*Please fill out all required fields to proceed to payment.'
    - generic [ref=e87]:
        - generic [ref=e88]:
            - generic [ref=e89]:
                - link "Home" [ref=e90] [cursor=pointer]:
                    - /url: /
                - generic [ref=e91]:
                    - link "Logo Join Us" [ref=e92] [cursor=pointer]:
                        - /url: /join
                        - img "Logo" [ref=e93]
                        - text: Join Us
                    - link "Logo Volunteer" [ref=e94] [cursor=pointer]:
                        - /url: /volunteer
                        - img "Logo" [ref=e95]
                        - text: Volunteer
                    - link "Logo Donate" [ref=e96] [cursor=pointer]:
                        - /url: /donate
                        - img "Logo" [ref=e97]
                        - text: Donate
            - generic [ref=e98]:
                - link "Conferences" [ref=e99] [cursor=pointer]:
                    - /url: /conferences
                - generic [ref=e100]:
                    - link "Logo 2025 19th conference, (Sarawak, Malaysia)" [ref=e101] [cursor=pointer]:
                        - /url: /conferences/19
                        - img "Logo" [ref=e102]
                        - text: 2025 19th conference, (Sarawak, Malaysia)
                    - link "Logo 2023 18th conference, (Seoul, Korea)" [ref=e103] [cursor=pointer]:
                        - /url: /conferences/18
                        - img "Logo" [ref=e104]
                        - text: 2023 18th conference, (Seoul, Korea)
                    - link "Logo 2021 17th conference, (online)" [ref=e105] [cursor=pointer]:
                        - /url: /conferences/17
                        - img "Logo" [ref=e106]
                        - text: 2021 17th conference, (online)
                    - link "Logo 2019 16th conference, (Blue Mountains, Australia)" [ref=e107] [cursor=pointer]:
                        - /url: /conferences/16
                        - img "Logo" [ref=e108]
                        - text: 2019 16th conference, (Blue Mountains, Australia)
            - generic [ref=e109]:
                - link "Resources" [ref=e110] [cursor=pointer]:
                    - /url: /resources
                - generic [ref=e111]:
                    - link "Logo Newsletters" [ref=e112] [cursor=pointer]:
                        - /url: /newsletters
                        - img "Logo" [ref=e113]
                        - text: Newsletters
                    - link "Logo Publications" [ref=e114] [cursor=pointer]:
                        - /url: /publications
                        - img "Logo" [ref=e115]
                        - text: Publications
                    - link "Logo Buddhist Culture" [ref=e116] [cursor=pointer]:
                        - /url: /buddhist-culture
                        - img "Logo" [ref=e117]
                        - text: Buddhist Culture
                    - link "Logo Ordination" [ref=e118] [cursor=pointer]:
                        - /url: /ordination-issue
                        - img "Logo" [ref=e119]
                        - text: Ordination
            - link "About" [ref=e121] [cursor=pointer]:
                - /url: /about
            - link "Contact" [ref=e123] [cursor=pointer]:
                - /url: /contact
        - generic [ref=e124]:
            - generic [ref=e125]:
                - generic [ref=e126]: Check us out on these platforms!
                - generic [ref=e127]:
                    - link [ref=e128] [cursor=pointer]:
                        - /url: https://www.facebook.com/sakyadhita.international
                        - img [ref=e129]
                    - link [ref=e131] [cursor=pointer]:
                        - /url: https://www.youtube.com/channel/UCLOIc4vqaqPKcjaRqmn6-yg/playlists
                        - img [ref=e132]
                    - link [ref=e134] [cursor=pointer]:
                        - /url: https://www.pinterest.com/sakyadhita/
                        - img [ref=e135]
                    - link [ref=e137] [cursor=pointer]:
                        - /url: http://awakeningbuddhistwomen.blogspot.com/
                        - img [ref=e138]
                    - link [ref=e140] [cursor=pointer]:
                        - /url: https://www.goodreads.com/group/show/94269-women-in-buddhism
                        - img [ref=e141]
            - link "Logo sakyadhita international association of buddhist women" [ref=e143] [cursor=pointer]:
                - /url: /
                - img "Logo" [ref=e144]
                - generic [ref=e145]:
                    - heading "sakyadhita" [level=3] [ref=e146]
                    - generic [ref=e147]: international association of buddhist women
        - generic [ref=e148]:
            - img "license" [ref=e149]
            - generic [ref=e150]:
                - text: © 2026 Website is licensed under a
                - link "Creative Commons Attribution-NonCommercial-NoDerivs 4.0 International License" [ref=e151] [cursor=pointer]:
                    - /url: https://creativecommons.org/licenses/by-nc-nd/4.0/
                - text: .
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  |
  3  | test.describe('Join Us Form', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     await page.goto('/join')
  6  |   })
  7  |
  8  |   test('should show required error messages on empty submit', async ({ page }) => {
  9  |     // Force visibility for all sections to allow interaction
  10 |     await page.evaluate(() => {
  11 |       document.querySelectorAll('.hidden').forEach(el => el.classList.remove('hidden'));
  12 |     })
  13 |
  14 |     // Fill nothing and submit
  15 |     await page.evaluate(() => (document.getElementById('submit-email-only') as HTMLButtonElement)?.click())
  16 |
  17 |     // Check if snackbar appears
  18 |     const snackbar = page.locator('#error-snackbar')
  19 |     await page.evaluate(() => document.getElementById('error-snackbar')?.classList.remove('hidden'))
  20 |     await expect(snackbar).toBeVisible()
  21 |     await expect(snackbar).toContainText('Missing required fields')
  22 |
  23 |     // Check if red borders are applied to required fields
  24 |     const firstName = page.locator('input[name="firstName"]')
  25 |     await expect(firstName).toHaveClass(/border-brand-red/)
  26 |   })
  27 |
  28 |   test('should toggle address fields when country is selected', async ({ page }) => {
  29 |     const addressFields = page.locator('#address-fields')
  30 |     await expect(addressFields).toBeHidden()
  31 |
  32 |     await page.selectOption('#country-select', 'United States')
> 33 |     await expect(addressFields).toBeVisible()
     |                                 ^ Error: expect(locator).toBeVisible() failed
  34 |   })
  35 |
  36 |   test('should toggle membership sections via checkbox', async ({ page }) => {
  37 |     const membershipSections = page.locator('#membership-sections')
  38 |     const emailOnlySubmit = page.locator('#email-only-submit')
  39 |     const checkbox = page.locator('#membershipCheck')
  40 |
  41 |     // Initial state: membership shown, email only hidden
  42 |     await expect(membershipSections).toBeVisible()
  43 |     await expect(emailOnlySubmit).toBeHidden()
  44 |
  45 |     // Check it: should hide membership, show email only
  46 |     await checkbox.check()
  47 |     await expect(membershipSections).toBeHidden()
  48 |     await expect(emailOnlySubmit).toBeVisible()
  49 |
  50 |     // Uncheck it: should restore initial state
  51 |     await checkbox.uncheck()
  52 |     await expect(membershipSections).toBeVisible()
  53 |     await expect(emailOnlySubmit).toBeHidden()
  54 |   })
  55 |
  56 |   test('should toggle donation field via checkbox', async ({ page }) => {
  57 |     const donationField = page.locator('#donation-field')
  58 |     const checkbox = page.locator('#donateCheck')
  59 |
  60 |     await expect(donationField).toBeHidden()
  61 |
  62 |     await checkbox.check()
  63 |     await expect(donationField).toBeVisible()
  64 |
  65 |     await checkbox.uncheck()
  66 |     await expect(donationField).toBeHidden()
  67 |   })
  68 |
  69 |   test('should show continue to payment button only when form is valid', async ({ page }) => {
  70 |     const continueBtn = page.locator('#payment-button-container')
  71 |     const notice = page.locator('#payment-requirement-notice')
  72 |
  73 |     await expect(continueBtn).toBeHidden()
  74 |     await expect(notice).toBeVisible()
  75 |
  76 |     // Fill minimum required fields for membership flow
  77 |     await page.fill('input[name="firstName"]', 'Test')
  78 |     await page.fill('input[name="lastName"]', 'User')
  79 |     await page.fill('input[name="emailAddress"]', 'test@example.com')
  80 |     await page.selectOption('#country-select', 'United States')
  81 |
  82 |     // Address fields should be visible now
  83 |     await page.fill('input[name="addressOne"]', '123 Test St')
  84 |     await page.fill('input[name="city"]', 'Test City')
  85 |     await page.fill('input[name="stateLocation"]', 'TS')
  86 |     await page.fill('input[name="zipcode"]', '12345')
  87 |
  88 |     await page.selectOption('select[name="isNewMember"]', 'new')
  89 |     await page.fill('textarea[name="organizations"]', 'Test Org')
  90 |     await page.selectOption('#membership-select', '1') // Select index 1
  91 |
  92 |     await expect(continueBtn).toBeVisible()
  93 |     await page.evaluate(() => (document.getElementById('continue-to-payment') as HTMLButtonElement)?.click())
  94 |     await expect(notice).toBeHidden()
  95 |   })
  96 | })
  97 |
```

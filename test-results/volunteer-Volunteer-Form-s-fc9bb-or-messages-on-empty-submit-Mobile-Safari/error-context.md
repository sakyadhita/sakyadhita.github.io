# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: volunteer.spec.ts >> Volunteer Form >> should show required error messages on empty submit
- Location: tests/volunteer.spec.ts:8:3

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('#error-snackbar')
Expected substring: "Missing required fields"
Received string:    "  X "
Timeout: 5000ms

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('#error-snackbar')
    9 × locator resolved to <div id="error-snackbar" data-astro-cid-o4y3t2l6="" class="fixed bottom-5 left-5 z-50 min-w-80 items-center justify-between rounded-lg bg-brand-red px-6 py-3 text-white shadow-lg">…</div>
      - unexpected value "  X "

```

# Page snapshot

```yaml
- generic [ref=e2]:
    - navigation [ref=e3]:
        - generic [ref=e4]:
            - link "Logo sakyadhita" [ref=e5]:
                - /url: /
                - img "Logo" [ref=e6]
                - heading "sakyadhita" [level=3] [ref=e8]
            - button "Toggle Navigation" [ref=e9] [cursor=pointer]:
                - img [ref=e10]
        - generic [ref=e13]:
            - button "Close Navigation" [ref=e14] [cursor=pointer]:
                - img [ref=e15]
            - generic [ref=e18]:
                - link "Home" [ref=e19]:
                    - /url: /
                    - generic [ref=e20]: Home
                - link "Conferences" [ref=e21]:
                    - /url: /conferences
                    - generic [ref=e22]: Conferences
                - link "Resources" [ref=e23]:
                    - /url: /resources
                    - generic [ref=e24]: Resources
                - link "About Us" [ref=e25]:
                    - /url: /about
                    - generic [ref=e26]: About Us
                - link "Contact Us" [ref=e27]:
                    - /url: /contact
                    - generic [ref=e28]: Contact Us
    - main [ref=e29]:
        - heading "Volunteer" [level=1] [ref=e32]
        - generic [ref=e33]:
            - generic [ref=e34]:
                - generic [ref=e35]:
                    - heading "Support Sakyadhita!" [level=1] [ref=e36]
                    - paragraph [ref=e37]: Sakyadhita is a 501(c)3 non-profit organization. We are a volunteer-run organization and rely on the generous support of our members and donors. We are always looking for volunteers to help us with our various initiatives. If you are interested in volunteering with us, please fill out the form below and select the committees you are interested in joining.
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
                                - option "Select Country" [disabled] [selected]
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
                                - option "United States"
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
                            - textbox "Full Address" [ref=e64]
                            - generic [ref=e65]: '*'
                        - textbox "Phone Number" [ref=e68]
                    - generic [ref=e69]:
                        - heading "Committee Interests" [level=1] [ref=e70]
                        - paragraph [ref=e71]: 'Select any and all committees you are interested in joining:'
                        - generic [ref=e72]:
                            - generic [ref=e73]:
                                - generic [ref=e74]:
                                    - checkbox "Editing" [ref=e75]
                                    - generic [ref=e76] [cursor=pointer]: Editing
                                - paragraph [ref=e77]: Editing is interesting
                            - generic [ref=e78]:
                                - generic [ref=e79]:
                                    - checkbox "Tech Support" [ref=e80]
                                    - generic [ref=e81] [cursor=pointer]: Tech Support
                                - paragraph [ref=e82]: Tech is interesting
                            - generic [ref=e83]:
                                - generic [ref=e84]:
                                    - checkbox "Administration" [ref=e85]
                                    - generic [ref=e86] [cursor=pointer]: Administration
                                - paragraph [ref=e87]: Administration is interesting
                            - generic [ref=e88]:
                                - generic [ref=e89]:
                                    - checkbox "Research" [ref=e90]
                                    - generic [ref=e91] [cursor=pointer]: Research
                                - paragraph [ref=e92]: Research is interesting
                            - generic [ref=e93]:
                                - generic [ref=e94]:
                                    - checkbox "Social Justice" [ref=e95]
                                    - generic [ref=e96] [cursor=pointer]: Social Justice
                                - paragraph [ref=e97]: Social Justice is interesting
                            - generic [ref=e98]:
                                - generic [ref=e99]:
                                    - checkbox "Writing" [ref=e100]
                                    - generic [ref=e101] [cursor=pointer]: Writing
                                - paragraph [ref=e102]: Writing is interesting
                            - generic [ref=e103]:
                                - generic [ref=e104]:
                                    - checkbox "Building & Planning" [ref=e105]
                                    - generic [ref=e106] [cursor=pointer]: Building & Planning
                                - paragraph [ref=e107]: Building & Planning is interesting
                            - generic [ref=e108]:
                                - generic [ref=e109]:
                                    - checkbox "Accounting" [ref=e110]
                                    - generic [ref=e111] [cursor=pointer]: Accounting
                                - paragraph [ref=e112]: Accounting is interesting
                            - generic [ref=e113]:
                                - generic [ref=e114]:
                                    - checkbox "Programming" [ref=e115]
                                    - generic [ref=e116] [cursor=pointer]: Programming
                                - paragraph [ref=e117]: Programming is interesting
                            - generic [ref=e118]:
                                - generic [ref=e119]:
                                    - checkbox "Conference Planning" [ref=e120]
                                    - generic [ref=e121] [cursor=pointer]: Conference Planning
                                - paragraph [ref=e122]: Conference Planning is interesting
                            - generic [ref=e123]:
                                - generic [ref=e124]:
                                    - checkbox "Arts" [ref=e125]
                                    - generic [ref=e126] [cursor=pointer]: Arts
                                - paragraph [ref=e127]: Arts are interesting
                            - generic [ref=e128]:
                                - generic [ref=e129]:
                                    - checkbox "Translation" [ref=e130]
                                    - generic [ref=e131] [cursor=pointer]: Translation
                                - paragraph [ref=e132]: Translation is interesting
                            - generic [ref=e133]:
                                - generic [ref=e134]:
                                    - checkbox "Branches & Chapters" [ref=e135]
                                    - generic [ref=e136] [cursor=pointer]: Branches & Chapters
                                - paragraph [ref=e137]: Translation are interesting
                            - generic [ref=e138]:
                                - generic [ref=e139]:
                                    - checkbox "Design" [ref=e140]
                                    - generic [ref=e141] [cursor=pointer]: Design
                                - paragraph [ref=e142]: Design is interesting
                            - generic [ref=e143]:
                                - generic [ref=e144]:
                                    - checkbox "Ordination" [ref=e145]
                                    - generic [ref=e146] [cursor=pointer]: Ordination
                                - paragraph [ref=e147]: Ordination is interesting
                    - generic [ref=e148]:
                        - paragraph [ref=e149]: '* indicates a required field'
                        - button "Submit" [ref=e151]
            - button "X" [ref=e153]
    - generic [ref=e156]:
        - generic [ref=e157]:
            - generic [ref=e158]:
                - link "Home" [ref=e159]:
                    - /url: /
                - generic [ref=e160]:
                    - link "Logo Join Us" [ref=e161]:
                        - /url: /join
                        - img "Logo" [ref=e162]
                        - text: Join Us
                    - link "Logo Volunteer" [ref=e163]:
                        - /url: /volunteer
                        - img "Logo" [ref=e164]
                        - text: Volunteer
                    - link "Logo Donate" [ref=e165]:
                        - /url: /donate
                        - img "Logo" [ref=e166]
                        - text: Donate
            - generic [ref=e167]:
                - link "Conferences" [ref=e168]:
                    - /url: /conferences
                - generic [ref=e169]:
                    - link "Logo 2025 19th conference, (Sarawak, Malaysia)" [ref=e170]:
                        - /url: /conferences/19
                        - img "Logo" [ref=e171]
                        - text: 2025 19th conference, (Sarawak, Malaysia)
                    - link "Logo 2023 18th conference, (Seoul, Korea)" [ref=e172]:
                        - /url: /conferences/18
                        - img "Logo" [ref=e173]
                        - text: 2023 18th conference, (Seoul, Korea)
                    - link "Logo 2021 17th conference, (online)" [ref=e174]:
                        - /url: /conferences/17
                        - img "Logo" [ref=e175]
                        - text: 2021 17th conference, (online)
                    - link "Logo 2019 16th conference, (Blue Mountains, Australia)" [ref=e176]:
                        - /url: /conferences/16
                        - img "Logo" [ref=e177]
                        - text: 2019 16th conference, (Blue Mountains, Australia)
            - generic [ref=e178]:
                - link "Resources" [ref=e179]:
                    - /url: /resources
                - generic [ref=e180]:
                    - link "Logo Newsletters" [ref=e181]:
                        - /url: /newsletters
                        - img "Logo" [ref=e182]
                        - text: Newsletters
                    - link "Logo Publications" [ref=e183]:
                        - /url: /publications
                        - img "Logo" [ref=e184]
                        - text: Publications
                    - link "Logo Buddhist Culture" [ref=e185]:
                        - /url: /buddhist-culture
                        - img "Logo" [ref=e186]
                        - text: Buddhist Culture
                    - link "Logo Ordination" [ref=e187]:
                        - /url: /ordination-issue
                        - img "Logo" [ref=e188]
                        - text: Ordination
            - link "About" [ref=e190]:
                - /url: /about
            - link "Contact" [ref=e192]:
                - /url: /contact
        - generic [ref=e193]:
            - generic [ref=e194]:
                - generic [ref=e195]: Check us out on these platforms!
                - generic [ref=e196]:
                    - link [ref=e197]:
                        - /url: https://www.facebook.com/sakyadhita.international
                        - img [ref=e198]
                    - link [ref=e201]:
                        - /url: https://www.youtube.com/channel/UCLOIc4vqaqPKcjaRqmn6-yg/playlists
                        - img [ref=e202]
                    - link [ref=e205]:
                        - /url: https://www.pinterest.com/sakyadhita/
                        - img [ref=e206]
                    - link [ref=e209]:
                        - /url: http://awakeningbuddhistwomen.blogspot.com/
                        - img [ref=e210]
                    - link [ref=e213]:
                        - /url: https://www.goodreads.com/group/show/94269-women-in-buddhism
                        - img [ref=e214]
            - link "Logo sakyadhita" [ref=e217]:
                - /url: /
                - img "Logo" [ref=e218]
                - heading "sakyadhita" [level=3] [ref=e220]
        - generic [ref=e221]:
            - img "license" [ref=e222]
            - generic [ref=e223]:
                - text: © 2026 Website is licensed under a
                - link "Creative Commons Attribution-NonCommercial-NoDerivs 4.0 International License" [ref=e224]:
                    - /url: https://creativecommons.org/licenses/by-nc-nd/4.0/
                - text: .
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  |
  3  | test.describe('Volunteer Form', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     await page.goto('/volunteer')
  6  |   })
  7  |
  8  |   test('should show required error messages on empty submit', async ({ page }) => {
  9  |     await page.evaluate(() => (document.getElementById('volunteer-submit-btn') as HTMLButtonElement)?.click())
  10 |
  11 |     const snackbar = page.locator('#error-snackbar')
  12 |     // Force visibility for test
  13 |     await page.evaluate(() => document.getElementById('error-snackbar')?.classList.remove('hidden'))
  14 |     await expect(snackbar).toBeVisible()
> 15 |     await expect(snackbar).toContainText('Missing required fields')
     |                            ^ Error: expect(locator).toContainText(expected) failed
  16 |   })
  17 |
  18 |   test('should allow selecting multiple committees', async ({ page }) => {
  19 |     const editCheckbox = page.locator('input#committee-0')
  20 |     const techCheckbox = page.locator('input#committee-1')
  21 |
  22 |     await editCheckbox.check()
  23 |     await techCheckbox.check()
  24 |
  25 |     await expect(editCheckbox).toBeChecked()
  26 |     await expect(techCheckbox).toBeChecked()
  27 |   })
  28 | })
  29 |
```

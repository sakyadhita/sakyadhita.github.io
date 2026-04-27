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
            - heading "Volunteer" [level=1] [ref=e28]
            - paragraph [ref=e29]: Volunteer through Sakyadhita
        - generic [ref=e30]:
            - generic [ref=e31]:
                - generic [ref=e32]:
                    - heading "Support Sakyadhita!" [level=1] [ref=e33]
                    - paragraph [ref=e34]: Sakyadhita is a 501(c)3 non-profit organization. We are a volunteer-run organization and rely on the generous support of our members and donors. We are always looking for volunteers to help us with our various initiatives. If you are interested in volunteering with us, please fill out the form below and select the committees you are interested in joining.
                - generic [ref=e35]:
                    - generic [ref=e36]:
                        - heading "Sign Me Up!" [level=1] [ref=e37]
                        - generic [ref=e38]:
                            - textbox "First Name" [ref=e40]
                            - generic [ref=e41]: '*'
                        - textbox "Middle Name" [ref=e44]
                        - generic [ref=e45]:
                            - textbox "Last Name" [ref=e47]
                            - generic [ref=e48]: '*'
                    - generic [ref=e49]:
                        - heading "Contact Information" [level=1] [ref=e50]
                        - generic [ref=e51]:
                            - textbox "Email Address" [ref=e53]
                            - generic [ref=e54]: '*'
                        - generic [ref=e55]:
                            - combobox [ref=e57]:
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
                            - generic [ref=e58]: '*'
                        - generic [ref=e59]:
                            - textbox "Full Address" [ref=e61]
                            - generic [ref=e62]: '*'
                        - textbox "Phone Number" [ref=e65]
                    - generic [ref=e66]:
                        - heading "Committee Interests" [level=1] [ref=e67]
                        - paragraph [ref=e68]: 'Select any and all committees you are interested in joining:'
                        - generic [ref=e69]:
                            - generic [ref=e70]:
                                - generic [ref=e71]:
                                    - checkbox "Editing" [ref=e72]
                                    - generic [ref=e73] [cursor=pointer]: Editing
                                - paragraph [ref=e74]: Editing is interesting
                            - generic [ref=e75]:
                                - generic [ref=e76]:
                                    - checkbox "Tech Support" [ref=e77]
                                    - generic [ref=e78] [cursor=pointer]: Tech Support
                                - paragraph [ref=e79]: Tech is interesting
                            - generic [ref=e80]:
                                - generic [ref=e81]:
                                    - checkbox "Administration" [ref=e82]
                                    - generic [ref=e83] [cursor=pointer]: Administration
                                - paragraph [ref=e84]: Administration is interesting
                            - generic [ref=e85]:
                                - generic [ref=e86]:
                                    - checkbox "Research" [ref=e87]
                                    - generic [ref=e88] [cursor=pointer]: Research
                                - paragraph [ref=e89]: Research is interesting
                            - generic [ref=e90]:
                                - generic [ref=e91]:
                                    - checkbox "Social Justice" [ref=e92]
                                    - generic [ref=e93] [cursor=pointer]: Social Justice
                                - paragraph [ref=e94]: Social Justice is interesting
                            - generic [ref=e95]:
                                - generic [ref=e96]:
                                    - checkbox "Writing" [ref=e97]
                                    - generic [ref=e98] [cursor=pointer]: Writing
                                - paragraph [ref=e99]: Writing is interesting
                            - generic [ref=e100]:
                                - generic [ref=e101]:
                                    - checkbox "Building & Planning" [ref=e102]
                                    - generic [ref=e103] [cursor=pointer]: Building & Planning
                                - paragraph [ref=e104]: Building & Planning is interesting
                            - generic [ref=e105]:
                                - generic [ref=e106]:
                                    - checkbox "Accounting" [ref=e107]
                                    - generic [ref=e108] [cursor=pointer]: Accounting
                                - paragraph [ref=e109]: Accounting is interesting
                            - generic [ref=e110]:
                                - generic [ref=e111]:
                                    - checkbox "Programming" [ref=e112]
                                    - generic [ref=e113] [cursor=pointer]: Programming
                                - paragraph [ref=e114]: Programming is interesting
                            - generic [ref=e115]:
                                - generic [ref=e116]:
                                    - checkbox "Conference Planning" [ref=e117]
                                    - generic [ref=e118] [cursor=pointer]: Conference Planning
                                - paragraph [ref=e119]: Conference Planning is interesting
                            - generic [ref=e120]:
                                - generic [ref=e121]:
                                    - checkbox "Arts" [ref=e122]
                                    - generic [ref=e123] [cursor=pointer]: Arts
                                - paragraph [ref=e124]: Arts are interesting
                            - generic [ref=e125]:
                                - generic [ref=e126]:
                                    - checkbox "Translation" [ref=e127]
                                    - generic [ref=e128] [cursor=pointer]: Translation
                                - paragraph [ref=e129]: Translation is interesting
                            - generic [ref=e130]:
                                - generic [ref=e131]:
                                    - checkbox "Branches & Chapters" [ref=e132]
                                    - generic [ref=e133] [cursor=pointer]: Branches & Chapters
                                - paragraph [ref=e134]: Translation are interesting
                            - generic [ref=e135]:
                                - generic [ref=e136]:
                                    - checkbox "Design" [ref=e137]
                                    - generic [ref=e138] [cursor=pointer]: Design
                                - paragraph [ref=e139]: Design is interesting
                            - generic [ref=e140]:
                                - generic [ref=e141]:
                                    - checkbox "Ordination" [ref=e142]
                                    - generic [ref=e143] [cursor=pointer]: Ordination
                                - paragraph [ref=e144]: Ordination is interesting
                    - generic [ref=e145]:
                        - paragraph [ref=e146]: '* indicates a required field'
                        - button "Submit" [ref=e148]
            - button "X" [ref=e150]
    - generic [ref=e153]:
        - generic [ref=e154]:
            - generic [ref=e155]:
                - link "Home" [ref=e156] [cursor=pointer]:
                    - /url: /
                - generic [ref=e157]:
                    - link "Logo Join Us" [ref=e158] [cursor=pointer]:
                        - /url: /join
                        - img "Logo" [ref=e159]
                        - text: Join Us
                    - link "Logo Volunteer" [ref=e160] [cursor=pointer]:
                        - /url: /volunteer
                        - img "Logo" [ref=e161]
                        - text: Volunteer
                    - link "Logo Donate" [ref=e162] [cursor=pointer]:
                        - /url: /donate
                        - img "Logo" [ref=e163]
                        - text: Donate
            - generic [ref=e164]:
                - link "Conferences" [ref=e165] [cursor=pointer]:
                    - /url: /conferences
                - generic [ref=e166]:
                    - link "Logo 2025 19th conference, (Sarawak, Malaysia)" [ref=e167] [cursor=pointer]:
                        - /url: /conferences/19
                        - img "Logo" [ref=e168]
                        - text: 2025 19th conference, (Sarawak, Malaysia)
                    - link "Logo 2023 18th conference, (Seoul, Korea)" [ref=e169] [cursor=pointer]:
                        - /url: /conferences/18
                        - img "Logo" [ref=e170]
                        - text: 2023 18th conference, (Seoul, Korea)
                    - link "Logo 2021 17th conference, (online)" [ref=e171] [cursor=pointer]:
                        - /url: /conferences/17
                        - img "Logo" [ref=e172]
                        - text: 2021 17th conference, (online)
                    - link "Logo 2019 16th conference, (Blue Mountains, Australia)" [ref=e173] [cursor=pointer]:
                        - /url: /conferences/16
                        - img "Logo" [ref=e174]
                        - text: 2019 16th conference, (Blue Mountains, Australia)
            - generic [ref=e175]:
                - link "Resources" [ref=e176] [cursor=pointer]:
                    - /url: /resources
                - generic [ref=e177]:
                    - link "Logo Newsletters" [ref=e178] [cursor=pointer]:
                        - /url: /newsletters
                        - img "Logo" [ref=e179]
                        - text: Newsletters
                    - link "Logo Publications" [ref=e180] [cursor=pointer]:
                        - /url: /publications
                        - img "Logo" [ref=e181]
                        - text: Publications
                    - link "Logo Buddhist Culture" [ref=e182] [cursor=pointer]:
                        - /url: /buddhist-culture
                        - img "Logo" [ref=e183]
                        - text: Buddhist Culture
                    - link "Logo Ordination" [ref=e184] [cursor=pointer]:
                        - /url: /ordination-issue
                        - img "Logo" [ref=e185]
                        - text: Ordination
            - link "About" [ref=e187] [cursor=pointer]:
                - /url: /about
            - link "Contact" [ref=e189] [cursor=pointer]:
                - /url: /contact
        - generic [ref=e190]:
            - generic [ref=e191]:
                - generic [ref=e192]: Check us out on these platforms!
                - generic [ref=e193]:
                    - link [ref=e194] [cursor=pointer]:
                        - /url: https://www.facebook.com/sakyadhita.international
                        - img [ref=e195]
                    - link [ref=e197] [cursor=pointer]:
                        - /url: https://www.youtube.com/channel/UCLOIc4vqaqPKcjaRqmn6-yg/playlists
                        - img [ref=e198]
                    - link [ref=e200] [cursor=pointer]:
                        - /url: https://www.pinterest.com/sakyadhita/
                        - img [ref=e201]
                    - link [ref=e203] [cursor=pointer]:
                        - /url: http://awakeningbuddhistwomen.blogspot.com/
                        - img [ref=e204]
                    - link [ref=e206] [cursor=pointer]:
                        - /url: https://www.goodreads.com/group/show/94269-women-in-buddhism
                        - img [ref=e207]
            - link "Logo sakyadhita international association of buddhist women" [ref=e209] [cursor=pointer]:
                - /url: /
                - img "Logo" [ref=e210]
                - generic [ref=e211]:
                    - heading "sakyadhita" [level=3] [ref=e212]
                    - generic [ref=e213]: international association of buddhist women
        - generic [ref=e214]:
            - img "license" [ref=e215]
            - generic [ref=e216]:
                - text: © 2026 Website is licensed under a
                - link "Creative Commons Attribution-NonCommercial-NoDerivs 4.0 International License" [ref=e217] [cursor=pointer]:
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

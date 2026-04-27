# Objective

Replace the hardcoded list of countries in `src/components/JoinUsForm.astro` with dynamic data from the `country-region-data` npm package to ensure the country list is accurate and up-to-date.

# Key Files & Context

- `src/components/JoinUsForm.astro` (to be updated)
- `package.json` (to be updated)

# Implementation Steps

1. **Update Dependencies:**
   - Install the `country-region-data` package using `pnpm add country-region-data`.
   - Remove `react-country-region-selector` if it's no longer needed in the project (since we migrated the only component using it).

2. **Update `src/components/JoinUsForm.astro`:**
   - Import the country data directly from the package at the top of the file:
     ```javascript
     import * as countryRegionData from 'country-region-data/data.json';
     // Extract just the country names
     const countries = countryRegionData.default.map((c: any) => c.countryName);
     ```
   - Replace the large hardcoded `countries` array with this dynamically generated array.

3. **Verify and Clean Up:**
   - Run `pnpm exec astro check` and `pnpm build` to ensure the project builds correctly with the imported JSON data.
   - Visually check the Join Us page in the dev server (`pnpm dev`) to confirm the dropdown is populated correctly with all the countries.

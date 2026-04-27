# Plan: Finalize Astro Image Optimization

## Objective

Identify and resolve any outstanding image rendering issues to ensure Astro's image optimization pipeline is correctly applied across all components.

## Key Files & Context

- `src/components/Newsletters/NewsletterCard.jsx`
- `src/components/Main/Footer.astro`
- `src/layouts/DonateLayout.astro`
- `public/by-nc-nd.png`

## Implementation Steps

1. **Fix NewsletterCard:** Update `NewsletterCard.jsx` to render the `_displayImage` variable instead of `image_url` on lines 34 and 74 to ensure the optimized image URL (passed as `optimized_url`) is used.
2. **Optimize Footer License Image:** Move `public/by-nc-nd.png` to `src/assets/by-nc-nd.png`. Update `Footer.astro` to import this image and render it using Astro's native `<Image />` component.
3. **Refactor DonateLayout Images:** Refactor `DonateLayout.astro` to remove manual `getOptimizedImage` calls for the `WorkingTogether` and `AmazonSmile` images. Instead, import the images directly from `src/assets/Donate Page/` and render them using Astro's `<Image />` component.

## Verification & Testing

- Verify that newsletter cards load correctly and their image URLs point to Astro's generated `.webp` output.
- Check that the license image in the footer renders properly and includes `srcset` attributes.
- Inspect the images on the Donate page to ensure they are optimized via Astro's `<Image />` component.
- Run `pnpm test:e2e` to ensure no visual regressions or layout breakage occurred.

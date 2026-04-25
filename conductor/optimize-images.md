# Plan: Simplify and Enforce Native Astro Image Optimization

## Objective
Ensure all images are displayed optimized using Astro's native `<Image />` component. Now that the `ImageMetadata` type is widely used across all content collections, we can eliminate raw `<img>` tags and manual `src` extractions in favor of `<Image />`, which automatically handles format conversion, `srcset`, and lazy loading.

## Key Files & Context
- Components needing `<Image />` replacement:
  - `src/components/Conference/ConferenceDesktop.astro`
  - `src/components/Conference/MobileConference.astro`
  - `src/components/EPubs/EPubCard.astro`
  - `src/components/Newsletters/NewsletterCard.astro`
  - `src/components/Home/NewsFlash.astro`
  - `src/components/Home/Introduction.astro` (Logo)
  - `src/components/Main/Footer.astro` (Logo)
  - `src/components/Main/Brand.astro` (Logo)
  - `src/layouts/AboutUs.astro` (Exco headshots)
  - `src/layouts/Publication.astro` (Main image)
  - `src/layouts/Donate.astro` (Amazon/Working together images)
- `src/lib/images.ts`: Retain `getAssetUrl` and other helpers only for parsing string URLs from standard markdown page layouts (e.g. `contact.md`), but ensure they are used sparingly.

## Implementation Steps

1. **Update Conference Components:**
   - In `ConferenceDesktop.astro` and `MobileConference.astro`, import `Image` from `astro:assets`.
   - Update the `<img class="size-full object-cover"...>` logic to use conditional rendering:
     ```astro
     {typeof image === 'string' ? (
       <img class="size-full object-cover" alt="Event Visual" src={image} />
     ) : (
       <Image class="size-full object-cover" alt="Event Visual" src={image} />
     )}
     ```
2. **Update Cards & NewsFlash:**
   - In `EPubCard.astro`, replace `<img>` with `<Image>` for the `image.src` rendering.
   - In `NewsletterCard.astro`, replace `<img>` with `<Image>`.
   - In `NewsFlash.astro`, use `<Image>` where `article.data.image` is an object.
3. **Update Layouts:**
   - `AboutUs.astro`: Import `<Image>` and use it for `member.data.imageLink` (the Exec headshots).
   - `Publication.astro`: Use `<Image>` for `mainImage`.
   - `Donate.astro`: Ensure `<Image>` is used instead of raw `<img>` for local asset imports.
4. **Update Logos:**
   - `Footer.astro`, `Introduction.astro`, `Brand.astro`: Replace `<img src={Logo.src}>` with `<Image src={Logo}>`.
5. **Clean up Manual Optimizations:**
   - Check `src/layouts/ContactUs.astro` to ensure it passes the `frontmatter.image` cleanly to `ResourcesHeader` without redundant manual calls to `getOptimizedImage`, simplifying `images.ts` usage.

## Verification & Testing
- Run `pnpm astro check` to ensure correct prop typings on `<Image>` components.
- Run `pnpm build` to verify images bundle without errors.
- Visually inspect components in `pnpm preview` or `pnpm dev` to ensure `srcset` and webp optimizations are active.
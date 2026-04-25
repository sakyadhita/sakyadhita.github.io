# Implementation Plan: Migrate Newsletter Components to Astro

## Objective
Migrate the Newsletter features from React to native Astro components to remove React state requirements for pagination, update `content.config.ts` to use an `image` type for the `imageLink` schema field, and correctly render unoptimized images using the `astro:assets` `<Image />` component or raw `<img>` tags depending on the specific implementation choice, as per user requests.

## Key Files & Context
- `src/content.config.ts`: The Zod schema for the newsletter collection needs to be updated to define `imageLink` as an image.
- `src/components/Newsletters/NewsletterCard.tsx`: Will be rewritten as `src/components/Newsletters/NewsletterCard.astro`.
- `src/components/Layouts/Newsletters.tsx`: Will be rewritten as `src/components/Layouts/Newsletters.astro` using Vanilla JS for pagination (similar to how `MobileConference.astro` handles client-side updates).
- `src/layouts/NLLayout.astro`: Needs to be updated to import the new `.astro` components, remove React `client:idle` directives, and remove the explicit Astro image optimization loop as requested.

## Implementation Steps
1. **Schema Update**: Update `src/content.config.ts` so `newsletter` collection uses `image()` for `imageLink`.
2. **Rewrite NewsletterCard**: Create `src/components/Newsletters/NewsletterCard.astro` based on the `.tsx` file, removing `optimized_url` prop and using the direct `image_url`. Delete `.tsx` version.
3. **Rewrite Newsletters**: Create `src/components/Layouts/Newsletters.astro`. Migrate the React pagination logic to Vanilla JS within a `<script>` tag. Delete `.tsx` version.
4. **Update Layout**: Modify `src/layouts/NLLayout.astro` to pass the raw data down to `Newsletters.astro` without running `getImage()`.
5. **UI Consistency**: Ensure the new Vanilla JS pagination matches the previous React pagination behavior (showing ellipsis, updating DOM, handling responsive resizing).

## Verification & Testing
- `pnpm lint` and `pnpm astro check`
- `pnpm build`
- `pnpm test run`
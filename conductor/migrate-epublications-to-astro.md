# Implementation Plan: Migrate EPublications Components to Astro

## Objective

Migrate the EPublications features to native Astro components to improve performance and simplicity. Update `content.config.ts` to use an `image()` type for the `imageLink` schema field in the `publication` collection. Render unoptimized images using raw `<img>` tags. Merge `src/components/Layouts/EPublications.astro` into `src/layouts/PubLayout.astro` and simplify the logic.

## Key Files & Context

- `src/content.config.ts`: The Zod schema for the `publication` collection needs to be updated to define `imageLink` as an `image()`.
- `src/components/EPubs/EPubCard.tsx`: Will be rewritten as `src/components/EPubs/EPubCard.astro`.
- `src/components/Layouts/EPublications.astro`: Its logic will be merged into `src/layouts/PubLayout.astro`.
- `src/layouts/PubLayout.astro`: Needs to be updated to include the merged layout logic, remove the explicit Astro image optimization loop, and pass data down efficiently.

## Implementation Steps

1. **Schema Update**: Update `src/content.config.ts` so the `publication` collection uses `image()` for `imageLink`.
2. **Rewrite EPubCard**: Create `src/components/EPubs/EPubCard.astro` based on the `.tsx` file, removing `optimized_url` prop and using the direct `image.src` from the imported image. Delete the `.tsx` version.
3. **Merge Layouts**: Copy the template and script from `src/components/Layouts/EPublications.astro` into `src/layouts/PubLayout.astro`.
4. **Remove Optimization Loop**: In `src/layouts/PubLayout.astro`, remove the manual `getImage()` optimization loop and pass the raw `CollectionEntry` data to the components.
5. **Update Paths**: Update all publication markdown files to use relative paths for `imageLink` so they correctly resolve via the `image()` schema type.
6. **Cleanup**: Delete `src/components/Layouts/EPublications.astro`.

## Verification & Testing

- `pnpm build`
- `pnpm lint` and `pnpm astro check`
- `pnpm test run`

# Fix Dev Asset URLs

## Objective
Ensure that asset links (like `pdfLink`) pointing to `src/assets` resolve and load correctly in the Astro development environment (`pnpm dev`).

## Background & Motivation
Currently, assets from `src/assets` correctly bundle in production (`pnpm build`) but fail to load in development. This happens because the `import.meta.glob` in `src/lib/images.ts` uses the deprecated `as: 'url'` syntax from older Vite versions. In Vite 5 (used by Astro), this option is ignored, leading to files not being properly registered as URL assets in Vite's dev server module graph. As a result, the dev server returns 404 for requests to `/src/assets/...`.

## Proposed Solution
Update the `import.meta.glob` statement to use the correct Vite 5 syntax for importing asset URLs: `{ query: '?url', import: 'default', eager: true }`.

### Key Files & Context
- `src/lib/images.ts`

### Implementation Steps
1. In `src/lib/images.ts`, change:
   ```typescript
   const allAssets = import.meta.glob('/src/assets/**/*', { eager: true, as: 'url' })
   ```
   to:
   ```typescript
   const allAssets = import.meta.glob('/src/assets/**/*', { eager: true, query: '?url', import: 'default' })
   ```
2. Verify that `getAssetUrl` cleanly returns the string URL provided by the default export of each matched asset module.

## Verification & Testing
- Run `pnpm dev` and verify that clicking a "Read More" button or an EPubCard opens the correct PDF from `src/assets` rather than returning a 404.
- Run `pnpm build` to ensure production builds are still correct and assets are successfully hashed and bundled into `dist/_astro/`.
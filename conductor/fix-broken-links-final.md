# Plan: Fix Broken Document Links in Newsletters and Publications

## Objective

Fix broken links to PDFs and other documents that were moved to `src/assets/` by making the URL resolution utility more robust and ensuring resolved links are correctly passed to React components.

## Key Files & Context

- `src/lib/images.ts`: Central utility for asset resolution.
- `src/layouts/NLLayout.astro`: Layout for newsletters.
- `src/layouts/PubLayout.astro`: Layout for publications.
- `src/layouts/ConfLayout.astro`: Layout for conferences.

## Implementation Steps

### 1. Robust Asset URL Resolution

Update `getAssetUrl` in `src/lib/images.ts` to handle both leading-slash and non-leading-slash keys when looking up assets in the `import.meta.glob` maps. This is necessary because Vite's glob behavior can vary depending on the environment and configuration.

### 2. Correctly Pass Resolved Links in Layouts

Ensure that layouts which process collections (Newsletters, Publications, Conferences) correctly nest the resolved `pdfLink` or document `url` inside the `data` object. Currently, some layouts might be returning the resolved link at the root of the item object, while the React components expect it within `item.data`.

Specifically:

- **Newsletters (`NLLayout.astro`)**: Update mapping to ensure `pdfLink` is inside `data`.
- **Publications (`PubLayout.astro`)**: Verify `pdfLink` is correctly nested.
- **Conferences (`ConfLayout.astro` & `[...slug].astro`)**: Verify download URLs are correctly nested.

## Verification & Testing

- Manually click several newsletter and publication links in a local preview or build.
- Verify that the browser opens a URL containing a Vite/Astro hash (e.g., `/_astro/filename.hash.pdf`).
- Run `pnpm test:e2e` to ensure no major regressions.

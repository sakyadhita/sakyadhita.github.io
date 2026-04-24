# Plan: Robust Fix for Broken Document Links

## Objective
Finalize the fix for broken document links (PDFs, etc.) by making the `getAssetUrl` utility more resilient to path encoding and internal mapping variations, and ensuring consistent data structure across all layouts.

## Key Files & Context
- `src/lib/images.ts`: Central utility for asset resolution.
- `src/layouts/NLLayout.astro`: Layout for newsletters.
- `src/layouts/PubLayout.astro`: Layout for publications.

## Implementation Steps

### 1. Ultra-Robust getAssetUrl Implementation
Update `getAssetUrl` in `src/lib/images.ts` to:
- Normalize paths by testing both the raw `publicPath` and its `decodedURIComponent` version.
- Handle both absolute (leading slash) and relative (no leading slash) keys in the `import.meta.glob` maps.
- Ensure the filename fallback also uses the decoded path to correctly match files with spaces or special characters.

### 2. Verify and Standardize Layout Mapping
Double-check `NLLayout.astro` and `PubLayout.astro` to ensure the mapping logic correctly nests the resolved `pdfLink` inside the `data` object of each collection entry. This is critical because React components like `NewsletterCard` and `EPubCard` look for `item.data.pdfLink`.

## Verification & Testing
- Build the project and inspect the generated HTML for newsletters and publications.
- Verify that links point to hashed URLs (e.g., `/_astro/2-1-1991.hash.pdf`).
- Manually test navigation to these documents in a preview environment.
- Run `pnpm test:e2e` for baseline stability.
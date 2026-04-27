# Plan: Fix Broken Document Links after Asset Migration

## Objective

Ensure all links to documents (PDF, DOC, DOCX, ZIP) and SVGs that were moved to `src/assets/` continue to work by dynamically resolving their hashed URLs in the layout files.

## Key Files & Context

- `src/lib/images.ts`: Central utility for asset resolution.
- `src/layouts/NLLayout.astro`: Layout for newsletters.
- `src/layouts/PubLayout.astro`: Layout for publications.
- `src/layouts/ConfLayout.astro`: Layout for conferences index.
- `src/pages/conferences/[...slug].astro`: Dynamic route for individual conferences.
- `src/layouts/AboutLayout.astro`: Layout for the About page.
- `src/components/Home/NewsFlash.astro`: News flash component on the home page.
- `src/layouts/HomeLayout.astro`: Layout for the home page.

## Implementation Steps

### 1. Enhance Asset Resolution Utility

Update `src/lib/images.ts` to:

- Include `.svg` and `.SVG` in the `images` glob.
- Add a new `docs` glob for non-image assets: `import.meta.glob('/src/assets/**/*.{pdf,doc,docx,zip,txt}', { query: '?url', import: 'default', eager: true })`.
- Implement `getAssetUrl(publicPath: string)`:
  - Decodes URI component.
  - Maps `/assets/...` or root paths to `/src/assets/...`.
  - Looks up in both `images` and `docs` maps.
  - If found in `docs`, returns the URL string.
  - If found in `images`, returns the `default.src`.
  - Fallback to finding by filename.
  - Ultimate fallback: return the original `publicPath`.

### 2. Update Layouts and Components to Resolve Links

- **Newsletters (`NLLayout.astro`)**: Resolve `pdfLink` for each newsletter.
- **Publications (`PubLayout.astro`)**: Resolve `pdfLink` for each publication.
- **Conferences (`ConfLayout.astro` & `[...slug].astro`)**:
  - Iterate over `brochures`, `programs`, `abstracts`, and `presentations`.
  - Resolve the `url` field for each item using `getAssetUrl`.
- **Committees (`AboutLayout.astro`)**: Resolve `redirectLink` for each committee member.
- **News Flash (`NewsFlash.astro` & `HomeLayout.astro`)**:
  - Ensure `redirectLink` in the `newsflash` section is resolved.

### 3. Verify Markdown Content

- Review Markdown files to ensure they follow the `/assets/...` or root path convention.
- Ensure no hardcoded `public/assets/...` paths remain in code (already handled in previous tasks).

## Verification & Testing

- **Newsletter Links**: Click several newsletter cards and verify the PDF opens (hashed URL).
- **Publication Links**: Click publication cards and verify the PDF opens.
- **Conference Downloads**: Navigate to a conference page (e.g., Sarawak 2025 or Hong Kong 2017), go to the "Overview" tab, and verify all download links (Brochures, Programs, etc.) work.
- **Committee Bios**: Go to the About page and verify committee member bios (PDFs) open correctly.
- **News Flash**: Verify the "Learn More" button on the home page news flash works if it points to a local PDF.
- **E2E Tests**: Run `pnpm test:e2e` to ensure no major regressions. Note that E2E tests might not cover every single PDF download link.

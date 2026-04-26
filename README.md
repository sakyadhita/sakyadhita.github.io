## 🚀 3.1 Native Asset Bundling

The project has transitioned to a fully native asset management system, moving all assets (images, PDFs, ZIPs) into `src/assets/`.

- **Vite Asset Bundling**: All site assets are now co-located in `src/assets/`. We use Vite's `import.meta.glob` to dynamically resolve these files. This ensures that even non-image assets (like conference PDFs and ZIPs) are correctly bundled, hashed for production, and served through the Vite pipeline.
- **Development Middleware**: A custom Astro middleware (`src/middleware.ts`) was implemented to solve the issue of browser 404s when navigating to assets in `src/`. This middleware intercepts asset requests during development and serves them directly from disk with correct MIME types, bypassing Astro's page-routing logic.
- **Simplified Content Config**: Restored string-based paths in `src/content.config.ts` for maximum flexibility, while using the `getAssetUrl` utility to resolve these strings to their bundled URLs.
- **Configuration Optimization**: Updated `astro.config.mjs` to include standard ZIP files in the Vite bundle and established a structured `resolve.alias` for `/assets`.

## 🚀 3.0 Major Architecture Flattening

The project has achieved a streamlined, idiomatic Astro architecture. Key updates in this major release include:

- **Native Astro Pages**: Migrated all remaining `.md` pages to native `.astro` pages in `src/pages/`. Layout logic is now co-located with page content, removing the dependency on legacy markdown layouts.
- **Flattened Component Hierarchy**: Completely flattened the `src/components/` directory. Nested subdirectories (e.g., `Home/`, `Main/`, `Conference/`) were removed in favor of a clean, root-level component structure for better discoverability and simpler imports.
- **Full Native Image Optimization**: Standardized on Astro's native `image()` schema type and `<Image />` component. Removed all manual glob mapping and legacy optimization helpers in `src/lib/images.ts`.
- **Component Refinement**: Reverted key components (NavBar, Footer, About Us, Publications) to their refined previous designs while fully integrating them into the new optimized architecture.
- **Clean Build & Type Safety**: Resolved all project-wide TypeScript errors and confirmed a 100% pass rate in the Playwright E2E and Vitest component test suites.

## 🚀 2.0 Refactor & Modernization

...
### Content Collections Migration
A critical part of the modernization was the migration of the content management system to the **Astro 6 `glob` loader API**. All collections defined in `src/content.config.ts` use the performant `glob` loader.

### Asset Bundling & Middleware (v3.1)
Starting with version 3.1, the project manages **all** website assets (including documents) in `src/assets/`.
- **Dynamic Resolution**: We use a central utility `src/lib/images.ts` that uses Vite's `import.meta.glob` to resolve string paths from markdown content to their actual bundled URLs.
- **Development Stability**: Because Astro's dev server typically blocks direct browser access to `/src/` paths (returning 404 for HTML navigations), we use `src/middleware.ts` to intercept and serve these files from the project root during development.

### Styling & UI Architecture
Styling is handled exclusively by **Tailwind CSS v4**, removing heavy frameworks like Material UI and Bootstrap. 
...
## Releases

* 3.1.0: **Native Asset Bundling & Asset Migration**
    - Moved all assets from `public/assets/` to `src/assets/`.
    - Implemented `src/middleware.ts` for stable asset serving in development.
    - Updated `getAssetUrl` to resolve string paths via Vite bundling.
    - Configured `assetsInclude` for ZIP files and set up Vite aliases.
* 3.0.0: **Major Architecture Flattening & Native Astro Pages**
...
## 🚀 Project Structure

```text
/
├── src/
│   ├── components/           # Flattened Astro and React components
│   ├── content/              # Markdown content and config.ts
│   ├── layouts/              # Base layout wrappers (e.g., PageLayout.astro)
│   ├── pages/                # Native Astro pages and routing
│   ├── styles/               # Global CSS and Tailwind configuration
│   ├── lib/                  # Utility functions and types
│   ├── assets/               # ALL site assets (Images, PDFs, ZIPs, etc.)
│   └── middleware.ts         # Dev-mode asset serving logic
├── public/                   # Static root files (fonts, robots.txt)
├── tests/                    # E2E test files (Playwright)
└── package.json
```

Content changes can be made by adding assets to `src/assets` and updating Markdown content in `src/content`. Define new schemas in `src/content.config.ts`.

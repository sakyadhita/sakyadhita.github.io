# Sakyadhita International Association of Buddhist Women

Official website for Sakyadhita International Association of Buddhist Women.

## 🚀 4.0 Deployment & Integration Optimization

The project has undergone a major optimization of its deployment and external integration layers, achieving a **pure Astro native** architecture.

- **Astro Native Architecture**: Removed all React dependencies and shadcn/ui primitives. The site is now built entirely with native `.astro` components, utilizing Astro's built-in client-side scripting and component logic for maximum performance and a lean bundle.
- **Netlify Forms for SSR**: Implemented a centralized `public/__forms.html` skeleton for reliable Netlify Form detection in an SSR environment. Updated all AJAX submissions (`Volunteer`, `Join Us`, `Contact`) to use `URLSearchParams` and target the skeleton file, ensuring 100% reliable submission delivery.
- **PayPal SDK Overhaul**: Fully refactored the PayPal integration to use dynamic order creation inside the `createOrder` callback. Added a dynamic donation input to the Donate page and implemented robust error recovery for `INSTRUMENT_DECLINED` events, allowing users to gracefully select alternative payment methods.
- **Enhanced Security & Performance**: Updated `netlify.toml` with standard security headers and implemented aggressive caching for hashed assets in the `/_astro/` directory to improve site performance.

## 🚀 3.1 Native Asset Bundling

The project manages all assets (images, PDFs, ZIPs) within `src/assets/`.

- **Vite Asset Bundling**: All site assets are co-located in `src/assets/`. We use Vite's `import.meta.glob` to dynamically resolve these files. This ensures that even non-image assets (like conference PDFs and ZIPs) are correctly bundled, hashed for production, and served through the Vite pipeline.
- **Development Middleware**: A custom Astro middleware (`src/middleware.ts`) solves the issue of browser 404s when navigating to assets in `src/` during development. This middleware intercepts asset requests and serves them directly from disk with correct MIME types.

## 🚀 3.0 Major Architecture Flattening

The project has achieved a streamlined, idiomatic Astro architecture.

- **Native Astro Pages**: All pages are native `.astro` components in `src/pages/`.
- **Flattened Component Hierarchy**: Completely flattened the `src/components/` directory for better discoverability and simpler imports.
- **Full Native Image Optimization**: Standardized on Astro's native `image()` schema type and `<Image />` component.

## 🚀 2.0 Refactor & Modernization

### Content Collections Migration

The project uses the **Astro 6 `glob` loader API** for all content management. All collections defined in `src/content.config.ts` use the performant `glob` loader.

### Styling & UI Architecture

Styling is handled exclusively by **Tailwind CSS v4**, removing heavy frameworks like Material UI and Bootstrap.

## Releases

- 4.0.0: **Astro Native & Deployment Optimization**
  - Removed React and shadcn/ui dependencies; migrated to pure Astro native components.
  - Implemented centralized Netlify Forms skeleton and SSR-safe submission logic.
  - Overhauled PayPal integration with dynamic orders and error recovery.
  - Hardened Netlify configuration with security headers and caching rules.
- 3.1.0: **Native Asset Bundling & Asset Migration**
  - Moved all assets from `public/assets/` to `src/assets/`.
  - Implemented `src/middleware.ts` for stable asset serving in development.
- 3.0.0: **Major Architecture Flattening & Native Astro Pages**
  - Flattened component directory and migrated to native `.astro` pages.

## 🚀 Project Structure

```text
/
├── src/
│   ├── components/           # Flattened pure Astro components
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

# Sakyadhita Web Site

[![Netlify Status](https://api.netlify.com/api/v1/badges/33b02bdb-9658-4530-9b42-55a1957cb999/deploy-status)](https://app.netlify.com/sites/sakyadhita/deploys)

This is the Sakyadhita International static web site, recently refactored and modernized using **Astro 6** and **React 19**.

## 🚀 3.0 Major Architecture Flattening

The project has achieved a streamlined, idiomatic Astro architecture. Key updates in this major release include:

- **Native Astro Pages**: Migrated all remaining `.md` pages to native `.astro` pages in `src/pages/`. Layout logic is now co-located with page content, removing the dependency on legacy markdown layouts.
- **Flattened Component Hierarchy**: Completely flattened the `src/components/` directory. Nested subdirectories (e.g., `Home/`, `Main/`, `Conference/`) were removed in favor of a clean, root-level component structure for better discoverability and simpler imports.
- **Full Native Image Optimization**: Standardized on Astro's native `image()` schema type and `<Image />` component. Removed all manual glob mapping and legacy optimization helpers in `src/lib/images.ts`.
- **Component Refinement**: Reverted key components (NavBar, Footer, About Us, Publications) to their refined previous designs while fully integrating them into the new optimized architecture.
- **Clean Build & Type Safety**: Resolved all project-wide TypeScript errors and confirmed a 100% pass rate in the Playwright E2E and Vitest component test suites.

## 🚀 2.0 Refactor & Modernization

The website underwent a complete architectural overhaul to ensure long-term maintainability, accessibility, and performance. Key updates include:

- **Framework**: Upgraded to **Astro 6** and **React 19** for the latest features and performance optimizations.
- **Styling**: Migrated to **Tailwind CSS v4**, providing a more robust and modern utility-first styling engine.
- **UI Components**: Rebuilt UI components using **Base UI (headless)** for maximum accessibility and customizability.
- **Slideshows**: Replaced heavy dependencies with **Embla Carousel** for smoother, more performant image galleries.
- **Testing**: Integrated **Playwright** for comprehensive End-to-End (E2E) testing across browsers.
- **Maintainability**: Consolidated CSS, removed legacy code, and optimized the content collection structure.

## 🏗️ Extensive Implementation Notes

The modernization of the Sakyadhita website focuses on modern web standards, type safety, and developer experience.

### Framework & Tooling
The site uses **Astro 6** and **React 19**. This stack provides strict type-checking, particularly for component props and content collections. The project leverages modern TypeScript features and strict ESLint rules to ensure a predictable development cycle.

### Content Collections Migration
A critical part of the modernization was the migration of the content management system to the **Astro 6 `glob` loader API**. All collections defined in `src/content.config.ts` use the performant `glob` loader. All images in collections are typed via Astro's native `image()` helper.

### Styling & UI Architecture
Styling is handled exclusively by **Tailwind CSS v4**, removing heavy frameworks like Material UI and Bootstrap. 
- **Headless UI**: Interactive components (like Modals and Menus) are built using **Base UI (headless)** for full ARIA compliance and customizability.
- **Performance-Focused Components**: Slideshows use **Embla Carousel**, providing a light and smooth user experience.

### Testing & Stability
To ensure long-term stability, the project includes a comprehensive **Playwright E2E testing suite** and **Vitest component tests**. These tests cover critical user paths including navigation, home page interactivity, and site footer functionality.

## Releases

* 3.0.0: **Major Architecture Flattening & Native Astro Pages**
    - Migrated all Markdown pages to native Astro pages in `src/pages/`.
    - Flattened component hierarchy in `src/components/`, removing all subdirectories.
    - Finalized project-wide native `<Image />` optimization; removed legacy `import.meta.glob` logic.
    - Reverted core layouts (NavBar, Footer, About Us, Publications) to their original designs.
* 2.1.1: Clean up site metadata; remove unused constants and assets.
* 2.1.0: **Native Astro Migration & Tailwind v4 Finalization**
    - Migrated core components to native Astro, significantly reducing client-side JS overhead.
    - Integrated PhotoSwipe directly into Astro for a faster gallery experience.
    - Finalized Tailwind CSS v4 migration, standardizing all brand colors.
* 2.0.0: **Complete Refactor & Revision**
    - Upgraded to Astro 6, React 19.
    - Replaced custom CSS/Bootstrap with Tailwind CSS v4.
    - Switched to Base UI for accessible components.

## Creating a Local Build

First, make sure you have Node installed. [NVM](https://nvm.sh) is recommended (v22+).

Enable Corepack and install dependencies:
```sh
corepack enable
pnpm install
```

Commands:
- `pnpm dev`: Start local dev server.
- `pnpm build`: Build production site.
- `pnpm test:e2e`: Run Playwright tests.
- `pnpm test:ui`: Run Vitest tests.

## 🚀 Project Structure

```text
/
├── src/
│   ├── components/           # Flattened Astro and React components
│   ├── content/              # Markdown content and config.ts
│   ├── layouts/              # Base layout wrappers (e.g., PageLayout.astro)
│   ├── pages/                # Native Astro pages and routing
│   ├── styles/               # Global CSS and Tailwind configuration
│   └── lib/                  # Utility functions and types
├── public/                   # Static assets (fonts, documents)
├── tests/                    # E2E test files (Playwright)
└── package.json
```

Content changes can be made by adding assets to `src/assets` and updating Markdown content in `src/content`. Define new schemas in `src/content.config.ts`.

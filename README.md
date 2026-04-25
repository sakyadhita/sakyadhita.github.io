# Sakyadhita Web Site

[![Netlify Status](https://api.netlify.com/api/v1/badges/33b02bdb-9658-4530-9b42-55a1957cb999/deploy-status)](https://app.netlify.com/sites/sakyadhita/deploys)

This is the Sakyadhita International static web site, recently refactored and modernized using **Astro 6** and **React 19**.

## 🚀 2.0 Refactor & Modernization

The website has undergone a complete architectural overhaul to ensure long-term maintainability, accessibility, and performance. Key updates include:

- **Framework**: Upgraded to **Astro 6** and **React 19** for the latest features and performance optimizations.
- **Styling**: Migrated to **Tailwind CSS v4**, providing a more robust and modern utility-first styling engine.
- **UI Components**: Rebuilt UI components using **Base UI (headless)** for maximum accessibility and customizability.
- **Slideshows**: Replaced heavy dependencies with **Embla Carousel** for smoother, more performant image galleries.
- **Testing**: Integrated **Playwright** for comprehensive End-to-End (E2E) testing across browsers.
- **Maintainability**: Consolidated CSS, removed legacy code, and optimized the content collection structure.

## 🏗️ Extensive Implementation Notes

The v2.0 refactor represents a major shift in the project's architecture, focusing on modern web standards, type safety, and developer experience.

### Framework & Tooling
The site has been upgraded to **Astro 6** and **React 19**. This upgrade introduced stricter type-checking requirements, particularly for component props and content collections. The project now leverages modern TypeScript features and stricter ESLint rules to prevent common errors and ensure a more predictable development cycle.

### Content Collections Migration
A critical part of the modernization was the migration of the content management system to the new **Astro 6 `glob` loader API**. All collections defined in `src/content.config.ts` now use the more performant and flexible `glob` loader instead of the legacy content API. This change allows for better integration with modern build tools and improved performance during static site generation.

### Styling & UI Architecture
The project has moved away from heavy UI frameworks like Material UI and Bootstrap. Styling is now handled exclusively by **Tailwind CSS v4**, which provides a streamlined and utility-first approach. 
- **Headless UI**: Interactive components (like Modals and Menus) are built using **Base UI (headless)**. This ensures that the UI is fully accessible (ARIA compliant) and highly customizable without the overhead of pre-styled components.
- **Performance-Focused Components**: Heavy slideshow and carousel dependencies have been replaced with **Embla Carousel**, providing a much lighter and smoother user experience.

### Testing & Stability
To ensure long-term stability and prevent regressions, the project now includes a comprehensive **Playwright E2E testing suite**. These tests cover critical user paths including navigation, home page interactivity, and site footer functionality. The development workflow has also been hardened with improved prop guards and refined ESLint configurations to ensure that every build is robust and type-safe.

## Releases

* 2.1.0: **Native Astro Migration & Tailwind v4 Finalization**
    - Migrated core presentational components (`NavBar`, `HomeGallery`, `Slideshow`) to native Astro, significantly reducing client-side JS overhead.
    - Integrated PhotoSwipe directly into Astro for a faster, more responsive home gallery experience.
    - Finalized Tailwind CSS v4 migration, standardizing all brand colors into theme tokens and removing arbitrary hex values.
    - Resolved widespread broken links and document reference issues across the site.
    - Optimized image loading strategies and standardized component styling.
* 2.0.2: **Tooling & Styling Standardization**
    - Overhauled ESLint Flat Config (v9) with TypeScript, React, Astro, and Markdown integration.
    - Implemented `eslint-plugin-unicorn` and `eslint-plugin-import` for modern JS patterns and sorted imports.
    - Standardized Tailwind v4 utility usage, migrating arbitrary values to theme-consistent tokens and standard classes.
    - Switched to `eslint-plugin-better-tailwindcss` for improved Tailwind v4 support and class conflict detection.
    - Resolved several legacy code patterns and potential runtime bugs identified by stricter linting.
* 2.0.1: **Stability, Lint, and Typecheck Improvements**
    - Resolved Astro typecheck issues in Home layout and Home body component typing.
    - Fixed blocking ESLint errors and aligned project linting to pass consistently.
    - Updated component type definitions and prop guards for safer rendering.
    - Verified build, lint, and E2E test workflow with no regressions.
* 2.0.0: **Complete Refactor & Revision**
    - Upgraded to Astro 6, React 19.
    - Removed Material UI, Bootstrap, custom CSS and replaced with Tailwind
    - Switched to shadcn and Base UI for accessible, headless components.
    - Integrated Embla Carousel for performant slideshows.
    - Added Playwright E2E test suite.
    - Refactored Home page with new sections (Gallery, News Flash, "Be Involved").
    - Cleaned up legacy styles and optimized assets.
* 1.0.12: Switched brand icons to Simple Icons, added Playwright E2E tests, upgraded all packages
* 1.0.11: Updated packages, exco photos and bios
* 1.0.10: Minor changes to exco bios, update packages, ordination alignment
* 1.0.9: Updated Contact Page, Bibliography subtitle
* 1.0.8: Updated Buddhist Culture and Ordination Issue
* 1.0.7: Updated Bibliographies art work
* 1.0.6: Updated Bibliographies
* 1.0.5: Updated About page
* 1.0.4: Updated newsletter description and image for Vol 30
* 1.0.3: Updated Footer with conference links
* 1.0.2: Updated home page, slider, newsflash, photos, conferences, newsletters
* 1.0.1: Updated branch/chapter information
* 1.0.0: Initial version, converted from SERN to Astro/React

## Creating a Local Build

First, make sure you have Node installed in your system. You can use
[NVM](https://nvm.sh) to install the latest LTS release of Node (v22+ recommended).

Enable Corepack to use the PNPM package manager.

```sh
corepack enable
```

Install dependencies via PNPM.

```sh
pnpm install
```

To run a development version, run

```sh
pnpm dev
```

To build for production, run

```sh
pnpm build
```

To run end-to-end tests, run

```sh
pnpm test:e2e
```

To deploy to production, please commit the changes back to this repository.
Ensure the build and tests are successful before doing so. This will automatically trigger
a new build, and if successful, a deploy into production in Netlify.

## 🚀 Project Structure

Inside this repository, you'll see the following folders and files:

```text
/
├── astro.config.mjs          # Astro configuration file 
├── playwright.config.ts      # Playwright E2E testing configuration
├── public/                   # Location of static assets
│   ├── assets/               # Location of static content (images, documents)
│   └── favicon.svg
├── tests/                    # E2E test files (Playwright)
├── src/
│   ├── css/                  # Location CSS files
│   │   └── index.css
│   ├── media/                # Location of dynamic assets (eg. images)
│   │   └── logo.svg
│   ├── components/           # React and Astro components
│   │   └── Slideshow.astro
│   ├── content/              # Location of page content (Markdown and data)
│   │   └── config.ts
│   ├── layouts/              # Location of layouts for pages
│   │   └── PageLayout.astro
│   └── pages/                # Location of pages
│       └── index.astro
├── package.json
```

To create or change content, please place all static content (eg. documents,
images) in `public/content`. A content named `xx` in this directory can be
referenced from elsewhere on the website as absolute URLs beginning
with `/content` eg. `/content/xx`

`src/content` contains all the content contained in the website, eg pages,
conferences, publications, newsletters etc. as Markdown files. Content in
`public/content` can be linked from Markdown files, either within frontmatter or
as embedded links.

## Making changes

Content changes can be made purely by loading files into `public/assets` and
creating/changing Markdown content in `src/content`. Changes to pages can be
made in Markdown in `src/pages`

The structure of the Markdown files and frontmatter should be fairly obvious
but `src/content/config.ts` contains the definitions.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm run build`           | Build your production site to `./dist/`          |
| `pnpm run preview`         | Preview your build locally, before deploying     |
| `pnpm run test:e2e`        | Run end-to-end tests with Playwright             |
| `pnpm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm run astro -- --help` | Get help using the Astro CLI                     |

## Creating a new Deployment

This website can be deployed on Netlify without any special requirements apart
from Netlify Forms which should be enabled. Continuous Integration (CI) is handled
via GitHub Actions to run tests and deploy to production.

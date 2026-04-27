# Agent Context: Sakyadhita Website

This project is the official website for **Sakyadhita International Association of Buddhist Women**, built using **Astro**. It has been fully modernized into an idiomatic, flattened, pure Astro architecture.

## 🚀 Project Overview

- **Framework**: [Astro](https://astro.build/) (v6)
- **CMS**: [Decap CMS](https://decapcms.org/) (via `astro-decap-cms`) for user-friendly content management.
- **Testing**: Dual-layered strategy:
  - [Playwright](https://playwright.dev/) for End-to-End (E2E) visual and interaction testing.
  - [Vitest](https://vitest.dev/) for fast unit and logic testing (using `jsdom`).
- **Content**: Managed via [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) in `src/content/`.
- **Icons**: [Astro Icon](https://astro-icon.dev/) using Lucide and Simple Icons sets.
- **Styling**: Tailwind CSS v4 (CSS-first configuration).
- **Deployment**: Netlify.

## 🏗️ Architectural Decisions

- **Consolidated Component Library**: Redundant components have been merged into versatile, semantic versions (e.g., `SectionHeader`, `MediaCard`, `ConferenceSection`).
- **Standardized Form Architecture**: A universal `FormField.astro` component handles inputs, selects, and checkboxes with built-in accessibility and icon support.
- **Astro Native Pages**: All user-facing pages are native `.astro` components in `src/pages/`. Legacy markdown layouts and React islands have been removed in favor of co-located logic and content.
- **Flattened Components**: The `src/components/` directory is completely flattened. All UI components reside in the root of `src/components/` for maximum clarity and simpler imports.
- **Standardized Design Tokens**: Standardized on brand theme variables for colors, shadows, and z-index to eliminate arbitrary values and ensure visual consistency.
- **Decap CMS Integration**: A git-based CMS is integrated at the `/admin` route. It is configured to mirror the Astro Content Collections schemas and utilizes relative asset paths (`../../assets`) to maintain compatibility with Astro's native image optimization pipeline.
- **Native Asset Bundling**: All assets (images, PDFs, ZIPs, and other documents) reside in `src/assets/`. The project leverages Vite's asset bundling via `import.meta.glob` to resolve and serve these files, ensuring consistent path resolution and hashing in production.
- **Development Asset Middleware**: A custom middleware (`src/middleware.ts`) intercepts requests for files in `src/assets/` during development. This bypasses Astro's default page-routing logic for browser navigations (which typically 404s (or returns index) on direct `/src/` paths) and ensures documents are served with the correct MIME types.
- **Netlify Forms Optimization**: Forms are optimized for Netlify's SSR environment. A centralized `public/__forms.html` file acts as a skeleton for build-time form detection. Client-side submissions use `URLSearchParams` and target the skeleton file path to ensure they bypass SSR interception and are processed by Netlify's origin middleware.
- **PayPal Integration Best Practices**: The PayPal JS SDK is integrated with dynamic order creation, real-time lifecycle validation (disabling buttons for $0 amounts), and robust error recovery (restarting the flow on `INSTRUMENT_DECLINED`).
- **Tailwind CSS v4**: Primary utility-first styling engine, standardized with brand theme tokens.

## 🛠️ Getting Started

### Prerequisites

- **Node.js**: v22+
- **Package Manager**: [pnpm](https://pnpm.io/)

### Commands

| Command          | Action                                        |
| :--------------- | :-------------------------------------------- |
| `pnpm install`   | Install dependencies.                         |
| `pnpm dev`       | Start development server.                     |
| `pnpm build`     | Build the static site.                        |
| `pnpm test`      | Run all tests (Unit + E2E).                   |
| `pnpm test:unit` | Run Vitest logic tests.                       |
| `pnpm test:ui`   | Run Vitest with interactive UI.               |
| `pnpm test:e2e`  | Run Playwright E2E tests.                     |
| `pnpm lint`      | Run Prettier and ESLint (including Tailwind). |

## 📂 Project Structure

- `src/pages/`: Native `.astro` pages defining all site routes.
- `src/components/`: Flattened directory of Astro components.
- `src/content/`: Content collections (news, branch, conference, etc.).
- `src/layouts/`: Global wrapper components (e.g., `PageLayout.astro`).
- `src/lib/`: Shared TypeScript types, utility functions, and image helpers.
- `src/assets/`: Local images and branding assets for Astro optimization. All documents (PDFs, ZIPs) are also co-located here for Vite bundling.
- `public/`: Legacy directory for unprocessed static assets (fonts, robots.txt). All website assets have been moved to `src/assets/`.
- `tests/`: Playwright E2E tests.

## ✍️ Development Conventions

### Content Updates

Modify markdown files in `src/content/` directly or via the Decap CMS dashboard at `/admin`. Images and documents must be relative paths (e.g., `../../assets/...`) to be processed by the Vite asset loader; the CMS is configured to handle this automatically.

### Code Style

- **Formatting**: Prettier with Tailwind v4 utility sorting.
- **TypeScript**: Strict type-checking enabled. All component props must be explicitly typed.
- **Astro Native**: Use native Astro components (`.astro`) for all UI logic. Avoid external UI frameworks (React/Vue/etc.) to keep the bundle lean and the architecture idiomatic.

### Deployment

Pushes to `main` trigger Netlify deploys. Verify changes with `pnpm astro check` and `pnpm build` before merging.

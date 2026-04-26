# Agent Context: Sakyadhita Website

This project is the official website for **Sakyadhita International Association of Buddhist Women**, built using **Astro** and **React**. It has been fully modernized into an idiomatic, flattened Astro architecture.

## 🚀 Project Overview

- **Framework**: [Astro](https://astro.build/) (v6)
- **UI Library**: [React](https://reactjs.org/) (v19, used for complex interactive forms and maps)
- **Testing**: [Playwright](https://playwright.dev/) for End-to-End (E2E) testing; [Vitest](https://vitest.dev/) for component tests.
- **Content**: Managed via [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) in `src/content/`.
- **Icons**: [Lucide React](https://lucide.dev/) and [Simple Icons](https://simpleicons.org/).
- **Styling**: Tailwind CSS v4.
- **Deployment**: Netlify.

## 🏗️ Architectural Decisions

- **Astro Native Pages**: All user-facing pages are native `.astro` components in `src/pages/`. Legacy markdown layouts have been removed in favor of co-located logic and content.
- **Flattened Components**: The `src/components/` directory is completely flattened. All UI components (Astro and React) reside in the root of `src/components/` (except for `ui/` primitives) for maximum clarity and simpler imports.
- **Native Asset Bundling**: All assets (images, PDFs, ZIPs, and other documents) reside in `src/assets/`. The project leverages Vite's asset bundling via `import.meta.glob` to resolve and serve these files, ensuring consistent path resolution and hashing in production.
- **Development Asset Middleware**: A custom middleware (`src/middleware.ts`) intercepts requests for files in `src/assets/` during development. This bypasses Astro's default page-routing logic for browser navigations (which typically 404s on direct `/src/` paths) and ensures documents are served with the correct MIME types.
- **shadcn/ui (Base UI Native)**: UI primitives are built using the headless **Base UI** version of shadcn components, ensuring accessibility and customizability.
- **Tailwind CSS v4**: Primary utility-first styling engine, standardized with brand theme tokens.

## 🛠️ Getting Started

### Prerequisites
- **Node.js**: v22+
- **Package Manager**: [pnpm](https://pnpm.io/)

### Commands
| Command | Action |
| :--- | :--- |
| `pnpm install` | Install dependencies. |
| `pnpm dev` | Start development server. |
| `pnpm build` | Build the static site. |
| `pnpm test:ui` | Run Vitest component tests. |
| `pnpm test:e2e` | Run Playwright E2E tests. |
| `pnpm lint` | Run Prettier and ESLint. |

## 📂 Project Structure

- `src/pages/`: Native `.astro` pages defining all site routes.
- `src/components/`: Flattened directory of Astro and React components.
- `src/components/ui/`: Headless UI primitives (shadcn/Base UI).
- `src/content/`: Content collections (news, branch, conference, etc.).
- `src/layouts/`: Global wrapper components (e.g., `PageLayout.astro`).
- `src/lib/`: Shared TypeScript types, utility functions, and image helpers.
- `src/assets/`: Local images and branding assets for Astro optimization. All documents (PDFs, ZIPs) are also co-located here for Vite bundling.
- `public/`: Legacy directory for unprocessed static assets (fonts, robots.txt). All website assets have been moved to `src/assets/`.
- `tests/`: Playwright E2E tests.

## ✍️ Development Conventions

### Content Updates
Modify markdown files in `src/content/`. Images and documents must be relative paths (e.g., `../../assets/...`) to be processed by the Vite asset loader.

### Code Style
- **Formatting**: Prettier with Tailwind v4 utility sorting.
- **TypeScript**: Strict type-checking enabled. All component props must be explicitly typed.
- **React**: Use `.tsx` for React components. Prefer functional components and React 19 patterns.

### Deployment
Pushes to `main` trigger Netlify deploys. Verify changes with `pnpm astro check` and `pnpm build` before merging.

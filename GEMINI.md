# Gemini Context: Sakyadhita Website

This project is the official website for **Sakyadhita International Association of Buddhist Women**, built using **Astro** and **React**. It was migrated from a legacy SERN stack to a modern static site architecture.

## 🚀 Project Overview

- **Framework**: [Astro](https://astro.build/)
- **UI Library**: [React](https://reactjs.org/) (used for interactive components)
- **State Management**: Local React state where needed.
- **Content**: Managed via [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) in `src/content/`.
- **Styling**: Vanilla CSS located in `src/css/`.
- **Deployment**: Hosted on **Netlify**, with forms handled by Netlify Forms.

## 🛠️ Getting Started

### Prerequisites
- **Node.js**: Version 22 or higher (required by Astro 6+).
- **Package Manager**: [pnpm](https://pnpm.io/) (enabled via `corepack enable`).

### Commands
| Command | Action |
| :--- | :--- |
| `pnpm install` | Install dependencies. |
| `pnpm dev` | Start development server at `localhost:4321` (or `3000`). |
| `pnpm build` | Build the static site to `./dist/`. |
| `pnpm preview` | Preview the production build locally. |
| `pnpm lint` | Run Prettier and ESLint. |

## 📂 Project Structure

- `src/content/`: Main data source for the site. Each subdirectory (e.g., `news`, `branch`, `conference`) is a collection defined in `src/content/config.ts`.
- `src/pages/`: File-based routing. Most pages are `.md` files that specify a layout in their frontmatter.
- `src/layouts/`: Astro components that provide the page structure (e.g., `PageLayout.astro`, `HomeLayout.astro`).
- `src/components/`: React and Astro components. React components use the `.jsx` extension and are often hydrated with `client:only="react"`.
- `public/assets/`: Static assets like images, PDFs, and documents referenced by content.
- `src/css/`: Global and component-specific CSS files.

## ✍️ Development Conventions

### Content Updates
To update content, modify the Markdown files in `src/content/`.
- **Images**: Reference images from `/assets/...` (which maps to `public/assets/`).
- **Frontmatter**: Ensure all required fields (defined in `src/content/config.ts`) are present.

### Code Style
- **Formatting**: Handled by Prettier.
    - 2-space indentation.
    - No semicolons (`semi: false`).
    - Single quotes (`singleQuote: true`).
    - Line width: 100 characters.
- **Linting**: ESLint with plugins for Astro, React, and Markdown.
- **React**: Use `.jsx` for files containing JSX. Prefer functional components and hooks.

### Deployment
Pushes to the `main` branch automatically trigger a deploy on Netlify. Always verify your changes with `pnpm build` before pushing.

## 📝 TODOs / Future Work
- [ ] Complete the migration of `src/content/config.ts` to the latest Astro loader API (e.g., using `glob` loader).
- [ ] Ensure all images in `public/assets` are optimized where possible.

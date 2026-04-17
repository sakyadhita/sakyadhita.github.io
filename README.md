# Sakyadhita Web Site

[![Netlify Status](https://api.netlify.com/api/v1/badges/33b02bdb-9658-4530-9b42-55a1957cb999/deploy-status)](https://app.netlify.com/sites/sakyadhita/deploys)

This is the Sakyadhita International static web site created using [Astro](https://astro.build).

The design is based on a previous website written by
[Triton Software Engineering](https://github.com/TritonSE/SI-Website-Revamp)
which was a SERN three tier application (SQL, Express, React, Node). This version
retains the React components but all content has been extracted into Astro
content collections. The backend Express Server and SQL database is no longer
needed.

The website is hosted on Netlify and all form submissions are sent to Netlify.

## Releases

* 1.0.0: Initial version, converted from SERN to Astro/React
* 1.0.1: Updated branch/chapter information
* 1.0.2: Updated home page, slider, newsflash, photos, conferences, newsletters
* 1.0.3: Updated Footer with conference links
* 1.0.4: Updated newsletter description and image for Vol 30
* 1.0.5: Updated About page
* 1.0.6: Updated Bibliographies
* 1.0.7: Updated Bibliographies art work
* 1.0.8: Updated Buddhist Culture and Ordination Issue
* 1.0.9: Updated Contact Page, Bibliography subtitle
* 1.0.10: Minor changes to exco bios, update packages, ordination alignment
* 1.0.11: Updated packages, exco photos and bios
* 1.0.12: Switched brand icons to Simple Icons, added Playwright E2E tests, upgraded all packages

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
│   │   └── Slideshow.jsx
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

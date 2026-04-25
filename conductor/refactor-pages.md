# Plan: Refactor Markdown Pages to Native Astro Pages

## Objective
Convert all Markdown pages (`.md`) in `src/pages/` to native Astro pages (`.astro`). Move the layout logic from `src/layouts/` directly into the new `.astro` pages, incorporating the frontmatter content as local variables within the components.

## Key Files & Context
- **Markdown Pages to Convert:**
  - `src/pages/about.md` -> `src/pages/about.astro`
  - `src/pages/buddhist-culture.md` -> `src/pages/buddhist-culture.astro`
  - `src/pages/conferences.md` -> `src/pages/conferences.astro`
  - `src/pages/contact.md` -> `src/pages/contact.astro`
  - `src/pages/donate.md` -> `src/pages/donate.astro`
  - `src/pages/index.md` -> `src/pages/index.astro`
  - `src/pages/join.md` -> `src/pages/join.astro`
  - `src/pages/newsletters.md` -> `src/pages/newsletters.astro`
  - `src/pages/ordination-issue.md` -> `src/pages/ordination-issue.astro`
  - `src/pages/publications.md` -> `src/pages/publications.astro`
  - `src/pages/resources.md` -> `src/pages/resources.astro`
  - `src/pages/volunteer.md` -> `src/pages/volunteer.astro`

- **Layouts to Ingest & Delete:**
  - `src/layouts/AboutUs.astro`
  - `src/layouts/BuddhistCulture.astro`
  - `src/layouts/Conference.astro`
  - `src/layouts/ContactUs.astro`
  - `src/layouts/Donate.astro`
  - `src/layouts/Home.astro`
  - `src/layouts/JoinUs.astro`
  - `src/layouts/Newsletter.astro`
  - `src/layouts/OrdinationIssue.astro`
  - `src/layouts/Publication.astro`
  - `src/layouts/Resources.astro`
  - `src/layouts/Volunteer.astro`

## Implementation Steps

1. **Delete Markdown Files:**
   - Remove `src/pages/*.md`.

2. **Move Layouts to Pages:**
   - Rename and move each layout from `src/layouts/` to `src/pages/`, matching the name of the markdown file it replaces (e.g., `src/layouts/AboutUs.astro` becomes `src/pages/about.astro`).

3. **Refactor New Astro Pages:**
   - **Replace `Astro.props.frontmatter`:** Move the data previously stored in the markdown frontmatter into local constant objects at the top of the Astro component script.
   - **Update Imports:** Correct all relative import paths (e.g., `../components/` becomes `../components/`, but `../assets/` remains `../assets/`, `../lib/` remains `../lib/`, and `./PageLayout.astro` becomes `../layouts/PageLayout.astro`).
   - **Incorporate Slots:** Where the layout previously used `<slot />`, replace it with the markdown body content or an equivalent structure. If the markdown body was empty, remove the `<slot />` or replace it with the specific HTML structure needed.
   - **Example:** In `contact.astro`, instead of reading `frontmatter.email`, define `const contactInfo = { email: [...], phone: '...', address: '...' }` and render the body paragraph directly in the markup.

4. **Verify Page Generation:**
   - Ensure `src/pages/conferences/[...slug].astro` still builds correctly. It already uses Astro components.
   - Ensure the base `src/layouts/PageLayout.astro` remains intact as the core wrapper.

## Verification & Testing
- Run `pnpm astro check` to verify types and imports.
- Run `pnpm build` to ensure all static pages generate without markdown layouts.
- Visually inspect each page via `pnpm preview` or `pnpm dev` to ensure layout, styling, and data match the previous implementation.
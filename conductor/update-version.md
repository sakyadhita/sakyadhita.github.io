# Plan: Update Version and Documentation to 3.0.0

## Objective
Update the project version to `3.0.0` in `package.json` to reflect the major architectural changes (flattened component structure, native Astro page migration, full native image optimization). Update `README.md` and `AGENTS.md` to document these v3.0 changes.

## Implementation Steps

1. **Update `package.json`**:
   - Change `"version": "2.1.1"` to `"version": "3.0.0"`.

2. **Update `README.md`**:
   - Update the "Releases" section to include `3.0.0: **Major Architecture Flattening & Native Astro Pages**`.
   - Add bullet points detailing:
     - Migration of all `.md` pages to native `.astro` pages in `src/pages/`.
     - Complete flattening of `src/components/`, removing nested subdirectories for an idiomatic Astro structure.
     - Finalized project-wide native `<Image />` optimization, removing all manual `getOptimizedImage` and `import.meta.glob` logic.
     - Reverted key components (NavBar, Footer, About Us, Publications) to their original designs while retaining the new optimized architecture.
   - Change `sakyadhita.github.io@2.1.1` to `sakyadhita.github.io@3.0.0` in any command output snippets if present (none currently visible, but good to check).

3. **Update `AGENTS.md`**:
   - Under `📂 Project Structure`, update the description of `src/pages/` to state: "File-based routing using native `.astro` pages (migrated from legacy markdown layouts)."
   - Remove the reference to `src/layouts/` providing page structure for markdown files, or update it to reflect its new role (e.g., "Contains base layout wrappers like `PageLayout.astro`").
   - Under `src/components/`, mention that the hierarchy is completely flattened.

## Verification
- Run `pnpm build` to ensure `package.json` parsing hasn't broken.
- Read `README.md` and `AGENTS.md` to confirm the documentation accurately reflects the current state of the repository.
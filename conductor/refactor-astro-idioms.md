# Objective

Review and refactor Astro components to use idiomatic practices. Replace custom `cn()` usages with Astro's built-in `class:list` directive. Review collection handling to use `CollectionEntry` directly, avoiding unnecessary data mapping/reshaping before passing to components. Remove the `cn` function and unused types from `src/lib.ts`.

# Implementation Steps

1. **Replace `cn()` with `class:list`**:
   - `src/components/Brand.astro`
   - `src/components/ConferenceHorizontalStepper.astro`
   - `src/components/ConferencePagination.astro`
   - `src/components/ConferenceVerticalStepper.astro`
   - `src/components/CustomButton.astro`
   - `src/components/Footer.astro`
   - `src/components/JoinUsForm.astro`
   - `src/components/Modal.astro`
   - `src/components/ResourcesHeader.astro`
   - `src/components/Slideshow.astro`
   - `src/components/VolunteerForm.astro`
   - Ensure the import `import { cn } from '../lib'` is removed.

2. **Simplify Collection Handling**:
   - In `src/pages/conferences.astro` and `src/pages/conferences/[...slug].astro`, pass `conferencesRaw` directly as `data` instead of mapping it to a custom type.
   - Update `ConferenceDesktop.astro` and `ConferenceMobile.astro` to accept `CollectionEntry<'conference'>[]` and perform `await render(item)` inside the component loop.
   - Update `ConferenceOverview.astro` to accept `CollectionEntry<'conference'>` and call `getAssetUrl` locally for the resources.

3. **Cleanup `src/lib.ts`**:
   - Remove `cn` function.
   - Remove `ConferenceEntry`, `NewsAndEvents`, `PublicationEntry`, and `PublicationSection` types if they are no longer needed or can be replaced with `CollectionEntry<T>`.

4. **Remove Dependencies**:
   - Run `pnpm remove clsx tailwind-merge` since they are no longer used.

# Verification

- Run `pnpm exec astro check` and `pnpm build` to verify types and functionality.

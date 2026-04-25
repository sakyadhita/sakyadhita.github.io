# Plan: Flatten Component Hierarchy and Refactor for Astro Best Practices

## Objective
Refactor the `src/components/` directory to flatten the deeply nested component hierarchy. Merge simple wrapper components directly into their respective pages to reduce abstraction overhead, and consolidate redundant or similar components to align with current Astro best practices.

## Scope of Changes

### 1. Merge Wrappers into Pages
Some components act purely as layout wrappers for single pages and do not need to be separated.
- **`src/components/Home/HomeBody.astro`**: Inline its entire content directly into `src/pages/index.astro`. This removes unnecessary prop passing and aligns with Astro's page-first structure.
- **`src/components/Home/HomeSlideshow.astro`**: Inline directly into `src/pages/index.astro`.

### 2. Flatten and Rename Components
Move all components out of subdirectories (`Main`, `Home`, `Layouts`, `EPubs`, `Newsletters`, `Conference`, `ResourcesLanding`, `NavBar`) into the root of `src/components/`. Rename them for clarity where necessary.

**Global / Shared Components:**
- `src/components/Main/NavBar/NavBar.astro` -> `src/components/NavBar.astro`
- `src/components/Main/Footer.astro` -> `src/components/Footer.astro`
- `src/components/Main/Brand.astro` -> `src/components/Brand.astro`
- `src/components/Main/ResourcesNavBar.astro` -> `src/components/ResourcesNavBar.astro`
- `src/components/ResourcesLanding/ResourcesLandingPageHeader.astro` -> `src/components/ResourcesHero.astro`
- `src/components/ResourcesHeader.astro` -> Keep as is (or merge with `ResourcesHero` if logic is identical).

**Home Page Components:**
- `src/components/Home/Introduction.astro` -> `src/components/HomeHero.astro`
- `src/components/Home/NewsFlash.astro` -> `src/components/HomeNewsFlash.astro`
- `src/components/Home/NewsSlide.astro` -> `src/components/HomeNewsSlide.astro`
- `src/components/Home/BeInvolved.astro` -> `src/components/HomeBeInvolved.astro`
- `src/components/Home/InteractiveMap.tsx` -> `src/components/HomeMap.tsx`
- `src/components/Home/HomeGallery.astro` -> `src/components/HomeGallery.astro`

**Form / Interactive Components:**
- `src/components/Layouts/JoinUs.tsx` -> `src/components/JoinUsForm.tsx`
- `src/components/Layouts/Volunteer.tsx` -> `src/components/VolunteerForm.tsx`

**Card / List Components:**
- `src/components/Newsletters/NewsletterCard.astro` -> `src/components/NewsletterCard.astro`
- `src/components/EPubs/EPubCard.astro` -> `src/components/PublicationCard.astro`
- `src/components/EPubs/EPubSection.astro` -> `src/components/PublicationSection.astro`

**Conference Components:**
- `src/components/Conference/*.astro` -> Move all to `src/components/` and prepend `Conference` if not already present (e.g., `ConferencePagination.astro`).

### 3. Clean Up Subdirectories
After moving all components, delete the empty subdirectories in `src/components/`:
- `Conference`
- `EPubs`
- `Home`
- `Layouts`
- `Main`
- `Newsletters`
- `ResourcesLanding`

### 4. Update Import Paths
Perform a global find-and-replace to update all import statements across `src/pages/`, `src/layouts/`, and `src/components/` to match the new, flattened structure (e.g., `import NavBar from '../components/NavBar.astro'`).

## Verification & Testing
- Run `pnpm astro check` to verify all imports and TypeScript paths resolve correctly.
- Run `pnpm build` to ensure the static site compiles without errors.
- Visually verify pages (especially Home, Join Us, and Conferences) to confirm component styles and hydration work properly.
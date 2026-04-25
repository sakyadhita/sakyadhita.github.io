# Plan: Migrate React Components to Astro Native Components

## Objective
Review the project structure and migrate purely presentational or simple interactive React components to Astro native components. This aligns with Astro best practices to minimize the amount of client-side JavaScript (React) shipped to the browser, relying on vanilla JavaScript for simple interactions. We will also leverage `astro-icon` where possible and clean up duplicate/unused React components.

## Findings & Key Files
- **Dynamic React Components (To Keep):**
  - Interactive layouts (`JoinUs.jsx`, `Volunteer.jsx`, `ContactUs.jsx`, `Newsletters.jsx`, `AboutUs.jsx`, `EPublications.jsx`) heavily rely on React hooks (`useState`, `useEffect`) for forms, modals, scroll tracking, and pagination.
  - Interactive Home elements (`InteractiveMap.jsx`, `Slideshow.jsx`) rely on dynamic third-party React libraries (e.g., `react-simple-maps`, `embla-carousel-react`).
  - `HomeGallery.jsx` has been migrated to `HomeGallery.astro` using native PhotoSwipe.
  - `HomeSlideshow.jsx` passes React elements to `Slideshow.jsx`, which relies on `React.Children.map`. It must remain React.
  - `CustomButtonReact.tsx` is required by the React components mentioned above and cannot be swapped with `CustomButton.astro` inside those files.
- **Static/Simple React Components (To Migrate/Remove):**
  - **`src/components/Main/NavBar/NavBar.jsx` and `Nav.jsx`**: A prime candidate for migration. The `useState` logic simply toggles a CSS class for a mobile menu. This can easily be handled with Vanilla JS in an `.astro` component.
  - **`src/components/Main/Brand.jsx`**: An Astro version (`Brand.astro`) already exists. We can safely remove the React version after migrating `NavBar`.
  - **`src/components/Main/ResourcesNavBar.jsx`**: An Astro version (`ResourcesNavBar.astro`) already exists and is the only version currently used in layouts. The React version is dead code and can be removed.
  - **`src/components/Main/Loader.jsx`**: Not imported anywhere in the project. Can be removed.

## Implementation Steps
1. **Migrate Navigation Bar:**
   - Create `src/components/Main/NavBar/NavBar.astro` combining the structure of `NavBar.jsx` and `Nav.jsx`.
   - Implement Vanilla JS (`<script>`) to handle toggling the mobile menu classes.
   - Replace SVG image imports with `astro-icon` (`<Icon name="lucide:menu" />` and `<Icon name="lucide:x" />`).
   - Update `src/layouts/PageLayout.astro` to import the new `NavBar.astro` instead of the React version.
2. **Clean Up Unused React Components:**
   - Delete `src/components/Main/NavBar/NavBar.jsx`
   - Delete `src/components/Main/NavBar/Nav.jsx`
   - Delete `src/components/Main/Brand.jsx`
   - Delete `src/components/Main/ResourcesNavBar.jsx`
   - Delete `src/components/Main/Loader.jsx`
3. **Verify:** Run `pnpm run lint` and confirm the site builds successfully via `pnpm build`.

## Verification & Testing
- Start the dev server and verify the mobile navigation toggle works correctly without React.
- Ensure that the deleted files do not break any builds or tests.

# Objective
Migrate `src/components/HomeMap.tsx` from React to a native `src/components/HomeMap.astro` component using D3 and TopoJSON, maintaining the exact look, feel, and functionality of the interactive map.

# Key Files & Context
- `src/components/HomeMap.tsx` (to be removed)
- `src/components/ui/tooltip.tsx` (to be removed)
- `src/pages/index.astro` (to be updated)
- `package.json` (to update dependencies)

# Implementation Steps

1. **Update Dependencies:**
   - Install `d3` and `topojson-client` to handle native map rendering.
   - Install `@types/d3` and `@types/topojson-client` as dev dependencies.
   - Remove `react-simple-maps` and `@types/react-simple-maps`.
   - Evaluate if `@base-ui/react` is still needed elsewhere; if not, remove it.

2. **Create Native `src/components/HomeMap.astro`:**
   - Define `Props` interface matching the existing React component (`markers`, `disableZooming`).
   - Create the container structure (`<div id="map-container" class="size-full relative">`).
   - Add a native HTML/Tailwind tooltip element initially hidden with `class="absolute z-50 hidden ... shadow-md"`.
   - Add a `<script>` block that:
     - Parses the passed `markers` and `disableZooming` data via `data-*` attributes on the container.
     - Uses `d3` to append an SVG.
     - Sets up `d3.zoom()` configured to match the previous translation/zoom constraints.
     - Fetches TopoJSON from `https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json`.
     - Draws the graticule (`stroke="#EAEAEC"`).
     - Renders the geographic boundaries using `d3.geoEqualEarth()` (the default projection of `react-simple-maps`) and fills countries with `#BBDBF0`.
     - Plots the markers using SVG groups and paths identical to the existing React implementation.
     - Attaches event listeners (`mouseenter`, `mousemove`, `mouseleave`, `focus`, `blur`) to markers to show/hide the custom HTML tooltip.

3. **Update `src/pages/index.astro`:**
   - Modify the import statement to point to `../components/HomeMap.astro`.
   - Remove the `client:visible` hydration directive from the component invocation, as the interactivity is now handled natively via the Astro component's script.

4. **Cleanup & Refactoring:**
   - Delete the legacy `src/components/HomeMap.tsx` file.
   - Delete `src/components/ui/tooltip.tsx` (and `src/components/ui/tooltip.test.tsx` if it exists).

# Verification & Testing
- Start the dev server (`pnpm dev`) and visually inspect the map on the homepage.
- Verify that map markers render in the correct locations with correct colors (orange/purple based on `isBranch`).
- Hover over markers to confirm the tooltip displays the custom HTML content correctly and follows mouse position or marker position.
- Test zooming and panning behavior to ensure it matches the previous constraints.
- Run `pnpm run build` and `pnpm exec astro check` to ensure no typing or build errors were introduced.
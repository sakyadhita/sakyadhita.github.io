# Plan: Investigation and Fix for Broken Document Links

## Objective
Thoroughly investigate why PDF links in newsletters and publications are broken after asset migration, create verification tests, and implement a definitive fix.

## Phased Approach

### Phase 1: Investigation & Diagnostics
1.  **Analyze Vite Asset Mapping**: I need to see what `import.meta.glob` is actually producing. Since I cannot create a new Astro page in Plan Mode, I will exit Plan Mode to add a diagnostic `console.log` in `src/lib/images.ts` that outputs the keys of the `docs` map during the build process.
2.  **Verify Asset Inclusion**: Ensure that the PDF files in `src/assets` are actually being picked up by Vite and included in the output.

### Phase 2: Reproduction Test
1.  Create `tests/links.spec.ts` to programmatically verify that links on the Newsletters and Publications pages are not 404ing.
2.  Run the test to confirm the current failure state.

### Phase 3: Implementation of Fix
1.  Refine `getAssetUrl` lookup logic.
2.  Ensure all layouts correctly pass the resolved URLs to React components.
3.  Check if any component is hardcoding `/assets/` or stripping the resolved URL.

### Phase 4: Verification
1.  Run `tests/links.spec.ts` and ensure all links are valid (200 OK).
2.  Run full E2E suite.

## Verification & Testing
- New `tests/links.spec.ts` checking HEAD requests for document links.
- Existing 110 tests must pass.

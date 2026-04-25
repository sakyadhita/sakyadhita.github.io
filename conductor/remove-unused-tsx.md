# Plan: Remove Unused TSX Files

## Objective
Investigate and remove any `.tsx` files that are no longer used in the project following recent refactoring and layout changes.

## Investigation
I searched the project for all `.tsx` files and analyzed their usage via `grep_search`:

- **Used Files:** `JoinUs.tsx`, `Volunteer.tsx`, `CustomButtonReact.tsx`, `Modal.tsx`, `PayPal.tsx`, `PayPalModal.tsx`, `VolunteerOption.tsx`, `InteractiveMap.tsx`, and most `ui/*.tsx` components (`button`, `checkbox`, `dialog`, `input`, `label`, `select`, `textarea`, `tooltip`). Their associated test files (`.test.tsx`) are also actively testing used components.
- **Unused Files:**
  - `src/components/ui/pagination.tsx`: No matches found anywhere in the project. The pagination logic has been completely replaced by native Javascript within `src/layouts/Newsletter.astro` (now `src/pages/newsletters.astro`).
  - `src/components/ErrorBoundary.tsx`: Only referenced by itself and in the `playwright-report`. Since Astro does not naturally utilize React Error Boundaries in island hydration unless explicitly imported, and no Astro or React components are currently importing it, this file is dead code.

## Implementation Steps
1. Delete `src/components/ui/pagination.tsx`.
2. Delete `src/components/ErrorBoundary.tsx`.

## Verification & Testing
- Run `pnpm astro check` to confirm no remaining type errors or broken imports.
- Run `pnpm build` to verify the build succeeds without the removed files.
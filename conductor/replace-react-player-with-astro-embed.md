# Implementation Plan: Replace React Player with Native Astro Component

## Objective
Remove the unused `react-player` dependency and replace the naive `<iframe>` video embeds in `ConferenceDesktop.astro` and `MobileConference.astro` with the native `@astro-community/astro-embed-youtube` component.

## Key Files & Context
- `package.json`: Contains the unused `react-player` dependency.
- `src/components/Conference/ConferenceDesktop.astro`: Currently uses `<iframe>` for desktop conference videos.
- `src/components/Conference/MobileConference.astro`: Currently uses `<iframe>` for mobile conference videos.

## Implementation Steps
1. **Dependency Cleanup**: 
   - Uninstall `react-player` using `pnpm remove react-player`.
   - Install `@astro-community/astro-embed-youtube` using `pnpm add @astro-community/astro-embed-youtube`.
2. **Update Components**:
   - In `ConferenceDesktop.astro` and `MobileConference.astro`, import the `<YouTube />` component from `@astro-community/astro-embed-youtube`.
   - Replace the `<iframe>` element with `<YouTube id={item.data.video} class="size-full bg-black" />`. The `YouTube` component automatically handles full URLs and parsing.

## Verification & Testing
- Run `pnpm lint` and `pnpm astro check` to verify no import or typing issues.
- Run `pnpm build` to ensure the project builds successfully.
- Run `pnpm test run` to verify the E2E tests still pass.
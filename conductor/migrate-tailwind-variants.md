# Plan: Migrate Custom Tailwind Variants to Standard Classes

## Objective

Review the project for arbitrary Tailwind values (`[...]`) and custom inline breakpoints (e.g., `min-[350px]:`), migrating them to the nearest standard Tailwind sizes or standard breakpoint variants according to Tailwind v4 best practices. This improves maintainability and aligns the design system with standard utility scales.

## Key Files & Context

- `src/components/ui/dialog.tsx`: Uses arbitrary percentages for positioning that have standard fraction equivalents.
- `src/components/Layouts/AboutUs.jsx`: Contains numerous hardcoded pixel widths (`w-[175px]`, `w-[140px]`, `w-[250px]`, `w-[700px]`) and heights.
- `src/components/Home/NewsSlideReact.jsx`: Uses a non-standard `min-[350px]:` breakpoint.
- `src/components/Layouts/EPublications.jsx`: Uses arbitrary pixel widths and heights (`w-[350px]`, `w-[700px]`, `h-[430px]`).
- `src/components/Home/BeInvolved.astro`: Uses `h-[450px]`.
- `src/components/Slideshow.jsx`: Uses `w-[50px]`.
- `src/components/Layouts/Volunteer.jsx`, `JoinUs.jsx`, `ContactUs.jsx`: Use `min-w-[300px]` for their snackbars.

## Implementation Steps

1. **`src/components/ui/dialog.tsx`**:
   - Replace `top-[50%] left-[50%] translate-[-50%]` with `top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`.
2. **`src/components/Layouts/AboutUs.jsx`**:
   - Change `w-[175px]` to `w-44` (176px).
   - Change `h-[9px]` to `h-2.5` (10px).
   - Change `w-[140px]` to `w-36` (144px).
   - Change `w-[250px]` to `w-64` (256px).
   - Change `w-[700px]` to `max-w-3xl` (768px, or standard container size).
3. **`src/components/Home/NewsSlideReact.jsx`**:
   - Remove the `min-[350px]:` breakpoint. Modern mobile-first base should cover these screens.
   - Combine base styles: remove `w-[75%] p-5` and use `w-[70.5vw] p-8` as the new base.
4. **`src/components/Layouts/EPublications.jsx`**:
   - Change `h-[430px]` to `h-108` (432px).
   - Change `w-[350px]` to `w-88` (352px).
   - Change `w-[700px]` to `max-w-3xl` (or `max-w-2xl`).
5. **`src/components/Home/BeInvolved.astro`**:
   - Change `h-[450px]` to `h-112` (448px).
6. **`src/components/Slideshow.jsx`**:
   - Change `w-[50px]` to `w-12` (48px).
7. **Snackbar Standardization** (`Volunteer.jsx`, `JoinUs.jsx`, `ContactUs.jsx`):
   - Change `min-w-[300px]` to `min-w-80` (320px).

## Verification & Testing

- Run `pnpm run lint` and verify no new conflicting class errors are introduced.
- Confirm visual fidelity isn't disrupted by these minor sub-pixel shifts.

# Plan: Ensure Tailwind v4 Best Practices

## Objective

Finalize the project's adherence to Tailwind v4 best practices by resolving invalid CSS variable usage in the core stylesheet and migrating remaining arbitrary hex colors to the defined theme tokens.

## Key Files & Context

- `src/css/index.css`: Contains the core `@theme` and base CSS rules. Currently uses an unresolved `var(--black)` variable.
- `src/components/Home/HomeBody.astro`: Uses hardcoded arbitrary hex colors (`#EA8644`, `#8477B9`) that already exist as brand tokens in the Tailwind theme.
- `src/components/Slideshow.jsx`: Uses arbitrary gray colors (`#c4c4c4`) for indicator dots.

## Implementation Steps

1. **Fix Global CSS Variable (`index.css`)**:
   - Update `body { color: var(--black); }` to use standard v4 conventions. I will replace it with `@apply text-black;` (or `color: var(--color-black);`) to ensure the default text color applies correctly.

2. **Migrate Arbitrary Hex to Theme Tokens**:
   - In `src/components/Home/HomeBody.astro`, replace `bg-[#EA8644]` with the existing theme token `bg-brand-orange`.
   - In `src/components/Home/HomeBody.astro`, replace `bg-[#8477B9]` with the existing theme token `bg-brand-light-purple`.
   - In `src/components/Slideshow.jsx`, replace `bg-[#c4c4c4]` and `border-[#c4c4c4]` with standard Tailwind utilities, such as `bg-gray-400` and `border-gray-400`.

## Verification & Testing

- Run `pnpm run lint` to ensure no new errors are introduced.
- Review the site locally (or trust standard component behavior) to ensure colors are correctly applied.

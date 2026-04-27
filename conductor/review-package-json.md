# Implementation Plan: Review and Clean Up `package.json`

## Objective

Review `package.json` to identify unused or unnecessary packages, remove them, and ensure packages are correctly categorized into `dependencies` or `devDependencies` based on their role in an Astro + Tailwind project.

## Key Changes

1. **Remove Duplicate `typescript-eslint`**:
   - `typescript-eslint` is currently listed in both `dependencies` and `devDependencies`. It will be removed from `dependencies`.
2. **Remove Unused ESLint Packages**:
   - `@eslint/eslintrc`: The project uses a flat config (`eslint.config.js`) and does not use `FlatCompat`, making this package unnecessary.
   - `eslint-plugin-prettier`: This plugin is not used in the ESLint configuration (the project uses `eslint-config-prettier` instead, and runs Prettier via CLI).
3. **Move `@iconify-json/simple-icons` to `devDependencies`**:
   - Icon sets are resolved at build-time by `astro-icon`. Since `@iconify-json/lucide` is in `devDependencies`, `simple-icons` will be moved to `devDependencies` for consistency.

## Implementation Steps

1. Execute `pnpm remove typescript-eslint @iconify-json/simple-icons` (this drops them from `dependencies`).
2. Execute `pnpm remove -D @eslint/eslintrc eslint-plugin-prettier`.
3. Execute `pnpm add -D @iconify-json/simple-icons` to properly place it in `devDependencies`.
4. Ensure `typescript-eslint` is still present in `devDependencies` (it may need to be re-added via `pnpm add -D typescript-eslint` if the first command removed it completely).
5. Run `pnpm run lint` to verify that linting works as expected without the removed packages.
6. Run `pnpm run build` to verify the build process and icon resolution work without issues.

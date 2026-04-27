# Plan: Resolve Tailwind v4 ESLint Configuration Error

## Objective

Fix the "Cannot resolve default tailwindcss config path" error during `pnpm lint` by replacing the incompatible `eslint-plugin-tailwindcss` with `eslint-plugin-better-tailwindcss`, which properly supports Tailwind CSS v4 and its CSS-based configuration.

## Key Files & Context

- `package.json`: Manages development dependencies.
- `eslint.config.js`: The central ESLint flat configuration file.
- `src/css/index.css`: The likely CSS entry point for Tailwind v4 directives.

## Implementation Steps

1. **Update Dependencies:**
   - Uninstall the old plugin: `pnpm remove eslint-plugin-tailwindcss`
   - Install the new plugin: `pnpm add -D eslint-plugin-better-tailwindcss`

2. **Modify `eslint.config.js`:**
   - Change the import: `import tailwindPlugin from 'eslint-plugin-tailwindcss'` to `import betterTailwindPlugin from 'eslint-plugin-better-tailwindcss'`.
   - Update the configuration block:
     - Apply the recommended flat config from the new plugin.
     - Add necessary settings to define the Tailwind v4 CSS entry point (e.g., `src/css/index.css`).
     - Remove the previous `settings.tailwindcss.config: null` workaround which was specific to the old plugin.

## Verification & Testing

- Run `pnpm run lint` and verify that the "Cannot resolve default tailwindcss config path" warning is completely eliminated.
- Ensure that Tailwind utility class linting continues to function or gracefully ignores unknown custom classes without erroring.

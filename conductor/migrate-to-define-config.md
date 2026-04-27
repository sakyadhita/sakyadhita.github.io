# Implementation Plan: Migrate to `defineConfig`

## Objective

Update `eslint.config.js` to use `defineConfig` from `eslint/config` instead of `tseslint.config` as recommended by the `typescript-eslint` documentation for ESLint 10 compatibility.

## Changes

1. **Update Imports**:
   - Add `import { defineConfig } from 'eslint/config'` to `eslint.config.js`.
2. **Update Export**:
   - Change `export default tseslint.config(` to `export default defineConfig(`.

## Verification

- Run `pnpm run lint:eslint` to verify the configuration syntax is valid and linting works.

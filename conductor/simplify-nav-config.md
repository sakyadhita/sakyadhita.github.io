# Simplify Navigation Config

## Objective

Centralize the navigation configuration by moving the `navLinks` array from `@src/components/NavBar.astro` and the `navItems` array from `@src/components/ResourcesNavBar.astro` into `@src/SiteMetadata.ts`. Clean up `@src/SiteMetadata.ts` to ensure the structure is clear and well-typed.

## Key Files & Context

- `@src/SiteMetadata.ts`: The central configuration file. We'll add `MAIN_NAV_LINKS` and `RESOURCES_NAV_LINKS` here.
- `@src/components/NavBar.astro`: Currently defines `navLinks` locally. Needs to import `MAIN_NAV_LINKS`.
- `@src/components/ResourcesNavBar.astro`: Currently defines `navItems` locally. Needs to import `RESOURCES_NAV_LINKS`.

## Implementation Steps

### 1. Update `SiteMetadata.ts`

- Export a new constant `MAIN_NAV_LINKS` containing the main navigation items (Home, Conferences, Resources, About Us, Contact Us).
- Export a new constant `RESOURCES_NAV_LINKS` containing the resources sub-navigation items (Resources, Newsletters, Publications, Buddhist Culture, Ordination Issue).
- Clean up formatting and grouping within the file.

### 2. Update `NavBar.astro`

- Remove the local `navLinks` array.
- Import `MAIN_NAV_LINKS` from `../SiteMetadata`.
- Update the `.map()` function to iterate over `MAIN_NAV_LINKS`.

### 3. Update `ResourcesNavBar.astro`

- Remove the local `navItems` array.
- Import `RESOURCES_NAV_LINKS` from `../SiteMetadata`.
- Update the `.map()` functions to iterate over `RESOURCES_NAV_LINKS`.

## Verification & Testing

1. Run `pnpm run lint:eslint` to ensure imports are correct and there are no unused variables.
2. Run `pnpm astro check` to verify types.
3. Start the dev server and verify that the main navigation and resources sub-navigation menus render and function correctly.

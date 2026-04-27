# Objective

Modify `@src/components/HomeMap.astro` to directly handle fetching the `branch` collection and render its own markdown using Astro's native `render` function. This simplifies the `index.astro` page and removes the need for the `marked` library dependency. The `marked` dependency will also be removed from the `conference` pages and replaced with native Astro `render`.

# Key Files & Context

- `src/components/HomeMap.astro`
- `src/pages/index.astro`
- `src/pages/conferences.astro`
- `src/pages/conferences/[...slug].astro`
- `package.json`

# Implementation Steps

1. **Update `HomeMap.astro`**:
   - Import `getCollection` and `render` from `astro:content`.
   - Call `await getCollection('branch')`.
   - Map over the collection to extract the data needed for the map markers.
   - For each branch, use `await render(branch)` to get the `Content` component or HTML. Since we need to pass this to D3 as an HTML string, we might need a workaround or continue to use `marked`. Wait, Astro's `render` returns a component, not an HTML string. To pass HTML to D3 tooltips natively without `marked`, we can either:
     - Keep using `marked` (violates objective).
     - Render the markdown to HTML string inside the Astro component script using an Astro-native approach if available, or pre-render it to a hidden DOM element and extract `innerHTML` on the client side.
     - _Correction_: Astro `render` does not easily return a raw HTML string. However, since the goal is to remove `marked`, we can use `html = (await render(b)).remarkPluginFrontmatter?.html`? No.
     - A common way in Astro is to render the content in hidden `<template>` or `<div>` tags and then read them in the client script. E.g., `<template id={`marker-html-${index}`}><Content /></template>`, and in the JS, `document.getElementById('marker-html-' + i).innerHTML`. This is a clean, native Astro approach that avoids client-side markdown parsing or server-side external libraries like `marked`.
   - We will implement the hidden template approach in `HomeMap.astro`.
   - `HomeMap.astro` will no longer need `markers` as a prop (or we can keep it for flexibility, but the objective says "move the getcollection branch logic there", so we'll fetch inside `HomeMap.astro`).

2. **Update `index.astro`**:
   - Remove the `branch` collection fetching logic.
   - Remove the `marked` import and usage.
   - Remove the `markers` prop being passed to `<HomeMap />`.

3. **Update `conferences.astro` and `conferences/[...slug].astro`**:
   - The user asked to remove `marked` from the project. These files also use `marked`.
   - We will replace `marked.parse(c.body || '')` with `(await render(c)).Content`? Wait, these pass `htmlBody` to `ConferenceDesktop.astro` and `ConferenceMobile.astro`, which expect a string.
   - Wait, `ConferenceTheme.astro` takes `theme: string` and uses `set:html={theme}`. We need to refactor `ConferenceTheme.astro` to accept an Astro component (`theme: any` or a slot) instead of a string, or use the `body` string directly if it's plain text, but it's markdown.
   - Wait, `render` provides a `Content` component. We can pass the `Content` component to `ConferenceDesktop` and render it natively: `<item.Content />`. This is much more Astro-native.
   - Let's refactor `ConferenceTheme.astro` to accept a slot or a component for the theme instead of a raw HTML string.

4. **Remove Dependency**:
   - Run `pnpm remove marked @types/marked`.

# Verification & Testing

- Run `pnpm run build` to verify no errors.
- Run `pnpm dev` and verify that the map tooltips and conference themes render correctly as HTML.

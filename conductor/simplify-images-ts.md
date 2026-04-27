# Plan: Simplify Astro Image Optimization Logic

## Objective

Remove the complex `import.meta.glob` mapping for images in `src/lib/images.ts`, specifically the `getRawImage` and `getOptimizedImage` functions. All local images should be statically imported as `ImageMetadata` objects natively in Astro files, ensuring maximum performance, type safety, and simplicity.

## Key Files & Context

- `src/lib/images.ts`: Contains the legacy glob logic.
- `src/components/ResourcesHeader.astro` & `src/components/ResourcesLanding/ResourcesLandingPageHeader.astro`: Uses `getRawImage`.
- `src/components/Home/BeInvolved.astro`: Uses `getRawImage`.
- `src/pages/*.astro`: Define `frontmatter.image` as strings.
- `src/pages/donate.astro` & `src/components/Home/HomeBody.astro`: Pass `image_url` strings to `BeInvolved`.

## Implementation Steps

1. **Refactor Page Frontmatters:**
   - In all `src/pages/*.astro` files (e.g., `about.astro`, `buddhist-culture.astro`, `contact.astro`, `join.astro`, `publications.astro`, etc.), explicitly import the header image:
     ```astro
     import LotusHeader from '../assets/Lotus_Header.png'
     ```
   - Assign the imported object to `frontmatter.image`.

2. **Refactor `<BeInvolved>` Usages:**
   - In `src/pages/donate.astro` and `src/components/Home/HomeBody.astro`, import the images for the `BeInvolved` component explicitly (e.g., `import JoiningHands from '../assets/Join Us Page/Joining hands.jpg'`) and pass them to the `image_url` prop as objects.

3. **Simplify Component Headers:**
   - In `ResourcesHeader.astro`, `ResourcesLandingPageHeader.astro`, and `BeInvolved.astro`, remove `getRawImage`.
   - Assume `image` (or `image_url`) is an `ImageMetadata` object or a standard URL string. Update the `getImage()` logic to pass the object directly:

     ```typescript
     const optimizedImage =
       typeof image === 'string'
         ? null // Or let Astro try to optimize the external URL string
         : await getImage({ src: image, format: 'webp', width: 1600 })

     const imageUrl = optimizedImage?.src || (typeof image === 'string' ? image : image.src)
     ```

4. **Simplify `src/lib/images.ts`:**
   - Delete the `import.meta.glob` declaration for images.
   - Delete `getRawImage` and `getOptimizedImage`.
   - Retain only `getAssetUrl` to resolve document paths (e.g., PDFs).

## Verification & Testing

- Run `pnpm astro check` to verify types and imports.
- Run `pnpm build` to ensure the static site compiles without `ImageNotFound` or import errors, confirming native optimization is working natively.

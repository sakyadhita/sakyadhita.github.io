# Plan: Update Content Config Image Types

## Objective
Convert all image-related fields in `src/content.config.ts` to use Astro's native `image()` type for automatic image processing and optimization.

## Key Files & Context
- `src/content.config.ts`: Contains the schema definitions for all content collections.

## Implementation Steps
1. **Update `news` collection**:
   - Change `schema` to a function: `schema: ({ image }) => rssSchema.extend({ ... })`.
   - Update `imageLink` from `z.string()` to `image()`.

2. **Update `conference` collection**:
   - Change `schema` to a function: `schema: ({ image }) => z.object({ ... })`.
   - Update `slideShowImages` from `z.string().array().optional()` to `image().array().optional()`.

3. **Update `newsletter` collection**:
   - Verify `schema` uses `({ image }) => z.object({ ... })`.
   - Verify `imageLink` is `image()`.

4. **Update `publication` collection**:
   - Verify `schema` uses `({ image }) => z.object({ ... })`.
   - Verify `imageLink` is `image()`.

5. **Update `section` collection**:
   - Change `schema` to a function: `schema: ({ image }) => z.object({ ... })`.
   - Update `image` from `z.string().optional()` to `image().optional()`.

6. **Update `exco` collection**:
   - Verify `schema` uses `({ image }) => z.object({ ... })`.
   - Verify `imageLink` is `image().optional().default('./assets/headshot.jpg')`.

## Verification & Testing
- Run `pnpm astro check` to verify the schema updates are syntactically correct.
- Note: This change modifies the returned type of these fields from a `string` to an `ImageMetadata` object. Consumer components will need to be updated to handle the new type (e.g., using `src` property or passing the object directly to an `<Image />` component).
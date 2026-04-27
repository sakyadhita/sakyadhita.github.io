# Objective

Migrate `@src/components/JoinUsForm.tsx`, `PayPal.tsx`, and `PayPalModal.tsx` to native Astro components to remove the React dependency for these interactive forms, while preserving their exact look, feel, and functionality.

# Key Files & Context

- `src/components/JoinUsForm.tsx` (to be removed)
- `src/components/PayPal.tsx` (to be removed)
- `src/components/PayPalModal.tsx` (to be removed)
- `src/components/JoinUsForm.astro` (to be created)
- `src/pages/join.astro` (to be updated)

# Implementation Steps

1. **Create Native `src/components/JoinUsForm.astro`:**
   - Define the `Props` interface matching the existing React component (`frontmatter`, `memberships`).
   - Create the exact DOM structure mapping over the previous React component tree.
   - Replace Shadcn UI React components (`Input`, `Select`, `Checkbox`, `Textarea`, `Label`) with their native HTML equivalents using exactly the same Tailwind CSS classes to ensure no visual regressions.
   - Replace `react-country-region-selector` with a standard HTML `<select>` containing a list of countries (either hardcoded or fetched at build time).
   - Embed the PayPal Modal's HTML directly within the component (initially hidden via `hidden` class).

2. **Implement Client-Side Logic (`<script>` block):**
   - **State Management:** Query all inputs and manage their values natively. Add event listeners for `input` and `change` events.
   - **Conditional Rendering:** Implement logic to show/hide the address fields based on country selection, and show/hide the additional info / payment options based on the "Not interested in membership" checkbox.
   - **Validation:** Port the existing validation logic. Toggle error classes (like red borders) and asterisks on required fields dynamically.
   - **Submission:** Recreate the `fetch` POST logic to the Netlify forms (`membership` and `paidmembership`).
   - **PayPal Integration:** Dynamically inject the PayPal SDK script based on `PAYPAL_CONFIG`. Set up `paypal.Buttons().render()` to a designated container div when the user clicks "Continue to Payment". Configure the `createOrder` and `onApprove` callbacks to match the existing React logic.
   - **Modals:** Implement simple show/hide logic for the PayPal Modal and the Thank You Modal.

3. **Update `src/pages/join.astro`:**
   - Update imports to use the new `JoinUsForm.astro` component instead of the `.tsx` version.
   - Remove the `client:load` hydration directive.

4. **Cleanup:**
   - Delete `src/components/JoinUsForm.tsx`.
   - Delete `src/components/PayPal.tsx`.
   - Delete `src/components/PayPalModal.tsx`.
   - Check if `react-country-region-selector` can be removed from `package.json`.

# Verification & Testing

- Start the dev server (`pnpm dev`) and verify the Join Us page visually matches the old version.
- Test form validation by clicking Submit with empty fields to ensure error borders and the snackbar appear correctly.
- Test the conditional logic: toggling the membership checkbox should properly show/hide the additional payment fields.
- Test the country dropdown to ensure address fields appear when a country is selected.
- Test clicking "Continue to Payment" to ensure the PayPal Modal opens and the PayPal buttons render.
- Run `pnpm exec astro check` and `pnpm build` to verify no errors were introduced.

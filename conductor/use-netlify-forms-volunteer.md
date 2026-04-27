# Objective

Modify `src/components/VolunteerForm.astro` to integrate directly with Netlify Forms, matching the payload logic of the previous React implementation and eliminating the need for a separate dummy HTML form in `src/pages/volunteer.astro`.

# Key Files & Context

- `src/components/VolunteerForm.astro`
- `src/pages/volunteer.astro`

# Implementation Steps

1. **Update Form Element in `VolunteerForm.astro`:**
   - Add Netlify-specific attributes directly to the `<form>` element: `name="volunteer" method="POST" data-netlify="true" netlify-honeypot="bot-field"`.
   - Add a hidden input to specify the form name explicitly for the fetch request: `<input type="hidden" name="form-name" value="volunteer" />`.
   - Add a honeypot field to deter spam bots:
     ```html
     <p class="hidden">
       <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
     </p>
     ```

2. **Update Input Names:**
   - Rename the `name` attributes of the inputs to match exactly what the backend expects (and what was manually mapped in the React component's `fetch` request).
   - `firstName` -> `fName`
   - `middleName` -> `mName`
   - `lastName` -> `lName`
   - `emailAddress` -> `email`
   - `phoneNumber` -> `phone`
   - `address` -> `address`
   - `country` -> `country`
   - `interests` -> remains `interests`
   - **Crucial Fix:** Change the checkbox value for `interests` to be the actual title instead of the ID so it matches the expected payload.
     ```html
     <input ... value="{committee.data.title}" name="interests" />
     ```

3. **Update Client-side JS Script:**
   - Update the required fields array in the validation logic to check the newly renamed fields (`fName`, `lName`, `email`, `country`, `address`).
   - Simplify the `fetch` POST body significantly:
     ```javascript
     const formData = new FormData(form)
     // ... validation logic ...
     await fetch('/', {
       method: 'POST',
       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
       body: new URLSearchParams(formData).toString()
     })
     ```
   - _Note:_ Because `URLSearchParams(formData)` automatically serializes multiple checkboxes with the same name into `interests=A&interests=B`, Netlify will correctly parse this as an array or comma-separated string, removing the need to manually join them in JavaScript.
   - Remove the custom `encode` function.

4. **Cleanup `volunteer.astro`:**
   - Remove the redundant dummy `<form name="volunteer" ... hidden>` block in `src/pages/volunteer.astro`, as Netlify will now detect the form directly from the Astro component.

# Verification & Testing

- Run `pnpm run build` to verify no errors exist.
- Verify in the browser that the form still functions correctly, validates empty inputs, and opens the thank you modal upon a successful mock submission.

# Decap CMS Best Practices Plan

## Objective
Align the existing Decap CMS implementation with the official best practices by standardizing configuration and fixing Netlify Identity authentication flows.

## Key Files & Context
- `public/admin/index.html`: Currently contains manual inline JS configuration.
- `public/admin/config.yml` (new): Will house the standardized YAML configuration.
- `src/layouts/PageLayout.astro`: Missing the Netlify Identity widget required for email invitations and recovery links.

## Implementation Steps

1. **Migrate Configuration to YAML:**
   - Create `public/admin/config.yml`.
   - Translate the existing JS object passed to `CMS.init()` into standard Decap CMS YAML format.
   - Retain all existing backend settings, media folders, and collection schemas exactly as they are.

2. **Simplify Admin Entry Point:**
   - Modify `public/admin/index.html` to remove the inline `<script>` block that calls `CMS.init()`.
   - Ensure the file only loads the Netlify Identity widget and the Decap CMS CDN scripts. The CMS will automatically look for `config.yml`.

3. **Fix Netlify Identity Redirects:**
   - Update `src/layouts/PageLayout.astro`.
   - Add `<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>` to the `<head>`.
   - Add the standard Decap CMS redirect script just before the closing `</body>` tag to handle login tokens when users click email invites or password resets:
     ```html
     <script>
       if (window.netlifyIdentity) {
         window.netlifyIdentity.on("init", user => {
           if (!user) {
             window.netlifyIdentity.on("login", () => {
               document.location.href = "/admin/";
             });
           }
         });
       }
     </script>
     ```

## Verification & Testing
- Start the local dev server (`pnpm dev`).
- Navigate to `/admin/` to ensure the CMS dashboard loads successfully and correctly parses the new `config.yml`.
- Inspect the source of the main site (`/`) to confirm the Netlify Identity widget and redirect script are present and error-free.
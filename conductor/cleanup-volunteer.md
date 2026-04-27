# Objective

Cleanup leftover React files related to `VolunteerForm.tsx` (which was already proactively converted to `VolunteerForm.astro` during a previous step).

# Key Files & Context

- `src/components/VolunteerOption.tsx` (to be removed)
- `src/hooks/useFormState.ts` (to be removed)
- `src/hooks/useFormValidation.ts` (to be removed)

# Implementation Steps

1. **Delete Leftover Files:**
   - Remove `src/components/VolunteerOption.tsx`, as its functionality was inlined natively into `VolunteerForm.astro`.
   - Remove `src/hooks/useFormState.ts` and `src/hooks/useFormValidation.ts` since both the `VolunteerForm` and `JoinUsForm` have been converted to use native vanilla JS validation and state management instead of React hooks.

2. **Verification & Testing:**
   - Run `pnpm exec astro check` and `pnpm build` to verify no lingering imports exist for these files.

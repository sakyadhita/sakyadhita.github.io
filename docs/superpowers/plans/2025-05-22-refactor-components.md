# Refactor Components Directory Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Flatten the `src/components/` directory, merge one-off home page components into `index.astro`, and update all imports while preserving the look and feel.

**Architecture:**

1. Inline `HomeBody.astro` and `HomeSlideshow.astro` (and `Introduction.astro`) into `src/pages/index.astro`.
2. Move all other components from subdirectories to the root of `src/components/`, renaming them according to the provided mapping.
3. Update all import paths in `src/pages/`, `src/layouts/`, and `src/components/`.
4. Update relative asset paths in moved components.
5. Remove empty directories.

**Tech Stack:** Astro, React, Tailwind CSS v4.

---

### Task 1: Research and Mapping

- [ ] **Step 1: Verify all component usage**
      Use `grep` to find all usages of the components being moved to ensure no imports are missed.
- [ ] **Step 2: Check for asset relative paths**
      Identify components that use relative paths like `../../assets/` which will need adjustment when moved to the root of `src/components/`.

### Task 2: Inline Home Components into index.astro

- [ ] **Step 1: Inline `HomeSlideshow.astro` and `HomeBody.astro` into `src/pages/index.astro`**
      Merge the logic, imports, and JSX from these components into `index.astro`.
- [ ] **Step 2: Inline `Introduction.astro` as well**
      Since it's highly specific and small, inline it into the intro section of `index.astro`.
- [ ] **Step 3: Update `index.astro` imports**
      Ensure all components used in the inlined content (like `BeInvolved`, `HomeGallery`, `InteractiveMap`, etc.) are imported correctly in `index.astro`.

### Task 3: Flatten and Rename Components

- [ ] **Step 1: Move and rename Conference components**
- [ ] **Step 2: Move and rename EPubs components**
- [ ] **Step 3: Move and rename Home components** (excluding inlined ones)
- [ ] **Step 4: Move and rename Layouts components**
- [ ] **Step 5: Move and rename Main components**
- [ ] **Step 6: Move and rename Newsletters components**
- [ ] **Step 7: Move and rename ResourcesLanding components**

### Task 4: Update All Imports

- [ ] **Step 1: Update imports in `src/pages/`**
- [ ] **Step 2: Update imports in `src/layouts/`**
- [ ] **Step 3: Update imports in `src/components/`**
- [ ] **Step 4: Fix relative asset paths in moved components**
      (e.g., `../../assets/` -> `../assets/`)

### Task 5: Cleanup and Verification

- [ ] **Step 1: Delete empty subdirectories in `src/components/`**
- [ ] **Step 2: Run `pnpm build` to verify**
- [ ] **Step 3: (Optional but recommended) Run `pnpm astro check`**

---

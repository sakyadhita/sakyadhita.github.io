# Fix Modal Component Tests Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the failing Vitest tests for the `Modal` component by correctly handling React Portals and fixing invalid test assertions.

**Architecture:** The `Modal` component uses `@base-ui/react` Dialog, which renders its content through a Portal into `document.body`. Current tests fail because they look inside a local `container` which is empty. The fix involves using `screen` from `@testing-library/react` to query the global document.

**Tech Stack:** Vitest, React Testing Library, @base-ui/react.

---

### Task 1: Fix Basic Rendering and Visibility Tests

**Files:**
- Modify: `src/components/Modal.test.tsx`

- [ ] **Step 1: Update imports to include `screen`**

```typescript
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import Modal from './Modal'
```

- [ ] **Step 2: Update "renders modal when open is true" test**

```typescript
  it('renders modal when open is true', () => {
    render(<Modal {...defaultProps} />)
    expect(screen.getByText('Test modal text')).toBeDefined()
  })
```

- [ ] **Step 3: Update "does not render when open is false" test**

```typescript
  it('does not render when open is false', () => {
    render(<Modal {...defaultProps} open={false} />)
    expect(screen.queryByText('Test modal text')).toBeNull()
  })
```

- [ ] **Step 4: Run tests to verify progress**

Run: `pnpm test src/components/Modal.test.tsx`
Expected: These two tests PASS, others may still FAIL.

- [ ] **Step 5: Commit**

```bash
git add src/components/Modal.test.tsx
git commit -m "test: fix basic rendering tests for Modal using screen"
```

---

### Task 2: Fix Button and Callback Tests

**Files:**
- Modify: `src/components/Modal.test.tsx`

- [ ] **Step 1: Fix "renders negative button when negativeButtonText is provided" test**

```typescript
  it('renders negative button when negativeButtonText is provided', () => {
    render(<Modal {...defaultProps} negativeButtonText="Cancel" />)
    const button = screen.getByRole('button', { name: /cancel/i })
    expect(button).toBeDefined()
  })
```

- [ ] **Step 2: Fix "calls hide when negative button is clicked" test**

```typescript
  it('calls hide when negative button is clicked', () => {
    const hideCallback = vi.fn()
    render(
      <Modal {...defaultProps} hide={hideCallback} negativeButtonText="Cancel" />
    )
    const button = screen.getByRole('button', { name: /cancel/i })
    button.click()
    expect(hideCallback).toHaveBeenCalledWith(false)
  })
```

- [ ] **Step 3: Fix "renders both buttons when both are provided" test**

```typescript
  it('renders both buttons when both are provided', () => {
    render(
      <Modal {...defaultProps} negativeButtonText="Cancel" positiveButtonText="Confirm" />
    )
    expect(screen.getByRole('button', { name: /cancel/i })).toBeDefined()
    expect(screen.getByRole('button', { name: /confirm/i })).toBeDefined()
  })
```

- [ ] **Step 4: Run tests to verify progress**

Run: `pnpm test src/components/Modal.test.tsx`
Expected: These tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/Modal.test.tsx
git commit -m "test: fix button and callback tests for Modal"
```

---

### Task 3: Fix Styling and Final Polish

**Files:**
- Modify: `src/components/Modal.test.tsx`

- [ ] **Step 1: Fix "has modal styling" test**

```typescript
  it('has modal styling', () => {
    render(<Modal {...defaultProps} />)
    const description = screen.getByText('Test modal text')
    // Check for some key classes from Modal.tsx
    expect(description.className).toContain('font-body')
    expect(description.className).toContain('text-2xl')
  })
```

- [ ] **Step 2: Run all tests in the file**

Run: `pnpm test src/components/Modal.test.tsx`
Expected: ALL tests PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/Modal.test.tsx
git commit -m "test: final fixes for Modal component tests"
```

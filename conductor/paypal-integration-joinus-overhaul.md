# Plan: PayPal Integration Overhaul for JoinUsForm.astro

## Objective

Update `src/components/JoinUsForm.astro` to fully comply with the PayPal JS SDK best practices, ensuring it matches the robustness implemented in `PayPal.astro`. The main focus is adding standard lifecycle error handling.

## Key Files & Context

- `src/components/JoinUsForm.astro`: Contains a custom form flow that eventually loads the PayPal SDK in a modal.

## Implementation Steps

### 1. Robust Error Handling (`INSTRUMENT_DECLINED`)

Update the `onApprove` capture logic. If the SDK's `actions.order.capture()` or subsequent logic fails due to funding issues (specifically `INSTRUMENT_DECLINED`), use `actions.restart()` to return the user to the PayPal popup so they can select an alternative payment method. This prevents the user from being stuck or shown a generic error when their card is declined.

### 2. Add `onCancel` Callback

Add an `onCancel` callback to explicitly handle the scenario where a user closes the PayPal popup, ensuring the UI (like cursors) resets appropriately.

## Verification & Testing

- Review the `JoinUsForm.astro` script block to confirm the `onApprove` block includes the `INSTRUMENT_DECLINED` check and the `onCancel` block is present.

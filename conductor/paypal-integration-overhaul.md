# Plan: Comprehensive Overhaul of PayPal Integration

## Objective

Overhaul `src/components/PayPal.astro` to ensure it fully complies with the PayPal JS SDK best practices. The goal is to properly handle dynamic order creation, validate user input (preventing $0 transactions), and implement robust error handling (like restarting the flow on `INSTRUMENT_DECLINED`).

## Key Files & Context

- `src/components/PayPal.astro`: The core component rendering the PayPal integration.

## Implementation Steps

### 1. Add Dynamic Donation Input UI

If the `PayPal` component is rendered for a general donation (where `membershipCost` is 0 and no static `donationAmount` is provided), inject a custom number input field into the component. This allows users on the Donate page to specify their contribution amount directly.

### 2. Dynamic Order Generation (`createOrder`)

Move the generation of the `paypalOrderObject` (and the calculation of `itemTotal` and `taxTotal`) _inside_ the `createOrder` callback. This guarantees that when the user clicks the button, the SDK retrieves the most up-to-date value from the input field rather than the static value from page load.

### 3. Lifecycle Validation (`onInit` and `onClick`)

Implement the `onInit` and `onClick` callbacks provided by the SDK to implement client-side validation:

- Use `actions.disable()` in `onInit` to keep the PayPal button disabled if the calculated total is $0.00.
- Add an event listener to the donation input field to call `actions.enable()` when a valid amount (> $0.00) is entered, and `actions.disable()` if it is cleared or set to 0.

### 4. Robust Error Handling (`INSTRUMENT_DECLINED`)

Update the `onApprove` capture logic. If the backend capture step (or the SDK's `actions.order.capture()`) fails due to funding issues (specifically `INSTRUMENT_DECLINED`), use `actions.restart()` to return the user to the PayPal popup so they can select an alternative payment method, aligning with PayPal's strict recommendation for handling funding failures gracefully.

## Verification & Testing

1. Navigate to the `/donate` page locally.
2. Verify that a donation input field is visible and the PayPal button is disabled when the value is $0.
3. Enter a valid amount (e.g., $10) and verify the PayPal button becomes enabled.
4. Click the PayPal button to ensure the popup opens and the order total reflects the entered amount accurately.
5. (Optional Sandbox Testing) Test with a declined sandbox card to verify that the `INSTRUMENT_DECLINED` logic restarts the flow properly instead of throwing an unhandled alert.

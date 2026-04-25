import { useEffect } from 'react'

import { PAYPAL_CONFIG } from '../SiteMetadata'

declare global {
  interface Window {
    paypal?: any
  }
}

/**
 * Hook to dynamically load PayPal SDK script only when needed.
 * Loads the PayPal script with client ID and caches it for subsequent calls.
 *
 * @returns Promise that resolves when PayPal SDK is loaded
 */
export function usePayPalSDK() {
  useEffect(() => {
    // Check if PayPal is already loaded
    if (globalThis.paypal) {
      return
    }

    const script = document.createElement('script')
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CONFIG.CLIENT_ID}&currency=${PAYPAL_CONFIG.CURRENCY}`
    script.async = true
    script.addEventListener('load', () => {
      // PayPal SDK is now available
      globalThis.paypal?.Buttons?.()
    })
    script.addEventListener('error', () => {
      console.error('Failed to load PayPal SDK')
    })

    document.body.append(script)

    // Cleanup: don't remove script on unmount to avoid reloading
    // PayPal SDK persists across component mounts/unmounts
    return () => {
      // Optional: could remove if needed, but PayPal SDK should persist
    }
  }, [])
}

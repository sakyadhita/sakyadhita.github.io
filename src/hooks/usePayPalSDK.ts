import { useEffect } from 'react'

declare global {
  interface Window {
    paypal?: {
      Buttons?: () => void
    }
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
    if (window.paypal) {
      return
    }

    // Create and append script tag
    const script = document.createElement('script')
    script.src = `https://www.paypal.com/sdk/js?client-id=AT0I6Qa0JYVBvlExcrLDBJAY3oqylXV_pIIn471l6C289hFh7E19i46YhR5G3Nq9mYyZ8v4u3m_m&currency=USD`
    script.async = true
    script.onload = () => {
      // PayPal SDK is now available
      window.paypal?.Buttons?.()
    }
    script.onerror = () => {
      console.error('Failed to load PayPal SDK')
    }

    document.body.appendChild(script)

    // Cleanup: don't remove script on unmount to avoid reloading
    // PayPal SDK persists across component mounts/unmounts
    return () => {
      // Optional: could remove if needed, but PayPal SDK should persist
    }
  }, [])
}

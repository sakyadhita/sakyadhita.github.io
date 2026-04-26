/**
 * Returns the resolved URL for any asset (document).
 * Uses Vite's asset bundling to serve links for assets in src/assets.
 */

// Import all assets from src/assets to ensure they are processed by Vite
const allAssets = import.meta.glob('/src/assets/**/*', {
  eager: true,
  query: '?url',
  import: 'default'
})

export function getAssetUrl(assetPath: string | null | undefined): string | null {
  if (!assetPath) return null

  // If it's already a full URL or mailto link
  if (
    assetPath.startsWith('http') ||
    assetPath.startsWith('mailto:') ||
    assetPath.startsWith('data:')
  ) {
    return assetPath
  }

  // Normalize path for Vite glob lookup
  // We want to match /src/assets/...
  const decodedPath = decodeURIComponent(assetPath)
  let normalizedPath = decodedPath

  // If it contains "assets/", we take everything from there and prefix with /src/
  if (normalizedPath.includes('assets/')) {
    const parts = normalizedPath.split('assets/')
    normalizedPath = `/src/assets/${parts.at(-1)}`
  } else if (!normalizedPath.startsWith('/src/assets/')) {
    normalizedPath = `/src/assets/${normalizedPath.startsWith('/') ? normalizedPath.slice(1) : normalizedPath}`
  }

  // Return the bundled URL from the glob map
  let resolved = (allAssets[normalizedPath] as string) || null

  // In development, if it points to /src/assets, we rewrite it to /assets
  // This ensures it bypasses Astro's page router (which intercepts /src/ for text/html)
  // and instead hits our middleware or Vite alias.
  if (import.meta.env.DEV && resolved && resolved.startsWith('/src/assets/')) {
    resolved = resolved.replace('/src/assets/', '/assets/')
  }

  return resolved
}

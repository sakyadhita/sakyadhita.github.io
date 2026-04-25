/**
 * Returns the resolved URL for any asset (image or document).
 * Documents (PDF, DOC, etc.) are served from public/assets for stability.
 * Images are resolved from src/assets for Astro optimization.
 */
export function getAssetUrl(publicPath: string | null | undefined) {
  if (!publicPath) return null
  if (publicPath.startsWith('http') || publicPath.startsWith('mailto:')) return publicPath

  const decodedPath = decodeURIComponent(publicPath)
  const cleanPath = decodedPath.startsWith('/') ? decodedPath : `/${decodedPath}`

  // For non-images, we assume they are in public/assets
  // Return the encoded public path for browser compatibility
  return encodeURI(cleanPath).replaceAll('%25', '%') // Fix double encoding if any
}

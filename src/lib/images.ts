import { getImage } from 'astro:assets'

const images = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/**/*.{jpeg,jpg,png,webp,svg,JPG,JPEG,PNG,WEBP,SVG}',
  {
    eager: true
  }
)

const docs = import.meta.glob<string>(
  '/src/assets/**/*.{pdf,doc,docx,zip,txt,PDF,DOC,DOCX,ZIP,TXT}',
  {
    query: '?url',
    import: 'default',
    eager: true
  }
)

/**
 * Returns the resolved URL for any asset (image or document) in src/assets.
 * Useful for resolving links in frontmatter that point to /assets/...
 */
export function getAssetUrl(publicPath: string) {
  if (!publicPath) return null
  if (publicPath.startsWith('http') || publicPath.startsWith('mailto:')) return publicPath

  const decodedPath = decodeURIComponent(publicPath)
  const pathsToTest = [
    publicPath.startsWith('/') ? publicPath : `/${publicPath}`,
    decodedPath.startsWith('/') ? decodedPath : `/${decodedPath}`
  ]

  for (const path of pathsToTest) {
    const cleanPath = path.replace(/\/$/, '')
    const srcPath = cleanPath.startsWith('/assets') ? `/src${cleanPath}` : `/src/assets${cleanPath}`
    const noSlash = srcPath.startsWith('/') ? srcPath.slice(1) : srcPath

    const resolve = (map: Record<string, any>) => map[srcPath] || map[noSlash]

    const img = resolve(images)
    if (img) return img.default.src

    const doc = resolve(docs)
    if (doc) return doc
  }

  // Fallback: filename alone
  const fileName = decodedPath.split('/').pop()
  if (fileName) {
    const findByFileName = (map: Record<string, any>) => {
      const foundKey = Object.keys(map).find((key) => key.endsWith(`/${fileName}`))
      return foundKey ? map[foundKey] : null
    }

    const fallbackImg = findByFileName(images)
    if (fallbackImg) return fallbackImg.default.src

    const fallbackDoc = findByFileName(docs)
    if (fallbackDoc) return fallbackDoc
  }

  return publicPath
}

export async function getOptimizedImage(
  publicPath: string,
  width?: number,
  format: 'webp' | 'avif' | 'png' | 'jpg' = 'webp'
) {
  if (!publicPath) return null

  // Handle URL encoded paths (like %20 for spaces)
  const decodedPath = decodeURIComponent(publicPath)

  // Ensure leading slash and remove any trailing slash
  let cleanPath = decodedPath.startsWith('/') ? decodedPath : `/${decodedPath}`
  cleanPath = cleanPath.replace(/\/$/, '')

  // Try mapping to /src/assets
  // 1. If it already starts with /assets, it becomes /src/assets/...
  // 2. If it's a root path like /Lotus_Header.jpg, it becomes /src/assets/Lotus_Header.jpg
  const srcPath = cleanPath.startsWith('/assets') ? `/src${cleanPath}` : `/src/assets${cleanPath}`

  const image = images[srcPath]

  if (!image) {
    // Try finding by filename alone as a last resort
    const fileName = cleanPath.split('/').pop()
    const foundKey = Object.keys(images).find((key) => key.endsWith(`/${fileName}`))
    if (foundKey) {
      const optimized = await getImage({
        src: images[foundKey].default,
        width,
        format
      })
      return optimized
    }

    // console.warn(`[getOptimizedImage] Could not find image at ${srcPath} (original: ${publicPath})`)
    return { src: publicPath } // Fallback to original path
  }

  const optimized = await getImage({
    src: image.default,
    width,
    format
  })

  return optimized
}

export function getRawImage(publicPath: string) {
  if (!publicPath) return null

  const decodedPath = decodeURIComponent(publicPath)
  let cleanPath = decodedPath.startsWith('/') ? decodedPath : `/${decodedPath}`
  cleanPath = cleanPath.replace(/\/$/, '')

  const srcPath = cleanPath.startsWith('/assets') ? `/src${cleanPath}` : `/src/assets${cleanPath}`

  if (images[srcPath]) return images[srcPath].default

  // Fallback: filename alone
  const fileName = cleanPath.split('/').pop()
  const foundKey = Object.keys(images).find((key) => key.endsWith(`/${fileName}`))
  if (foundKey) return images[foundKey].default

  return null
}

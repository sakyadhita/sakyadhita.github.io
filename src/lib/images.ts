import { getImage } from 'astro:assets'

const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/**/*.{jpeg,jpg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true
})

export async function getOptimizedImage(publicPath: string, width?: number, format: 'webp' | 'avif' | 'png' | 'jpg' = 'webp') {
  if (!publicPath) return null

  // Handle URL encoded paths (like %20 for spaces)
  const decodedPath = decodeURIComponent(publicPath)

  // Ensure leading slash and remove any trailing slash
  let cleanPath = decodedPath.startsWith('/') ? decodedPath : `/${decodedPath}`
  cleanPath = cleanPath.replace(/\/$/, '')

  // Try mapping to /src/assets
  // 1. If it already starts with /assets, it becomes /src/assets/...
  // 2. If it's a root path like /Lotus_Header.jpg, it becomes /src/assets/Lotus_Header.jpg
  let srcPath = cleanPath.startsWith('/assets') 
    ? `/src${cleanPath}` 
    : `/src/assets${cleanPath}`

  let image = images[srcPath]

  if (!image) {
    // Try finding by filename alone as a last resort
    const fileName = cleanPath.split('/').pop()
    const foundKey = Object.keys(images).find(key => key.endsWith(`/${fileName}`))
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
  
  let srcPath = cleanPath.startsWith('/assets') 
    ? `/src${cleanPath}` 
    : `/src/assets${cleanPath}`
  
  if (images[srcPath]) return images[srcPath].default

  // Fallback: filename alone
  const fileName = cleanPath.split('/').pop()
  const foundKey = Object.keys(images).find(key => key.endsWith(`/${fileName}`))
  if (foundKey) return images[foundKey].default

  return null
}

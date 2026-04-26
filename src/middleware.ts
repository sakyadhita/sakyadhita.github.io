import fs from 'node:fs'
import path from 'node:path'

import { defineMiddleware } from 'astro:middleware'

export const onRequest = defineMiddleware(async (context, next) => {
  // Only run in development
  if (!import.meta.env.DEV) return next()

  const { pathname } = context.url
  const decodedPathname = decodeURIComponent(pathname)

  // Check if it's an asset request (either /src/assets or our /assets alias)
  if (decodedPathname.startsWith('/src/assets/') || decodedPathname.startsWith('/assets/')) {
    const ext = path.extname(decodedPathname).toLowerCase()
    if (!ext) return next()

    // Normalize path to the actual file location in src/assets
    let relativePath = decodedPathname
    if (decodedPathname.startsWith('/assets/')) {
      relativePath = decodedPathname.replace('/assets/', '/src/assets/')
    }

    // Ensure we are looking in the project root
    const absolutePath = path.join(process.cwd(), relativePath)

    if (fs.existsSync(absolutePath) && !fs.lstatSync(absolutePath).isDirectory()) {
      const fileContent = fs.readFileSync(absolutePath)
      return new Response(fileContent, {
        headers: {
          'Content-Type': getMimeType(ext),
          'Cache-Control': 'no-cache',
          'X-Content-Type-Options': 'nosniff'
        }
      })
    }
  }

  return next()
})

function getMimeType(ext: string) {
  const mimes: Record<string, string> = {
    '.pdf': 'application/pdf',
    '.zip': 'application/zip',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  }
  return mimes[ext] || 'application/octet-stream'
}

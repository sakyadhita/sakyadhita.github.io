import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// We MUST stub import.meta BEFORE any modules using it are loaded
vi.stubGlobal('import.meta', {
  glob: (pattern: string) => {
    if (pattern === '/src/assets/**/*') {
      return {
        '/src/assets/test-asset.pdf': '/src/assets/test-asset.pdf?url',
        '/src/assets/logo.svg': '/src/assets/logo.svg?url',
        '/src/assets/inner/path.jpg': '/src/assets/inner/path.jpg?url'
      }
    }
    return {}
  },
  env: {
    DEV: false,
    PROD: true,
    BASE_URL: '/',
    MODE: 'production'
  }
})

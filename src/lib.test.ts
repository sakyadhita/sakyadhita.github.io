import { describe, it, expect } from 'vitest'

// We need to mock import.meta before importing lib.ts
// But since setup-unit.ts already does some mocking, let's see.

import { getAssetUrl, ordinal_suffix_of, determineLocationLabel, allAssets } from './lib'

// Directly inject mock data into the exported allAssets object
Object.assign(allAssets, {
  '/src/assets/test-asset.pdf': '/src/assets/test-asset.pdf?url',
  '/src/assets/logo.svg': '/src/assets/logo.svg?url'
})

describe('lib utilities', () => {
  describe('getAssetUrl', () => {
    it('should return null for null or undefined input', () => {
      expect(getAssetUrl(null)).toBeNull()
      expect(getAssetUrl()).toBeNull()
    })

    it('should return absolute URLs as-is', () => {
      expect(getAssetUrl('https://google.com')).toBe('https://google.com')
      expect(getAssetUrl('http://example.com')).toBe('http://example.com')
    })

    it('should return mailto links as-is', () => {
      expect(getAssetUrl('mailto:test@example.com')).toBe('mailto:test@example.com')
    })

    it('should return data URIs as-is', () => {
      expect(getAssetUrl('data:image/png;base64,123')).toBe('data:image/png;base64,123')
    })

    it('should handle paths with "assets/" correctly', () => {
      // In our setup-unit.ts mock:
      // '/src/assets/test-asset.pdf': '/src/assets/test-asset.pdf?url'
      // Since DEV is true in setup, it rewrites to /assets/

      expect(getAssetUrl('/src/assets/test-asset.pdf')).toBe('/assets/test-asset.pdf?url')
      expect(getAssetUrl('assets/test-asset.pdf')).toBe('/assets/test-asset.pdf?url')
    })
  })

  describe('ordinal_suffix_of', () => {
    it('should return 1st for 1', () => {
      expect(ordinal_suffix_of(1)).toBe('1st')
    })
    it('should return 2nd for 2', () => {
      expect(ordinal_suffix_of(2)).toBe('2nd')
    })
    it('should return 3rd for 3', () => {
      expect(ordinal_suffix_of(3)).toBe('3rd')
    })
    it('should return 4th for 4', () => {
      expect(ordinal_suffix_of(4)).toBe('4th')
    })
    it('should return 11th for 11', () => {
      expect(ordinal_suffix_of(11)).toBe('11th')
    })
    it('should return 12th for 12', () => {
      expect(ordinal_suffix_of(12)).toBe('12th')
    })
    it('should return 13th for 13', () => {
      expect(ordinal_suffix_of(13)).toBe('13th')
    })
    it('should return 21st for 21', () => {
      expect(ordinal_suffix_of(21)).toBe('21st')
    })
    it('should return 22nd for 22', () => {
      expect(ordinal_suffix_of(22)).toBe('22nd')
    })
    it('should return 23rd for 23', () => {
      expect(ordinal_suffix_of(23)).toBe('23rd')
    })
  })

  describe('determineLocationLabel', () => {
    it('should return city and country for city, state, country', () => {
      expect(determineLocationLabel('Seoul, South Korea, Korea')).toBe('South Korea, Korea')
    })
    it('should return original string if less than 3 parts', () => {
      expect(determineLocationLabel('Seoul, South Korea')).toBe('Seoul, South Korea')
    })
    it('should handle single city', () => {
      expect(determineLocationLabel('Seoul')).toBe('Seoul')
    })
  })
})

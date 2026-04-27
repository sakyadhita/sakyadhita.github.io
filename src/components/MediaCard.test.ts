import { describe, it, expect } from 'vitest'

import { ordinal_suffix_of, determineLocationLabel } from '../lib'

describe('MediaCard Logic (Unit)', () => {
  it('should correctly format suffixes for display', () => {
    expect(ordinal_suffix_of(1)).toBe('1st')
    expect(ordinal_suffix_of(10)).toBe('10th')
  })

  it('should correctly format location labels', () => {
    expect(determineLocationLabel('City, State, Country')).toBe('State, Country')
  })
})

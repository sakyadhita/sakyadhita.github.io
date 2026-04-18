import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { Button } from './button'

describe('Button Component', () => {
  it('renders button element', () => {
    const { container } = render(<Button>Click me</Button>)
    const button = container.querySelector('button')
    expect(button).toBeDefined()
    expect(button?.textContent).toBe('Click me')
  })

  it('applies default styling', () => {
    const { container } = render(<Button variant="default">Primary</Button>)
    const button = container.querySelector('button')
    expect(button?.className).toContain('bg-brand-dark-purple')
  })

  it('applies secondary variant styling', () => {
    const { container } = render(<Button variant="secondary">Secondary</Button>)
    const button = container.querySelector('button')
    expect(button?.className).toContain('bg-brand-orange')
  })

  it('applies destructive variant styling', () => {
    const { container } = render(<Button variant="destructive">Delete</Button>)
    const button = container.querySelector('button')
    expect(button?.className).toContain('bg-brand-red')
  })

  it('renders disabled button', () => {
    const { container } = render(<Button disabled>Disabled</Button>)
    const button = container.querySelector('button') as HTMLButtonElement
    expect(button?.disabled).toBe(true)
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    const { container } = render(<Button onClick={handleClick}>Click me</Button>)
    const button = container.querySelector('button') as HTMLButtonElement
    button?.click()
    expect(handleClick).toHaveBeenCalled()
  })
})

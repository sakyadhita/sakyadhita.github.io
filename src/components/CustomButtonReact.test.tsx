import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import CustomButton from './CustomButtonReact'

describe('CustomButton Component', () => {
  it('renders button element', () => {
    const { container } = render(<CustomButton text="Click me" />)
    const button = container.querySelector('button')
    expect(button).toBeDefined()
    expect(button?.textContent).toBe('Click me')
  })

  it('renders link when redirect_link is provided', () => {
    const { container } = render(<CustomButton text="Go to page" redirect_link="/about" />)
    const link = container.querySelector('a')
    expect(link).toBeDefined()
    expect(link?.getAttribute('href')).toBe('/about')
  })

  it('opens link in new tab when openInSameTab is false', () => {
    const { container } = render(
      <CustomButton
        text="External link"
        redirect_link="https://example.com"
        openInSameTab={false}
      />
    )
    const link = container.querySelector('a')
    expect(link?.getAttribute('target')).toBe('_blank')
    expect(link?.getAttribute('rel')).toBe('noreferrer')
  })

  it('has correct button styling classes', () => {
    const { container } = render(<CustomButton text="Styled button" />)
    const button = container.querySelector('button')
    expect(button?.className).toContain('bg-brand-orange')
    expect(button?.className).toContain('rounded-full')
    expect(button?.className).toContain('text-white')
  })

  it('applies custom className', () => {
    const { container } = render(<CustomButton text="Custom class" className="custom-class" />)
    const button = container.querySelector('button')
    expect(button?.className).toContain('custom-class')
  })

  it('calls onClick callback when button is clicked', () => {
    const handleClick = vi.fn()
    const { container } = render(<CustomButton text="Click me" onClickCallback={handleClick} />)
    const button = container.querySelector('button') as HTMLButtonElement
    button?.click()
    expect(handleClick).toHaveBeenCalled()
  })
})

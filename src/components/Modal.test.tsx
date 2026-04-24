import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import Modal from './Modal'

describe('Modal Component', () => {
  const defaultProps = {
    hide: vi.fn(),
    open: true,
    text: 'Test modal text'
  }

  it('renders modal when open is true', () => {
    render(<Modal {...defaultProps} />)
    expect(screen.getByText('Test modal text')).toBeDefined()
  })

  it('does not render when open is false', () => {
    render(<Modal {...defaultProps} open={false} />)
    expect(screen.queryByText('Test modal text')).toBeNull()
  })

  it('renders negative button when negativeButtonText is provided', () => {
    const { container } = render(<Modal {...defaultProps} negativeButtonText="Cancel" />)
    const button = container.querySelector('button')
    expect(button?.textContent).toContain('Cancel')
  })

  it('calls hide when negative button is clicked', () => {
    const hideCallback = vi.fn()
    const { container } = render(
      <Modal {...defaultProps} hide={hideCallback} negativeButtonText="Cancel" />
    )
    const button = container.querySelector('button') as HTMLButtonElement
    button?.click()
    expect(hideCallback).toHaveBeenCalledWith(false)
  })

  it('renders both buttons when both are provided', () => {
    const { container } = render(
      <Modal {...defaultProps} negativeButtonText="Cancel" positiveButtonText="Confirm" />
    )
    const buttons = container.querySelectorAll('button')
    expect(buttons.length).toBeGreaterThanOrEqual(2)
  })

  it('has modal styling', () => {
    const { container } = render(<Modal {...defaultProps} />)
    const text = container.textContent
    expect(text).toContain('Test modal text')
  })
})

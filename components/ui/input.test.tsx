import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { Input } from './input'

describe('Input', () => {
  describe('Rendering', () => {
    it('should render an input element', () => {
      render(<Input data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toBeInTheDocument()
      expect(input.tagName).toBe('INPUT')
    })

    it('should have correct displayName', () => {
      expect(Input.displayName).toBe('Input')
    })

    it('should apply default classes', () => {
      render(<Input data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('flex', 'h-10', 'w-full', 'rounded-md', 'border')
    })
  })

  describe('Props handling', () => {
    it('should apply custom className alongside default classes', () => {
      render(<Input data-testid="input" className="custom-class" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('custom-class')
      expect(input).toHaveClass('flex', 'h-10') // default classes still present
    })

    it('should pass type prop correctly', () => {
      render(<Input data-testid="input" type="password" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('type', 'password')
    })

    it('should pass through HTML input attributes', () => {
      render(
        <Input
          data-testid="input"
          placeholder="Enter text"
          disabled
          maxLength={10}
          name="test-input"
          id="test-id"
        />
      )
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('placeholder', 'Enter text')
      expect(input).toBeDisabled()
      expect(input).toHaveAttribute('maxLength', '10')
      expect(input).toHaveAttribute('name', 'test-input')
      expect(input).toHaveAttribute('id', 'test-id')
    })

    it('should handle different input types', () => {
      const types = ['text', 'email', 'number', 'tel', 'url', 'search', 'date'] as const
      types.forEach((type) => {
        const { unmount } = render(<Input data-testid="input" type={type} />)
        const input = screen.getByTestId('input')
        expect(input).toHaveAttribute('type', type)
        unmount()
      })
    })
  })

  describe('Ref forwarding', () => {
    it('should forward ref to the input element', () => {
      const ref = createRef<HTMLInputElement>()
      render(<Input ref={ref} />)
      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })

    it('should allow focus via ref', () => {
      const ref = createRef<HTMLInputElement>()
      render(<Input ref={ref} data-testid="input" />)
      ref.current?.focus()
      expect(screen.getByTestId('input')).toHaveFocus()
    })
  })

  describe('Accessibility', () => {
    it('should support aria-label', () => {
      render(<Input data-testid="input" aria-label="Username" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('aria-label', 'Username')
    })

    it('should support aria-describedby', () => {
      render(<Input data-testid="input" aria-describedby="help-text" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('aria-describedby', 'help-text')
    })

    it('should apply disabled styles when disabled', () => {
      render(<Input data-testid="input" disabled />)
      const input = screen.getByTestId('input')
      expect(input).toBeDisabled()
      expect(input).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50')
    })
  })

  describe('User interaction', () => {
    it('should handle onChange events', async () => {
      const handleChange = vi.fn()
      const user = userEvent.setup()
      render(<Input data-testid="input" onChange={handleChange} />)
      const input = screen.getByTestId('input')
      await user.type(input, 'hello')
      expect(handleChange).toHaveBeenCalledTimes(5)
    })

    it('should update value on typing', async () => {
      const user = userEvent.setup()
      render(<Input data-testid="input" />)
      const input = screen.getByTestId('input')
      await user.type(input, 'test value')
      expect(input).toHaveValue('test value')
    })
  })
})

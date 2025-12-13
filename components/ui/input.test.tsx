import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
      expect(input).toHaveClass('flex')
      expect(input).toHaveClass('h-10')
      expect(input).toHaveClass('w-full')
      expect(input).toHaveClass('rounded-md')
      expect(input).toHaveClass('border')
    })
  })

  describe('Props forwarding', () => {
    it('should accept and apply type prop', () => {
      render(<Input type="password" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('type', 'password')
    })

    it('should accept and apply placeholder prop', () => {
      render(<Input placeholder="Enter text" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('placeholder', 'Enter text')
    })

    it('should merge custom className with default classes', () => {
      render(<Input className="custom-class" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('custom-class')
      expect(input).toHaveClass('flex')
    })

    it('should forward all HTML input attributes', () => {
      render(
        <Input
          data-testid="input"
          name="test-input"
          id="test-id"
          maxLength={10}
          minLength={2}
          required
          readOnly
        />
      )
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('name', 'test-input')
      expect(input).toHaveAttribute('id', 'test-id')
      expect(input).toHaveAttribute('maxLength', '10')
      expect(input).toHaveAttribute('minLength', '2')
      expect(input).toHaveAttribute('required')
      expect(input).toHaveAttribute('readOnly')
    })
  })

  describe('Ref handling', () => {
    it('should forward ref to input element', () => {
      const ref = React.createRef<HTMLInputElement>()
      render(<Input ref={ref} />)
      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })

    it('should allow focusing via ref', () => {
      const ref = React.createRef<HTMLInputElement>()
      render(<Input ref={ref} data-testid="input" />)
      ref.current?.focus()
      expect(screen.getByTestId('input')).toHaveFocus()
    })
  })

  describe('Accessibility and states', () => {
    it('should support disabled state', () => {
      render(<Input disabled data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toBeDisabled()
    })

    it('should accept aria attributes', () => {
      render(
        <Input
          data-testid="input"
          aria-label="Test input"
          aria-describedby="help-text"
          aria-invalid="true"
        />
      )
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('aria-label', 'Test input')
      expect(input).toHaveAttribute('aria-describedby', 'help-text')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })

    it('should handle user input', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<Input data-testid="input" onChange={onChange} />)
      const input = screen.getByTestId('input')
      await user.type(input, 'hello')
      expect(onChange).toHaveBeenCalledTimes(5)
      expect(input).toHaveValue('hello')
    })
  })
})

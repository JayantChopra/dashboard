import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { Input } from './input'

describe('Input', () => {
  describe('rendering', () => {
    it('should render an input element', () => {
      render(<Input data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toBeInTheDocument()
      expect(input.tagName).toBe('INPUT')
    })

    it('should render with default type="text" when no type provided', () => {
      render(<Input data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).not.toHaveAttribute('type')
    })
  })

  describe('props forwarding', () => {
    it('should forward placeholder prop', () => {
      render(<Input placeholder="Enter text" />)
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
    })

    it('should forward value and onChange props', async () => {
      const handleChange = vi.fn()
      render(<Input value="test" onChange={handleChange} data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveValue('test')
      await userEvent.type(input, 'a')
      expect(handleChange).toHaveBeenCalled()
    })

    it('should forward aria attributes', () => {
      render(
        <Input
          aria-label="Test input"
          aria-describedby="description"
          data-testid="input"
        />
      )
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('aria-label', 'Test input')
      expect(input).toHaveAttribute('aria-describedby', 'description')
    })
  })

  describe('styling', () => {
    it('should apply default classes', () => {
      render(<Input data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('flex', 'h-10', 'w-full', 'rounded-md', 'border')
    })

    it('should merge custom className with default classes', () => {
      render(<Input className="custom-class mt-4" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('custom-class', 'mt-4')
      expect(input).toHaveClass('flex', 'h-10')
    })
  })

  describe('ref forwarding', () => {
    it('should forward ref to the input element', () => {
      const ref = createRef<HTMLInputElement>()
      render(<Input ref={ref} data-testid="input" />)
      expect(ref.current).toBeInstanceOf(HTMLInputElement)
      expect(ref.current).toBe(screen.getByTestId('input'))
    })
  })

  describe('input types', () => {
    it('should render with type="password"', () => {
      render(<Input type="password" data-testid="input" />)
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'password')
    })

    it('should render with type="email"', () => {
      render(<Input type="email" data-testid="input" />)
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'email')
    })
  })

  describe('disabled state', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Input disabled data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toBeDisabled()
      expect(input).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50')
    })
  })

  describe('displayName', () => {
    it('should have displayName set to "Input"', () => {
      expect(Input.displayName).toBe('Input')
    })
  })
})
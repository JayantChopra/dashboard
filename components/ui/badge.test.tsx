import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge, badgeVariants } from './badge'

describe('Badge', () => {
  describe('default rendering', () => {
    it('should render with default variant', () => {
      render(<Badge>Default Badge</Badge>)
      const badge = screen.getByText('Default Badge')
      expect(badge).toBeInTheDocument()
      expect(badge).toHaveClass('bg-primary')
      expect(badge).toHaveClass('text-primary-foreground')
    })

    it('should render as a div element', () => {
      render(<Badge data-testid="badge">Test</Badge>)
      const badge = screen.getByTestId('badge')
      expect(badge.tagName).toBe('DIV')
    })
  })

  describe('variant props', () => {
    it('should render with secondary variant', () => {
      render(<Badge variant="secondary">Secondary</Badge>)
      const badge = screen.getByText('Secondary')
      expect(badge).toHaveClass('bg-secondary')
      expect(badge).toHaveClass('text-secondary-foreground')
    })

    it('should render with destructive variant', () => {
      render(<Badge variant="destructive">Destructive</Badge>)
      const badge = screen.getByText('Destructive')
      expect(badge).toHaveClass('bg-destructive')
      expect(badge).toHaveClass('text-destructive-foreground')
    })

    it('should render with outline variant', () => {
      render(<Badge variant="outline">Outline</Badge>)
      const badge = screen.getByText('Outline')
      expect(badge).toHaveClass('text-foreground')
      expect(badge).not.toHaveClass('bg-primary')
    })

    it('should apply default variant when variant is undefined', () => {
      render(<Badge variant={undefined}>Undefined Variant</Badge>)
      const badge = screen.getByText('Undefined Variant')
      expect(badge).toHaveClass('bg-primary')
    })
  })

  describe('custom className', () => {
    it('should merge custom className with default classes', () => {
      render(<Badge className="custom-class">Custom</Badge>)
      const badge = screen.getByText('Custom')
      expect(badge).toHaveClass('custom-class')
      expect(badge).toHaveClass('inline-flex')
    })

    it('should allow overriding styles with className', () => {
      render(<Badge className="bg-blue-500">Override</Badge>)
      const badge = screen.getByText('Override')
      expect(badge).toHaveClass('bg-blue-500')
    })
  })

  describe('HTML attributes', () => {
    it('should pass through HTML attributes', () => {
      render(
        <Badge data-testid="test-badge" id="badge-id" role="status">
          With Attrs
        </Badge>
      )
      const badge = screen.getByTestId('test-badge')
      expect(badge).toHaveAttribute('id', 'badge-id')
      expect(badge).toHaveAttribute('role', 'status')
    })

    it('should handle onClick and other event handlers', () => {
      let clicked = false
      render(<Badge onClick={() => { clicked = true }}>Clickable</Badge>)
      const badge = screen.getByText('Clickable')
      badge.click()
      expect(clicked).toBe(true)
    })
  })

  describe('badgeVariants export', () => {
    it('should export badgeVariants function', () => {
      expect(typeof badgeVariants).toBe('function')
    })

    it('should generate correct class string for variants', () => {
      const defaultClasses = badgeVariants({ variant: 'default' })
      expect(defaultClasses).toContain('bg-primary')
      expect(defaultClasses).toContain('inline-flex')
      expect(defaultClasses).toContain('rounded-full')

      const destructiveClasses = badgeVariants({ variant: 'destructive' })
      expect(destructiveClasses).toContain('bg-destructive')
    })
  })
})
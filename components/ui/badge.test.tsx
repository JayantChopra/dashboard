import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge, badgeVariants } from './badge'

describe('Badge', () => {
  describe('rendering', () => {
    it('should render a badge with children', () => {
      render(<Badge>Test Badge</Badge>)
      expect(screen.getByText('Test Badge')).toBeInTheDocument()
    })

    it('should render as a div element', () => {
      render(<Badge data-testid="badge">Content</Badge>)
      const badge = screen.getByTestId('badge')
      expect(badge.tagName).toBe('DIV')
    })
  })

  describe('variants', () => {
    it('should apply default variant styles when no variant is specified', () => {
      render(<Badge data-testid="badge">Default</Badge>)
      const badge = screen.getByTestId('badge')
      expect(badge).toHaveClass('bg-primary')
      expect(badge).toHaveClass('text-primary-foreground')
    })

    it('should apply secondary variant styles', () => {
      render(<Badge data-testid="badge" variant="secondary">Secondary</Badge>)
      const badge = screen.getByTestId('badge')
      expect(badge).toHaveClass('bg-secondary')
      expect(badge).toHaveClass('text-secondary-foreground')
    })

    it('should apply destructive variant styles', () => {
      render(<Badge data-testid="badge" variant="destructive">Destructive</Badge>)
      const badge = screen.getByTestId('badge')
      expect(badge).toHaveClass('bg-destructive')
      expect(badge).toHaveClass('text-destructive-foreground')
    })

    it('should apply outline variant styles', () => {
      render(<Badge data-testid="badge" variant="outline">Outline</Badge>)
      const badge = screen.getByTestId('badge')
      expect(badge).toHaveClass('text-foreground')
      expect(badge).not.toHaveClass('bg-primary')
    })
  })

  describe('className merging', () => {
    it('should merge custom className with variant classes', () => {
      render(<Badge data-testid="badge" className="custom-class">Merged</Badge>)
      const badge = screen.getByTestId('badge')
      expect(badge).toHaveClass('custom-class')
      expect(badge).toHaveClass('inline-flex')
    })

    it('should allow className to override variant styles', () => {
      render(<Badge data-testid="badge" className="bg-blue-500">Override</Badge>)
      const badge = screen.getByTestId('badge')
      expect(badge).toHaveClass('bg-blue-500')
    })
  })

  describe('props spreading', () => {
    it('should spread additional HTML attributes', () => {
      render(<Badge data-testid="badge" id="my-badge" aria-label="status badge">Props</Badge>)
      const badge = screen.getByTestId('badge')
      expect(badge).toHaveAttribute('id', 'my-badge')
      expect(badge).toHaveAttribute('aria-label', 'status badge')
    })

    it('should handle onClick handler', () => {
      let clicked = false
      render(<Badge data-testid="badge" onClick={() => { clicked = true }}>Clickable</Badge>)
      const badge = screen.getByTestId('badge')
      badge.click()
      expect(clicked).toBe(true)
    })
  })

  describe('base styles', () => {
    it('should always include base styling classes', () => {
      render(<Badge data-testid="badge">Base</Badge>)
      const badge = screen.getByTestId('badge')
      expect(badge).toHaveClass('inline-flex')
      expect(badge).toHaveClass('items-center')
      expect(badge).toHaveClass('rounded-full')
      expect(badge).toHaveClass('border')
      expect(badge).toHaveClass('px-2.5')
      expect(badge).toHaveClass('py-0.5')
      expect(badge).toHaveClass('text-xs')
      expect(badge).toHaveClass('font-semibold')
    })
  })
})

describe('badgeVariants', () => {
  it('should return default variant classes when called without arguments', () => {
    const classes = badgeVariants()
    expect(classes).toContain('bg-primary')
    expect(classes).toContain('inline-flex')
  })

  it('should return correct classes for each variant', () => {
    expect(badgeVariants({ variant: 'default' })).toContain('bg-primary')
    expect(badgeVariants({ variant: 'secondary' })).toContain('bg-secondary')
    expect(badgeVariants({ variant: 'destructive' })).toContain('bg-destructive')
    expect(badgeVariants({ variant: 'outline' })).toContain('text-foreground')
  })
})
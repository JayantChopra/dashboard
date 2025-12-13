import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge, badgeVariants } from './badge'

describe('Badge', () => {
  describe('Default rendering', () => {
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

  describe('Variant tests', () => {
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
      render(<Badge variant={undefined}>Default</Badge>)
      const badge = screen.getByText('Default')
      expect(badge).toHaveClass('bg-primary')
    })
  })

  describe('ClassName merging', () => {
    it('should merge custom className with variant classes', () => {
      render(<Badge className="custom-class">Merged</Badge>)
      const badge = screen.getByText('Merged')
      expect(badge).toHaveClass('custom-class')
      expect(badge).toHaveClass('inline-flex')
    })

    it('should allow custom className to override variant classes', () => {
      render(<Badge className="px-10">Override</Badge>)
      const badge = screen.getByText('Override')
      expect(badge).toHaveClass('px-10')
    })
  })

  describe('Props forwarding', () => {
    it('should forward HTML attributes to the div element', () => {
      render(
        <Badge data-testid="test-badge" id="my-badge" role="status">
          Props
        </Badge>
      )
      const badge = screen.getByTestId('test-badge')
      expect(badge).toHaveAttribute('id', 'my-badge')
      expect(badge).toHaveAttribute('role', 'status')
    })

    it('should forward event handlers', () => {
      let clicked = false
      render(<Badge onClick={() => { clicked = true }}>Clickable</Badge>)
      const badge = screen.getByText('Clickable')
      badge.click()
      expect(clicked).toBe(true)
    })
  })

  describe('Edge cases', () => {
    it('should render with empty children', () => {
      render(<Badge data-testid="empty-badge" />)
      const badge = screen.getByTestId('empty-badge')
      expect(badge).toBeInTheDocument()
      expect(badge).toBeEmptyDOMElement()
    })

    it('should render with complex children', () => {
      render(
        <Badge>
          <span>Icon</span>
          <span>Text</span>
        </Badge>
      )
      expect(screen.getByText('Icon')).toBeInTheDocument()
      expect(screen.getByText('Text')).toBeInTheDocument()
    })
  })
})

describe('badgeVariants', () => {
  it('should return correct classes for default variant', () => {
    const classes = badgeVariants({ variant: 'default' })
    expect(classes).toContain('bg-primary')
    expect(classes).toContain('inline-flex')
    expect(classes).toContain('rounded-full')
  })

  it('should return correct classes for secondary variant', () => {
    const classes = badgeVariants({ variant: 'secondary' })
    expect(classes).toContain('bg-secondary')
  })

  it('should return correct classes for destructive variant', () => {
    const classes = badgeVariants({ variant: 'destructive' })
    expect(classes).toContain('bg-destructive')
  })

  it('should return correct classes for outline variant', () => {
    const classes = badgeVariants({ variant: 'outline' })
    expect(classes).toContain('text-foreground')
    expect(classes).not.toContain('bg-primary')
  })

  it('should use default variant when no variant specified', () => {
    const classes = badgeVariants({})
    expect(classes).toContain('bg-primary')
  })
})
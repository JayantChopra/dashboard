import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { Button, buttonVariants } from './button'

describe('Button', () => {
  describe('Rendering', () => {
    it('should render with default props', () => {
      render(<Button>Click me</Button>)
      const button = screen.getByRole('button', { name: 'Click me' })
      expect(button).toBeInTheDocument()
    })

    it('should render children correctly', () => {
      render(<Button><span data-testid="child">Icon</span> Text</Button>)
      expect(screen.getByTestId('child')).toBeInTheDocument()
      expect(screen.getByRole('button')).toHaveTextContent('Icon Text')
    })

    it('should have correct displayName', () => {
      expect(Button.displayName).toBe('Button')
    })
  })

  describe('Variants', () => {
    it('should apply default variant classes', () => {
      render(<Button>Default</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-primary', 'text-primary-foreground')
    })

    it('should apply destructive variant classes', () => {
      render(<Button variant="destructive">Destructive</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-destructive', 'text-destructive-foreground')
    })

    it('should apply outline variant classes', () => {
      render(<Button variant="outline">Outline</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('border', 'border-input', 'bg-background')
    })

    it('should apply secondary variant classes', () => {
      render(<Button variant="secondary">Secondary</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-secondary', 'text-secondary-foreground')
    })

    it('should apply ghost variant classes', () => {
      render(<Button variant="ghost">Ghost</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('hover:bg-accent', 'hover:text-accent-foreground')
    })

    it('should apply link variant classes', () => {
      render(<Button variant="link">Link</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('text-primary', 'underline-offset-4')
    })
  })

  describe('Sizes', () => {
    it('should apply default size classes', () => {
      render(<Button>Default Size</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-10', 'px-4', 'py-2')
    })

    it('should apply sm size classes', () => {
      render(<Button size="sm">Small</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-9', 'px-3')
    })

    it('should apply lg size classes', () => {
      render(<Button size="lg">Large</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-11', 'px-8')
    })

    it('should apply icon size classes', () => {
      render(<Button size="icon">🔍</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-10', 'w-10')
    })
  })

  describe('Props and Attributes', () => {
    it('should merge custom className with variant classes', () => {
      render(<Button className="custom-class">Custom</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-class')
      expect(button).toHaveClass('bg-primary') // default variant still applied
    })

    it('should pass through native button props', async () => {
      const handleClick = vi.fn()
      render(
        <Button
          onClick={handleClick}
          disabled
          type="submit"
          aria-label="Submit form"
        >
          Submit
        </Button>
      )
      const button = screen.getByRole('button')
      
      expect(button).toBeDisabled()
      expect(button).toHaveAttribute('type', 'submit')
      expect(button).toHaveAttribute('aria-label', 'Submit form')
      
      await userEvent.click(button)
      expect(handleClick).not.toHaveBeenCalled() // disabled button
    })

    it('should handle click events when enabled', async () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Clickable</Button>)
      
      await userEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Ref Forwarding', () => {
    it('should forward ref to button element', () => {
      const ref = createRef<HTMLButtonElement>()
      render(<Button ref={ref}>Ref Button</Button>)
      
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
      expect(ref.current?.textContent).toBe('Ref Button')
    })
  })

  describe('Edge Cases', () => {
    it('should handle undefined variant and size gracefully', () => {
      render(<Button variant={undefined} size={undefined}>Undefined</Button>)
      const button = screen.getByRole('button')
      // Should fall back to defaults
      expect(button).toHaveClass('bg-primary', 'h-10')
    })
  })
})

describe('buttonVariants', () => {
  it('should generate correct classes for default options', () => {
    const classes = buttonVariants()
    expect(classes).toContain('bg-primary')
    expect(classes).toContain('h-10')
  })

  it('should generate correct classes for custom variant and size', () => {
    const classes = buttonVariants({ variant: 'destructive', size: 'lg' })
    expect(classes).toContain('bg-destructive')
    expect(classes).toContain('h-11')
    expect(classes).toContain('px-8')
  })

  it('should merge custom className', () => {
    const classes = buttonVariants({ className: 'my-custom-class' })
    expect(classes).toContain('my-custom-class')
  })
})
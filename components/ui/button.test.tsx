import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { Button, buttonVariants } from './button'

describe('Button', () => {
  describe('rendering', () => {
    it('should render children correctly', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
    })

    it('should have correct displayName', () => {
      expect(Button.displayName).toBe('Button')
    })
  })

  describe('variants', () => {
    it('should render default variant', () => {
      render(<Button>Default</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('bg-primary')
      expect(button.className).toContain('text-primary-foreground')
    })

    it('should render destructive variant', () => {
      render(<Button variant="destructive">Destructive</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('bg-destructive')
      expect(button.className).toContain('text-destructive-foreground')
    })

    it('should render outline variant', () => {
      render(<Button variant="outline">Outline</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('border')
      expect(button.className).toContain('bg-background')
    })

    it('should render secondary variant', () => {
      render(<Button variant="secondary">Secondary</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('bg-secondary')
      expect(button.className).toContain('text-secondary-foreground')
    })

    it('should render ghost variant', () => {
      render(<Button variant="ghost">Ghost</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('hover:bg-accent')
    })

    it('should render link variant', () => {
      render(<Button variant="link">Link</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('text-primary')
      expect(button.className).toContain('underline-offset-4')
    })
  })

  describe('sizes', () => {
    it('should render default size', () => {
      render(<Button>Default Size</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('h-10')
      expect(button.className).toContain('px-4')
    })

    it('should render sm size', () => {
      render(<Button size="sm">Small</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('h-9')
      expect(button.className).toContain('px-3')
    })

    it('should render lg size', () => {
      render(<Button size="lg">Large</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('h-11')
      expect(button.className).toContain('px-8')
    })

    it('should render icon size', () => {
      render(<Button size="icon">Icon</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('h-10')
      expect(button.className).toContain('w-10')
    })
  })

  describe('props and behavior', () => {
    it('should merge custom className with default classes', () => {
      render(<Button className="custom-class">Custom</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('custom-class')
      expect(button.className).toContain('inline-flex')
    })

    it('should handle disabled state', () => {
      render(<Button disabled>Disabled</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      expect(button.className).toContain('disabled:pointer-events-none')
      expect(button.className).toContain('disabled:opacity-50')
    })

    it('should handle onClick events', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()
      render(<Button onClick={handleClick}>Click</Button>)
      
      await user.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should not trigger onClick when disabled', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()
      render(<Button disabled onClick={handleClick}>Click</Button>)
      
      await user.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('should forward additional HTML attributes', () => {
      render(<Button type="submit" data-testid="submit-btn">Submit</Button>)
      const button = screen.getByTestId('submit-btn')
      expect(button).toHaveAttribute('type', 'submit')
    })
  })

  describe('ref forwarding', () => {
    it('should forward ref to button element', () => {
      const ref = createRef<HTMLButtonElement>()
      render(<Button ref={ref}>Ref Button</Button>)
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
      expect(ref.current?.textContent).toBe('Ref Button')
    })
  })
})

describe('buttonVariants', () => {
  it('should return default classes when called with no arguments', () => {
    const classes = buttonVariants()
    expect(classes).toContain('bg-primary')
    expect(classes).toContain('h-10')
  })

  it('should return correct classes for variant and size combination', () => {
    const classes = buttonVariants({ variant: 'destructive', size: 'lg' })
    expect(classes).toContain('bg-destructive')
    expect(classes).toContain('h-11')
    expect(classes).toContain('px-8')
  })

  it('should include custom className in output', () => {
    const classes = buttonVariants({ className: 'my-custom-class' })
    expect(classes).toContain('my-custom-class')
  })
})
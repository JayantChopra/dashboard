import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './card'

// Mock the cn utility
vi.mock('@/lib/utils', () => ({
  cn: (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' '),
}))

describe('Card', () => {
  it('should render with default classes', () => {
    render(<Card data-testid="card">Content</Card>)
    const card = screen.getByTestId('card')
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('rounded-lg', 'border', 'bg-card', 'text-card-foreground', 'shadow-sm')
  })

  it('should merge custom className with default classes', () => {
    render(<Card data-testid="card" className="custom-class">Content</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('custom-class')
    expect(card).toHaveClass('rounded-lg')
  })

  it('should forward ref correctly', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Card ref={ref}>Content</Card>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('should spread additional props', () => {
    render(<Card data-testid="card" id="my-card" aria-label="card label">Content</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveAttribute('id', 'my-card')
    expect(card).toHaveAttribute('aria-label', 'card label')
  })

  it('should have correct displayName', () => {
    expect(Card.displayName).toBe('Card')
  })
})

describe('CardHeader', () => {
  it('should render with default classes', () => {
    render(<CardHeader data-testid="header">Header</CardHeader>)
    const header = screen.getByTestId('header')
    expect(header).toBeInTheDocument()
    expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6')
  })

  it('should merge custom className with default classes', () => {
    render(<CardHeader data-testid="header" className="custom-header">Header</CardHeader>)
    const header = screen.getByTestId('header')
    expect(header).toHaveClass('custom-header')
    expect(header).toHaveClass('flex')
  })

  it('should forward ref correctly', () => {
    const ref = createRef<HTMLDivElement>()
    render(<CardHeader ref={ref}>Header</CardHeader>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('should spread additional props', () => {
    render(<CardHeader data-testid="header" role="banner">Header</CardHeader>)
    const header = screen.getByTestId('header')
    expect(header).toHaveAttribute('role', 'banner')
  })

  it('should have correct displayName', () => {
    expect(CardHeader.displayName).toBe('CardHeader')
  })
})

describe('CardTitle', () => {
  it('should render as h3 with default classes', () => {
    render(<CardTitle data-testid="title">Title</CardTitle>)
    const title = screen.getByTestId('title')
    expect(title.tagName).toBe('H3')
    expect(title).toHaveClass('text-2xl', 'font-semibold', 'leading-none', 'tracking-tight')
  })

  it('should merge custom className with default classes', () => {
    render(<CardTitle data-testid="title" className="custom-title">Title</CardTitle>)
    const title = screen.getByTestId('title')
    expect(title).toHaveClass('custom-title')
    expect(title).toHaveClass('text-2xl')
  })

  it('should forward ref correctly', () => {
    const ref = createRef<HTMLParagraphElement>()
    render(<CardTitle ref={ref}>Title</CardTitle>)
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement)
  })

  it('should spread additional props', () => {
    render(<CardTitle data-testid="title" id="main-title">Title</CardTitle>)
    const title = screen.getByTestId('title')
    expect(title).toHaveAttribute('id', 'main-title')
  })

  it('should have correct displayName', () => {
    expect(CardTitle.displayName).toBe('CardTitle')
  })
})

describe('CardDescription', () => {
  it('should render as p with default classes', () => {
    render(<CardDescription data-testid="desc">Description</CardDescription>)
    const desc = screen.getByTestId('desc')
    expect(desc.tagName).toBe('P')
    expect(desc).toHaveClass('text-sm', 'text-muted-foreground')
  })

  it('should merge custom className with default classes', () => {
    render(<CardDescription data-testid="desc" className="custom-desc">Description</CardDescription>)
    const desc = screen.getByTestId('desc')
    expect(desc).toHaveClass('custom-desc')
    expect(desc).toHaveClass('text-sm')
  })

  it('should forward ref correctly', () => {
    const ref = createRef<HTMLParagraphElement>()
    render(<CardDescription ref={ref}>Description</CardDescription>)
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement)
  })

  it('should spread additional props', () => {
    render(<CardDescription data-testid="desc" aria-describedby="info">Description</CardDescription>)
    const desc = screen.getByTestId('desc')
    expect(desc).toHaveAttribute('aria-describedby', 'info')
  })

  it('should have correct displayName', () => {
    expect(CardDescription.displayName).toBe('CardDescription')
  })
})

describe('CardContent', () => {
  it('should render with default classes', () => {
    render(<CardContent data-testid="content">Content</CardContent>)
    const content = screen.getByTestId('content')
    expect(content).toBeInTheDocument()
    expect(content).toHaveClass('p-6', 'pt-0')
  })

  it('should merge custom className with default classes', () => {
    render(<CardContent data-testid="content" className="custom-content">Content</CardContent>)
    const content = screen.getByTestId('content')
    expect(content).toHaveClass('custom-content')
    expect(content).toHaveClass('p-6')
  })

  it('should forward ref correctly', () => {
    const ref = createRef<HTMLDivElement>()
    render(<CardContent ref={ref}>Content</CardContent>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('should spread additional props', () => {
    render(<CardContent data-testid="content" tabIndex={0}>Content</CardContent>)
    const content = screen.getByTestId('content')
    expect(content).toHaveAttribute('tabindex', '0')
  })

  it('should have correct displayName', () => {
    expect(CardContent.displayName).toBe('CardContent')
  })
})

describe('CardFooter', () => {
  it('should render with default classes', () => {
    render(<CardFooter data-testid="footer">Footer</CardFooter>)
    const footer = screen.getByTestId('footer')
    expect(footer).toBeInTheDocument()
    expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0')
  })

  it('should merge custom className with default classes', () => {
    render(<CardFooter data-testid="footer" className="custom-footer">Footer</CardFooter>)
    const footer = screen.getByTestId('footer')
    expect(footer).toHaveClass('custom-footer')
    expect(footer).toHaveClass('flex')
  })

  it('should forward ref correctly', () => {
    const ref = createRef<HTMLDivElement>()
    render(<CardFooter ref={ref}>Footer</CardFooter>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('should spread additional props', () => {
    render(<CardFooter data-testid="footer" role="contentinfo">Footer</CardFooter>)
    const footer = screen.getByTestId('footer')
    expect(footer).toHaveAttribute('role', 'contentinfo')
  })

  it('should have correct displayName', () => {
    expect(CardFooter.displayName).toBe('CardFooter')
  })
})

describe('Card composition', () => {
  it('should render complete card with all subcomponents', () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
        <CardContent>Test Content</CardContent>
        <CardFooter>Test Footer</CardFooter>
      </Card>
    )

    expect(screen.getByTestId('card')).toBeInTheDocument()
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
    expect(screen.getByText('Test Footer')).toBeInTheDocument()
  })

  it('should render card without optional subcomponents', () => {
    render(
      <Card data-testid="card">
        <CardContent>Only Content</CardContent>
      </Card>
    )

    expect(screen.getByTestId('card')).toBeInTheDocument()
    expect(screen.getByText('Only Content')).toBeInTheDocument()
  })

  it('should handle empty children', () => {
    render(<Card data-testid="card" />)
    expect(screen.getByTestId('card')).toBeInTheDocument()
  })

  it('should handle undefined className gracefully', () => {
    render(<Card data-testid="card" className={undefined}>Content</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('rounded-lg')
  })
})
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import RootLayout, { metadata } from './layout'

// Mock next/font/google
vi.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'inter-mock-class',
  }),
}))

// Mock ThemeProvider
vi.mock('@/components/theme-provider', () => ({
  ThemeProvider: ({ children, ...props }: { children: React.ReactNode; ey: string]: unknown }) => (
    <div data-testid="theme-provider" data-props={JSON.stringify(props)}>
      {children}
    </div>
  ),
}))

describe('RootLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render children correctly', () => {
    const { container } = render(
      <RootLayout>
        <div data-testid="child-content">Test Content</div>
      </RootLayout>
    )

    expect(screen.getByTestId('child-content')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('should wrap children with ThemeProvider', () => {
    render(
      <RootLayout>
        <div data-testid="child-content">Test Content</div>
      </RootLayout>
    )

    const themeProvider = screen.getByTestId('theme-provider')
    expect(themeProvider).toBeInTheDocument()
    expect(themeProvider).toContainElement(screen.getByTestId('child-content'))
  })

  it('should pass correct props to ThemeProvider', () => {
    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    )

    const themeProvider = screen.getByTestId('theme-provider')
    const props = JSON.parse(themeProvider.getAttribute('data-props') || '{}')

    expect(props.attribute).toBe('class')
    expect(props.defaultTheme).toBe('dark')
    expect(props.enableSystem).toBe(true)
    expect(props.disableTransitionOnChange).toBe(true)
  })

  it('should apply Inter font className to body', () => {
    const { container } = render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    )

    const body = container.querySelector('body')
    expect(body).toHaveClass('inter-mock-class')
  })
})

describe('metadata', () => {
  it('should export correct title', () => {
    expect(metadata.title).toBe('Dashboard')
  })

  it('should export correct description', () => {
    expect(metadata.description).toBe('A modern dashboard built with Next.js and shadcn/ui')
  })
})
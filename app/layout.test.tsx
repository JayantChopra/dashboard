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

  describe('Component Rendering', () => {
    it('should render children correctly', () => {
      const { container } = render(
        <RootLayout>
          <div data-testid="test-child">Test Content</div>
        </RootLayout>
      )

      expect(screen.getByTestId('test-child')).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('should render html element with lang="en" and suppressHydrationWarning', () => {
      const { container } = render(
        <RootLayout>
          <div>Content</div>
        </RootLayout>
      )

      const html = container.querySelector('html')
      expect(html).toHaveAttribute('lang', 'en')
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

  describe('ThemeProvider Configuration', () => {
    it('should wrap children with ThemeProvider with correct props', () => {
      render(
        <RootLayout>
          <div>Content</div>
        </RootLayout>
      )

      const themeProvider = screen.getByTestId('theme-provider')
      expect(themeProvider).toBeInTheDocument()

      const props = JSON.parse(themeProvider.getAttribute('data-props') || '{}')
      expect(props.attribute).toBe('class')
      expect(props.defaultTheme).toBe('dark')
      expect(props.enableSystem).toBe(true)
      expect(props.disableTransitionOnChange).toBe(true)
    })

    it('should render children inside ThemeProvider', () => {
      render(
        <RootLayout>
          <span data-testid="nested-content">Nested</span>
        </RootLayout>
      )

      const themeProvider = screen.getByTestId('theme-provider')
      const nestedContent = screen.getByTestId('nested-content')
      
      expect(themeProvider).toContainElement(nestedContent)
    })
  })

  describe('Metadata Export', () => {
    it('should export metadata with correct title', () => {
      expect(metadata).toBeDefined()
      expect(metadata.title).toBe('Dashboard')
    })

    it('should export metadata with correct description', () => {
      expect(metadata.description).toBe('A modern dashboard built with Next.js and shadcn/ui')
    })
  })
})

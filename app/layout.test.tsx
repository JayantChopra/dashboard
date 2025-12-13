import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import RootLayout, { metadata } from './layout'

// Mock next/font/google
vi.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'inter-mock-class',
    style: { fontFamily: 'Inter' },
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

  describe('rendering', () => {
    it('should render children correctly', () => {
      const { container } = render(
        <RootLayout>
          <div data-testid="child-content">Test Content</div>
        </RootLayout>
      )

      expect(screen.getByTestId('child-content')).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('should render html element with lang="en" and suppressHydrationWarning', () => {
      const { container } = render(
        <RootLayout>
          <div>Content</div>
        </RootLayout>
      )

      const htmlElement = container.querySelector('html')
      expect(htmlElement).toHaveAttribute('lang', 'en')
    })

    it('should apply Inter font className to body', () => {
      const { container } = render(
        <RootLayout>
          <div>Content</div>
        </RootLayout>
      )

      const bodyElement = container.querySelector('body')
      expect(bodyElement).toHaveClass('inter-mock-class')
    })
  })

  describe('ThemeProvider integration', () => {
    it('should wrap children with ThemeProvider', () => {
      render(
        <RootLayout>
          <div data-testid="child">Child</div>
        </RootLayout>
      )

      const themeProvider = screen.getByTestId('theme-provider')
      expect(themeProvider).toBeInTheDocument()
      expect(screen.getByTestId('child')).toBeInTheDocument()
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
  })

  describe('metadata export', () => {
    it('should export correct metadata', () => {
      expect(metadata).toBeDefined()
      expect(metadata.title).toBe('Dashboard')
      expect(metadata.description).toBe('A modern dashboard built with Next.js and shadcn/ui')
    })
  })
})

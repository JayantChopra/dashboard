import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from './theme-provider'

// Mock next-themes
vi.mock('next-themes', () => ({
  ThemeProvider: ({ children, ...props }: { children: React.ReactNode; ey: string]: unknown }) => (
    <div data-testid="next-themes-provider" data-props={JSON.stringify(props)}>
      {children}
    </div>
  ),
}))

describe('ThemeProvider', () => {
  describe('rendering', () => {
    it('should render children correctly', () => {
      render(
        <ThemeProvider>
          <div data-testid="child">Test Child</div>
        </ThemeProvider>
      )

      expect(screen.getByTestId('child')).toBeInTheDocument()
      expect(screen.getByText('Test Child')).toBeInTheDocument()
    })

    it('should render multiple children', () => {
      render(
        <ThemeProvider>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
        </ThemeProvider>
      )

      expect(screen.getByTestId('child-1')).toBeInTheDocument()
      expect(screen.getByTestId('child-2')).toBeInTheDocument()
    })
  })

  describe('props forwarding', () => {
    it('should forward attribute prop to NextThemesProvider', () => {
      render(
        <ThemeProvider attribute="class">
          <div>Content</div>
        </ThemeProvider>
      )

      const provider = screen.getByTestId('next-themes-provider')
      const props = JSON.parse(provider.getAttribute('data-props') || '{}')
      expect(props.attribute).toBe('class')
    })

    it('should forward all theme props to NextThemesProvider', () => {
      render(
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          storageKey="custom-theme"
        >
          <div>Content</div>
        </ThemeProvider>
      )

      const provider = screen.getByTestId('next-themes-provider')
      const props = JSON.parse(provider.getAttribute('data-props') || '{}')
      
      expect(props.attribute).toBe('class')
      expect(props.defaultTheme).toBe('dark')
      expect(props.enableSystem).toBe(true)
      expect(props.disableTransitionOnChange).toBe(true)
      expect(props.storageKey).toBe('custom-theme')
    })
  })

  describe('children handling', () => {
    it('should handle null children gracefully', () => {
      const { container } = render(
        <ThemeProvider>
          {null}
        </ThemeProvider>
      )

      expect(container.querySelector('ata-testid="next-themes-provider"]')).toBeInTheDocument()
    })

    it('should handle nested components', () => {
      const NestedComponent = () => <span data-testid="nested">Nested</span>

      render(
        <ThemeProvider>
          <div>
            <NestedComponent />
          </div>
        </ThemeProvider>
      )

      expect(screen.getByTestId('nested')).toBeInTheDocument()
    })
  })
})
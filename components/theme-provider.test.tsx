import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from './theme-provider'

// Mock next-themes
vi.mock('next-themes', () => ({
  ThemeProvider: ({ children, ...props }: { children: React.ReactNode; ey: string]: unknown }) => (
    <div data-testid="mock-next-themes-provider" data-props={JSON.stringify(props)}>
      {children}
    </div>
  ),
}))

describe('ThemeProvider', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      render(
        <ThemeProvider>
          <div>Test content</div>
        </ThemeProvider>
      )
      
      expect(screen.getByTestId('mock-next-themes-provider')).toBeInTheDocument()
    })

    it('should render children correctly', () => {
      render(
        <ThemeProvider>
          <span data-testid="child-element">Child Content</span>
        </ThemeProvider>
      )
      
      expect(screen.getByTestId('child-element')).toBeInTheDocument()
      expect(screen.getByText('Child Content')).toBeInTheDocument()
    })
  })

  describe('props passing', () => {
    it('should pass additional props to NextThemesProvider', () => {
      render(
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div>Content</div>
        </ThemeProvider>
      )
      
      const provider = screen.getByTestId('mock-next-themes-provider')
      const passedProps = JSON.parse(provider.getAttribute('data-props') || '{}')
      
      expect(passedProps.attribute).toBe('class')
      expect(passedProps.defaultTheme).toBe('system')
      expect(passedProps.enableSystem).toBe(true)
      expect(passedProps.disableTransitionOnChange).toBe(true)
    })

    it('should pass custom theme values to NextThemesProvider', () => {
      render(
        <ThemeProvider
          themes={['light', 'dark', 'custom']}
          forcedTheme="dark"
          storageKey="custom-theme-key"
        >
          <div>Content</div>
        </ThemeProvider>
      )
      
      const provider = screen.getByTestId('mock-next-themes-provider')
      const passedProps = JSON.parse(provider.getAttribute('data-props') || '{}')
      
      expect(passedProps.themes).toEqual(['light', 'dark', 'custom'])
      expect(passedProps.forcedTheme).toBe('dark')
      expect(passedProps.storageKey).toBe('custom-theme-key')
    })
  })

  describe('children handling', () => {
    it('should render multiple children', () => {
      render(
        <ThemeProvider>
          <div data-testid="child-1">First</div>
          <div data-testid="child-2">Second</div>
          <div data-testid="child-3">Third</div>
        </ThemeProvider>
      )
      
      expect(screen.getByTestId('child-1')).toBeInTheDocument()
      expect(screen.getByTestId('child-2')).toBeInTheDocument()
      expect(screen.getByTestId('child-3')).toBeInTheDocument()
    })

    it('should render nested components correctly', () => {
      render(
        <ThemeProvider>
          <div data-testid="outer">
            <div data-testid="inner">
              <span data-testid="deeply-nested">Nested Content</span>
            </div>
          </div>
        </ThemeProvider>
      )
      
      expect(screen.getByTestId('outer')).toBeInTheDocument()
      expect(screen.getByTestId('inner')).toBeInTheDocument()
      expect(screen.getByTestId('deeply-nested')).toBeInTheDocument()
      expect(screen.getByText('Nested Content')).toBeInTheDocument()
    })
  })
})

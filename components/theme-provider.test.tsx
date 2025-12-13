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
  it('should render children correctly', () => {
    render(
      <ThemeProvider>
        <div data-testid="child">Test Child</div>
      </ThemeProvider>
    )

    expect(screen.getByTestId('child')).toBeInTheDocument()
    expect(screen.getByText('Test Child')).toBeInTheDocument()
  })

  it('should pass props to NextThemesProvider', () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="dark">
        <div>Child</div>
      </ThemeProvider>
    )

    const provider = screen.getByTestId('next-themes-provider')
    const props = JSON.parse(provider.getAttribute('data-props') || '{}')
    
    expect(props.attribute).toBe('class')
    expect(props.defaultTheme).toBe('dark')
  })

  it('should render with attribute prop', () => {
    render(
      <ThemeProvider attribute="data-theme">
        <span>Content</span>
      </ThemeProvider>
    )

    const provider = screen.getByTestId('next-themes-provider')
    const props = JSON.parse(provider.getAttribute('data-props') || '{}')
    
    expect(props.attribute).toBe('data-theme')
  })

  it('should render with defaultTheme prop', () => {
    render(
      <ThemeProvider defaultTheme="system">
        <span>Content</span>
      </ThemeProvider>
    )

    const provider = screen.getByTestId('next-themes-provider')
    const props = JSON.parse(provider.getAttribute('data-props') || '{}')
    
    expect(props.defaultTheme).toBe('system')
  })

  it('should render with enableSystem prop', () => {
    render(
      <ThemeProvider enableSystem={true}>
        <span>Content</span>
      </ThemeProvider>
    )

    const provider = screen.getByTestId('next-themes-provider')
    const props = JSON.parse(provider.getAttribute('data-props') || '{}')
    
    expect(props.enableSystem).toBe(true)
  })

  it('should render with multiple props combined', () => {
    render(
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange={true}
      >
        <div data-testid="nested-child">Nested Content</div>
      </ThemeProvider>
    )

    const provider = screen.getByTestId('next-themes-provider')
    const props = JSON.parse(provider.getAttribute('data-props') || '{}')
    
    expect(props.attribute).toBe('class')
    expect(props.defaultTheme).toBe('dark')
    expect(props.enableSystem).toBe(false)
    expect(props.disableTransitionOnChange).toBe(true)
    expect(screen.getByTestId('nested-child')).toBeInTheDocument()
  })
})
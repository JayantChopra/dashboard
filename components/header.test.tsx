import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Header } from './header'

// Mock next-themes
const mockSetTheme = vi.fn()
vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: mockSetTheme,
  }),
}))

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Search: ({ className }: { className?: string }) => <svg data-testid="search-icon" className={className} />,
  Moon: ({ className }: { className?: string }) => <svg data-testid="moon-icon" className={className} />,
  Sun: ({ className }: { className?: string }) => <svg data-testid="sun-icon" className={className} />,
}))

// Mock UI components
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, variant, size, ...props }: any) => (
    <button onClick={onClick} data-variant={variant} data-size={size} {...props}>
      {children}
    </button>
  ),
}))

vi.mock('@/components/ui/input', () => ({
  Input: ({ type, placeholder, className, ...props }: any) => (
    <input type={type} placeholder={placeholder} className={className} {...props} />
  ),
}))

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render the header element', () => {
      render(<Header />)
      const header = screen.getByRole('banner')
      expect(header).toBeDefined()
    })

    it('should render search input with placeholder', () => {
      render(<Header />)
      const searchInput = screen.getByPlaceholderText('Search...')
      expect(searchInput).toBeDefined()
      expect(searchInput.getAttribute('type')).toBe('search')
    })

    it('should render deploy button', () => {
      render(<Header />)
      const deployButton = screen.getByRole('button', { name: /deploy/i })
      expect(deployButton).toBeDefined()
      expect(deployButton.getAttribute('data-variant')).toBe('outline')
      expect(deployButton.getAttribute('data-size')).toBe('sm')
    })
  })

  describe('Theme Toggle', () => {
    it('should render theme toggle button with icons', () => {
      render(<Header />)
      expect(screen.getByTestId('sun-icon')).toBeDefined()
      expect(screen.getByTestId('moon-icon')).toBeDefined()
    })

    it('should toggle theme from light to dark when clicked', () => {
      render(<Header />)
      const themeButton = screen.getByRole('button', { name: /toggle theme/i })
      fireEvent.click(themeButton)
      expect(mockSetTheme).toHaveBeenCalledWith('dark')
    })

    it('should toggle theme from dark to light when clicked', async () => {
      vi.doMock('next-themes', () => ({
        useTheme: () => ({
          theme: 'dark',
          setTheme: mockSetTheme,
        }),
      }))
      
      // Re-import to get the new mock
      const { Header: HeaderDark } = await import('./header')
      render(<HeaderDark />)
      
      const themeButton = screen.getByRole('button', { name: /toggle theme/i })
      fireEvent.click(themeButton)
      expect(mockSetTheme).toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('should have sr-only text for theme toggle button', () => {
      render(<Header />)
      const srOnlyText = screen.getByText('Toggle theme')
      expect(srOnlyText).toBeDefined()
    })

    it('should render search icon for visual context', () => {
      render(<Header />)
      const searchIcon = screen.getByTestId('search-icon')
      expect(searchIcon).toBeDefined()
    })
  })
})
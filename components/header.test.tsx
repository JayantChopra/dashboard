import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Header } from './header'

// Mock next-themes
const mockSetTheme = vi.fn()
let mockTheme = 'light'

vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: mockTheme,
    setTheme: mockSetTheme,
  }),
}))

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Search: ({ className }: { className?: string }) => <svg data-testid="search-icon" className={className} />,
  Moon: ({ className }: { className?: string }) => <svg data-testid="moon-icon" className={className} />,
  Sun: ({ className }: { className?: string }) => <svg data-testid="sun-icon" className={className} />,
}))

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockTheme = 'light'
  })

  describe('Rendering', () => {
    it('should render the header component', () => {
      render(<Header />)
      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
    })

    it('should render search input with placeholder', () => {
      render(<Header />)
      const searchInput = screen.getByPlaceholderText('Search...')
      expect(searchInput).toBeInTheDocument()
      expect(searchInput).toHaveAttribute('type', 'search')
    })

    it('should render Deploy button', () => {
      render(<Header />)
      const deployButton = screen.getByRole('button', { name: /deploy/i })
      expect(deployButton).toBeInTheDocument()
    })

    it('should render search icon', () => {
      render(<Header />)
      const searchIcon = screen.getByTestId('search-icon')
      expect(searchIcon).toBeInTheDocument()
    })

    it('should render sun and moon icons for theme toggle', () => {
      render(<Header />)
      expect(screen.getByTestId('sun-icon')).toBeInTheDocument()
      expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
    })
  })

  describe('Theme Toggle', () => {
    it('should toggle from light to dark theme when clicked', () => {
      mockTheme = 'light'
      render(<Header />)
      
      const themeButton = screen.getByRole('button', { name: /toggle theme/i })
      fireEvent.click(themeButton)
      
      expect(mockSetTheme).toHaveBeenCalledWith('dark')
    })

    it('should toggle from dark to light theme when clicked', () => {
      mockTheme = 'dark'
      render(<Header />)
      
      const themeButton = screen.getByRole('button', { name: /toggle theme/i })
      fireEvent.click(themeButton)
      
      expect(mockSetTheme).toHaveBeenCalledWith('light')
    })

    it('should call setTheme exactly once per click', () => {
      render(<Header />)
      
      const themeButton = screen.getByRole('button', { name: /toggle theme/i })
      fireEvent.click(themeButton)
      
      expect(mockSetTheme).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('should have screen reader only label for theme toggle button', () => {
      render(<Header />)
      const srOnlyText = screen.getByText('Toggle theme')
      expect(srOnlyText).toHaveClass('sr-only')
    })
  })
})
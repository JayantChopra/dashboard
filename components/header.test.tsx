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
  Search: ({ className }: { className?: string }) => <div data-testid="search-icon" className={className} />,
  Moon: ({ className }: { className?: string }) => <div data-testid="moon-icon" className={className} />,
  Sun: ({ className }: { className?: string }) => <div data-testid="sun-icon" className={className} />,
}))

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockTheme = 'light'
  })

  it('should render the header component', () => {
    render(<Header />)
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })

  it('should render the search input with placeholder', () => {
    render(<Header />)
    const searchInput = screen.getByPlaceholderText('Search...')
    expect(searchInput).toBeInTheDocument()
    expect(searchInput).toHaveAttribute('type', 'search')
  })

  it('should render the search icon', () => {
    render(<Header />)
    const searchIcon = screen.getByTestId('search-icon')
    expect(searchIcon).toBeInTheDocument()
  })

  it('should render the Deploy button', () => {
    render(<Header />)
    const deployButton = screen.getByRole('button', { name: /deploy/i })
    expect(deployButton).toBeInTheDocument()
  })

  it('should render the theme toggle button with accessible label', () => {
    render(<Header />)
    const toggleButton = screen.getByRole('button', { name: /toggle theme/i })
    expect(toggleButton).toBeInTheDocument()
  })

  it('should toggle theme from light to dark when clicked', () => {
    mockTheme = 'light'
    render(<Header />)
    const toggleButton = screen.getByRole('button', { name: /toggle theme/i })
    
    fireEvent.click(toggleButton)
    
    expect(mockSetTheme).toHaveBeenCalledWith('dark')
    expect(mockSetTheme).toHaveBeenCalledTimes(1)
  })

  it('should toggle theme from dark to light when clicked', () => {
    mockTheme = 'dark'
    render(<Header />)
    const toggleButton = screen.getByRole('button', { name: /toggle theme/i })
    
    fireEvent.click(toggleButton)
    
    expect(mockSetTheme).toHaveBeenCalledWith('light')
    expect(mockSetTheme).toHaveBeenCalledTimes(1)
  })
})
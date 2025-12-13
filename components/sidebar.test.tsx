import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Sidebar } from './sidebar'

// Mock next/navigation
const mockPathname = vi.fn()
vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}))

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}))

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  LayoutDashboard: ({ className }: { className?: string }) => <span data-testid="icon-dashboard" className={className} />,
  FolderKanban: ({ className }: { className?: string }) => <span data-testid="icon-projects" className={className} />,
  BarChart3: ({ className }: { className?: string }) => <span data-testid="icon-analytics" className={className} />,
  Settings: ({ className }: { className?: string }) => <span data-testid="icon-settings" className={className} />,
  ChevronRight: ({ className }: { className?: string }) => <span data-testid="icon-chevron" className={className} />,
}))

describe('Sidebar', () => {
  beforeEach(() => {
    mockPathname.mockReturnValue('/')
  })

  describe('Rendering', () => {
    it('should render the logo with Dashboard text', () => {
      render(<Sidebar />)
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
    })

    it('should render all navigation items', () => {
      render(<Sidebar />)
      expect(screen.getByText('Overview')).toBeInTheDocument()
      expect(screen.getByText('Projects')).toBeInTheDocument()
      expect(screen.getByText('Analytics')).toBeInTheDocument()
      expect(screen.getByText('Settings')).toBeInTheDocument()
    })

    it('should render the user section with name and email', () => {
      render(<Sidebar />)
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('john@example.com')).toBeInTheDocument()
      expect(screen.getByText('JD')).toBeInTheDocument()
    })
  })

  describe('Navigation Links', () => {
    it('should render correct href for each navigation item', () => {
      render(<Sidebar />)
      
      const overviewLink = screen.getByText('Overview').closest('a')
      const projectsLink = screen.getByText('Projects').closest('a')
      const analyticsLink = screen.getByText('Analytics').closest('a')
      const settingsLink = screen.getByText('Settings').closest('a')

      expect(overviewLink).toHaveAttribute('href', '/')
      expect(projectsLink).toHaveAttribute('href', '/projects')
      expect(analyticsLink).toHaveAttribute('href', '/analytics')
      expect(settingsLink).toHaveAttribute('href', '/settings')
    })

    it('should render logo link pointing to home', () => {
      render(<Sidebar />)
      const logoLink = screen.getByText('Dashboard').closest('a')
      expect(logoLink).toHaveAttribute('href', '/')
    })
  })

  describe('Active State', () => {
    it('should apply active styles when pathname matches link href', () => {
      mockPathname.mockReturnValue('/')
      render(<Sidebar />)
      
      const overviewLink = screen.getByText('Overview').closest('a')
      expect(overviewLink).toHaveClass('bg-secondary')
      expect(overviewLink).toHaveClass('text-foreground')
    })

    it('should apply inactive styles when pathname does not match', () => {
      mockPathname.mockReturnValue('/')
      render(<Sidebar />)
      
      const projectsLink = screen.getByText('Projects').closest('a')
      expect(projectsLink).toHaveClass('text-muted-foreground')
      expect(projectsLink).not.toHaveClass('bg-secondary')
    })

    it('should update active state when pathname changes to /projects', () => {
      mockPathname.mockReturnValue('/projects')
      render(<Sidebar />)
      
      const projectsLink = screen.getByText('Projects').closest('a')
      const overviewLink = screen.getByText('Overview').closest('a')
      
      expect(projectsLink).toHaveClass('bg-secondary')
      expect(overviewLink).not.toHaveClass('bg-secondary')
    })

    it('should highlight settings when on /settings path', () => {
      mockPathname.mockReturnValue('/settings')
      render(<Sidebar />)
      
      const settingsLink = screen.getByText('Settings').closest('a')
      expect(settingsLink).toHaveClass('bg-secondary')
    })
  })

  describe('Icons', () => {
    it('should render icons for all navigation items', () => {
      render(<Sidebar />)
      
      expect(screen.getByTestId('icon-dashboard')).toBeInTheDocument()
      expect(screen.getByTestId('icon-projects')).toBeInTheDocument()
      expect(screen.getByTestId('icon-analytics')).toBeInTheDocument()
      expect(screen.getByTestId('icon-settings')).toBeInTheDocument()
    })

    it('should render chevron icon in logo', () => {
      render(<Sidebar />)
      expect(screen.getByTestId('icon-chevron')).toBeInTheDocument()
    })
  })
})
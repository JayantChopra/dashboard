import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Sidebar } from './sidebar'

// Mock next/navigation
const mockUsePathname = vi.fn()
vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}))

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}))

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  LayoutDashboard: ({ className }: { className?: string }) => <svg data-testid="icon-layout" className={className} />,
  FolderKanban: ({ className }: { className?: string }) => <svg data-testid="icon-folder" className={className} />,
  BarChart3: ({ className }: { className?: string }) => <svg data-testid="icon-chart" className={className} />,
  Settings: ({ className }: { className?: string }) => <svg data-testid="icon-settings" className={className} />,
  ChevronRight: ({ className }: { className?: string }) => <svg data-testid="icon-chevron" className={className} />,
}))

describe('Sidebar', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/')
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
    it('should render correct hrefs for all navigation items', () => {
      render(<Sidebar />)
      
      const links = screen.getAllByRole('link')
      const hrefs = links.map(link => link.getAttribute('href'))
      
      expect(hrefs).toContain('/')
      expect(hrefs).toContain('/projects')
      expect(hrefs).toContain('/analytics')
      expect(hrefs).toContain('/settings')
    })

    it('should render logo link pointing to home', () => {
      render(<Sidebar />)
      
      const logoLink = screen.getByText('Dashboard').closest('a')
      expect(logoLink).toHaveAttribute('href', '/')
    })
  })

  describe('Active State', () => {
    it('should apply active styles to Overview when pathname is /', () => {
      mockUsePathname.mockReturnValue('/')
      render(<Sidebar />)
      
      const overviewLink = screen.getByText('Overview').closest('a')
      expect(overviewLink).toHaveClass('bg-secondary')
      expect(overviewLink).toHaveClass('text-foreground')
    })

    it('should apply active styles to Projects when pathname is /projects', () => {
      mockUsePathname.mockReturnValue('/projects')
      render(<Sidebar />)
      
      const projectsLink = screen.getByText('Projects').closest('a')
      expect(projectsLink).toHaveClass('bg-secondary')
      expect(projectsLink).toHaveClass('text-foreground')
      
      // Overview should not be active
      const overviewLink = screen.getByText('Overview').closest('a')
      expect(overviewLink).toHaveClass('text-muted-foreground')
    })

    it('should apply active styles to Analytics when pathname is /analytics', () => {
      mockUsePathname.mockReturnValue('/analytics')
      render(<Sidebar />)
      
      const analyticsLink = screen.getByText('Analytics').closest('a')
      expect(analyticsLink).toHaveClass('bg-secondary')
    })

    it('should apply active styles to Settings when pathname is /settings', () => {
      mockUsePathname.mockReturnValue('/settings')
      render(<Sidebar />)
      
      const settingsLink = screen.getByText('Settings').closest('a')
      expect(settingsLink).toHaveClass('bg-secondary')
    })
  })

  describe('Edge Cases', () => {
    it('should not apply active styles when pathname does not match any route', () => {
      mockUsePathname.mockReturnValue('/unknown-route')
      render(<Sidebar />)
      
      const overviewLink = screen.getByText('Overview').closest('a')
      const projectsLink = screen.getByText('Projects').closest('a')
      const analyticsLink = screen.getByText('Analytics').closest('a')
      const settingsLink = screen.getByText('Settings').closest('a')
      
      expect(overviewLink).toHaveClass('text-muted-foreground')
      expect(projectsLink).toHaveClass('text-muted-foreground')
      expect(analyticsLink).toHaveClass('text-muted-foreground')
      expect(settingsLink).toHaveClass('text-muted-foreground')
    })
  })
})
